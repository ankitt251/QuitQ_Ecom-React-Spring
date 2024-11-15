package com.quitqecom.exception;

import java.time.LocalDateTime;

public class ErrorDetails {

	LocalDateTime timestamp;
	String message;
	String path;

	public ErrorDetails(LocalDateTime timestamp, String message, String path) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.path = path;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public String getMessage() {
		return message;
	}

	public String getPath() {
		return path;
	}

}
