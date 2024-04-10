package fptAptech.theSun.service;

import fptAptech.theSun.dto.AddressDto;
import fptAptech.theSun.dto.AddressDto123;
import fptAptech.theSun.entity.Address;

public interface AddressService {

    void saveAddreessOfUser(AddressDto addressDto);

    Address getAddressByUser();

}
