// // SortableItem.js
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const SortableItem = ({ id, children, disabled }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id, disabled });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 2 : 1,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="section"
//     >
//       {children}
//     </div>
//   );
// };

// export default SortableItem;


// SortableItem.js
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { GripVertical } from "lucide-react";
import { TbGripVertical } from "react-icons/tb";

function SortableItem({ id, children, disabled, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    // transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="sortable-item" >
      {!disabled && (
        <span {...listeners} {...attributes} className="drag-handle">
          <TbGripVertical color="blue"/>
        </span>
      )}
      <div className="section-content" onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

export default SortableItem;
