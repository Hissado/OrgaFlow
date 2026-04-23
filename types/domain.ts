export type RoleCode = "super_admin" | "direction_generale" | "daf" | "consultant" | "manager" | "collaborateur";

export type Kpi = {
  label: string;
  value: string;
  variation: string;
};

export type Statut = "brouillon" | "en_cours" | "a_valider" | "valide" | "archive";
