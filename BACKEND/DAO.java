package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DAO {

    @Autowired
    private UserInterface repo; // Repository for User


    // --- User management methods ---
    public User insertUser(User user) {
        return repo.save(user);
    }

    public String addUser(User user) {
        if (repo.findByEmail(user.getEmail()) != null) {
            return "Error: User with email " + user.getEmail() + " already exists.";
        }
        repo.save(user);
        return "User added successfully: " + user.getEmail();
    }

    public List<User> retrieveAll() {
        return repo.findAll();
    }

    public User findUser(String email) {
        return repo.findByEmail(email);
    }

    public String deleteUser(String email) {
        repo.delete(findUser(email));
        return "Deleted " + email;
    }

    public String updateUser(User user) {
        deleteUser(user.getEmail());
        insertUser(user);
        return "Updated " + user.getEmail();
    }

    // --- Assignment management methods ---

    
}
