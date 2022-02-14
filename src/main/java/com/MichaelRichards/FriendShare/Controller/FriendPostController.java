package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/friends/posts")
public class FriendPostController {

    @Autowired
    private UserService userService;

    @GetMapping("{username}")
    public ResponseEntity<List<Post>> friendsPost(@PathVariable String username){
        return ResponseEntity.ok().body(userService.findFriendPosts(username));
    }

}
