package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Employees;
import com.app.pojos.HomeService;

public interface IServiceRepository extends JpaRepository<HomeService, Long> {
	Optional<HomeService> findByServiceName(String serviceName);

	@Query(value = "select service_name from service_tb ",nativeQuery = true)
	List<String> findAllServiceName();
}
