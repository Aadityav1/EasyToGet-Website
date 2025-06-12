import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, #a1c4fd, #c2e9fb, #a1c4fd);
  background-size: 600% 600%;
  animation: gradientAnimation 15s ease infinite;
  padding: 1rem;
  transition: background 0.3s ease;

  @keyframes gradientAnimation {
    0% {background-position:0% 50%;}
    50% {background-position:100% 50%;}
    100% {background-position:0% 50%;}
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 3rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fefefe;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeIn} 0.5s ease forwards;
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #222;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  font-size: 1.2rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.6rem 0.75rem 0.6rem 2.8rem;
  width: 100%;
  border: 1.5px solid ${props => (props.hasError ? '#e74c3c' : '#ccc')};
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    outline: none;
    border-color: #0056bff2;
    box-shadow: 0 0 8px rgba(0, 86, 255, 0.7);
  }
`;

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #0056bff2;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  font-size: 0.9rem;
  padding: 0;
  transition: color 0.3s ease;
  &:hover {
    color: #003bb5;
  }
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #2a9d8f;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.85rem;
  background: linear-gradient(135deg, #0056bff2, #003bb5);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background: linear-gradient(135deg, #003bb5, #001f5b);
    box-shadow: ${props => (props.disabled ? 'none' : '0 0 12px rgba(0, 59, 181, 0.8)')};
  }
`;

const LinksContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const Link = styled.a`
  color: #a8caff;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialLoginContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialButton = styled.button`
  background-color: ${props => props.bgColor || '#ccc'};
  border: none;
  border-radius: 6px;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  &:hover {
    filter: brightness(0.9);
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  user-select: none;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    if (!validate()) return;
    setLoading(true);
    // Simulate login process with error for demonstration
    setTimeout(() => {
      setLoading(false);
      if (email === 'user@example.com' && password === 'password123') {
        setLoginSuccess(`Logged in successfully with email: ${email}${rememberMe ? ' (Remember me enabled)' : ''}`);
      } else {
        setLoginError('Invalid email or password');
      }
    }, 1500);
  };

  return (
    <PageWrapper>
      <LoginContainer role="main" aria-labelledby="login-title">
        <Title id="login-title">Login</Title>
        {loginError && <ErrorMessage role="alert">{loginError}</ErrorMessage>}
        {loginSuccess && <SuccessMessage role="alert">{loginSuccess}</SuccessMessage>}
        <Form onSubmit={handleSubmit} noValidate aria-describedby="form-errors">
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasError={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hasError={!!errors.password}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              required
            />
            <ShowPasswordButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </ShowPasswordButton>
            {errors.password && <ErrorText id="password-error">{errors.password}</ErrorText>}
          </InputWrapper>
          <RememberMeContainer>
            <Checkbox
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </RememberMeContainer>
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? <LoadingSpinner aria-hidden="true" /> : 'Login'}
          </Button>
        </Form>
        <SocialLoginContainer>
          <SocialButton bgColor="#db4437" aria-label="Login with Google">
            <FaGoogle /> Google
          </SocialButton>
          <SocialButton bgColor="#3b5998" aria-label="Login with Facebook">
            <FaFacebookF /> Facebook
          </SocialButton>
        </SocialLoginContainer>
        <LinksContainer>
          <Link href="/forgot-password" tabIndex={0}>Forgot password?</Link>
          <Link href="/signup" tabIndex={0}>Sign up</Link>
        </LinksContainer>
      </LoginContainer>
    </PageWrapper>
  );
};

export default Login;
