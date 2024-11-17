package com.quitqecom.service;

import com.quitqecom.exception.UserException;
import com.quitqecom.model.User;

public interface AdminService {
	User findAdminProfileByJwt(String jwt) throws UserException;
}
