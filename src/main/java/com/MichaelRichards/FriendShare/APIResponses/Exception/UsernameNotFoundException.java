package com.MichaelRichards.FriendShare.APIResponses.Exception;

public class UsernameNotFoundException extends RuntimeException{
    public UsernameNotFoundException(String username) {
        super("User " + username + " Not Found");
    }
}
