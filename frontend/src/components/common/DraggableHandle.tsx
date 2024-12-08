import React, { useState, useCallback } from 'react';
import { GripVertical } from "lucide-react";

interface DraggableHandleProps {
  onOpen: () => void;
  className?: string;
}

const DraggableHandle: React.FC<DraggableHandleProps> = ({ onOpen, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && startX - e.clientX > 50) {
      setIsDragging(false);
      onOpen();
    }
  }, [isDragging, startX, onOpen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`h-full w-2 flex items-center justify-center cursor-ew-resize 
        hover:bg-gray-200 transition-colors group ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={onOpen}
    >
      <GripVertical className="h-8 w-4 text-gray-400 group-hover:text-gray-600" />
    </div>
  );
};

export default DraggableHandle;