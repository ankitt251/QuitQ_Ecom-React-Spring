package com.quitqecom.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.model.Cart;
import com.quitqecom.model.User;
import com.quitqecom.repository.CartRepository;
import com.quitqecom.repository.UserRepository;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.request.SignUpRequest;
import com.quitqecom.response.AuthResponse;

class AuthServiceImplTest {

	@InjectMocks
	private AuthServiceImpl authService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private JwtProvider jwtProvider;

	@Mock
	private CartRepository cartRepository;

	@Mock
	private CustomUserServiceImpl customUserServiceImpl;

	private SignUpRequest signUpRequest;
	private LoginRequest loginRequest;
	private User user;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		// Initialize test data
		signUpRequest = new SignUpRequest();
		signUpRequest.setEmail("test@example.com");
		signUpRequest.setUsername("TestUser");
		signUpRequest.setPassword("password123");

		loginRequest = new LoginRequest();
		loginRequest.setEmail("test@example.com");
		loginRequest.setPassword("password123");

		user = new User();
		user.setId(1L);
		user.setEmail("test@example.com");
		user.setUsername("TestUser");
		user.setPassword("encodedPassword");
		user.setRole(USER_ROLE.ROLE_CUSTOMER);
		user.setCreatedAt(LocalDateTime.now());
	}

	@Test
	void testCreateUser_NewUser() {
		// Arrange
		when(userRepository.findByEmail(signUpRequest.getEmail())).thenReturn(null);
		when(passwordEncoder.encode(signUpRequest.getPassword())).thenReturn("encodedPassword");
		when(userRepository.save(any(User.class))).thenReturn(user);
		when(jwtProvider.generateToken(any(Authentication.class))).thenReturn("jwtToken");

		// Act
		String jwtToken = authService.createUser(signUpRequest);

		// Assert
		assertNotNull(jwtToken, "JWT token should not be null");
		verify(userRepository, times(1)).save(any(User.class));
		verify(cartRepository, times(1)).save(any(Cart.class));
	}

	@Test
	void testCreateUser_ExistingUser() {
		// Arrange
		when(userRepository.findByEmail(signUpRequest.getEmail())).thenReturn(user);
		when(jwtProvider.generateToken(any(Authentication.class))).thenReturn("jwtToken");

		// Act
		String jwtToken = authService.createUser(signUpRequest);

		// Assert
		assertNotNull(jwtToken, "JWT token should not be null");
		verify(userRepository, never()).save(any(User.class));
		verify(cartRepository, never()).save(any(Cart.class));
	}

	@Test
	void testLoginUser_SuccessfulLogin() {
		// Arrange
		when(customUserServiceImpl.loadUserByUsername(loginRequest.getEmail()))
				.thenReturn(new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
						Collections.singletonList(new SimpleGrantedAuthority("ROLE_CUSTOMER"))));
		when(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())).thenReturn(true);
		when(jwtProvider.generateToken(any(Authentication.class))).thenReturn("jwtToken");

		// Act
		AuthResponse authResponse = authService.loginUser(loginRequest);

		// Assert
		assertNotNull(authResponse, "AuthResponse should not be null");
		assertEquals("jwtToken", authResponse.getJwt(), "JWT token mismatch");
		assertEquals(USER_ROLE.ROLE_CUSTOMER, authResponse.getRole(), "Role mismatch");
		assertEquals("Login successful!", authResponse.getMessage(), "Message mismatch");
	}

	@Test
	void testLoginUser_InvalidPassword() {
		// Arrange
		when(customUserServiceImpl.loadUserByUsername(loginRequest.getEmail()))
				.thenReturn(new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
						Collections.singletonList(new SimpleGrantedAuthority("ROLE_CUSTOMER"))));
		when(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())).thenReturn(false);

		// Act & Assert
		assertThrows(BadCredentialsException.class, () -> authService.loginUser(loginRequest),
				"Invalid password should throw BadCredentialsException");
	}

	@Test
	void testLoginUser_UserNotFound() {
		// Arrange
		when(customUserServiceImpl.loadUserByUsername(loginRequest.getEmail())).thenReturn(null);

		// Act & Assert
		assertThrows(BadCredentialsException.class, () -> authService.loginUser(loginRequest),
				"Non-existent user should throw BadCredentialsException");
	}
}
