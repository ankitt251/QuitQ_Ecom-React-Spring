package com.quitqecom.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionController {

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> handleUserException(UserException e, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), e.getMessage(),
				request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(SellerException.class)
	public ResponseEntity<ErrorDetails> handleSellerException(SellerException e, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), e.getMessage(),
				request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(ProductException.class)
	public ResponseEntity<ErrorDetails> handleProductException(ProductException e, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), e.getMessage(),
				request.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
}
