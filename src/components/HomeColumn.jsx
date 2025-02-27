// import React, { useState, useRef, useEffect } from "react";
// import "../App.css";
// import { MdDelete } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import { IoIosAdd } from "react-icons/io";
// import { IoHomeOutline } from "react-icons/io5";

// const HomeColumn = ({
//   col,
//   columns,
//   setColumns,
//   index,
//   setIsSidebarOpen,
//   setHomeAddIcon,
//   // setIsComponentViewing,
//   // isComponentCardViewing
// }) => {
//   const [task, setTask] = useState("");
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [editingTaskIndex, setEditingTaskIndex] = useState(null);
//   const [editedTaskText, setEditedTaskText] = useState("");
//   const popupRef = useRef(null);
//   const titleViewRef = useRef(null);
//   const [titleValue, setTitleValue] = useState("");
//   const [editTaskIndex,setEditTaskIndex]=useState(null)
//   const [isComponentCardViewing, setIsComponentViewing] = useState(null);

//   const handleAddTask = () => {
//     if (task.trim() === "") return;
//     setColumns((prev) => {
//       const updatedHome = [...prev];
//       updatedHome[0] = {
//         ...prev[0],
//         tasks: [...prev[0].tasks, task],
//       };
//       return updatedHome;
//     });
//     setTask("");
//     setIsPopupOpen(false);
//   };

//   const handleTaskDragStart = (e, taskIndex) => {
//     if (taskIndex === 0) {
//       return;
//     }
//     e.dataTransfer.setData("taskIndex", taskIndex);
//   };

//   const handleTaskDragEnter = (e, targetTaskIndex) => {
//     e.preventDefault();
//   };

//   const handleTaskDrop = (e, targetTaskIndex) => {
//     e.preventDefault();
//     if (targetTaskIndex === 0 || targetTaskIndex === col[0].tasks.length - 1) {
//       return;
//     }

//     const draggedTaskIndex = parseInt(e.dataTransfer.getData("taskIndex"));
//     if (draggedTaskIndex === targetTaskIndex) return;

//     setColumns((prevColumns) => {
//       const newColumns = [...prevColumns];
//       const homeColumn = { ...newColumns[0] };
//       if (!homeColumn.tasks || homeColumn.tasks.length === 0) return newColumns;
//       const [draggedTask] = homeColumn.tasks.splice(draggedTaskIndex, 1);
//       homeColumn.tasks.splice(targetTaskIndex, 0, draggedTask);
//       newColumns[0] = homeColumn;
//       return newColumns;
//     });
//   };

//   const handleAddIcon = () => {
//     // setIsPopupOpen(true);
//     // setSelected(true)
//     setHomeAddIcon(true);
//     setIsSidebarOpen(true);
//   };

//   const handleDeleteTask = (taskIndex) => {
//     const updatedColumns = [...col];
//     updatedColumns[0].tasks.splice(taskIndex, 1);
//     setColumns(updatedColumns);
//   };

//   const handleEditTask = (taskIndex) => {
//     setEditingTaskIndex(taskIndex);
//     setEditedTaskText(col[0].tasks[taskIndex]);
//   };

//   const handleSaveTask = (taskIndex) => {
//     if (titleValue.trim() === "") {
//       return;
//     }
//     console.log("rtyuiopertyuiop[[")
//     const updatedColumns = [...col];
//     // updatedColumns[0].tasks[taskIndex] = editedTaskText;
//     updatedColumns[0].tasks[taskIndex] = titleValue;
//     setColumns(updatedColumns);
//     setEditingTaskIndex(null);
//     setIsComponentViewing(false)
//     setEditTaskIndex(null)
//     setTitleValue("")
//   };
//   // const handleSaveTitleOfCard=()

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         setIsPopupOpen(false);
//         setTask("");
//       }
//     }
//     function handleClickOutsideTitleCard(event) {
//       if (
//         titleViewRef.current &&
//         !titleViewRef.current.contains(event.target)
//       ) {
//         setIsComponentViewing(false);
//       }
//     }

//     if (isPopupOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     if (isComponentCardViewing) {
//       document.addEventListener("mousedown", handleClickOutsideTitleCard);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("mousedown", handleClickOutsideTitleCard);
//     };
//   }, [isPopupOpen, isComponentCardViewing, titleValue]);

//   return (
//     <div className="col-card-div">
//       {isComponentCardViewing && (
//         <div className="title-view-div" ref={titleViewRef}>
//           <label>Title</label>
//           <input
//             type="text"
//             value={titleValue}
//             onChange={(e) => setTitleValue(e.target.value)}
//             // onBlur={()=>handleSaveTask(editTaskIndex)}
//          />
//          <button className="save-edit-btn" onClick={()=>handleSaveTask(editTaskIndex)}>save</button>
//         </div>
//       )}
//       <div className="col-content">
//         <div className="title-div">
//           <div className="title" style={{ padding: "8px" }}>
//             <IoHomeOutline />
//             {col[0].title}
//           </div>
//           <div className="del-icon">
//             <IoIosAdd
//               size={22}
//               onClick={handleAddIcon}
//               style={{ backgroundColor: "#3339f1", borderRadius: "4px" }}
//             />
//           </div>
//         </div>

//         <div className="tasks-container">
//           {col[0].tasks.map((task, i) => (
//             <div
//               key={i}
//               className="task-content"
//               draggable={
//                 ["header", "footer"].includes(task.toLowerCase())
//                   ? false
//                   : "true"
//               }
//               onDragStart={(e) => handleTaskDragStart(e, i)}
//               onDragEnter={(e) => handleTaskDragEnter(e, i)}
//               onDrop={(e) => handleTaskDrop(e, i)}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               {editingTaskIndex === i ? (
//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editedTaskText}
//                   onChange={(e) => setEditedTaskText(e.target.value)}
//                   onBlur={() => handleSaveTask(i)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSaveTask(i)}
//                   autoFocus
//                 />
//               ) : (
//                 <>
//                   <div
//                     onClick={(e) => {
//                       setIsComponentViewing(true);
//                       setTitleValue(e.target.innerText);
//                       setEditTaskIndex(i)
//                     }}
//                   >
//                     {task}
//                   </div>

//                   {!["header", "footer"].includes(task.toLowerCase()) && (
//                     <div className="edit-del-div">
//                       <MdDelete onClick={() => handleDeleteTask(i)} />
//                       {/* <MdEdit onClick={() => handleEditTask(i)} /> */}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="add-div">
//           {isPopupOpen && (
//             <div className="popup-container" ref={popupRef}>
//               <div className="popup-content">
//                 <h3>Add new Component</h3>
//                 <input
//                   type="text"
//                   placeholder="Enter Component"
//                   value={task}
//                   onChange={(e) => setTask(e.target.value)}
//                 />
//                 <button className="proceed-button" onClick={handleAddTask}>
//                   Proceed
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeColumn;


import React, { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../App.css";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const SortableTask = ({ task, index, handleDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return ( 
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task-content" >
     <div onClick={console.log("rtyuio")}>
     {task}
     </div>
      {!["header", "footer"].includes(task.toLowerCase()) && (
        <div className="edit-del-div">
          <MdDelete onClick={() => handleDeleteTask(index)} />
        </div>
      )}
    </div>
  );
};

const HomeColumn = ({ col, columns, setColumns, setIsSidebarOpen, setHomeAddIcon }) => {
  const [task, setTask] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setColumns((prev) => {
      const updatedHome = [...prev];
      updatedHome[0] = { ...prev[0], tasks: [...prev[0].tasks, task] };
      return updatedHome;
    });
    setTask("");
    setIsPopupOpen(false);
  };

  const handleDeleteTask = (taskIndex) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[0].tasks.splice(taskIndex, 1);
      return newColumns;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const oldIndex = newColumns[0].tasks.indexOf(active.id);
      const newIndex = newColumns[0].tasks.indexOf(over.id);
      newColumns[0].tasks = arrayMove(newColumns[0].tasks, oldIndex, newIndex);
      return newColumns;
    });
  };

  return (
    <div className="col-card-div">
      <div className="col-content">
        <div className="title-div">
          <div className="title" style={{ padding: "8px" }}>
            <IoHomeOutline />
            {col[0].title}
          </div>
          <div className="del-icon">
            <IoIosAdd
              size={22}
              onClick={() => {
                setHomeAddIcon(true);
                setIsSidebarOpen(true);
              }}
              style={{ backgroundColor: "#3339f1", borderRadius: "4px" }}
            />
          </div>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={col[0].tasks} strategy={verticalListSortingStrategy}>
            <div className="tasks-container">
              {col[0].tasks.map((task, index) => (
                <SortableTask key={task} task={task} index={index} handleDeleteTask={handleDeleteTask} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {isPopupOpen && (
          <div className="popup-container" ref={popupRef}>
            <div className="popup-content">
              <h3>Add new Component</h3>
              <input type="text" placeholder="Enter Component" value={task} onChange={(e) => setTask(e.target.value)} />
              <button className="proceed-button" onClick={handleAddTask}>Proceed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeColumn;

