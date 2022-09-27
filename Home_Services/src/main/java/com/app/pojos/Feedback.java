package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity

@Table(name = "feedback_tb")
public class Feedback extends BaseEntity {

	@Column(length = 20)
	private String firstName;
	@Column(length = 20)
	private String lastName;
	@Column(length = 30)
	private String emailId;
	@Column(length = 30)
	private String title;
	@Column(length = 300)
	private String message;



}

