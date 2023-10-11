package com.example.demo.repository;

import com.example.demo.entity.Role;
import com.example.demo.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(RoleName roleName);
}
