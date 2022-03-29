package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/friends")
public class FriendPostController {

    @Autowired
    private UserService userService;

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> friendsPost(@RequestParam String username, @RequestParam int pageNumber){
        HttpHeaders headers = new HttpHeaders();
        headers.add("count", userService.getFriendsPostCount(username).toString());


        return ResponseEntity.ok().headers(headers).body(userService.getFriendsPost(username, pageNumber));
    }

}
