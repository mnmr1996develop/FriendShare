package com.MichaelRichards.FriendShare.Service;

import com.MichaelRichards.FriendShare.DAO.UserRepository;
import com.MichaelRichards.FriendShare.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;


@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)  {
        User user =userRepository.findByUsername(username).orElse(null);

        return user;
    }

    public List<User> findAll(){
        List<User> users = userRepository.findAll();
        if (users.isEmpty()){
            return new ArrayList<>();
        }
        else return users;
    }

    public User findUserByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public User findById(Long id){
        return  userRepository.findById(id).orElse(null);
    }

}
