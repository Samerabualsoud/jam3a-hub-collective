
export const validCredentials: Array<{
  email: string;
  password: string;
  role: 'admin' | 'user' | 'seller';
  name: string;
}> = [
  { email: 'samer@jam3a.me', password: '2141991@Sam', role: 'admin', name: 'Samer' },
];

export const validateRole = (role: string | null): 'admin' | 'user' | 'seller' => {
  if (role === 'admin' || role === 'seller') {
    return role;
  }
  return 'user';
};
