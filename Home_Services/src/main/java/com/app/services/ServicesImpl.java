package com.app.services;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.IImageRepository;
import com.app.dao.IServiceRepository;
import com.app.pojos.HomeService;
import com.app.pojos.Images;

@org.springframework.stereotype.Service
@Transactional
public class ServicesImpl implements IServices {
@Autowired
private IImageRepository imgRepo;
@Autowired
private IServiceRepository servicerepo;
	@Override
	public HomeService addNewService(HomeService service) {
		// TODO Auto-generated method stub
		System.out.println("in serice repo "+service);
		return servicerepo.save(service);

	}
	@Override
	public List<HomeService> showAllServices() {
		// TODO Auto-generated method stub
		return servicerepo.findAll();
	}
	@Override
	public HomeService getServiceDetails(long serid) {
		// TODO Auto-generated method stub
		return servicerepo.findById(serid).orElseThrow();
	}
	@Override
	public HomeService updateService(HomeService service,long serid) {
		HomeService updateService=new HomeService();
		//service.setId(serid);
		updateService=servicerepo.findById(serid).orElseThrow();
		updateService.setServiceName(service.getServiceName());
		updateService.setShortDesc(service.getShortDesc());
		updateService.setLongDesc(service.getLongDesc());
		updateService.setServiceCharge(service.getServiceCharge());
		updateService.setServiceTax(service.getServiceTax());
		System.out.println("in update service repo "+updateService+"id of service "+serid);
		return servicerepo.save(updateService);
	}
	@Override
	public String removeService(long serid) {
		String msg="Deletion failed!! Try Again";
		if(servicerepo.existsById(serid)) {
			servicerepo.deleteById(serid);
			msg="Deletion of service Successfull!!";
		}
		return msg;
	}

	@Override
	public HomeService addImage(long serid, MultipartFile file) {

		Images img=  new Images();
		try {
			img.setImpSize(file.getBytes());
			img.setType(file.getContentType());
			img.setName(file.getOriginalFilename());
			System.out.println("in add image "+img);
			imgRepo.save(img);
			
		}catch (Exception e) {
			System.out.println("Invalid image process "+e.getMessage());
		}
		HomeService service = servicerepo.findById(serid).orElseThrow();
		service.setServiceImage(img);
		return servicerepo.save(service);
	}
	@Override
	public List<String> getAllSreviceName() {
		// TODO Auto-generated method stub
		
		return servicerepo.findAllServiceName();
	}

}
