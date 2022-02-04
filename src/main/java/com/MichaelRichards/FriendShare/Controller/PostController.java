package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Service.UserPostService;
import com.fasterxml.jackson.databind.node.TextNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts/")
public class PostController {

    @Autowired
    private UserPostService userPostService;

    @PostMapping("/{username}/posts")
    public ResponseEntity<Post> addPostToUser(@PathVariable String username, @RequestBody TextNode status){
        return ResponseEntity.ok().body(userPostService.addPost(username , status.asText()));
    }

    @GetMapping("/{username}/posts")
    public ResponseEntity<List<Post>> getUsersPost(@PathVariable String username){
        return ResponseEntity.ok().body(userPostService.getUsersPost(username));
    }

}
