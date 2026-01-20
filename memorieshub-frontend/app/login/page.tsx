"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/src/services/AuthService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await AuthService.loginAsync(email, password)
      localStorage.setItem('token', token);
      router.push('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async () => {
    try {
      const token = await AuthService.signupAsync("user", email, password);
      localStorage.setItem('token', token);
      router.push('/home');
    } catch (err) {
      setError('An error occured while signing you up...');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Login</button>
      </form>
      <button onClick={handleSignup} className="border-blue-500 hover:border-blue-700 font-bold py-2 px-4 rounded cursor-pointer">Signup</button>
    </div>
  );
}
