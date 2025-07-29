
interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

class CredentialsStore {
  private users: User[] = [];
  private storageKey = 'qwixaccent_users';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.users = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to load users from storage:', error);
        this.users = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }

  signup(name: string, email: string, username: string, password: string, phone: string): { success: boolean; message: string } {
    // Check if username or email already exists
    const existingUser = this.users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      return { success: false, message: 'Username or email already exists' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      username,
      password,
      phone
    };

    this.users.push(newUser);
    this.saveToStorage();
    return { success: true, message: 'Account created successfully' };
  }

  login(username: string, password: string): { success: boolean; message: string; user?: User } {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, message: 'Login successful', user };
    }
    return { success: false, message: 'Invalid username or password' };
  }

  recoverPassword(username: string, phone: string): { success: boolean; message: string; credentials?: { username: string; password: string } } {
    const user = this.users.find(u => u.username === username && u.phone === phone);
    if (user) {
      return { 
        success: true, 
        message: 'Credentials found', 
        credentials: { username: user.username, password: user.password }
      };
    }
    return { success: false, message: 'No user found with provided username and phone number' };
  }
}

export const credentialsStore = new CredentialsStore();
