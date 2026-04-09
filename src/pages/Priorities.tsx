import { Link } from "react-router-dom";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePriority } from "@/context/PriorityContext";
import { PriorityCollege } from "@/types/college";
import { ArrowLeft, GripVertical, Trash2, Download, ListOrdered, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

function SortableCard({ item, onRemove }: { item: PriorityCollege; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass rounded-xl p-4 flex items-center gap-4 transition-shadow ${isDragging ? "glow-primary shadow-2xl" : "hover:bg-secondary/10"}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-colors touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Rank */}
      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-primary font-mono">{item.rank}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{item.college.name}</div>
        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
          <span>{item.college.branch}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span>{item.college.district}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          <span className="font-mono font-medium text-foreground/80">{item.college.cutoff[item.community]}</span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Priorities() {
  const { priorities, removeFromPriority, reorderPriorities, clearAll } = usePriority();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = priorities.findIndex((p) => p.id === active.id);
      const newIndex = priorities.findIndex((p) => p.id === over.id);
      reorderPriorities(arrayMove(priorities, oldIndex, newIndex));
    }
  };

  const handleExport = () => {
    const text = priorities
      .map((p, i) => `${i + 1}. ${p.college.name} - ${p.college.branch} (${p.college.district}) - Cut-off: ${p.college.cutoff[p.community]}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tnea-priority-list.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl hover:bg-secondary/30 text-muted-foreground hover:text-foreground transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-primary/15">
                <ListOrdered className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold text-foreground">Priority List</h1>
              {priorities.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                  {priorities.length}
                </span>
              )}
            </div>
          </div>
          {priorities.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="text-muted-foreground hover:text-foreground"
              >
                <Download className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Clear All</span>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {priorities.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center animate-fade-in">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Added</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
              Search for colleges and add them to your priority list to get started.
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 glow-primary">
                Browse Colleges
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2 animate-fade-in">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={priorities.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                {priorities.map((item) => (
                  <SortableCard
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromPriority(item.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </main>
    </div>
  );
}
