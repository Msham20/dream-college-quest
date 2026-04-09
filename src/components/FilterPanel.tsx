import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { allBranches, allDistricts, allCommunities, allCollegeTypes } from "@/data/colleges";
import { Branch, CollegeType, Community } from "@/types/college";
import { SearchCheck, XCircle, Settings2 } from "lucide-react";

export interface Filters {
  cutoff: string;
  branch: Branch | "";
  community: Community | "";
  district: string;
  collegeTypes: CollegeType[];
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: () => void;
  onClear: () => void;
  resultCount: number;
}

export default function FilterPanel({ filters, onFiltersChange, onSearch, onClear, resultCount }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const update = (partial: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleType = (type: CollegeType) => {
    const types = filters.collegeTypes.includes(type)
      ? filters.collegeTypes.filter((t) => t !== type)
      : [...filters.collegeTypes, type];
    update({ collegeTypes: types });
  };

  const hasFilters = filters.cutoff || filters.branch || filters.community || filters.district || filters.collegeTypes.length > 0;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/15">
            <Settings2 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Filters</h2>
          {resultCount > 0 && (
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              {resultCount} results
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm md:hidden"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <div className={`grid gap-4 ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]"} transition-all`}>
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cut-off */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cut-off Mark</label>
              <Input
                type="number"
                placeholder="e.g. 185"
                min={0}
                max={200}
                value={filters.cutoff}
                onChange={(e) => update({ cutoff: e.target.value })}
                className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50 h-10"
              />
            </div>

            {/* Branch */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Branch</label>
              <Select value={filters.branch} onValueChange={(v) => update({ branch: v as Branch })}>
                <SelectTrigger className="bg-secondary/50 border-border/50 h-10">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  {allBranches.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Community */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Community</label>
              <Select value={filters.community} onValueChange={(v) => update({ community: v as Community })}>
                <SelectTrigger className="bg-secondary/50 border-border/50 h-10">
                  <SelectValue placeholder="All Communities" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  {allCommunities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">District</label>
              <Select value={filters.district} onValueChange={(v) => update({ district: v })}>
                <SelectTrigger className="bg-secondary/50 border-border/50 h-10">
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  {allDistricts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* College Type Chips */}
          <div className="mt-4 space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">College Type</label>
            <div className="flex flex-wrap gap-2">
              {allCollegeTypes.map((type) => {
                const active = filters.collegeTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-primary/25 text-primary border border-primary/40 shadow-sm glow-sm"
                        : "bg-secondary/40 text-muted-foreground border border-border/50 hover:bg-secondary/70 hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-5">
            <Button
              onClick={onSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] px-6"
            >
              <SearchCheck className="w-4 h-4 mr-1.5" />
              Search Colleges
            </Button>
            {hasFilters && (
              <Button
                variant="ghost"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
