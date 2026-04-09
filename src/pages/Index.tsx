import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import FilterPanel, { Filters } from "@/components/FilterPanel";
import ResultsTable from "@/components/ResultsTable";
import { colleges } from "@/data/colleges";
import { College, Community } from "@/types/college";
import { usePriority } from "@/context/PriorityContext";
import { ListOrdered, GraduationCap } from "lucide-react";

const defaultFilters: Filters = {
  cutoff: "",
  branch: "",
  community: "",
  district: "",
  collegeTypes: [],
};

export default function Index() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [activeFilters, setActiveFilters] = useState<Filters>(defaultFilters);
  const [searched, setSearched] = useState(false);
  const { priorities } = usePriority();

  const results = useMemo(() => {
    if (!searched) return [];

    const community = (activeFilters.community || "OC") as Community;
    let filtered = [...colleges];

    if (activeFilters.branch) {
      filtered = filtered.filter((c) => c.branch === activeFilters.branch);
    }
    if (activeFilters.district) {
      filtered = filtered.filter((c) => c.district === activeFilters.district);
    }
    if (activeFilters.collegeTypes.length > 0) {
      filtered = filtered.filter((c) => activeFilters.collegeTypes.includes(c.type));
    }
    if (activeFilters.cutoff) {
      const cutoffVal = Number(activeFilters.cutoff);
      filtered = filtered.filter((c) => c.cutoff[community] <= cutoffVal);
    }

    filtered.sort((a, b) => b.cutoff[community] - a.cutoff[community]);

    return filtered;
  }, [activeFilters, searched]);

  const handleSearch = () => {
    setActiveFilters({ ...filters });
    setSearched(true);
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    setActiveFilters(defaultFilters);
    setSearched(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-primary/15">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">
              <span className="gradient-text">TNEA</span>{" "}
              <span className="text-foreground">College Finder</span>
            </h1>
          </div>
          <Link
            to="/priorities"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-secondary/30 transition-all duration-200 group"
          >
            <ListOrdered className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-foreground">Priority List</span>
            {priorities.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/25 text-primary min-w-[20px] text-center">
                {priorities.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          onClear={handleClear}
          resultCount={results.length}
        />
        <ResultsTable
          results={results}
          community={activeFilters.community}
          searched={searched}
        />
      </main>
    </div>
  );
}
