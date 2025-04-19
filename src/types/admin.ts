
export interface Order {
  id: number;
  customer_name?: string;
  customer_email?: string;
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | string;
  created_at: string;
  items_count?: number;
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  created_at?: string;
  status?: string;
}

export interface ContentSection {
  id: number;
  title: string;
  content: string;
  type: string;
  position: number;
  active: boolean;
  created_at: string;
}
