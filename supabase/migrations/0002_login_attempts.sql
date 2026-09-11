-- Brute-force protection for /api/admin/login.
-- Tracks failed attempts per client IP; only the service role key can
-- read or write, same access pattern as bookings/enquiries.

create table if not exists public.login_attempts (
    ip text primary key,
    failed_count int not null default 0,
    locked_until timestamptz,
    last_attempt timestamptz not null default now()
);

alter table public.login_attempts enable row level security;
