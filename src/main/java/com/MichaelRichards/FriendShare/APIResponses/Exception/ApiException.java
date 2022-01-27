package com.MichaelRichards.FriendShare.APIResponses.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import java.time.ZonedDateTime;


@Getter
@AllArgsConstructor
public class ApiException {

    private final HttpStatus status;
    private final String message;
    private final ZonedDateTime timeStamp;

}