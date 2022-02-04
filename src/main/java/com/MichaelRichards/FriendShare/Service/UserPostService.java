package com.MichaelRichards.FriendShare.Service;

import com.MichaelRichards.FriendShare.APIResponses.Exception.UsernameNotFoundException;
import com.MichaelRichards.FriendShare.DAO.PostRepository;
import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.Post;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

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


}
