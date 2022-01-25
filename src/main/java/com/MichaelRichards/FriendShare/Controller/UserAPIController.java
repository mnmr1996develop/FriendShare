package com.MichaelRichards.FriendShare.Controller;


import com.MichaelRichards.FriendShare.Entity.User;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("api/users")
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

    @DeleteMapping(path= "{username}")
    public void deleteUser(@PathVariable("username") String username) throws Exception{
        userService.deleteUserByUsername(username);
    }

    @PutMapping("/{username}")
    public void getUser(@PathVariable String username,
                        @RequestParam(required = false) String firstName,
                        @RequestParam(required = false) String lastName,
                        @RequestParam(required = false) String email,
                        @RequestParam(required = false) String Uname,
                        @RequestParam(required = false) String password,
                        @RequestParam(required = false) Boolean isAccountNonLocked,
                        @RequestParam(required = false) Boolean isAccountNonExpired,
                        @RequestParam(required = false) Boolean isCredentialsNonExpired,
                        @RequestParam(required = false) Boolean enabled) throws Exception{
        userService.updateUserByUsername(username,firstName, lastName, email, Uname ,password, isAccountNonLocked, isAccountNonExpired, isCredentialsNonExpired, enabled);
    }





}
