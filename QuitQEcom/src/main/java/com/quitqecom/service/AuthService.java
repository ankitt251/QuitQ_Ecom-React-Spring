package com.quitqecom.service;

import com.quitqecom.request.LoginRequest;
import com.quitqecom.request.SignUpRequest;
import com.quitqecom.response.AuthResponse;

public interface AuthService {

	String createUser(SignUpRequest signUpRequest);

	AuthResponse loginUser(LoginRequest loginRequest);

}
