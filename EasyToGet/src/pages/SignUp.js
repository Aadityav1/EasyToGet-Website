import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaLock } from 'react-icons/fa';

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

const SignUpContainer = styled.div`
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

const Button = styled.button`
  padding: 0.85rem;
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background: linear-gradient(135deg, #218838, #1b6e2a);
    box-shadow: 0 0 12px rgba(33, 136, 56, 0.8);
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Add sign-up logic here
    alert(`Signing up with email: ${email}`);
  };

  return (
    <PageWrapper>
      <SignUpContainer role="main" aria-labelledby="signup-title">
        <Title id="signup-title">Sign Up</Title>
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
          <InputWrapper>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <IconWrapper>
              <FaLock />
            </IconWrapper>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              hasError={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              required
            />
            <ShowPasswordButton
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </ShowPasswordButton>
            {errors.confirmPassword && <ErrorText id="confirmPassword-error">{errors.confirmPassword}</ErrorText>}
          </InputWrapper>
          <Button type="submit">Sign Up</Button>
        </Form>
      </SignUpContainer>
    </PageWrapper>
  );
};

export default SignUp;
