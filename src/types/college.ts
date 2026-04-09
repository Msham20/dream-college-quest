export type CollegeType = "Government" | "Government Aided" | "Self-Financing";
export type Community = "OC" | "BC" | "BCM" | "MBC" | "SC" | "ST" | "SCA";
export type Branch =
  | "CSE"
  | "ECE"
  | "EEE"
  | "Mechanical"
  | "Civil"
  | "IT"
  | "AI & DS"
  | "Biomedical"
  | "Chemical"
  | "Automobile";

export interface College {
  id: string;
  name: string;
  code: number;
  branch: Branch;
  district: string;
  cutoff: Record<Community, number>;
  type: CollegeType;
}

export interface PriorityCollege {
  id: string;
  college: College;
  community: Community;
  rank: number;
}
