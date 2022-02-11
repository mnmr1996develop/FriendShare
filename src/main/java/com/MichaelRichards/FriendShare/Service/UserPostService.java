package com.MichaelRichards.FriendShare.Service;

import com.MichaelRichards.FriendShare.APIResponses.Exception.PostNotFoundException;
import com.MichaelRichards.FriendShare.APIResponses.Exception.UsernameNotFoundException;
import com.MichaelRichards.FriendShare.DAO.PostRepository;
import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Post findPostById(Long id){
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
        return post;
    }


    public void deletePostById(String username, Long id) {
        User user = findUserByUsername(username);
        user.deletePost(id);
        Post post = findPostById(id);
        postRepository.delete(post);
    }
}
