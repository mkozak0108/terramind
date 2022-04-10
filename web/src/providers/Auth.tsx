import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AuthService } from 'Services';

export const AuthContext = createContext({} as any);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState(null);
  const isLoggedIn = useMemo(() => Boolean(token), [token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    // @ts-ignore
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signOut: async () => {
          await AuthService.signOut();
          setToken(null);
        },
        signIn: async (props: { email: string, password: string }) => {
          const { token } = await AuthService.signIn(props);

          setToken(token);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
