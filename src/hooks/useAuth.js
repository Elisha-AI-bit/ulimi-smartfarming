import { useAuth } from '../context/AuthContext';

export const useAuthHook = () => {
  const authContext = useAuth();
  
  return authContext;
};