package com.quitqecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.exception.UserException;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.request.SignUpRequest;
import com.quitqecom.response.AuthResponse;
import com.quitqecom.service.AuthService;

@RestController
@RequestMapping("/api/user")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest req) throws UserException {

		String jwt = authService.createUser(req);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setJwt(jwt);
		authResponse.setMessage("Register successful!");
		authResponse.setRole(USER_ROLE.ROLE_CUSTOMER);
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException {
		AuthResponse authResponse = authService.loginUser(loginRequest);
		return ResponseEntity.ok(authResponse);
	}

}
