package fptAptech.theSun.service.Impl;

import fptAptech.theSun.dto.AddressDto;
import fptAptech.theSun.entity.Address;
import fptAptech.theSun.exception.CustomException;
import fptAptech.theSun.respository.AddressRepository;
import fptAptech.theSun.respository.UserRepository;
import fptAptech.theSun.security.jwt.JwtFilter;
import fptAptech.theSun.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveAddreessOfUser(AddressDto dto) {
        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));
        var address = addressRepository.findByUser_Id(user.get().getId());
        address.setUser(user.get());
        address.setFirst_name(dto.getFirstName());
        address.setLast_name(dto.getLastName());
        address.setCountry(dto.getCountry());
        address.setCity(dto.getCity());
        address.setAddress(dto.getAddress());
        address.setOptional(dto.getOptional());
        address.setZipCode(dto.getZipCode());
        address.setEmail(dto.getEmail());
        address.setPhone(dto.getPhone());
        address.setCreatedBy("User");
        addressRepository.save(address);
    }
}
