import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect( () =>
    console.log(registeredUsers)

  , [registeredUsers])

  const login = (userData) => {
    const foundUser = registeredUsers.find(
      (u) => u.name === userData.name && u.password === userData.password
    );

    if (foundUser) {
      setUser(foundUser); 
      return true;
    } else {
      alert('Nome ou senha incorretos!');
      return false;
    }
  };

  const logout = () => {
    setUser(null); 
  };

  const register = (userData) => {
    const userExists = registeredUsers.some((u) => u.name === userData.name);

    if (userExists) {
      alert('Usuário já registrado!');
      return false;
    }

    setRegisteredUsers((prev) => [...prev, userData]); 
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};