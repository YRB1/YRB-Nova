-- YRB Nova: bookings + enquiries schema
-- Apply this to your own Supabase project (SQL Editor, or `apply_migration`).
-- RLS is enabled with no policies, so only the service role key (used
-- server-side in /api functions) can read or write these tables.

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    package text not null,
    amount_gbp numeric(10,2) not null,
    customer_name text,
    customer_email text,
    customer_phone text,
    project_details text,
    stripe_session_id text unique,
    status text not null default 'paid'
);

create table if not exists public.enquiries (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    budget text,
    message text not null,
    status text not null default 'new',
    notes text
);

alter table public.bookings enable row level security;
alter table public.enquiries enable row level security;

create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
