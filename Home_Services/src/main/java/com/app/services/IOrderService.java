package com.app.services;

import java.util.List;

import org.springframework.util.MultiValueMap;

import com.app.pojos.Orders;
import com.app.pojos.User;

public interface IOrderService {

	List<Orders> getAllOrders();


	//Orders update(Orders order, long ordid);
	Orders update(long ordid);

	List<Orders> findAllByStatus();

	List<Orders> findByStatus();

	//Orders placeOrder(Orders order, long custid, long serid);
	Orders placeOrder(long custid, long serid);

	Orders getOrder(long ordid);


	List<Orders> getOrders(long custid);


//	Orders assignEmp(Orders order,long ordid);




}
