package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "blogger")
public class Blogger {

    private @Id @GeneratedValue Long id;
    private String userName;
    private String password;
    private String avatar;
    private String email;

    protected Blogger() {}

    public Blogger(String userName, String password, String avatar, String email){
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
        this.email = email;
    }
}
