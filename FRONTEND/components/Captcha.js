import React, { useState } from "react";
import axios from "axios";

function Captcha() {
    const [captchaImage, setCaptchaImage] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [message, setMessage] = useState("");

    const fetchCaptcha = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/captcha/generate");
            setCaptchaImage(response.data.image);
        } catch (error) {
            console.error("Error fetching captcha", error);
        }
    };

    const validateCaptcha = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/captcha/validate", {
                captcha: captchaInput,
            });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data || "Captcha validation failed");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>React & Spring Boot CAPTCHA</h1>
            {captchaImage ? (
                <div>
                    <img src={captchaImage} alt="Captcha" />
                    <div>
                        <input
                            type="text"
                            placeholder="Enter captcha"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                        />
                        <button onClick={validateCaptcha}>Submit</button>
                    </div>
                </div>
            ) : (
                <button onClick={fetchCaptcha}>Generate Captcha</button>
            )}
            <p>{message}</p>
        </div>
    );
}

export default Captcha;
