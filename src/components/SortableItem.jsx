import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TbGripVertical } from "react-icons/tb";

function SortableItem({ id, children, disabled, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item">
      {!disabled && (
        <span {...listeners} {...attributes} className="drag-handle">
          <TbGripVertical color="blue" />
        </span>
      )}
      <div className="section-content" onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

export default SortableItem;
