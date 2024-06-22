import { Section } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { Grip, Pencil } from "lucide-react";

interface Props {
  items: Section[];
  onEdit: (id: string) => void;
  onReorder: () => void;
}

const SectionList = ({ items, onEdit, onReorder }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState<Section[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mt-10 flex flex-col gap-5"
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center bg-primary text-primary-foreground rounded-lg text-sm font-medium p-3"
                  >
                    <div {...provided.dragHandleProps}>
                      <Grip className="size-4 cursor-pointer mr-4 hover:opacity-80" />
                    </div>
                    {section.title}
                    <div className="ml-auto">
                      <Pencil
                        className="h-4 w-4 cursor-pointer hover:opacity-80"
                        onClick={() => onEdit(section.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
