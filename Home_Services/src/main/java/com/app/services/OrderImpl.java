package com.app.services;

import java.util.List;
import java.util.Properties;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dao.IEmployeeRepository;
import com.app.dao.IOrderRepository;
import com.app.dao.IServiceRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Employees;
import com.app.pojos.HomeService;
import com.app.pojos.Orders;
import com.app.pojos.User;
import com.app.utils.MailUtility;

@Service
@Transactional
public class OrderImpl implements IOrderService {

	@Autowired
	private IOrderRepository orderRepo;
	@Autowired
	private IEmployeeRepository empRepo;
	@Autowired
	private IEmpService empService;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private IServiceRepository serviceRepo;

	@Override
	public List<Orders> getAllOrders() {

		return orderRepo.findAll();
	}

	@Override
	//public Orders update(Orders order, long ordid) {
	public Orders update(long ordid) {
		//order.setId(ordid);
		Orders order1 = orderRepo.findById(ordid).orElseThrow() ;
		order1.setStatus("Completed");
		System.out.println("orders"+order1);
		long empid = orderRepo.findByEmpId(ordid);
		System.out.println("EMP id"+empid);
		Employees emp = empRepo.findById(empid).orElseThrow();
		System.out.println("emp status "+emp.getEmpStatus());
		emp.setEmpStatus("FREE");
		System.out.println("emp status "+emp.getEmpStatus());
		return orderRepo.save(order1);
	}

	@Override
	public List<Orders> findAllByStatus() {

		return orderRepo.findAllByStatus("pending");
	}

	@Override
	public List<Orders> findByStatus() {

		return orderRepo.findByStatus("Completed");
	}

	@Override
	//public Orders placeOrder(Orders order, long custid, long serid) {
	public Orders placeOrder(long custid, long serid) {
		Orders order=new Orders();
		System.out.println("Order "+order);
		User user = userRepo.findById(custid).orElseThrow();
		HomeService service = serviceRepo.findById(serid).orElseThrow();

		order.setUser(user);
		System.out.println("cust called");
		order.setService(service);
		System.out.println("service called");
		Employees emp = empRepo.findByServiceId(serid);
		System.out.println("in employee details "+emp);
		System.out.println(" emp status "+ emp.getEmpStatus());
		order.setEmp( emp);
		emp.setEmpStatus("WORKING");
		System.out.println(" emp status "+ emp.getEmpStatus());
		order=orderRepo.save(order);
		/*
		 * code for mail sending on behalf of order placed
		 */
		String message="Congratulations!!! \n You have placed an order for service "+service.getServiceName()+" and order id is : "+order.getId()+"\n.You will receive details of schedule very soon.\nThank you.";
		String subject="Order Placed for the service : "+service.getServiceName()+" , order id is : "+order.getId();
		String to=user.getEmail();
		//String to="kanchan.barwade@gmail.com";
		String from="onlinehomeservices.2022@gmail.com";
		MailUtility.sendEmail(message, subject, to, from);
		
		return order;
	}

	@Override
	public Orders getOrder(long ordid) {
		Orders ord1 = orderRepo.findById(ordid).orElseThrow();
		//return orderRepo.save(ord1);
		return ord1;
	}

	@Override
	public List<Orders> getOrders(long custid) {
		User user1 = userRepo.findById(custid).orElseThrow(()-> new ResourceNotFoundException("Invalid User"));
		System.out.println("user deatils "+user1);
		List<Orders> orderList = orderRepo.findByUserId(custid);
		System.out.println("cust order"+orderList);
		return orderList;
	}


	
}
