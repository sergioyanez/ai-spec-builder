export interface SpecUser {
  type: string;
  description: string;
  use_cases: string[];
}

export interface SpecFeatureGroup {
  area: string;
  items: string[];
}

export interface SpecFlow {
  name: string;
  steps: string[];
  error_path: string;
}

export interface SpecArchitecture {
  technologies: string[];
  data_flow: string;
}

export interface SpecRequirements {
  included: string[];
  excluded: string[];
}

export interface Spec {
  vision: string;
  users: SpecUser[];
  features: SpecFeatureGroup[];
  flows: SpecFlow[];
  architecture: SpecArchitecture;
  requirements: SpecRequirements;
}
