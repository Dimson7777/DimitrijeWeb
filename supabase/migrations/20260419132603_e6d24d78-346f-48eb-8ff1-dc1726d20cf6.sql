ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_check CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT contact_messages_email_check CHECK (char_length(email) BETWEEN 3 AND 200 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT contact_messages_message_check CHECK (char_length(message) BETWEEN 1 AND 5000);