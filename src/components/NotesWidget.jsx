import React from "react";
import { useStore } from "../store/useStore";
import { Edit3 } from "lucide-react";

const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-super-card border border-super-border rounded-2xl p-6 shadow-xl gap-4">
      {/* Widget Header */}
      <div className="flex justify-between items-center select-none">
        <h3 className="font-outfit font-bold text-lg text-zinc-300 tracking-wide flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-super-neon" />
          <span>All Notes</span>
        </h3>
        
        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
          Auto-saved
        </span>
      </div>

      {/* Lined Notebook Area */}
      <div className="flex-1 rounded-xl overflow-hidden border border-white/5 relative bg-zinc-950/20">
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Jot down your reminders, bookmarks, ideas, or to-do tasks here..."
          className="w-full h-full p-4 bg-transparent text-zinc-200 font-inter text-sm focus:outline-none resize-none lined-paper overflow-y-auto leading-[2rem]"
          style={{
            lineHeight: "2rem",
            paddingTop: "0.5rem",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
};

export default NotesWidget;
