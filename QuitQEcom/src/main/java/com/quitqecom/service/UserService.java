package com.quitqecom.service;

import java.util.List;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;

public interface UserService {

	// public User findUserById(Long userId) throws UserException;

	public User findUserProfileByJwt(String jwt) throws UserException;

	public User findUserByEmail(String email) throws UserException;

	User updateUserAccountStatus(Long id, AccountStatus status) throws UserException;

	List<User> getAllUsers();

}
