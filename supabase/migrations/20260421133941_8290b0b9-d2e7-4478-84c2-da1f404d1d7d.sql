-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view scheduled times" ON public.bookings;

-- Drop the view (no longer needed)
DROP VIEW IF EXISTS public.booked_slots;

-- Security definer function to expose ONLY the taken time slots
CREATE OR REPLACE FUNCTION public.get_booked_slots()
RETURNS TABLE(scheduled_at TIMESTAMP WITH TIME ZONE)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT scheduled_at FROM public.bookings WHERE status <> 'cancelled';
$$;

GRANT EXECUTE ON FUNCTION public.get_booked_slots() TO anon, authenticated;