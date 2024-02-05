package fptAptech.theSun.security.jwt;

import fptAptech.theSun.entity.User;
import fptAptech.theSun.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Autowired
    private SecretKeyGenerator keyGenerator;

    public AccessToken generateToken(User user) {
        var key = keyGenerator.getKey();
        var expirationDate = generateExpirationDate();
        var claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getUserName())
                .expiration(expirationDate)
                .claims(claims)
                .compact();

        return new AccessToken(token);
    }

    private Date generateExpirationDate() {
        var expirationMinutes = 60;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> generateTokenClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getUserName());
        return claims;
    }

//    public String getEmailFromToken(String tokenJwt) {
//        try {
//            JwtParser build = Jwts.parser()
//                    .verifyWith(keyGenerator.getKey())
//                    .build();
//
//            Jws<Claims> jwsClaims = build.parseSignedClaims(tokenJwt);
//            Claims claims = jwsClaims.getPayload();
//            return claims.getSubject();
//        } catch (JwtException exception) {
//            throw new InvalidTokenException(exception.getMessage());
//        }
//    }

    public String getUsernameFromToken(String tokenJwt) {
        try {
            JwtParser build = Jwts.parser()
                    .verifyWith(keyGenerator.getKey())
                    .build();

            Jws<Claims> jwsClaims = build.parseSignedClaims(tokenJwt);
            Claims claims = jwsClaims.getPayload();
            return claims.getSubject();
        } catch (JwtException exception) {
            throw new InvalidTokenException(exception.getMessage());
        }
    }


}
