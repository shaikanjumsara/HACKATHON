package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AppController {

    @Autowired
    private DAO dao; // DAO handles user and assignment operations

    @Autowired
    private CaptchaController captchaController; // Inject CAPTCHA Controller

    // --- User management endpoints ---
    @GetMapping("/")
    public String fun1() {
        return "Welcome";
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public String fun2(@RequestBody User user) {
        return "Data inserted " + dao.insertUser(user);
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user) {
        if (dao.findUser(user.getEmail()) != null) {
            return "Error: User with email " + user.getEmail() + " already exists.";
        }
        return "User added: " + dao.insertUser(user);
    }

    @GetMapping("/all")
    public List<User> fun3() {
        return dao.retrieveAll();
    }

    @GetMapping("/email")
    public String fun4(@RequestParam("email") String email) {
        return dao.findUser(email).toString();
    }

    @DeleteMapping("/delete")
    public String fun5(@RequestParam("email") String email) {
        return dao.deleteUser(email);
    }

    @PutMapping("/update")
    public String fun6(@RequestBody() User user) {
        return dao.updateUser(user);
    }

    // Login endpoint with CAPTCHA validation
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Log the incoming data to ensure it's being passed correctly
            System.out.println("Request Data: " + loginRequest);

            // Step 1: Parse and validate CAPTCHA expiry time using DateTimeFormatter
            String expiryTime = loginRequest.getExpiryTime();
            
            // DateTimeFormatter to handle the 'Z' (UTC) at the end of the timestamp
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            
            // Parse the expiryTime and convert to LocalDateTime in UTC
            LocalDateTime expiry = LocalDateTime.parse(expiryTime, formatter.withZone(ZoneOffset.UTC));
            
            // Ensure both times are in UTC for correct comparison
            if (expiry.isBefore(LocalDateTime.now(ZoneOffset.UTC))) {
                return ResponseEntity.status(400).body("Captcha expired. Please refresh and try again.");
            }

            // Step 2: Validate CAPTCHA text
            if (!loginRequest.getCaptchaText().equals(loginRequest.getCaptcha())) {
                return ResponseEntity.status(400).body("Invalid CAPTCHA");
            }

            // Step 3: Validate user credentials
            User foundUser = dao.findUser(loginRequest.getEmail());
            if (foundUser != null && foundUser.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(foundUser);  // Return the user if credentials are correct
            }

            // Return invalid login if credentials do not match
            return ResponseEntity.status(400).body("Invalid email or password");
        } catch (Exception e) {
            // Log exception details
            e.printStackTrace();  // Or use a proper logger
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }


}
