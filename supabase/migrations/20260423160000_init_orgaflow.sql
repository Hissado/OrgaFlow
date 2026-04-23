create extension if not exists "pgcrypto";

create type public.role_code as enum ('super_admin','direction_generale','daf','consultant','manager','collaborateur');
create type public.record_status as enum ('brouillon','en_cours','a_valider','valide','archive');
create type public.priority_level as enum ('basse','moyenne','haute','critique');

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  code public.role_code unique not null,
  label text not null,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id),
  created_at timestamptz default now(),
  unique(user_id, role_id)
);

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  manager_id uuid references public.profiles(id),
  description text,
  status public.record_status default 'en_cours',
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table public.positions (
  id uuid primary key default gen_random_uuid(),
  department_id uuid references public.departments(id) on delete cascade,
  title text not null,
  job_description text,
  status public.record_status default 'brouillon',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id),
  department_id uuid references public.departments(id),
  position_id uuid references public.positions(id),
  manager_employee_id uuid references public.employees(id),
  hire_date date,
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.missions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_name text not null default 'EDOLE AFRICA',
  start_date date,
  end_date date,
  maturity_score numeric(5,2) default 0,
  status public.record_status default 'en_cours',
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.mission_members (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete cascade,
  user_id uuid references public.profiles(id),
  role_in_mission text,
  created_at timestamptz default now(),
  unique (mission_id, user_id)
);

create table public.interview_templates (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete cascade,
  title text not null,
  status public.record_status default 'valide',
  created_at timestamptz default now()
);

create table public.interview_questions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.interview_templates(id) on delete cascade,
  question text not null,
  weight int default 1,
  created_at timestamptz default now()
);

create table public.interviews (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id) on delete cascade,
  employee_id uuid references public.employees(id),
  interviewer_id uuid references public.profiles(id),
  planned_at timestamptz,
  performed_at timestamptz,
  notes text,
  summary text,
  score numeric(5,2),
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.interview_responses (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid references public.interviews(id) on delete cascade,
  question_id uuid references public.interview_questions(id),
  response_text text,
  response_score numeric(5,2),
  created_at timestamptz default now()
);

create table public.evaluations (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  theme text not null,
  finding text,
  score numeric(5,2),
  status public.record_status default 'en_cours',
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.productivity_metrics (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  department_id uuid references public.departments(id),
  metric_name text not null,
  metric_value numeric(10,2) not null,
  measured_at date default current_date,
  created_at timestamptz default now()
);

create table public.processes (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  department_id uuid references public.departments(id),
  name text not null,
  objective text,
  actors text,
  automation_opportunity text,
  criticality public.priority_level default 'moyenne',
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.process_steps (
  id uuid primary key default gen_random_uuid(),
  process_id uuid references public.processes(id) on delete cascade,
  step_order int not null,
  label text not null,
  description text,
  created_at timestamptz default now()
);

create table public.process_risks (
  id uuid primary key default gen_random_uuid(),
  process_id uuid references public.processes(id) on delete cascade,
  risk_label text not null,
  impact text,
  probability public.priority_level default 'moyenne',
  created_at timestamptz default now()
);

create table public.process_controls (
  id uuid primary key default gen_random_uuid(),
  process_id uuid references public.processes(id) on delete cascade,
  control_label text not null,
  owner_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.procedures_manuals (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  title text not null,
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.procedure_sections (
  id uuid primary key default gen_random_uuid(),
  manual_id uuid references public.procedures_manuals(id) on delete cascade,
  title text not null,
  content text,
  section_order int,
  status public.record_status default 'brouillon',
  created_at timestamptz default now()
);

create table public.procedure_versions (
  id uuid primary key default gen_random_uuid(),
  manual_id uuid references public.procedures_manuals(id) on delete cascade,
  version_label text not null,
  change_log text,
  is_published boolean default false,
  status public.record_status default 'a_valider',
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.findings (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  category text,
  description text not null,
  cause text,
  risk text,
  status public.record_status default 'en_cours',
  created_at timestamptz default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  finding_id uuid references public.findings(id),
  recommendation text not null,
  priority public.priority_level default 'moyenne',
  owner_id uuid references public.profiles(id),
  due_date date,
  impact text,
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.action_plans (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  recommendation_id uuid references public.recommendations(id),
  action_label text not null,
  responsible_id uuid references public.profiles(id),
  due_date date,
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.action_plan_updates (
  id uuid primary key default gen_random_uuid(),
  action_plan_id uuid references public.action_plans(id) on delete cascade,
  update_note text not null,
  progress_percent int check (progress_percent between 0 and 100),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.digitalization_opportunities (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  process_id uuid references public.processes(id),
  title text not null,
  expected_gain text,
  required_solution text,
  priority public.priority_level default 'moyenne',
  status public.record_status default 'en_cours',
  created_at timestamptz default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  deliverable_type text not null,
  title text not null,
  due_date date,
  status public.record_status default 'en_cours',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.deliverable_versions (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid references public.deliverables(id) on delete cascade,
  version_label text not null,
  file_path text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.file_attachments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  linked_table text,
  linked_id uuid,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  is_sensitive boolean default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table public.employee_documents (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references public.employees(id) on delete cascade,
  attachment_id uuid references public.file_attachments(id) on delete cascade,
  category text,
  status public.record_status default 'en_cours',
  created_at timestamptz default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references public.missions(id),
  target_table text not null,
  target_id uuid not null,
  body text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create index idx_missions_status on public.missions(status);
create index idx_interviews_employee on public.interviews(employee_id);
create index idx_recommendations_due on public.recommendations(due_date);
create index idx_files_mission on public.file_attachments(mission_id);

create or replace function public.current_role()
returns public.role_code
language sql stable security definer set search_path=public
as $$
  select r.code from public.user_roles ur
  join public.roles r on r.id = ur.role_id
  where ur.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.has_role(target public.role_code)
returns boolean
language sql stable security definer set search_path=public
as $$
  select exists (
    select 1 from public.user_roles ur join public.roles r on r.id=ur.role_id
    where ur.user_id = auth.uid() and r.code = target
  );
$$;

create or replace function public.can_view_sensitive_hr()
returns boolean language sql stable security definer set search_path=public
as $$
  select public.has_role('super_admin') or public.has_role('direction_generale') or public.has_role('daf');
$$;

alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.departments enable row level security;
alter table public.positions enable row level security;
alter table public.employees enable row level security;
alter table public.employee_documents enable row level security;
alter table public.missions enable row level security;
alter table public.mission_members enable row level security;
alter table public.interviews enable row level security;
alter table public.interview_templates enable row level security;
alter table public.interview_questions enable row level security;
alter table public.interview_responses enable row level security;
alter table public.evaluations enable row level security;
alter table public.productivity_metrics enable row level security;
alter table public.processes enable row level security;
alter table public.process_steps enable row level security;
alter table public.process_risks enable row level security;
alter table public.process_controls enable row level security;
alter table public.procedures_manuals enable row level security;
alter table public.procedure_sections enable row level security;
alter table public.procedure_versions enable row level security;
alter table public.findings enable row level security;
alter table public.recommendations enable row level security;
alter table public.action_plans enable row level security;
alter table public.action_plan_updates enable row level security;
alter table public.digitalization_opportunities enable row level security;
alter table public.deliverables enable row level security;
alter table public.deliverable_versions enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;
alter table public.file_attachments enable row level security;
alter table public.comments enable row level security;

create policy roles_admin_only on public.roles for all using (public.has_role('super_admin')) with check (public.has_role('super_admin'));
create policy profiles_self_or_admin on public.profiles for select using (id = auth.uid() or public.has_role('super_admin') or public.has_role('direction_generale'));
create policy profiles_update_self_or_admin on public.profiles for update using (id = auth.uid() or public.has_role('super_admin')) with check (id = auth.uid() or public.has_role('super_admin'));
create policy user_roles_admin_only on public.user_roles for all using (public.has_role('super_admin')) with check (public.has_role('super_admin'));

create policy notifications_owner on public.notifications for select using (user_id = auth.uid() or public.has_role('super_admin'));
create policy notifications_write_admin on public.notifications for insert with check (public.has_role('super_admin') or public.has_role('manager'));

create policy activity_logs_admin_read on public.activity_logs for select using (public.has_role('super_admin') or public.has_role('direction_generale'));
create policy activity_logs_insert_all on public.activity_logs for insert with check (auth.uid() is not null);

create policy hr_read_restricted on public.employees for select using (public.can_view_sensitive_hr() or profile_id = auth.uid());
create policy hr_write_manager_plus on public.employees for all using (public.has_role('super_admin') or public.has_role('daf') or public.has_role('manager')) with check (public.has_role('super_admin') or public.has_role('daf') or public.has_role('manager'));
create policy employee_documents_restricted on public.employee_documents for select using (public.can_view_sensitive_hr());

create policy documents_secure on public.file_attachments for select using (not is_sensitive or public.can_view_sensitive_hr());
create policy documents_write on public.file_attachments for insert with check (auth.uid() is not null);
create policy documents_delete_admin on public.file_attachments for delete using (public.has_role('super_admin') or created_by=auth.uid());

create policy missions_read for select on public.missions using (auth.uid() is not null);
create policy missions_write for all on public.missions using (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('direction_generale')) with check (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('direction_generale'));

create policy generic_read on public.departments for select using (auth.uid() is not null);
create policy generic_write on public.departments for all using (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('manager')) with check (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('manager'));

create policy generic_read_positions on public.positions for select using (auth.uid() is not null);
create policy generic_write_positions on public.positions for all using (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('manager')) with check (public.has_role('super_admin') or public.has_role('consultant') or public.has_role('manager'));

-- application tables read for authenticated users + managed write for managers/consultants/admin
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['mission_members','interview_templates','interview_questions','interviews','interview_responses','evaluations','productivity_metrics','processes','process_steps','process_risks','process_controls','procedures_manuals','procedure_sections','procedure_versions','findings','recommendations','action_plans','action_plan_updates','digitalization_opportunities','deliverables','deliverable_versions','comments']
  LOOP
    EXECUTE format('create policy %I_read on public.%I for select using (auth.uid() is not null);', t, t);
    EXECUTE format('create policy %I_write on public.%I for all using (public.has_role(''super_admin'') or public.has_role(''consultant'') or public.has_role(''manager'') or public.has_role(''daf'')) with check (public.has_role(''super_admin'') or public.has_role(''consultant'') or public.has_role(''manager'') or public.has_role(''daf''));', t, t);
  END LOOP;
END $$;
