import React, { useEffect, useRef, useState } from "react";
import Board from "./components/Board";
import AddColumn from "./components/AddColumn";
import Column from "./components/Column";
import HomeColumn from "./components/HomeColumn";
import { FaPlus } from "react-icons/fa"; // For the plus icon

const CardsBoard = () => {
  const [columns, setColumns] = useState([]);
  const [homeAddIcon, setHomeAddIcon] = useState(null);
  const [ColAddIcon, setColAddIcon] = useState(null);
  const [colIndex, setColIndex] = useState(null);
   const sidebarRef = useRef(null);
  const [homeColumn, setHomeColumn] = useState([
    {
      id: 0,
      title: "Home",
      tasks: [
        "Header",
        "Hero",
        "About Us",
        "Testimonails",
        "Contact",
        "Footer",
      ],
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isComponentCardViewing,setIsComponentViewing]=useState(null)
  const sections = [
    { title: "Custom section", description: "Describe any section you want" },
    { title: "About section", description: "Provide info about the company" },
    {
      title: "Benefit section",
      description: "Explain the benefit of your offering",
    },
    { title: "Benefits section", description: "Showcase key benefits" },
    { title: "Blog section", description: "Display blog posts" },
    {
      title: "Contact section",
      description: "Encourage visitors to contact company",
    },
    {
      title: "Call to Action section",
      description: "Urge users to take action",
    },
    { title: "FAQ section", description: "Answer common questions" },
    { title: "Feature section", description: "Highlight a feature in details" },
    { title: "Features list section", description: "Highlight core features" },
    { title: "Gallery section", description: "Showcase images or media" },
    { title: "Hero section", description: "Highlight the main message" },
    { title: "Logos section", description: "Display logos of key customers" },
    { title: "Portfolio section", description: "Showcase portfolio items" },
    {
      title: "Pricing section",
      description: "Display service or product prices",
    },
    { title: "Reviews section", description: "Showcase customer reviews" },
    { title: "Services section", description: "Explain a service in details" },
    { title: "Services list section", description: "Showcase your solutions" },
    { title: "Team section", description: "Introduce the team" },
    {
      title: "Testimonials section",
      description: "Showcase clients' success stories",
    },
    { title: "Title section", description: "Display a page title" },
  ];

  const handleAddSectionToHome = (sectionTitle) => {
    if (homeAddIcon) {
      let tempHomeColumn = JSON.parse(JSON.stringify(homeColumn));
      // setHomeColumn((prevHome) => {
      //   return prevHome.map((col) => ({
      //     ...col,
      //     tasks: [...col.tasks, sectionTitle],
      //   }));
      // });

      let homeNew = tempHomeColumn[0].tasks;

      homeNew.splice(homeNew.length - 1, 0, sectionTitle);
      console.log(homeNew);

      setHomeColumn((prevHome) => {
        console.log(prevHome);
        return prevHome.map((col) => ({
          ...col,
          tasks: homeNew,
          // tasks: [...col.tasks, sectionTitle],
        }));
      });
      setIsSidebarOpen(false);
      setHomeAddIcon(false);
      // setIsComponentViewing(true)

    }
    if (ColAddIcon) {
      let colNew = columns[colIndex].tasks;
      colNew.splice(colNew.length - 1, 0, sectionTitle);
      const newColumns = [...columns];
      // newColumns[colIndex].tasks.push(sectionTitle);
      newColumns[colIndex].tasks = colNew;
      setColumns(newColumns);
      setColAddIcon(false);
      setIsSidebarOpen(false);
    }
  };



  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false)
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);


  return (
    <div className="main-container tree-container">
      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef}>
          <h2 className="sidebar-title">Add Sections</h2>
          <div className="section-list">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`section-item ${
                  selected === index ? "selected" : ""
                }`}
                onClick={() => {
                  handleAddSectionToHome(sections[index].title);
                  setSelected(sections[index].title);
                }}
              >
                <div className="section-text">
                  <p className="section-title">{section.title}</p>
                  <p className="section-description">{section.description}</p>
                </div>
                <div className="plus-icon-div">
                  <FaPlus className="plus-icon" size={10} opacity={0.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {isComponentCardViewing && (
          <div className="title-view-div">
          <label>Title</label>
          <input
            type="text"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />
          </div>
      )} */}
      <div style={{ alignSelf: "center" }} className="page root-page">
        {
          <HomeColumn
            col={homeColumn}
            columns={[homeColumn]}
            setColumns={setHomeColumn}
            index={0}
            setIsSidebarOpen={setIsSidebarOpen}
            setHomeAddIcon={setHomeAddIcon}
            setIsComponentViewing={setIsComponentViewing}
            isComponentCardViewing={isComponentCardViewing}

          />
        }
      </div>
      <AddColumn
        columns={columns}
        setColumns={setColumns}
        className="page root-page"
      />
      <Board
        columns={columns}
        setColumns={setColumns}
        setIsSidebarOpen={setIsSidebarOpen}
        setColAddIcon={setColAddIcon}
        selected={selected}
        setSelected={setSelected}
        colIndex={colIndex}
        setColIndex={setColIndex}
        setIsComponentViewing={setIsComponentViewing}
      />
    </div>
  );
};

export default CardsBoard;