package com.MichaelRichards.FriendShare.APIResponses.Exception;

public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException(Long id) {
        super("Post " + id + " Not Found");
    }
}
