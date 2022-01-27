package com.MichaelRichards.FriendShare.APIResponses.Exception;

public class UsernameTakenException extends RuntimeException{
    public UsernameTakenException(String username) {
        super("Username " + username + " Taken");
    }
}
