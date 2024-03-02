package fptAptech.theSun.security.jwt;

import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.InvalidTokenException;
import fptAptech.theSun.service.Impl.UserServiceImpl;
import fptAptech.theSun.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    public static String CURRENT_USER = "";
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getToken(request);

        if (token!=null) {
            try {
                String email = jwtService.getEmailFromToken(token);
                CURRENT_USER = email;
                var user = userService.getByEmail(email);
                    setUserAsAuthenticated(user);
            } catch (InvalidTokenException exception){
                log.error("Token invalid: {}", exception.getMessage());
            } catch (Exception exception) {
                log.error("Error null invalition do token: {}", exception.getMessage());
            }
        }

        filterChain.doFilter(request, response);

    }

    private void setUserAsAuthenticated(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

    public String getToken(HttpServletRequest request) {
        String authHeader =request.getHeader("Authorization");
        if (authHeader != null) {
            String[] authHeaderParts = authHeader.split(" ");
            if (authHeaderParts.length == 2) {
                return authHeaderParts[1];
            }
        }
        return null;

    }



}
