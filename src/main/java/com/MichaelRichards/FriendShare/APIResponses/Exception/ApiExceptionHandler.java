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
                ZonedDateTime.now(ZoneId.of("US/Eastern"))
        );
        return new ResponseEntity<>(apiException, notFound);
    }

    @ExceptionHandler(value = {EmailTakenException.class})
    public ResponseEntity<Object> handleApiRequestException(EmailTakenException exception){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                ZonedDateTime.now(ZoneId.of("US/Eastern"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    public ResponseEntity<Object> handleApiRequestException(ConstraintViolationException exception){

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ApiException apiException=  new ApiException(
                badRequest,
                exception.getMessage(),
                ZonedDateTime.now(ZoneId.of("US/Eastern"))
        );

        return new ResponseEntity<>(apiException, badRequest);
    }

}
