import React, { useEffect, useRef, useState } from "react";

function AddColumn({ setColumns }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const popupRef = useRef(null);

  const handleAddColumn = () => {
    if (title.trim() === "") return;

    setColumns((prevColumns) => [
      ...prevColumns,
      { id: Date.now(), title, tasks: ["Header","About Us",'Footer'] },
    ]);

    setTitle("");
    setIsPopupOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
        setTitle("");
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
    <div style={{ alignSelf: "center", zIndex: "1" }}>
      <button className="add-page-button" onClick={() => setIsPopupOpen(true)}>
        + Add Page
      </button>
      {isPopupOpen && (
        <div className="popup-container" ref={popupRef}>
          <div className="popup-content">
            <h3>Add new page title</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="proceed-button" onClick={handleAddColumn}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddColumn;
