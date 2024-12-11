package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;
import java.util.Random;

@RestController
public class CaptchaController {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Endpoint to generate CAPTCHA
    @GetMapping("/api/captcha/generate")
    public ResponseEntity<?> generateCaptcha() throws IOException {
        // Generate random CAPTCHA text
        String captchaText = generateRandomText(6);

        // Create CAPTCHA image
        BufferedImage captchaImage = createCaptchaImage(captchaText);

        // Convert the image to Base64 string
        String captchaBase64 = convertToBase64(captchaImage);

        // Return CAPTCHA image and text (for validation)
        return ResponseEntity.ok().body(Map.of("captchaImage", captchaBase64, "captchaText", captchaText));
    }

    // Method to generate a random string for CAPTCHA text
    private String generateRandomText(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }

        return sb.toString();
    }

    // Method to create CAPTCHA image
    private BufferedImage createCaptchaImage(String text) {
        int width = 150;
        int height = 50;

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = image.createGraphics();

        // Set background color
        graphics.setColor(Color.LIGHT_GRAY);
        graphics.fillRect(0, 0, width, height);

        // Draw some noise lines
        Random random = new Random();
        graphics.setColor(Color.GRAY);
        for (int i = 0; i < 8; i++) {
            int x1 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int x2 = random.nextInt(width);
            int y2 = random.nextInt(height);
            graphics.drawLine(x1, y1, x2, y2);
        }

        // Set font and draw CAPTCHA text
        graphics.setFont(new Font("Arial", Font.BOLD, 24));
        graphics.setColor(Color.BLACK);
        graphics.drawString(text, 20, 35);

        // Dispose graphics object
        graphics.dispose();

        return image;
    }

    // Method to convert image to Base64 encoded string
    private String convertToBase64(BufferedImage image) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", byteArrayOutputStream);
        byte[] imageData = byteArrayOutputStream.toByteArray();
        return "data:image/png;base64," + Base64.getEncoder().encodeToString(imageData);
    }
}
