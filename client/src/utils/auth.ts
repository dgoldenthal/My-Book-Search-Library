import { jwtDecode } from 'jwt-decode';

interface UserToken {
  username: string;
  email: string;
  _id: string;
  exp: number; // Expiration time in seconds
}

class AuthService {
  // Get the user profile from the token
  getProfile(): UserToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserToken>(token);
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<UserToken>(token);
      return decoded.exp < Date.now() / 1000; // Compare expiration with current time
    } catch (err) {
      console.error('Error checking token expiration:', err);
      return true; // Assume expired if decoding fails
    }
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  // Save the token and redirect the user
  login(idToken: string): void {
    try {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/'); // Redirect to home page after login
    } catch (err) {
      console.error('Error during login:', err);
    }
  }

  // Log out the user
  logout(): void {
    try {
      localStorage.removeItem('id_token'); // Remove token from storage
      window.location.assign('/'); // Redirect to home page after logout
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }
}

export default new AuthService();
