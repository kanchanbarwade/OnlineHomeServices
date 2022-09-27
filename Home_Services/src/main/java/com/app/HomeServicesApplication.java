package com.app;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HomeServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeServicesApplication.class, args);
		
		/*
		 * Mail test code
		 * System.out.println("Mail");//iotgvtkupdzgzdva
		String message="Congratulation, You have created account successfully.\n This is test email sent by @developer:";
		String subject="Account credentials : Online Home Services";
		//String to="kanchan.barwade@gmail.com";
		String to="kamakshapuri07@gmail.com";
		String from="onlinehomeservices.2022@gmail.com";
		
		sendEmail(message,subject,to,from);*/
	}

	/*private static void sendEmail(String message, String subject, String to, String from) {
		String host="smtp.gmail.com";
		Properties properties=System.getProperties();
		System.out.println("PROPERTIES "+properties);
		
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", "465");
		properties.put("mail.smtp.ssl.enable", "true");
		properties.put("mail.smtp.auth", "true");
		
		Session session=Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				// TODO Auto-generated method stub
				return new PasswordAuthentication(from, "iotgvtkupdzgzdva");
			}
			
		});
		
		session.setDebug(true);
		MimeMessage msg=new MimeMessage(session);
		
		try {
			
			msg.setFrom(from);
			
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			msg.setSubject(subject);
			msg.setText(message);
			Transport.send(msg);
			System.out.println("Sent success....");
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}*/

}
