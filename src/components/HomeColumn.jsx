import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const HomeColumn = ({ col, columns, setColumns, index }) => {
  const [task, setTask] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const popupRef = useRef(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setColumns((prev) => {
      const updatedHome = [...prev];
      updatedHome[0] = {
        ...prev[0],
        tasks: [...prev[0].tasks, task],
      };
      return updatedHome;
    });
    setTask("");
    setIsPopupOpen(false);
  };

  const handleTaskDragStart = (e, taskIndex) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
  };

  const handleTaskDragEnter = (e, targetTaskIndex) => {
    e.preventDefault();
  };

  const handleTaskDrop = (e, targetTaskIndex) => {
    e.preventDefault();

    const draggedTaskIndex = parseInt(e.dataTransfer.getData("taskIndex"));
    if (draggedTaskIndex === targetTaskIndex) return;

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const homeColumn = { ...newColumns[0] };
      if (!homeColumn.tasks || homeColumn.tasks.length === 0) return newColumns;
      const [draggedTask] = homeColumn.tasks.splice(draggedTaskIndex, 1);
      homeColumn.tasks.splice(targetTaskIndex, 0, draggedTask);
      newColumns[0] = homeColumn;
      return newColumns;
    });
  };

  const handleAddIcon = () => {
    setIsPopupOpen(true);
  };

  const handleDeleteTask = (taskIndex) => {
    const updatedColumns = [...col];
    updatedColumns[0].tasks.splice(taskIndex, 1);
    setColumns(updatedColumns);
  };

  const handleEditTask = (taskIndex) => {
    setEditingTaskIndex(taskIndex);
    setEditedTaskText(col[0].tasks[taskIndex]);
  };

  const handleSaveTask = (taskIndex) => {
    if (editedTaskText.trim() === "") {
      return;
    }
    const updatedColumns = [...col];
    updatedColumns[0].tasks[taskIndex] = editedTaskText;
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
  }, [isPopupOpen]);

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
              onClick={handleAddIcon}
              style={{ backgroundColor: "#3339f1", borderRadius: "4px" }}
            />
          </div>
        </div>

        <div className="tasks-container">
          {col[0].tasks.map((task, i) => (
            <div
              key={i}
              className="task-content"
              draggable
              onDragStart={(e) => handleTaskDragStart(e, i)}
              onDragEnter={(e) => handleTaskDragEnter(e, i)}
              onDrop={(e) => handleTaskDrop(e, i)}
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

        <div className="add-div">
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
    </div>
  );
};

export default HomeColumn;
