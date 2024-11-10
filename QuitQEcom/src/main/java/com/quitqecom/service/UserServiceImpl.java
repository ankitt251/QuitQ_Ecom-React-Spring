package com.quitqecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;
import com.quitqecom.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserByEmail(String email) throws UserException {

		User user = userRepository.findByEmail(email);

		if (user != null) {
			return user;
		}
		throw new UserException("User not found with email-" + email);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);

		User user = userRepository.findByEmail(email);

		if (user != null) {
			return user;
		}

		throw new UserException("User not found with email-" + email);
	}

}
