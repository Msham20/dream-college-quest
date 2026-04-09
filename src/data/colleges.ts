import { College, Branch, CollegeType, Community } from "@/types/college";

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Salem", "Trichy",
  "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Dindigul",
  "Kanchipuram", "Villupuram", "Cuddalore", "Karur", "Namakkal",
  "Sivaganga", "Ramanathapuram", "Virudhunagar", "Thoothukudi", "Krishnagiri"
];

const branches: Branch[] = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "AI & DS", "Biomedical", "Chemical", "Automobile"];

interface CollegeTemplate {
  name: string;
  code: number;
  district: string;
  type: CollegeType;
  tier: number; // 1=top, 2=mid, 3=lower
}

const collegeTemplates: CollegeTemplate[] = [
  // Government - Tier 1
  { name: "College of Engineering, Guindy", code: 1, district: "Chennai", type: "Government", tier: 1 },
  { name: "Madras Institute of Technology", code: 2, district: "Chennai", type: "Government", tier: 1 },
  { name: "PSG College of Technology", code: 3, district: "Coimbatore", type: "Government Aided", tier: 1 },
  { name: "Thiagarajar College of Engineering", code: 4, district: "Madurai", type: "Government Aided", tier: 1 },
  { name: "Government College of Technology", code: 5, district: "Coimbatore", type: "Government", tier: 1 },
  { name: "Alagappa College of Technology", code: 6, district: "Chennai", type: "Government", tier: 1 },
  { name: "Coimbatore Institute of Technology", code: 7, district: "Coimbatore", type: "Government Aided", tier: 1 },
  { name: "National Institute of Technology, Trichy", code: 8, district: "Trichy", type: "Government", tier: 1 },
  // Government - Tier 2
  { name: "Government College of Engineering, Salem", code: 9, district: "Salem", type: "Government", tier: 2 },
  { name: "Government College of Engineering, Tirunelveli", code: 10, district: "Tirunelveli", type: "Government", tier: 2 },
  { name: "Government College of Engineering, Thanjavur", code: 11, district: "Thanjavur", type: "Government", tier: 2 },
  { name: "Government College of Engineering, Erode", code: 12, district: "Erode", type: "Government", tier: 2 },
  { name: "Government College of Engineering, Bargur", code: 13, district: "Krishnagiri", type: "Government", tier: 2 },
  { name: "University College of Engineering, Dindigul", code: 14, district: "Dindigul", type: "Government", tier: 2 },
  { name: "University College of Engineering, Villupuram", code: 15, district: "Villupuram", type: "Government", tier: 2 },
  { name: "University College of Engineering, Kanchipuram", code: 16, district: "Kanchipuram", type: "Government", tier: 2 },
  { name: "University College of Engineering, Ramanathapuram", code: 17, district: "Ramanathapuram", type: "Government", tier: 2 },
  { name: "Alagappa Chettiar Government College of Engg", code: 18, district: "Sivaganga", type: "Government", tier: 2 },
  // Government Aided
  { name: "Mepco Schlenk Engineering College", code: 19, district: "Virudhunagar", type: "Government Aided", tier: 1 },
  { name: "Kongu Engineering College", code: 20, district: "Erode", type: "Government Aided", tier: 1 },
  { name: "Kumaraguru College of Technology", code: 21, district: "Coimbatore", type: "Government Aided", tier: 1 },
  { name: "Sri Sivasubramaniya Nadar College", code: 22, district: "Kanchipuram", type: "Government Aided", tier: 1 },
  { name: "Velammal Engineering College", code: 23, district: "Chennai", type: "Government Aided", tier: 2 },
  { name: "R.M.K. Engineering College", code: 24, district: "Chennai", type: "Government Aided", tier: 2 },
  { name: "Sri Venkateswara College of Engineering", code: 25, district: "Kanchipuram", type: "Government Aided", tier: 2 },
  { name: "Easwari Engineering College", code: 26, district: "Chennai", type: "Government Aided", tier: 2 },
  // Self-Financing - various tiers
  { name: "SRM Institute of Science and Technology", code: 27, district: "Kanchipuram", type: "Self-Financing", tier: 1 },
  { name: "VIT University", code: 28, district: "Vellore", type: "Self-Financing", tier: 1 },
  { name: "Sathyabama Institute of Science and Technology", code: 29, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "Saveetha Engineering College", code: 30, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "Rajalakshmi Engineering College", code: 31, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "St. Joseph's College of Engineering", code: 32, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute", code: 33, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "Jeppiaar Engineering College", code: 34, district: "Chennai", type: "Self-Financing", tier: 3 },
  { name: "Panimalar Engineering College", code: 35, district: "Chennai", type: "Self-Financing", tier: 2 },
  { name: "Sri Krishna College of Engineering", code: 36, district: "Coimbatore", type: "Self-Financing", tier: 2 },
  { name: "Bannari Amman Institute of Technology", code: 37, district: "Erode", type: "Self-Financing", tier: 2 },
  { name: "KPR Institute of Engineering and Technology", code: 38, district: "Coimbatore", type: "Self-Financing", tier: 2 },
  { name: "Sethu Institute of Technology", code: 39, district: "Virudhunagar", type: "Self-Financing", tier: 3 },
  { name: "Francis Xavier Engineering College", code: 40, district: "Tirunelveli", type: "Self-Financing", tier: 3 },
  { name: "Kamaraj College of Engineering", code: 41, district: "Virudhunagar", type: "Self-Financing", tier: 3 },
  { name: "P.S.R. Engineering College", code: 42, district: "Sivaganga", type: "Self-Financing", tier: 3 },
  { name: "V.S.B. Engineering College", code: 43, district: "Karur", type: "Self-Financing", tier: 3 },
  { name: "Mahendra Engineering College", code: 44, district: "Namakkal", type: "Self-Financing", tier: 3 },
  { name: "Dhanalakshmi Srinivasan Engineering College", code: 45, district: "Cuddalore", type: "Self-Financing", tier: 3 },
  { name: "K.S. Rangasamy College of Technology", code: 46, district: "Namakkal", type: "Self-Financing", tier: 2 },
  { name: "Nandha Engineering College", code: 47, district: "Erode", type: "Self-Financing", tier: 3 },
  { name: "M. Kumarasamy College of Engineering", code: 48, district: "Karur", type: "Self-Financing", tier: 3 },
  { name: "Arjun College of Technology", code: 49, district: "Coimbatore", type: "Self-Financing", tier: 3 },
  { name: "Sri Ramakrishna Engineering College", code: 50, district: "Coimbatore", type: "Self-Financing", tier: 2 },
];

function generateCutoff(tier: number, branch: Branch, community: Community): number {
  const baseCutoffs: Record<number, number> = { 1: 195, 2: 175, 3: 140 };
  const branchModifiers: Record<Branch, number> = {
    "CSE": 0, "AI & DS": -2, "IT": -5, "ECE": -8, "EEE": -15,
    "Mechanical": -20, "Civil": -28, "Biomedical": -18, "Chemical": -30, "Automobile": -32
  };
  const communityModifiers: Record<Community, number> = {
    "OC": 0, "BC": -5, "BCM": -8, "MBC": -10, "SC": -18, "ST": -22, "SCA": -20
  };

  const base = baseCutoffs[tier] + branchModifiers[branch] + communityModifiers[community];
  const variance = Math.floor(Math.random() * 10) - 5;
  return Math.max(50, Math.min(200, base + variance));
}

function generateColleges(): College[] {
  const colleges: College[] = [];
  let id = 1;

  for (const template of collegeTemplates) {
    // Each college gets a subset of branches
    const collegeBranches = branches.filter(() => {
      if (template.tier === 1) return Math.random() > 0.1;
      if (template.tier === 2) return Math.random() > 0.3;
      return Math.random() > 0.4;
    });

    // Ensure at least CSE and ECE
    if (!collegeBranches.includes("CSE")) collegeBranches.unshift("CSE");
    if (!collegeBranches.includes("ECE") && collegeBranches.length < 8) collegeBranches.push("ECE");

    for (const branch of collegeBranches) {
      const communities: Community[] = ["OC", "BC", "BCM", "MBC", "SC", "ST", "SCA"];
      const cutoff: Record<Community, number> = {} as Record<Community, number>;
      
      for (const community of communities) {
        cutoff[community] = generateCutoff(template.tier, branch, community);
      }

      colleges.push({
        id: `col-${id++}`,
        name: template.name,
        code: template.code,
        branch,
        district: template.district,
        cutoff,
        type: template.type,
      });
    }
  }

  return colleges;
}

// Generate once with a seed-like approach (deterministic enough for demo)
export const colleges = generateColleges();

export const allBranches: Branch[] = branches;
export const allDistricts = districts;
export const allCommunities: Community[] = ["OC", "BC", "BCM", "MBC", "SC", "ST", "SCA"];
export const allCollegeTypes: CollegeType[] = ["Government", "Government Aided", "Self-Financing"];
