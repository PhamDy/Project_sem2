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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        if (address == null)
            address = new Address();

        String dateString = dto.getDayOfBirth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate localDate = LocalDate.parse(dateString, formatter);

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
        address.setDayOfBirth(localDate);
        address.setCreatedBy("User");
        addressRepository.save(address);
    }

    @Override
    public AddressDto getAddressByUser() {
        String email = JwtFilter.CURRENT_USER;
        var user = Optional.ofNullable(userRepository.findByEmail(email).orElseThrow(() ->
                new CustomException("You must log in before!")));
        var address = addressRepository.findByUser_Id(user.get().getId());

        return AddressDto.builder()
                .firstName(address.getFirst_name())
                .lastName(address.getLast_name())
                .country(address.getCountry())
                .city(address.getCity())
                .address(address.getAddress())
                .optional(address.getOptional())
                .zipCode(address.getZipCode())
                .email(address.getEmail())
                .phone(address.getPhone())
                .dayOfBirth(String.valueOf(address.getDayOfBirth()))
                .build();
    }
}
