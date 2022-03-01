package com.MichaelRichards.FriendShare.Controller;


import com.MichaelRichards.FriendShare.Entity.User;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("api/users")
public class UserAPIController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.status(HttpStatus.OK).body((new ArrayList<>(userService.findAll())));
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) throws Exception{
        return  ResponseEntity.status(HttpStatus.OK).body(userService.findUserByUsername(username));
    }


    @DeleteMapping(path= "{username}")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) throws Exception{
        return ResponseEntity.ok().body(username);
    }

    @PutMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username,
                        @RequestParam(required = false) String firstName,
                        @RequestParam(required = false) String lastName,
                        @RequestParam(required = false) String email,
                        @RequestParam(required = false) String Uname,
                        @RequestParam(required = false) String password,
                        @RequestParam(required = false) Boolean isAccountNonLocked,
                        @RequestParam(required = false) Boolean isAccountNonExpired,
                        @RequestParam(required = false) Boolean isCredentialsNonExpired,
                        @RequestParam(required = false) Boolean enabled) throws Exception{
        User user = userService.updateUserByUsername(username,firstName, lastName, email, Uname ,password, isAccountNonLocked, isAccountNonExpired, isCredentialsNonExpired, enabled);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/{keyword}/search")
    public ResponseEntity<List<User>> findUsers(@PathVariable String keyword){
        return ResponseEntity.ok().body(userService.searchUsers(keyword));
    }

    @PostMapping("{username}/friends/add")
    public ResponseEntity<List<User>> addFriend( @PathVariable("username") String username, @RequestParam String friend) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friends/add").toUriString());
        return ResponseEntity.ok().body(userService.addFriend(username, friend));
    }

    @GetMapping("{username}/friends")
    public ResponseEntity<List<User>> getFriends(@PathVariable("username") String username) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friends/").toUriString());
        return ResponseEntity.ok().body(userService.findUserByUsername(username).getFriends());
    }

    @PostMapping("{username}/friendRequest")
    public ResponseEntity<List<User>> sendFriendRequest( @PathVariable("username") String username, @RequestParam String friend) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friendRequest").toUriString());
        return ResponseEntity.ok().body(userService.sendRequest(username, friend));
    }

    @GetMapping("{username}/friendRequest")
    public ResponseEntity<List<User>> getFriendRequest(@PathVariable("username") String username) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friendRequest").toUriString());
        return ResponseEntity.ok().body(new ArrayList<>(userService.findUserByUsername(username).getRequest()));
    }

    @DeleteMapping("{username}/friendRequest")
    public ResponseEntity<List<User>> deleteFriendRequest(@PathVariable("username") String username , @RequestParam String friend) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friendRequest").toUriString());
        return ResponseEntity.ok().body(new ArrayList<>(userService.deleteRequest(username, friend)));
    }



    @GetMapping("{username}/sentFriendRequest")
    public ResponseEntity<List<User>> getSentFriendRequest(@PathVariable("username") String username) throws Exception{
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/friends").toUriString());
        return ResponseEntity.ok().body(new ArrayList<>(userService.findUserByUsername(username).getSentFriendRequest()));
    }






}

