package com.MichaelRichards.FriendShare.Controller;


import com.MichaelRichards.FriendShare.Entity.User;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("api/user")
public class UserAPIController {

    @Autowired
    private UserService userService;


    @GetMapping
    public List<User> getUsers(){
        return new ArrayList<>(userService.findAll());
    }

    @PostMapping
    public void addUser(@RequestBody User user) throws Exception{
        userService.saveUser(user);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) throws Exception{
        if(userService.findUserByUsername(username) == null){
            throw new Exception("Username not found");
        }
        else {
            return userService.findUserByUsername(username);
        }
    }



}
