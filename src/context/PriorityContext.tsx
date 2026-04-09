import React, { createContext, useContext, useState, useCallback } from "react";
import { College, Community, PriorityCollege } from "@/types/college";

interface PriorityContextType {
  priorities: PriorityCollege[];
  addToPriority: (college: College, community: Community) => void;
  removeFromPriority: (id: string) => void;
  reorderPriorities: (newOrder: PriorityCollege[]) => void;
  isInPriority: (collegeId: string) => boolean;
  clearAll: () => void;
}

const PriorityContext = createContext<PriorityContextType | null>(null);

export function PriorityProvider({ children }: { children: React.ReactNode }) {
  const [priorities, setPriorities] = useState<PriorityCollege[]>([]);

  const addToPriority = useCallback((college: College, community: Community) => {
    setPriorities((prev) => {
      if (prev.some((p) => p.college.id === college.id)) return prev;
      return [...prev, { id: college.id, college, community, rank: prev.length + 1 }];
    });
  }, []);

  const removeFromPriority = useCallback((id: string) => {
    setPriorities((prev) =>
      prev.filter((p) => p.id !== id).map((p, i) => ({ ...p, rank: i + 1 }))
    );
  }, []);

  const reorderPriorities = useCallback((newOrder: PriorityCollege[]) => {
    setPriorities(newOrder.map((p, i) => ({ ...p, rank: i + 1 })));
  }, []);

  const isInPriority = useCallback(
    (collegeId: string) => priorities.some((p) => p.college.id === collegeId),
    [priorities]
  );

  const clearAll = useCallback(() => setPriorities([]), []);

  return (
    <PriorityContext.Provider
      value={{ priorities, addToPriority, removeFromPriority, reorderPriorities, isInPriority, clearAll }}
    >
      {children}
    </PriorityContext.Provider>
  );
}

export function usePriority() {
  const ctx = useContext(PriorityContext);
  if (!ctx) throw new Error("usePriority must be used within PriorityProvider");
  return ctx;
}
