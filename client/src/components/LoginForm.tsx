import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formState.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Your password"
        value={formState.password}
        onChange={handleInputChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
