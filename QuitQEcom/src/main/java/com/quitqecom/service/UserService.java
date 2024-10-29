package com.quitqecom.service;

import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;

public interface UserService {

	public User findUserById(Long userId) throws UserException;

	public User findUserProfileByJwt(String jwt) throws UserException;

}
