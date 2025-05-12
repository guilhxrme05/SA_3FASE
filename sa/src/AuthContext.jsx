import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    try {
      const token = localStorage.getItem('token'); // Corrigido: localStorage
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      const { token, user } = response.data;

      // Armazenar token e usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao fazer login');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      const { token, user } = response.data;

      // Armazenar token e usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao registrar');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};