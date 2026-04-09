import { College, Community } from "@/types/college";
import { usePriority } from "@/context/PriorityContext";
import { Plus, Check, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResultsTableProps {
  results: College[];
  community: Community | "";
  searched: boolean;
}

function getTypeColor(type: string) {
  switch (type) {
    case "Government": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Government Aided": return "bg-sky-500/15 text-sky-400 border-sky-500/30";
    default: return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  }
}

export default function ResultsTable({ results, community, searched }: ResultsTableProps) {
  const { addToPriority, isInPriority } = usePriority();
  const displayCommunity = community || "OC";

  if (!searched) {
    return (
      <div className="glass rounded-2xl p-12 text-center animate-fade-in">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-primary/60" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Find Your College</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Use the filters above to search through TNEA colleges. Results will be sorted by cut-off marks.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center animate-fade-in">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-destructive/60" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Found</h3>
        <p className="text-muted-foreground text-sm">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">#</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">College</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Branch</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">District</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cut-off</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="px-5 py-3.5 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((college, i) => {
              const added = isInPriority(college.id);
              return (
                <tr
                  key={college.id}
                  className="border-b border-border/10 hover:bg-secondary/20 transition-colors group"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <td className="px-5 py-3.5 text-sm text-muted-foreground font-mono">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-foreground">{college.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Code: {college.code}</div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{college.branch}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{college.district}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold font-mono text-foreground">
                      {college.cutoff[displayCommunity as Community]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-medium border ${getTypeColor(college.type)}`}>
                      {college.type === "Government Aided" ? "Govt. Aided" : college.type === "Self-Financing" ? "Self-Finance" : "Govt."}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => !added && addToPriority(college, displayCommunity as Community)}
                      disabled={added}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        added
                          ? "bg-emerald-500/15 text-emerald-400 cursor-default"
                          : "bg-primary/10 text-primary hover:bg-primary/25 hover:scale-110 active:scale-95"
                      }`}
                    >
                      {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border/10">
        {results.map((college, i) => {
          const added = isInPriority(college.id);
          return (
            <div key={college.id} className="p-4 hover:bg-secondary/10 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{college.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{college.branch} · {college.district}</div>
                </div>
                <button
                  onClick={() => !added && addToPriority(college, displayCommunity as Community)}
                  disabled={added}
                  className={`ml-3 p-1.5 rounded-lg flex-shrink-0 transition-all ${
                    added ? "bg-emerald-500/15 text-emerald-400" : "bg-primary/10 text-primary hover:bg-primary/25"
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono text-foreground">
                  {college.cutoff[displayCommunity as Community]}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getTypeColor(college.type)}`}>
                  {college.type === "Government Aided" ? "Aided" : college.type === "Self-Financing" ? "SF" : "Govt"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
