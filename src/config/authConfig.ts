
export const validCredentials: Array<{
  email: string;
  password: string;
  role: 'admin' | 'user' | 'seller';
  name: string;
}> = [
  { email: 'samer@jam3a.me', password: '2141991@Sam', role: 'admin', name: 'Samer' },
  { email: 'user@example.com', password: 'password123', role: 'user', name: 'Test User' },
  { email: 'seller@example.com', password: 'password123', role: 'seller', name: 'Test Seller' },
];

export const validateRole = (role: string | null): 'admin' | 'user' | 'seller' => {
  if (role === 'admin' || role === 'seller') {
    return role;
  }
  return 'user';
};

// Special check for admin email
export const isAdminEmail = (email: string): boolean => {
  return email.toLowerCase() === 'samer@jam3a.me';
};
