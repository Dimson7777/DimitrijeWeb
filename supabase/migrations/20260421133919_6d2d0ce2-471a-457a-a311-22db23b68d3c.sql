-- Recreate view with security_invoker so RLS of the caller applies
DROP VIEW IF EXISTS public.booked_slots;

CREATE VIEW public.booked_slots
WITH (security_invoker = true)
AS
SELECT scheduled_at FROM public.bookings WHERE status <> 'cancelled';

GRANT SELECT ON public.booked_slots TO anon, authenticated;

-- Allow public read of scheduled_at column on bookings for the view to work under invoker rights
CREATE POLICY "Anyone can view scheduled times"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);

-- Tighten the insert policy: require name, valid email, future date
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

CREATE POLICY "Anyone can create a valid booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) > 0
  AND length(name) <= 100
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 255
  AND (message IS NULL OR length(message) <= 1000)
  AND scheduled_at > now()
);