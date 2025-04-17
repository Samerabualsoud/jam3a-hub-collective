
-- Create the payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id TEXT NOT NULL UNIQUE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  source_type TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  description TEXT,
  transaction_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Allow full admin access" ON payments
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policy for users to see their own payments
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT
  USING (customer_email = auth.jwt() ->> 'email');
