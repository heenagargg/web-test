import React, { useEffect, useRef, useState } from "react";
import "./Website.css";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SortablePageItem from "./SortablePageItem";
const Website = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(null);
  const [isHomeAddIconClicked, setIsHomeAddIconClicked] = useState(null);
  const [isColAddIconClicked, setIsColAddIconClicked] = useState(null);
  const [colIndex, setColIndex] = useState(null);
  const [isTitlePopupOpen, setIsTitlePopupOPen] = useState(null);
  const [sidebarTitle, setSidebarTitle] = useState("");
  const [isAddPagePopupOpen, setIsAddPagePopupOpen] = useState(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [removeIndex, setRemoveIndex] = useState(null);
  const [editedSection, setEditedSection] = useState("");
  const popupRef = useRef(null);
  const sidebarRef = useRef(null);
  const titlePopupRef = useRef(null);
  const [editingPageIndex, setEditingPageIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));

  const [websiteData, setWebsiteData] = useState({
    website_title: "John Doe's Portfolio",
    website_description:
      "Showcasing 7+ years of expertise in web design, John Doe's Portfolio highlights innovative designs and successful projects, while providing insights into the crafting of user-friendly and engaging web experiences.",
    pages: [
      {
        page_type: "home",
        page_title: "Home",
        page_description:
          "Welcome to my portfolio, where creativity meets functionality in web design.",
        sections: [
          {
            section_type: "header",
            section_title: "Header",
            section_description: "",
          },
          {
            section_type: "hero",
            section_title: "Hero",
            section_description:
              "Explore my journey as a web designer with over 7 years of experience.",
          },
          {
            section_type: "about_us",
            section_title: "About Us",
            section_description:
              "I'm a passionate web designer dedicated to producing stunning and effective websites.",
          },
          {
            section_type: "services",
            section_title: "Services",
            section_description: "Services I offer to my clients.",
          },
          {
            section_type: "contact_us",
            section_title: "Contact Us",
            section_description:
              "Get in touch for collaborations or inquiries.",
          },
          {
            section_type: "footer",
            section_title: "Footer",
            section_description: "",
          },
        ],
      },
      {
        page_type: "about",
        page_title: "About Us",
        page_description:
          "Learn more about my background and design philosophy.",
        sections: [
          {
            section_type: "header",
            section_title: "Header",
            section_description: "",
          },
          {
            section_type: "about_company",
            section_title: "About DigiElevate",
            section_description: "Learn about our company and values.",
          },
          {
            section_type: "footer",
            section_title: "Footer",
            section_description: "",
          },
        ],
      },
      {
        page_type: "services",
        page_title: "Services",
        page_description: "Explore the range of services I offer.",
        sections: [
          {
            section_type: "header",
            section_title: "Header",
            section_description: "",
          },
          {
            section_type: "digital_marketing",
            section_title: "Digital Marketing Services",
            section_description:
              "Our comprehensive digital marketing solutions.",
          },
          {
            section_type: "footer",
            section_title: "Footer",
            section_description: "",
          },
        ],
      },
      {
        page_type: "contact",
        page_title: "Contact",
        page_description: "Get in touch for collaborations or inquiries.",
        sections: [
          {
            section_type: "header",
            section_title: "Header",
            section_description: "",
          },
          {
            section_type: "contact_form",
            section_title: "Contact DigiElevate",
            section_description: "Fill in the form below to reach out.",
          },
          {
            section_type: "footer",
            section_title: "Footer",
            section_description: "",
          },
        ],
      },
      {
        page_type: "blog",
        page_title: "Blog",
        page_description: "Read our latest articles and insights.",
        sections: [
          {
            section_type: "header",
            section_title: "Header",
            section_description: "",
          },
          {
            section_type: "blog_content",
            section_title: "DigiElevate Blog",
            section_description: "Latest articles and insights.",
          },
          {
            section_type: "recent_posts",
            section_title: "Recent Blog Posts",
            section_description: "Check out our newest content.",
          },
          {
            section_type: "newsletter",
            section_title: "Related Content/Newsletter Signup",
            section_description: "Subscribe to our newsletter.",
          },
          {
            section_type: "footer",
            section_title: "Footer",
            section_description: "",
          },
        ],
      },
    ],
  });
  const SidebarSections = [
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

  const handleAddSection = (newSection, index) => {
    if (isHomeAddIconClicked) {
      setWebsiteData((prevData) => {
        return {
          ...prevData,
          pages: prevData.pages.map((page) => {
            if (page.page_type === "home") {
              const updatedSections = [...page.sections];

              const footerIndex = updatedSections.findIndex(
                (section) => section.section_type === "footer"
              );

              const newSectionObj = {
                section_type: "",
                section_title: newSection.title,
                section_description: "",
              };

              if (footerIndex !== -1) {
                updatedSections.splice(footerIndex, 0, newSectionObj);
              } else {
                updatedSections.push(newSectionObj);
              }

              return {
                ...page,
                sections: updatedSections,
              };
            }
            return page;
          }),
        };
      });
    }
    if (isColAddIconClicked) {
      setWebsiteData((prevData) => {
        const updatedPages = prevData.pages.map((page, index) => {
          if (index === colIndex) {
            const updatedSections = [...page.sections];

            const footerIndex = updatedSections.findIndex(
              (section) => section.section_type === "footer"
            );

            const newSectionObj = {
              section_type: "",
              section_title: newSection.title,
              section_description: "",
            };

            if (footerIndex !== -1) {
              updatedSections.splice(footerIndex, 0, newSectionObj);
            } else {
              updatedSections.push(newSectionObj); // If footer is missing
            }

            return {
              ...page,
              sections: updatedSections,
            };
          }
          return page;
        });

        return {
          ...prevData,
          pages: updatedPages,
        };
      });
    }

    setIsSidebarOpen(false);
    setIsHomeAddIconClicked(false);
    setIsColAddIconClicked(false);
    setColIndex(null);
  };

  const handleAddPage = () => {
    const formattedType = popupTitle.toLowerCase().replace(" ", "_");
    const newPage = {
      page_type: formattedType,
      page_title: popupTitle,
      page_description: "",
      sections: [
        {
          section_type: "header",
          section_title: "Header",
          section_description: "",
        },
        {
          section_type: "about",
          section_title: "About",
          section_description: "Learn about our company and values.",
        },
        {
          section_type: "footer",
          section_title: "Footer",
          section_description: "",
        },
      ],
    };
    setWebsiteData((prevData) => ({
      ...prevData,
      pages: [...prevData.pages, newPage],
    }));
    setPopupTitle("");
    setIsAddPagePopupOpen(null);
  };

  const handleRemoveSection = (e) => {
    setWebsiteData((prevData) => {
      const updatedPages = prevData.pages.map((page, index) => {
        if (index === removeIndex) {
          return {
            ...page,
            sections: page.sections.filter(
              (section) => section.section_title !== sidebarTitle
            ),
          };
        }
        return page;
      });

      return {
        ...prevData,
        pages: updatedPages,
      };
    });
    setIsTitlePopupOPen(false);
    setRemoveIndex(null);
    setSidebarTitle(null);
  };

  const handleDeletePage = (pageIndex) => {
    setWebsiteData((prevData) => ({
      ...prevData,
      pages: prevData.pages.filter((_, index) => index !== pageIndex),
    }));
  };

  const handleEditClick = (index, currentTitle) => {
    setEditingPageIndex(index);
    setTempTitle(currentTitle);
  };

  const handleTitleChange = (e) => {
    setTempTitle(e.target.value);
  };

  const handleTitleSave = (index) => {
    if (tempTitle.trim() === "") {
      setTempTitle(websiteData.pages[index].page_title);
    } else {
      setWebsiteData((prevData) => {
        const updatedPages = [...prevData.pages];
        updatedPages[index].page_title = tempTitle;
        return { ...prevData, pages: updatedPages };
      });
    }
    setEditingPageIndex(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setWebsiteData((prevData) => {
      const sections = [...prevData.pages[0].sections];

      const oldIndex = sections.findIndex(
        (section) => section.section_title === active.id
      );
      const newIndex = sections.findIndex(
        (section) => section.section_title === over.id
      );
      if (
        sections[newIndex].section_title === "Header" ||
        sections[newIndex].section_title === "Footer"
      ) {
        return prevData;
      }
      const updatedSections = arrayMove(sections, oldIndex, newIndex);

      const updatedPages = [...prevData.pages];
      updatedPages[0].sections = updatedSections;

      return {
        ...prevData,
        pages: updatedPages,
      };
    });
  };

  const handleLowerPageDragEnd = (event, pageIndex) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setWebsiteData((prevData) => {
      const updatedPages = [...prevData.pages];
      const currentPage = updatedPages[pageIndex];
      const sections = [...currentPage.sections];

      const oldIndex = parseInt(active.id.split("-")[1], 10);
      const newIndex = parseInt(over.id.split("-")[1], 10);

      const overSectionTitle = sections[newIndex].section_title;
      if (overSectionTitle === "Header" || overSectionTitle === "Footer") {
        return prevData;
      }

      const [movedSection] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, movedSection);

      updatedPages[pageIndex] = { ...currentPage, sections };
      return { ...prevData, pages: updatedPages };
    });
  };

  const handlePageDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setWebsiteData((prevData) => {
        const updatedPages = [...prevData.pages];
        const pagesToSort = updatedPages.slice(1);

        const oldIndex = parseInt(active.id);
        const newIndex = parseInt(over.id);

        const sortedPages = arrayMove(pagesToSort, oldIndex, newIndex);

        return {
          ...prevData,
          pages: [updatedPages[0], ...sortedPages],
        };
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsAddPagePopupOpen(false);

        setPopupTitle("");
      }
    }

    if (isAddPagePopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddPagePopupOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        titlePopupRef.current &&
        !titlePopupRef.current.contains(event.target)
      ) {
        setWebsiteData((prevData) => {
          const updatedPages = prevData.pages.map((page, index) => {
            if (index === removeIndex) {
              return {
                ...page,
                sections: page.sections.map((section) => {
                  if (section.section_title === sidebarTitle) {
                    return {
                      ...section,
                      section_title:
                        editedSection.trim() === ""
                          ? section.section_title
                          : editedSection,
                    };
                  }
                  return section;
                }),
              };
            }
            return page;
          });
          return {
            ...prevData,
            pages: updatedPages,
          };
        });

        setEditedSection(null);
        setIsTitlePopupOPen(false);
      }
    }

    if (isTitlePopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTitlePopupOpen, sidebarTitle, editedSection]);

  return (
    <div className="container">
      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef}>
          <h2 className="sidebar-title">Add Sections</h2>
          <div className="sidebar-list">
            {SidebarSections.map((sidebarSection, index) => (
              <div
                key={index}
                className="sidebar-section-item"
                onClick={() => {
                  setSidebarTitle(sidebarSection.title);
                  handleAddSection(sidebarSection, index);
                  setEditedSection(sidebarSection.title);
                  setIsTitlePopupOPen(true);
                }}
              >
                <div className="sidebar-text">
                  <p className="sidebar-section-title">
                    {sidebarSection.title}
                  </p>
                  <div className="sidebar-section-description">
                    {sidebarSection.description}
                  </div>
                </div>
                <div className="plus-icon-div">
                  <FaPlus className="plus-icon" size={10} opacity={0.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isTitlePopupOpen && (
        <div
          className={`side-drawer ${isTitlePopupOpen ? "open" : ""}`}
          ref={titlePopupRef}
        >
          <div className="side-drawer-header">
            <h2 className="side-drawer-title">{sidebarTitle}</h2>
            <button
              className="close-btn"
              onClick={() => {
                setIsTitlePopupOPen(null);
                setSidebarTitle("");
              }}
            >
              x
            </button>
          </div>
          <div className="side-drawer-content">
            <label>Title</label>
            <input
              type="text"
              value={editedSection}
              onChange={(e) => {
                setEditedSection(e.target.value);
              }}
              className="input-field"
            />

            <label>Section Prompt</label>
            <textarea
              rows="5"
              placeholder="description..."
              className="textarea-field"
            ></textarea>

            <button
              className="remove-btn"
              onClick={(e) => handleRemoveSection(e)}
            >
              Remove Section
            </button>
          </div>
        </div>
      )}

      {isAddPagePopupOpen && (
        <div className="popup-container" ref={popupRef}>
          <div className="popup-content">
            <h3>Add new page title</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={popupTitle}
              onChange={(e) => setPopupTitle(e.target.value)}
            />
            <button className="proceed-button" onClick={() => handleAddPage()}>
              Proceed
            </button>
          </div>
        </div>
      )}
      <div className="homePage-container">
        <div className="homePage">
          <div className="page-header">
            <div className="page-header-title">
              <FaHome />

              <span style={{ fontSize: "13px" }}>Home Page</span>
            </div>
            <div
              className="home-add-btn"
              onClick={() => {
                setIsHomeAddIconClicked(true);
                setIsSidebarOpen(true);
              }}
            >
              <span style={{ marginBottom: "-4px" }}>
                <IoMdAdd />
              </span>
            </div>
          </div>
          <div className="page-content">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={websiteData.pages[0].sections.map(
                  (section) => section.section_title
                )}
                strategy={verticalListSortingStrategy}
              >
                {websiteData.pages[0].sections.map((section) => {
                  const isDisabled =
                    section.section_title === "Header" ||
                    section.section_title === "Footer";

                  return (
                    <SortableItem
                      key={section.section_title}
                      id={section.section_title}
                      disabled={isDisabled}
                      onClick={(e) => {
                        if (isDisabled) return;
                        setSidebarTitle(e.target.innerHTML);
                        setIsTitlePopupOPen(true);
                        setEditedSection(e.target.innerHTML);
                        setRemoveIndex(0);
                      }}
                    >
                      <div className="section">{section.section_title}</div>
                    </SortableItem>
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>

      <div className="add-page-container">
        <button
          className="add-page-btn"
          onClick={() => {
            if (websiteData.pages.length === 6) {
              alert(
                "Maximim of 5 pages allowed .To add a new page , delete an existing one."
              );
            } else {
              setIsAddPagePopupOpen(true);
            }
          }}
        >
          <span className="add-page-btn-icon">+</span>
          Add Page
        </button>
      </div>

      <div className={`lower-pages-container`}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handlePageDragEnd}
        >
          <SortableContext
            items={websiteData.pages.slice(1).map((_, index) => index)}
            strategy={horizontalListSortingStrategy}
          >
            {websiteData.pages.slice(1).map((page, index) => {
              const pageIndex = index + 1;
              const totalPages = websiteData.pages.length - 1;
              return (
                <SortablePageItem key={index} id={index}>
                  <div className="lower-page-div">
                    <div
                      key={pageIndex}
                      className={`lower-page ${
                        index === 0
                          ? "first-page"
                          : index === totalPages - 1
                          ? "last-page"
                          : ""
                      }  ${totalPages === 1 ? "one-page" : ""}`}
                    >
                      <div className="lower-page-header">
                        <div className="lower-page-title">
                          <span style={{ marginTop: "2px" }}>
                            <FaRegFile />
                          </span>
                          {editingPageIndex === pageIndex ? (
                            <input
                              className="edit-input"
                              type="text"
                              value={tempTitle}
                              onChange={handleTitleChange}
                              onBlur={() => handleTitleSave(pageIndex)}
                              autoFocus
                            />
                          ) : (
                            <span style={{ fontSize: "13px" }}>
                              {page.page_title}
                            </span>
                          )}
                        </div>
                        <div className="add-edit-div">
                          <div
                            className="add-btn"
                            onClick={() => {
                              setColIndex(pageIndex);
                              setIsColAddIconClicked(true);
                              setIsSidebarOpen(true);
                            }}
                          >
                            <span style={{ marginBottom: "-4px" }}>
                              <IoMdAdd />
                            </span>
                          </div>
                          <div
                            className="edit-btn"
                            onClick={() =>
                              handleEditClick(pageIndex, page.page_title)
                            }
                          >
                            <span style={{ marginBottom: "-4px" }}>
                              <MdEdit />
                            </span>
                          </div>
                          <div
                            className="delete-btn"
                            onClick={() => {
                              handleDeletePage(pageIndex);
                            }}
                          >
                            <span style={{ marginBottom: "-4px" }}>
                              <MdDelete />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="lower-page-content">
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={(event) =>
                            handleLowerPageDragEnd(event, pageIndex)
                          }
                        >
                          <SortableContext
                            items={websiteData.pages[pageIndex].sections.map(
                              (_, idx) => `${pageIndex}-${idx}`
                            )}
                            strategy={verticalListSortingStrategy}
                          >
                            {page.sections.map((section, sectionIndex) => {
                              return (
                                <SortableItem
                                  key={`${pageIndex}-${sectionIndex}`}
                                  id={`${pageIndex}-${sectionIndex}`}
                                  disabled={["Header", "Footer"].includes(
                                    section.section_title
                                  )}
                                  onClick={() => {
                                    if (
                                      section.section_title === "Header" ||
                                      section.section_title === "Footer"
                                    )
                                      return;
                                    setSidebarTitle(section.section_title);
                                    setIsTitlePopupOPen(true);
                                    setEditedSection(section.section_title);
                                    setRemoveIndex(pageIndex);
                                  }}
                                >
                                  <div className="section">
                                    {section.section_title}
                                  </div>
                                </SortableItem>
                              );
                            })}
                          </SortableContext>
                        </DndContext>
                      </div>
                    </div>
                  </div>
                </SortablePageItem>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Website;
