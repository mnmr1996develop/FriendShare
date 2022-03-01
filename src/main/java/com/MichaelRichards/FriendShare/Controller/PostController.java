package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
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


    @PostMapping("/{username}/post")
    public ResponseEntity<Post> addPostToUser(@PathVariable String username, @RequestBody TextNode status){
        return ResponseEntity.ok().body(userPostService.addPost(username , status.asText()));
    }


    @PostMapping("{username}/post/{id}/like")
    public ResponseEntity<Post> addUserLike(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.likePost(username, id));
    }


    @DeleteMapping("{username}/post/{id}/like")
    public ResponseEntity<Post> removeUserLike(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.unlikePost(username, id));
    }

    @GetMapping("{username}/posts")
    public ResponseEntity<List<Post>> getUsersPost(@PathVariable String username){
        return ResponseEntity.ok().body(userPostService.getUsersPost(username));
    }

    @GetMapping("{username}/posts/{id}")
    public ResponseEntity<Post> getUsersPost(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.findUserPostById(username, id));
    }

    @DeleteMapping("{username}/posts/{id}")
    public ResponseEntity<String> deleteUsersPost(@PathVariable String username, @PathVariable Long id){
        userPostService.deletePostById(username, id);
        return ResponseEntity.ok().body("Deleted post with id " + id);
    }

}
