import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [updateUserData, setUpdateUserData] = useState(null);

  return (
    <UserContext.Provider value={{ updateUserData, setUpdateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
