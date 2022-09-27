package com.app.utils;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailUtility {
	
	public static void sendEmail(String message, String subject, String to, String from) {
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
		
	}

}
