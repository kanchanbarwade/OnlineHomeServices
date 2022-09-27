package com.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IFeedbackRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Feedback;
import com.app.pojos.User;
import com.app.utils.MailUtility;

@Service
@Transactional
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private IFeedbackRepository feedbackRepo;

	@Override
	public User addNewUser(User user) {
		User newUser=userRepo.save(user);
		/*
		 * code for mail sending on behalf of registration
		 */
		String message="Congratulations!!! \n You have successfully registered for Online Home Services.";
		message+="\nYour account details are : \nUsername: "+newUser.getEmail()+"\nPassword: "+newUser.getPassword();
		message+="\nDo not share credentials with anyone.\nThank You.";
		String subject="Registration Details for Online Home Services ";//+service.getServiceName()+" , order id is : "+order.getId();
		String to=newUser.getEmail();
		//String to="kanchan.barwade@gmail.com";
		String from="onlinehomeservices.2022@gmail.com";
		MailUtility.sendEmail(message, subject, to, from);
		return newUser;
	}
	
	//public Address processAddress(Address address,long id) {
		
	//	return userRepo.save(address);
	//}
	
	@Override
	public User authenticateUser(String email, String pass) {
		
		Optional<User> optional = userRepo.findByEmailAndPassword(email, pass);
		
		return optional.orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
		//return optional or if error is present go in custom exception package and give message
	}

	@Override
	public User getUser(long custid) {
		
		return userRepo.findById(custid).orElseThrow(()->new ResourceNotFoundException("Invalid ID"));
	}

	@Override
	public User updateUser(User user, long custid) {
		user.setId(custid);
		userRepo.findById(custid).orElseThrow(()->new ResourceNotFoundException("Invalid ID"));
		
		return userRepo.save(user);
	}

	@Override
	public Feedback addNewFeedback(Feedback feedback) {
		return feedbackRepo.save(feedback);
	}

	@Override
	public User sendPassword(String userName) {
		User oldUser=userRepo.findByEmail(userName).orElseThrow();
		
		System.out.println("Old user details for forget pwd : "+oldUser);
		/*
		 * code for mail sending on behalf of registration
		 */
		String message="\nYour account details are : \nUsername: "+oldUser.getEmail()+"\nPassword: "+oldUser.getPassword();
		message+="\nDo not share credentials with anyone.\nThank You.";
		String subject="Login Details for Online Home Services ";
		String to=oldUser.getEmail();
		String from="onlinehomeservices.2022@gmail.com";
		MailUtility.sendEmail(message, subject, to, from);
		//return newUser;
		return oldUser;
	}

}
