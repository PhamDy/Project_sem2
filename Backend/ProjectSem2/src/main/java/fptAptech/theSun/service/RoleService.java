package fptAptech.theSun.service;

import fptAptech.theSun.entity.Enum.RoleName;
import fptAptech.theSun.entity.Role;

import java.util.Optional;

public interface RoleService {
    public Optional<Role> findByName(RoleName roleName);
}
