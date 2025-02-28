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

   const initialData = {
    website_title: "John Doe's Portfolio",
    website_description: "Showcasing 7+ years of expertise in web design, John Doe's Portfolio highlights innovative designs and successful projects, while providing insights into the crafting of user-friendly and engaging web experiences.",
    pages: [
      {
        page_type: "home",
        page_title: "Home",
        page_description: "Welcome to my portfolio, where creativity meets functionality in web design.",
        sections: [
          {
            section_type: "hero",
            section_title: "Welcome to My Portfolio",
            section_description: "Explore my journey as a web designer with over 7 years of experience."
          },
          {
            section_type: "about_me",
            section_title: "About Me",
            section_description: "I'm a passionate web designer dedicated to producing stunning and effective websites."
          },
          {
            section_type: "my_work",
            section_title: "My Work",
            section_description: "View my selected projects that demonstrate my skills and creativity in web design."
          },
          {
            section_type: "testimonials",
            section_title: "Testimonials",
            section_description: "Hear from my clients about their experiences working with me."
          }
        ]
      },
      {
        page_type: "about",
        page_title: "About Me",
        page_description: "Learn more about my background and design philosophy.",
        sections: [
          {
            section_type: "banner",
            section_title: "About Me",
            section_description: ""
          },
          {
            section_type: "background",
            section_title: "My Background",
            section_description: "I have 7+ years of experience in web design and development."
          },
          {
            section_type: "design_philosophy",
            section_title: "My Design Philosophy",
            section_description: "I believe in creating user-centered designs that are both functional and visually appealing."
          }
        ]
      },
      {
        page_type: "portfolio",
        page_title: "Portfolio",
        page_description: "A compilation of my projects, showcasing my design capabilities and style.",
        sections: [
          {
            section_type: "banner",
            section_title: "Portfolio",
            section_description: ""
          },
          {
            section_type: "featured_projects",
            section_title: "Featured Projects",
            section_description: "Explore a selection of my top projects that highlight my expertise."
          },
          {
            section_type: "project_details",
            section_title: "Project Details",
            section_description: "Learn more about my process and the impact of each project."
          }
        ]
      },
      {
        page_type: "contact",
        page_title: "Contact Me",
        page_description: "Get in touch for collaborations or inquiries.",
        sections: [
          {
            section_type: "banner",
            section_title: "Contact Me",
            section_description: ""
          },
          {
            section_type: "contact_form",
            section_title: "Send Me a Message",
            section_description: "Fill in the form below to reach out."
          }
        ]
      }
    ]
  };

  const tasks=[]
  initialData.pages[0].sections.map((task)=>{
    tasks.push(task)
  })
  console.log(tasks)

  const [homeColumn, setHomeColumn] = useState([
    {
      id: 0,
      title: initialData.pages[0].page_title,
      tasks:tasks
      // tasks: [
      //   "Header",
      //   "Hero",
      //   "About Us",
      //   "Testimonails",
      //   "Contact",
      //   "Footer",
      // ],
    },
  ]);
  console.log(homeColumn)
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