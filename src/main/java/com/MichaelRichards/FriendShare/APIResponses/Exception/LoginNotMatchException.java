package com.MichaelRichards.FriendShare.APIResponses.Exception;

public class LoginNotMatchException extends RuntimeException {
    public LoginNotMatchException(String username, String password) {
        super("Credentials Don't Match");
    }
}
