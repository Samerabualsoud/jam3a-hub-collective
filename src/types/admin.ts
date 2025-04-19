
export interface Order {
  id: number;
  customer_name: string | null;
  customer_email: string | null;
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  created_at: string;
  items_count: number;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: 'user' | 'admin' | 'seller';
  status: 'active' | 'suspended' | 'inactive';
  created_at: string;
}

