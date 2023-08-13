package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@Table(name = "blogger")
@ToString
@NoArgsConstructor
public class Blogger {

    private @Id @GeneratedValue Long id;

    private String userName;
    private String password;
    private String avatar;
    private String email;

    public Blogger(String userName, String password, String avatar, String email){
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
        this.email = email;
    }
}
