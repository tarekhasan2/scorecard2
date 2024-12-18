import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { useAuthStore } from '../store/authStore';
import { authDB } from '../services/database/auth.db';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    netlifyIdentity.init({
      container: '#netlify-modal',
      locale: 'en',
    });

    const handleLogin = async (netlifyUser: netlifyIdentity.User) => {
      try {
        // Check if user exists in Supabase
        let dbUser = await authDB.getUserByNetlifyId(netlifyUser.id);

        if (!dbUser) {
          // Create new user in Supabase
          dbUser = await authDB.createUser({
            id: netlifyUser.id,
            email: netlifyUser.email,
            user_metadata: {
              full_name: netlifyUser.user_metadata?.full_name,
              roles: netlifyUser.app_metadata?.roles || ['employee'],
            },
          });
        }

        setUser({
          ...netlifyUser,
          db_id: dbUser.id, // Store database ID for reference
        });

        netlifyIdentity.close();
      } catch (error) {
        console.error('Error syncing user with database:', error);
        // Handle error appropriately
      }
    };

    const handleLogout = () => {
      setUser(null);
      window.location.href = '/login';
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);

    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      handleLogin(currentUser);
    }

    setInitialized(true);

    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', handleLogout);
    };
  }, [setUser, setInitialized]);

  return (
    <>
      {children}
      <div id="netlify-modal" />
    </>
  );
};