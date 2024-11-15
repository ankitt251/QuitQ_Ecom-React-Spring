package com.quitqecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.exception.UserException;
import com.quitqecom.repository.UserRepository;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.request.SignUpRequest;
import com.quitqecom.response.AuthResponse;
import com.quitqecom.service.AuthService;
import com.quitqecom.serviceimpl.CustomUserServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthService authService;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomUserServiceImpl userServiceImpl;

	@PostMapping("/createUser")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest req) throws UserException {

		String jwt = authService.createUser(req);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setJwt(jwt);
		authResponse.setMessage("Register successful!");
		authResponse.setRole(USER_ROLE.CUSTOMER);
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) throws UserException {
		AuthResponse authResponse = authService.loginUser(loginRequest);
		return ResponseEntity.ok(authResponse);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = userServiceImpl.loadUserByUsername(username);

		if (userDetails == null) {
			throw new BadCredentialsException("Invalid Username.....");
		}

		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password.....");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
}
