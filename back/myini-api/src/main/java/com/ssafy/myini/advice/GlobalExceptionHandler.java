package com.ssafy.myini.advice;

import com.ssafy.myini.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> errors.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(ExceptionResponse.from("잘못된 요청입니다.", errors));
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(BindException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> errors.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(ExceptionResponse.from("잘못된 요청입니다.", errors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionResponse> handleAccessDeniedExceptions(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ExceptionResponse.from("권한이 없습니다."));
    }

    @ExceptionHandler({NotMatchException.class, NotFoundException.class, DuplicateException.class, OAuthProviderNotExistException.class, ExistException.class})
    public ResponseEntity<ExceptionResponse> handleBadRequestExceptions(Exception e) {
        return ResponseEntity.badRequest().body(ExceptionResponse.from(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception e) {
        return ExceptionResponse.from(e.getMessage());
    }
}
