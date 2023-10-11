package com.example.demo.entity;

import com.example.demo.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "roles")
@FieldDefaults(level = AccessLevel.PRIVATE)
@SequenceGenerator(name = "role_seq", sequenceName = "role_sequence", allocationSize = 1)
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq")
    Long id;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    RoleName roleName;

    public Role (RoleName roleName) {this.roleName = roleName;}
    public String getRoleName() {
        return roleName.toString();
    }
}
