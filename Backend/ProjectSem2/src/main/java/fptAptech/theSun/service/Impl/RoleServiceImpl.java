package fptAptech.theSun.service.Impl;

import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;
import fptAptech.theSun.respository.RoleRepository;
import fptAptech.theSun.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(RoleName roleName) {
        return roleRepository.findByName(roleName);
    }

}
