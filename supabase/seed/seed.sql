-- Prérequis: créer les comptes auth.users avec ces UUID via Supabase Auth import.
insert into public.roles (id, code, label) values
('10000000-0000-0000-0000-000000000001','super_admin','Super Admin'),
('10000000-0000-0000-0000-000000000002','direction_generale','Direction Générale'),
('10000000-0000-0000-0000-000000000003','daf','DAF'),
('10000000-0000-0000-0000-000000000004','consultant','Consultant'),
('10000000-0000-0000-0000-000000000005','manager','Manager'),
('10000000-0000-0000-0000-000000000006','collaborateur','Collaborateur')
on conflict do nothing;

-- 15 profils de démonstration
insert into public.profiles (id, full_name, email) values
('20000000-0000-0000-0000-000000000001','Aïcha Koné','admin@orgaflow.io'),
('20000000-0000-0000-0000-000000000002','Alain Koffi','dg@edole.africa'),
('20000000-0000-0000-0000-000000000003','Fatou Ndiaye','daf@edole.africa'),
('20000000-0000-0000-0000-000000000004','Mariam Touré','consultant1@orgaflow.io'),
('20000000-0000-0000-0000-000000000005','Karim Sissoko','consultant2@orgaflow.io'),
('20000000-0000-0000-0000-000000000006','Moussa Diallo','manager1@edole.africa'),
('20000000-0000-0000-0000-000000000007','Nadia Traoré','manager2@edole.africa'),
('20000000-0000-0000-0000-000000000008','Jean Yao','manager3@edole.africa'),
('20000000-0000-0000-0000-000000000009','Koffi Amani','collab1@edole.africa'),
('20000000-0000-0000-0000-000000000010','Eva Konan','collab2@edole.africa'),
('20000000-0000-0000-0000-000000000011','Yasmine Coulibaly','collab3@edole.africa'),
('20000000-0000-0000-0000-000000000012','Paul Ouedraogo','collab4@edole.africa'),
('20000000-0000-0000-0000-000000000013','Noura Ba','collab5@edole.africa'),
('20000000-0000-0000-0000-000000000014','Seydou Keita','collab6@edole.africa'),
('20000000-0000-0000-0000-000000000015','Rokia Diabaté','collab7@edole.africa'),
('20000000-0000-0000-0000-000000000016','Luc Mendy','collab8@edole.africa')
on conflict do nothing;

insert into public.user_roles (user_id, role_id)
select '20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001' union all
select '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002' union all
select '20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003' union all
select '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004' union all
select '20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000004' union all
select '20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000005' union all
select '20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000005' union all
select '20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000005'
on conflict do nothing;

insert into public.departments (id, name, manager_id, status) values
('30000000-0000-0000-0000-000000000001','Finance','20000000-0000-0000-0000-000000000003','valide'),
('30000000-0000-0000-0000-000000000002','Ressources Humaines','20000000-0000-0000-0000-000000000007','valide'),
('30000000-0000-0000-0000-000000000003','Opérations','20000000-0000-0000-0000-000000000008','en_cours');

insert into public.missions (id,name,start_date,end_date,status,created_by) values
('40000000-0000-0000-0000-000000000001','Structuration interne EDOLE AFRICA','2026-04-01','2026-07-30','en_cours','20000000-0000-0000-0000-000000000001');

insert into public.processes (mission_id, department_id, name, objective, criticality, status) values
('40000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','Gestion de la trésorerie','Sécuriser les flux','haute','en_cours'),
('40000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000003','Gestion des achats','Réduire les délais','critique','en_cours');

insert into public.interviews (mission_id, interviewer_id, planned_at, score, status, notes)
values
('40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000004', now(), 72, 'valide', 'Bon niveau de clarté sur les rôles'),
('40000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000005', now(), 64, 'en_cours', 'Point de blocage sur le circuit de validation');

insert into public.recommendations (mission_id, recommendation, priority, owner_id, due_date, status)
values
('40000000-0000-0000-0000-000000000001','Digitaliser les demandes d’achat','haute','20000000-0000-0000-0000-000000000006','2026-05-30','en_cours'),
('40000000-0000-0000-0000-000000000001','Formaliser le référentiel de poste','moyenne','20000000-0000-0000-0000-000000000007','2026-06-15','a_valider');

insert into public.action_plans (mission_id, action_label, responsible_id, due_date, status)
values
('40000000-0000-0000-0000-000000000001','Déployer le workflow de validation achats','20000000-0000-0000-0000-000000000006','2026-06-20','en_cours');

insert into public.deliverables (mission_id, deliverable_type, title, due_date, status)
values
('40000000-0000-0000-0000-000000000001','note_cadrage','Note de cadrage','2026-04-10','valide'),
('40000000-0000-0000-0000-000000000001','rapport_diagnostic','Rapport de diagnostic','2026-05-20','en_cours'),
('40000000-0000-0000-0000-000000000001','manuel_procedures','Manuel de procédures','2026-06-30','a_valider');
