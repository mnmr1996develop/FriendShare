package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Authority;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/authority")
public class AuthorityController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Authority> saveRole(@RequestBody Authority authority){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/role/user").toUriString());
        return ResponseEntity.created(uri).body(userService.saveAuthority(authority));
    }

}
