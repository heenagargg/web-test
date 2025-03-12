import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TbGripVertical } from "react-icons/tb";

const SortablePageItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <span {...listeners} {...attributes} className="drag-handle-page">
        <TbGripVertical color="blue" size={20} />
      </span>

      <div className="section-content">{children}</div>
    </div>
  );
};

export default SortablePageItem;
