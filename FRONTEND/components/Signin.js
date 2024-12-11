import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const defaultTheme = createTheme();

export default function SignIn({ store }) {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [error, setError] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button

  // Fetch CAPTCHA when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/captcha/generate')
      .then((response) => {
        setCaptchaImage(response.data.captchaImage); // Ensure you get Base64 image here
        setCaptchaText(response.data.captchaText);

        // Set expiration time to 5 minutes from now
        const expirationTime = new Date(new Date().getTime() + 5 * 60000); // 5 minutes expiry time
        setExpiryTime(expirationTime.toISOString()); // Store as ISO string
      })
      .catch((error) => {
        console.error('Error fetching CAPTCHA:', error);
        setError('Failed to load CAPTCHA, please try again later.');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable button during submission
    const data = new FormData(event.currentTarget);

    // Validate CAPTCHA input
    if (captcha !== captchaText) {
      setError('Invalid CAPTCHA');
      setIsSubmitting(false); // Reset loading state
      return;
    }

    // Prepare the request data including 'captcha' and other required data
    const requestData = {
      email: data.get('email'),
      password: data.get('password'),
      captcha: captcha, // Send CAPTCHA entered by user for validation
      captchaText: captchaText, // Text from generated CAPTCHA
      expiryTime: expiryTime // Expiry time for CAPTCHA
    };

    // Log request data to ensure it's correct
    console.log('Request Data:', requestData);

    // Send the login request with the JSON body
    axios.post("http://localhost:8080/login", requestData, {
      headers: {
        'Content-Type': 'application/json', // Ensure the backend understands the data format
      },
    })
      .then((res) => {
        console.log('Login Response:', res.data);
        if (res.status === 200) {
          // If login was successful
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", res.data.role);
          store.dispatch({ "type": "page", "data": "Home" }); // Calling the reducer to update page
          navigate('/home');  // Redirect to the home page
        }
      }).catch((err) => {
        console.error('Login failed:', err.response);

        // Log the full error response for better debugging
        console.error('Error response:', err.response);

        // Handle error messages from the response
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Login failed. Please try again.');
        } else {
          setError('Login failed. Please try again.');
        }
      }).finally(() => {
        setIsSubmitting(false); // Reset loading state after request
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {/* CAPTCHA image and input field */}
            <div>
              <img src={captchaImage} alt="CAPTCHA" style={{ width: '100%' }} />
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="captcha"
              label="Enter CAPTCHA"
              name="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)} // Update the entered CAPTCHA value
            />

            {/* Display error message if CAPTCHA or login fails */}
            {error && <Typography color="error">{error}</Typography>}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
