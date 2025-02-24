import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaRegFile } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
const Column = ({
  col,
  columns,
  setColumns,
  index,
  setIsSidebarOpen,
  setColAddIcon,
  selected,
  setSelected,
  colIndex,
  setColIndex,
}) => {
  const [task, setTask] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const [draggedColumnId, setDraggedColumnId] = useState(null);
    const [isComponentCardViewing, setIsComponentViewing] = useState(null);
      const titleViewRef = useRef(null);
      const [titleValue, setTitleValue] = useState("");
      const [editTaskIndex,setEditTaskIndex]=useState(null)

  const popupRef = useRef(null);

  const draggingTask = useRef(null);
  const draggingColumn = useRef(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (col.id === 0) {
      setColumns((prev) => ({
        ...prev,
        tasks: [...(prev.tasks || []), task],
      }));
    } else {
      const newColumns = [...columns];
      newColumns[index].tasks.push(task);
      setColumns(newColumns);
    }

    setTask("");

    setIsPopupOpen(false);
  };

  const handleTaskDragStart = (e, columnId, taskIndex) => {
    setDraggedTaskIndex(taskIndex);
    setDraggedColumnId(columnId);
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("columnId", columnId);
  };

  const handleTaskDragEnter = (e, targetColumnId, targetTaskIndex) => {
    e.preventDefault();

    if (
      draggedTaskIndex === targetTaskIndex &&
      draggedColumnId === targetColumnId
    )
      return;
  };

  const handleTaskDrop = (e, targetColumnId, targetTaskIndex) => {
    e.preventDefault();
    if(targetTaskIndex===0 || targetTaskIndex===columns[index].tasks.length-1){
      return
    }

    if (draggedTaskIndex === null || draggedColumnId === null) return;

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const sourceColumn = newColumns.find((col) => col.id === draggedColumnId);
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) return newColumns;
      const [draggedTask] = sourceColumn.tasks.splice(draggedTaskIndex, 1);

      targetColumn.tasks.splice(targetTaskIndex, 0, draggedTask);

      return newColumns;
    });

    setDraggedTaskIndex(null);
    setDraggedColumnId(null);
  };

  const handleColumnDragStart = (e, columnIndex) => {
    e.dataTransfer.setData("type", "column");
    e.dataTransfer.setData("columnIndex", columnIndex);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnIndex) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (type === "column") {
      const draggedColumnIndex = parseInt(
        e.dataTransfer.getData("columnIndex")
      );
      if (draggedColumnIndex === targetColumnIndex) return;
      const updatedColumns = [...columns];
      const draggedColumn = updatedColumns.splice(draggedColumnIndex, 1)[0];
      updatedColumns.splice(targetColumnIndex, 0, draggedColumn);

      setColumns(updatedColumns);
    }
  };
  const handleDelete = (e) => {
    console.log(e);
    const updatedColumns = columns.filter((_, colIndex) => colIndex !== index);
    setColumns(updatedColumns);
  };
  const handleAddIcon = () => {
    // setIsPopupOpen(true);
    setColIndex(index);
    setIsSidebarOpen(true);
    setColAddIcon(true);
    // console.log(selectedTitle)
    // const newColumns = [...columns];
    // newColumns[index].tasks.push(selectedTitle);
    // setColumns(newColumns);
  };

  const handleDeleteTask = (taskIndex) => {
    const updatedColumns = [...columns];
    updatedColumns[index].tasks.splice(taskIndex, 1);
    setColumns(updatedColumns);
  };

  const handleEditTask = (taskIndex) => {
    setEditingTaskIndex(taskIndex);
    setEditedTaskText(col.tasks[taskIndex]);
  };

  const handleSaveTask = (taskIndex) => {
    // if (editedTaskText.trim() === "") {
    //   return;
    // }
    const updatedColumns = [...columns];
    setColumns(updatedColumns);
    setEditingTaskIndex(null);
    updatedColumns[index].tasks[taskIndex] = titleValue;
    setIsComponentViewing(false)
    setEditTaskIndex(null)
    setTitleValue("")
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
        setTask("");
      }
    }
    function handleClickOutsideTitleCard(event) {
      if (
        titleViewRef.current &&
        !titleViewRef.current.contains(event.target)
      ) {
        setIsComponentViewing(false);
      }
    }

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    if (isComponentCardViewing) {
      document.addEventListener("mousedown", handleClickOutsideTitleCard);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideTitleCard);
    };
  }, [isPopupOpen, isComponentCardViewing, titleValue,draggedTaskIndex]);

  return (
    <div
      className="col-card-div"
      draggable
      onDragStart={(e) => handleColumnDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
            {isComponentCardViewing && (
        <div className="title-view-div" ref={titleViewRef}>
          <label>Title</label>
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            // onBlur={()=>handleSaveTask(editTaskIndex)}
         />
         <button className="save-edit-btn" onClick={()=>handleSaveTask(editTaskIndex)}>save</button>
        </div>
      )}
      <div className="col-content">
        <div className="title-div">
          <div className="title">
            <FaRegFile />
            {col.title}
          </div>
          <div className="del-icon">
            <MdDelete size={18} onClick={handleDelete} />
            <IoIosAdd size={22} onClick={handleAddIcon} />
          </div>
        </div>

        <div className="tasks-container">
          {col.tasks?.map((task, i) => (
            <div
              key={i}
              className={`task-content ${
                draggedTaskIndex === i ? "dragging" : "tasks"
              }`}
              draggable={["header", "footer"].includes(task.toLowerCase())?false:"true"}
              onDragStart={(e) => handleTaskDragStart(e, col.id, i)}
              onDragEnter={(e) => handleTaskDragEnter(e, col.id, i)}
              onDrop={(e) => handleTaskDrop(e, col.id, i)}
              onDragOver={(e) => e.preventDefault()}
            >
              {editingTaskIndex === i ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onBlur={() => handleSaveTask(i)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveTask(i)}
                  autoFocus
                />
              ) : (
                <>
                      <div
                    onClick={(e) => {
                      setIsComponentViewing(true);
                      setTitleValue(e.target.innerText);
                      setEditTaskIndex(i)
                    }}
                  >
                    {task}
                  </div>
                  {!["header", "footer"].includes(task.toLowerCase()) && (
                    <div className="edit-del-div">
                      <MdDelete onClick={() => handleDeleteTask(i)} />
                      {/* <MdEdit onClick={() => handleEditTask(i)} /> */}
                    </div>
                  )}
            
                </>
              )}
            </div>
          ))}
        </div>
        {isPopupOpen && (
          <div className="popup-container" ref={popupRef}>
            <div className="popup-content">
              <h3>Add new Component</h3>
              <input
                type="text"
                placeholder="Enter Component"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="proceed-button" onClick={handleAddTask}>
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;

// const handleTaskDragStart = (e, taskIndex) => {
//   draggingTask.current = { columnIndex: index, taskIndex };
//   e.dataTransfer.effectAllowed = "move";
// };

// const handleTaskDragEnter = (e, targetTaskIndex) => {
//   e.preventDefault();
//   if (!draggingTask.current) return;

//   const { columnIndex: sourceColIndex, taskIndex: sourceTaskIndex } =
//     draggingTask.current;

//   if (sourceColIndex === index && sourceTaskIndex === targetTaskIndex) return;

//   let newColumns = [...columns];
//   const draggedTask = newColumns[sourceColIndex].tasks.splice(
//     sourceTaskIndex,
//     1
//   )[0];

//   newColumns[index].tasks.splice(targetTaskIndex, 0, draggedTask);
//   draggingTask.current.taskIndex = targetTaskIndex;

//   setColumns(newColumns);
// };

// const handleTaskDrop = () => {
//   draggingTask.current = null;
// };

{
  /* {col.tasks?.map((task, i) => (
            <div
              key={i}
              className={`task-content ${
                draggedTaskIndex === i ? "dragging" : ""
              }`}
              draggable
              onDragStart={(e) => {
                handleTaskDragStart(e, i);
                setDraggedTaskIndex(i);
              }}
              onDragEnter={(e) => handleTaskDragEnter(e, i)}
              onDragEnd={() => {
                handleTaskDrop();
                setDraggedTaskIndex(null);
              }}
              onDragOver={(e) => e.preventDefault()}
            > */
}
