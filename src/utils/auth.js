
import { useEffect, useState } from 'react';

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const expiryTime = sessionStorage.getItem('expiryTime');

    if (token && expiryTime) {
      const currentTime = new Date().getTime();
      if (currentTime < expiryTime) {
        setIsAuthenticated(true); 
      } else {
      
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expiryTime');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
