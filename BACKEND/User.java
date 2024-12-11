package com.example.demo;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;

@Entity
public class User {
	
	String name;
	int role;
	@Id
	String email;
	String password;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [name=" + name + ", role=" + role + ", email=" + email + ", password=" + password + "]";
	}
	public Object getId() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	

}
