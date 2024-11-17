package com.quitqecom.request;

import lombok.Data;

@Data
public class SignUpRequest {

	private String email;
	private String username;
	private String fullName;

	private String password;

	private String mobile;

}
