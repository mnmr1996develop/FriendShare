package com.MichaelRichards.FriendShare.Controller;

import com.MichaelRichards.FriendShare.Entity.Comment;
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

    @GetMapping("{id}")
    public ResponseEntity<Post> getByID(@PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.findPostById(id));
    }


    @PostMapping("/{username}/post")
    public ResponseEntity<Post> addPostToUser(@PathVariable String username, @RequestBody TextNode status){
        return ResponseEntity.ok().body(userPostService.addPost(username , status.asText()));
    }

    @PostMapping("/{username}/postImage")
    public ResponseEntity<Post> addPostToUserWithImage(@PathVariable String username, @RequestBody TextNode status, @RequestParam String imageLink){
        return ResponseEntity.ok().body(userPostService.addPostWithImage(username , status.asText(), imageLink));
    }


    @PostMapping("{username}/post/{id}/like")
    public ResponseEntity<Post> addUserLike(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.likePost(username, id));
    }


    @DeleteMapping("{username}/post/{id}/like")
    public ResponseEntity<Post> removeUserLike(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.unlikePost(username, id));
    }

    @DeleteMapping("{username}/comment/{id}/like")
    public ResponseEntity<Comment> removeUserLikeComment(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.unlikeComment(username, id));
    }

    @PostMapping("{postId}/comment/{username}")
    public ResponseEntity<Comment> addUserComment(@PathVariable Long postId, @PathVariable String username, @RequestBody TextNode textNode){
        return ResponseEntity.ok().body(userPostService.commentOnPost(postId, username, textNode.asText()));
    }

    @PostMapping("{username}/comment/{id}/like")
    public ResponseEntity<Comment> addUserLikeComment(@PathVariable String username, @PathVariable Long id){
        return ResponseEntity.ok().body(userPostService.likeComment(username, id));
    }

    @GetMapping("{postId}/post/commentsPaged")
    public ResponseEntity<List<Comment>> getPostCommentsPage(@PathVariable Long postId, @RequestParam Integer pageNumber){
        return ResponseEntity.ok().body(userPostService.getPagedComments(postId, pageNumber));
    }

    @GetMapping("{postId}/post/getAllComments")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long postId){
        return ResponseEntity.ok().body(userPostService.getPostComments(postId));
    }


    @DeleteMapping("{username}/comment/{commentId}")
    public ResponseEntity<Post> deleteUserComment(@PathVariable String username, @PathVariable Long commentId){
        return ResponseEntity.ok().body(userPostService.removeCommentOnPost(username, commentId));
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
