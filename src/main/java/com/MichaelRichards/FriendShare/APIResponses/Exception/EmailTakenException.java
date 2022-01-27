package com.MichaelRichards.FriendShare.APIResponses.Exception;

public class EmailTakenException extends RuntimeException{
    public EmailTakenException(String email) {
        super("Email " + email + " Taken");
    }
}