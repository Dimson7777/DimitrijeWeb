-- Bookings table for call scheduling
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a booking
CREATE POLICY "Anyone can create a booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can read scheduled times so the UI can disable taken slots
-- Only exposes the scheduled_at column via a view to avoid leaking PII
CREATE OR REPLACE VIEW public.booked_slots AS
SELECT scheduled_at FROM public.bookings WHERE status <> 'cancelled';

GRANT SELECT ON public.booked_slots TO anon, authenticated;

-- Index for fast slot lookup
CREATE INDEX idx_bookings_scheduled_at ON public.bookings(scheduled_at);

-- Prevent duplicate bookings at the same time
CREATE UNIQUE INDEX idx_bookings_unique_slot ON public.bookings(scheduled_at) WHERE status <> 'cancelled';