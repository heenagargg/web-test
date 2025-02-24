import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaRegFile } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
const Column = ({ col, columns, setColumns, index }) => {
  const [task, setTask] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState(null);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const [draggedColumnId, setDraggedColumnId] = useState(null);

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
    setIsPopupOpen(true);
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
    if (editedTaskText.trim() === "") {
      return;
    }
    const updatedColumns = [...columns];
    updatedColumns[index].tasks[taskIndex] = editedTaskText;
    setColumns(updatedColumns);
    setEditingTaskIndex(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
        setTask("");
      }
    }

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen, draggedTaskIndex]);

  return (
    <div
      className="col-card-div"
      draggable
      onDragStart={(e) => handleColumnDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
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
              draggable
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
                  {task}
                  <div className="edit-del-div">
                    <MdDelete onClick={() => handleDeleteTask(i)} />
                    <MdEdit onClick={() => handleEditTask(i)} />
                  </div>
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
