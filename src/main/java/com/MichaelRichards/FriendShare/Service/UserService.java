package com.MichaelRichards.FriendShare.Service;

import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;



import java.util.UUID;

public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)  {
        User user =userRepository.findByUsername(username).orElse(null);

        return user;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public User findById(UUID uuid){
        return  userRepository.findById(uuid).orElse(null);
    }

}
