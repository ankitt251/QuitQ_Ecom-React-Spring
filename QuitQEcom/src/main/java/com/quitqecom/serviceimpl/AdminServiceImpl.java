package com.quitqecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;
import com.quitqecom.repository.UserRepository;
import com.quitqecom.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private UserRepository userRepository;

	@Override
	public User findAdminProfileByJwt(String jwt) throws UserException {
		String email = jwtProvider.getEmailFromToken(jwt);

		User admin = userRepository.findByEmail(email);

		if (admin != null && admin.getRole() == USER_ROLE.ROLE_ADMIN) {
			return admin;
		}

		throw new UserException("Admin not found or unauthorized access for email - " + email);
	}
}
