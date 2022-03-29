package com.MichaelRichards.FriendShare.Service;

import com.MichaelRichards.FriendShare.APIResponses.Exception.PostNotFoundException;
import com.MichaelRichards.FriendShare.APIResponses.Exception.UsernameNotFoundException;
import com.MichaelRichards.FriendShare.DAO.CommentRepository;
import com.MichaelRichards.FriendShare.DAO.PostRepository;
import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.Comment;
import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class UserPostService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(
                () ->
                        new UsernameNotFoundException(username)
        );
    }


    public Post addPost(String username, String status){
        User user = findUserByUsername(username);
        Post post1 = new Post(user, status);
        user.addPost(post1);
        return postRepository.save(post1);
    }

    public Post addPostWithImage(String username, String status, String imageUrl){
        User user = findUserByUsername(username);
        Post post1 = new Post(user, status, imageUrl);
        user.addPost(post1);
        return postRepository.save(post1);
    }

    public List<Post> getUsersPost(String username){
        User user = findUserByUsername(username);
        List<Post> posts = user.getPosts();
        return posts;
    }

    public Post findUserPostById(String username, Long id){
        User user = findUserByUsername(username);
        List<Post> posts = user.getPosts();
        Post post = null;
        for (Post value : posts) {
            if (Objects.equals(value.getId(), id)) {
                post = value;
            }
            return post;
        }
        throw new PostNotFoundException(id);
    }

    private Comment findCommentById(Long id) {
        return commentRepository.findCommentById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    public Post findPostById(Long id){
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    }

    public void removeAllComments(Post post){
        for(Comment comment: post.getComments()){
            User user = comment.getUser();
            deleteCommentById(user.getUsername(), comment.getId());
        }
    }

    public void deleteCommentById(String username, Long id){
        User user = findUserByUsername(username);
        user.deleteComment(id);
        Comment comment = findCommentById(id);
        commentRepository.delete(comment);
    }




    public void deletePostById(String username, Long id) {
        User user = findUserByUsername(username);
        user.deletePost(id);
        Post post = findPostById(id);
        removeAllComments(post);
        postRepository.delete(post);
    }

    public Post likePost(String username, Long id) {
        Post post = findPostById(id);
        User user = findUserByUsername(username);
        if(!post.getLikes().contains(user)){
            post.addLike(user);
        }
        return post;
    }

    public Comment likeComment(String username, Long id) {
        Comment comment = findCommentById(id);
        User user = findUserByUsername(username);
        if(!comment.getLikes().contains(user)){
            comment.addLike(user);
        }
        return comment;
    }

    public Comment commentOnPost(Long id, String username, String status){
       User user = findUserByUsername(username);
       Post post = findPostById(id);
       Comment comment = new Comment(post, user, status);
       user.addComment(comment);
       post.addComment(comment);
       return commentRepository.save(comment);
    }

    public List<Comment> getPagedComments(Long id, Integer pageNumber){
        PageRequest pageRequest = PageRequest.of(pageNumber-1, 2, Sort.by("localDateTime").descending());
        return postRepository.getCommentsPageable(id, pageRequest);
    }


    public Post removeCommentOnPost(String username, Long commentId){
        User user = findUserByUsername(username);
        Comment comment = findCommentById(commentId);
        Post post = comment.getPost();
        post.deleteComment(comment);
        user.deleteComment(comment);
        deleteCommentById(comment.getUser().getUsername(), commentId);
        return post;
    }


    public Post unlikePost(String username, Long id){
        Post post = findPostById(id);
        User user = findUserByUsername(username);
        post.removeLike(user);
        return post;
    }

    public Comment unlikeComment(String username, Long id){
        Comment comment = findCommentById(id);
        User user = findUserByUsername(username);
        comment.removeLike(user);
        return comment;
    }


    public List<Comment> getPostComments(Long postId) {
        Post post = findPostById(postId);
        return post.getComments();
    }
}
