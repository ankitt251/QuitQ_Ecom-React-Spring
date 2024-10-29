package com.quitqecom.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;
import com.quitqecom.repository.UserRepository;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.response.AuthResponse;
import com.quitqecom.service.UserServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;

	private JwtProvider jwtProvider;

	private PasswordEncoder passwordEncoder;

	private UserServiceImpl userServiceImpl;

	public AuthController(UserRepository userRepository, UserServiceImpl userServiceImpl,
			PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
		this.userServiceImpl = userServiceImpl;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping("/signup")
	@Transactional
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
		try {
			String email = user.getEmail();
			String password = user.getPassword();
			String firstName = user.getFirstName();
			String lastName = user.getLastName();

			System.out.println("Received Signup Request: " + email);

			// Check if the email already exists
			User isEmailExist = userRepository.findByEmail(email);
			if (isEmailExist != null) {
				System.out.println("User already exists with email: " + email);
				throw new UserException("User already exists");
			}

			// Create and save a new user
			User createdUser = new User();
			createdUser.setEmail(email);
			createdUser.setPassword(passwordEncoder.encode(password));
			createdUser.setFirstName(firstName);
			createdUser.setLastName(lastName);

			System.out.println("Attempting to save user to the database.");
			User savedUser = userRepository.save(createdUser);
			System.out.println("User successfully saved with ID: " + savedUser.getId());

			// Set authentication for the new user
			Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
					savedUser.getPassword());
			SecurityContextHolder.getContext().setAuthentication(authentication);

			// Generate a JWT token
			String token = jwtProvider.generateToken(authentication);
			System.out.println("JWT Token generated: " + token);

			// Return response with status CREATED
			AuthResponse authResponse = new AuthResponse();
			authResponse.setJwt(token);
			authResponse.setMessage("SignUp Success");

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);

		} catch (UserException e) {
			System.err.println("UserException: " + e.getMessage());
			return new ResponseEntity<>(new AuthResponse(null, e.getMessage()), HttpStatus.BAD_REQUEST);

		} catch (Exception e) {
			e.printStackTrace(); // Print stack trace for any other unexpected errors
			System.err.println("Unexpected error occurred during signup.");
			return new ResponseEntity<>(new AuthResponse(null, "Signup failed due to an internal error"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("SignIn Success");
		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);

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
