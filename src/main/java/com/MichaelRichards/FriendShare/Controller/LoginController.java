package com.MichaelRichards.FriendShare.Controller;


import com.MichaelRichards.FriendShare.Entity.User;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("api/Login")
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> getLogin(@RequestParam String username, @RequestParam String password ) throws Exception{
         return  ResponseEntity.status(HttpStatus.OK).body(userService.login(username,password));
    }
}
