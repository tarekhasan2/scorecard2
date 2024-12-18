import { useCallback } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { useAuthStore } from '../store/authStore';
import { Role } from '../types/roles';
import { AUTH_CONFIG } from '../config/auth';

export const useAuth = () => {
  const { user, setUser } = useAuthStore();

  const login = useCallback(() => {
    try {
      netlifyIdentity.open('login');
    } catch (error) {
      console.error('Failed to open login modal:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      netlifyIdentity.logout();
      setUser(null); // Ensure local state is cleared
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [setUser]);

  const hasRole = useCallback((requiredRole: Role) => {
    if (!user?.user_metadata.roles) return false;
    return user.user_metadata.roles.includes(requiredRole);
  }, [user]);

  const hasAnyRole = useCallback((requiredRoles: Role[]) => {
    return requiredRoles.some(role => hasRole(role));
  }, [hasRole]);

  return {
    user,
    login,
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
    availableRoles: AUTH_CONFIG.roles,
  };
};