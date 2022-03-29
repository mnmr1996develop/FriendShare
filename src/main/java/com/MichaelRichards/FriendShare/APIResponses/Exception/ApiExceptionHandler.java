package com.MichaelRichards.FriendShare.APIResponses.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import javax.validation.ConstraintViolationException;
import java.time.ZoneId;
import java.time.ZonedDateTime;


@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {UsernameNotFoundException.class})
    public ResponseEntity<Object> handleApiRequestException(UsernameNotFoundException exception){
        HttpStatus notFound = HttpStatus.NOT_FOUND;
        ApiException apiException=  new ApiException(
                notFound,
                exception.getMessage(),
                "USER_NOT_FOUND",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );
        return new ResponseEntity<>(apiException, notFound);
    }

    @ExceptionHandler(value = {EmailTakenException.class})
    public ResponseEntity<Object> handleApiRequestException(EmailTakenException exception){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                "EMAIL_TAKEN",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(value = {UsernameTakenException.class})
    public ResponseEntity<Object> handleApiRequestException(UsernameTakenException exception){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                "USER_TAKEN",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(value = {LoginNotMatchException.class})
    public ResponseEntity<Object> handleApiRequestException(LoginNotMatchException exception){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                "BAD_LOGIN_DATA",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleApiRequestException(ConstraintViolationException exception){

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                "CONSTRAINT_VIOLATION",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(value = {PostNotFoundException.class})
    public ResponseEntity<Object> handleApiRequestException(PostNotFoundException exception){
        HttpStatus notFound = HttpStatus.NOT_FOUND;
        ApiException apiException=  new ApiException(
                notFound,
                exception.getMessage(),
                "POST_NOT_FOUND",
                ZonedDateTime.now(ZoneId.of("UTC"))
        );
        return new ResponseEntity<>(apiException, notFound);
    }
}