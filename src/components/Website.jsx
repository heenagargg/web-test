import React, { useEffect, useRef, useState } from "react";
import "./Website.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa6";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import SortableItem from "./SortableItem";
import SortablePageItem from "./SortablePageItem";
import DescriptionSidebar from "./DescriptionSidebar";
const Website = () => {
  const location = useLocation();
  const jsonData = location.state.returnData ?? {};
  const navigate=useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(null);
  const [isHomeAddIconClicked, setIsHomeAddIconClicked] = useState(null);
  const [isColAddIconClicked, setIsColAddIconClicked] = useState(null);
  const [isSectionAddIconClicked, setIsSectionAddIconClicked] = useState(null);
  const [indexOfAddSection, setIndexOfAddSection] = useState(null);
  const [colIndexForAddSection, setColIndexForAddSection] = useState(null);
  const [colIndex, setColIndex] = useState(null);
  const [isTitlePopupOpen, setIsTitlePopupOPen] = useState(null);
  const [sidebarTitle, setSidebarTitle] = useState("");
  const [sidebarDescription, setSidebarDescription] = useState("");
  const [isAddPagePopupOpen, setIsAddPagePopupOpen] = useState(null);
  const [popupTitle, setPopupTitle] = useState("");
  const [sectionType, setSectionType] = useState("");
  const [removeIndex, setRemoveIndex] = useState(null);
  const [editedSection, setEditedSection] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const popupRef = useRef(null);
  const sidebarRef = useRef(null);
  const titlePopupRef = useRef(null);
  const siteStrRef = useRef();
  const [editingPageIndex, setEditingPageIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [isSiteStrPopupOpen, setIsSiteStrPopupOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [websiteData, setWebsiteData] = useState(jsonData);
  const SidebarSections = [
    {
      type: "custom_section",
      title: "Custom section",
      description: "Describe any section you want",
    },
    {
      type: "about_section",
      title: "About section",
      description: "Provide info about the company",
    },
    {
      type: "benefit_section",
      title: "Benefit section",
      description: "Explain the benefit of your offering",
    },
    {
      type: "benefits_section",
      title: "Benefits section",
      description: "Showcase key benefits",
    },
    {
      type: "blog_section",
      title: "Blog section",
      description: "Display blog posts",
    },
    {
      type: "contact_section",
      title: "Contact section",
      description: "Encourage visitors to contact company",
    },
    {
      type: "call_to_action_section",
      title: "Call to Action section",
      description: "Urge users to take action",
    },
    {
      type: "faq_section",
      title: "FAQ section",
      description: "Answer common questions",
    },
    {
      type: "feature_section",
      title: "Feature section",
      description: "Highlight a feature in details",
    },
    {
      type: "features_list_section",
      title: "Features list section",
      description: "Highlight core features",
    },
    {
      type: "gallery_section",
      title: "Gallery section",
      description: "Showcase images or media",
    },
    {
      type: "hero_section",
      title: "Hero section",
      description: "Highlight the main message",
    },
    {
      type: "logos_section",
      title: "Logos section",
      description: "Display logos of key customers",
    },
    {
      type: "portfolio_section",
      title: "Portfolio section",
      description: "Showcase portfolio items",
    },
    {
      type: "pricing_section",
      title: "Pricing section",
      description: "Display service or product prices",
    },
    {
      type: "reviews_section",
      title: "Reviews section",
      description: "Showcase customer reviews",
    },
    {
      type: "services_section",
      title: "Services section",
      description: "Explain a service in details",
    },
    {
      type: "services_list_section",
      title: "Services list section",
      description: "Showcase your solutions",
    },
    {
      type: "team_section",
      title: "Team section",
      description: "Introduce the team",
    },
    {
      type: "testimonials_section",
      title: "Testimonials section",
      description: "Showcase clients' success stories",
    },
    {
      type: "title_section",
      title: "Title section",
      description: "Display a page title",
    },
  ];

  const handleAddSection = (newSection, index) => {
    if (isHomeAddIconClicked) {
      setWebsiteData((prevData) => {
        return {
          ...prevData,
          pages: prevData.pages.map((page) => {
            if (page.page_title === "Home") {
              const updatedSections = [...page.sections];

              const footerIndex = updatedSections.findIndex(
                (section) => section.section_type === "footer"
              );

              const newSectionObj = {
                section_type: newSection.type,
                section_title: newSection.title,
                section_description: newSection.description,
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
              section_type: newSection.type,
              section_title: newSection.title,
              section_description: newSection.description,
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
        });

        return {
          ...prevData,
          pages: updatedPages,
        };
      });
    }
    if (isSectionAddIconClicked) {
      setWebsiteData((prevData) => {
        const updatedPages = [...prevData.pages];

        const updatedSections = [
          ...updatedPages[colIndexForAddSection].sections,
        ];
        const newSectionObj = {
          section_type: newSection.type,
          section_title: newSection.title,
          section_description: newSection.description,
        };

        updatedSections.splice(indexOfAddSection + 1, 0, newSectionObj);

        updatedPages[colIndexForAddSection] = {
          ...updatedPages[colIndexForAddSection],
          sections: updatedSections,
        };

        return {
          ...prevData,
          pages: updatedPages,
        };
      });
    }

    setIsSidebarOpen(false);
    setIsHomeAddIconClicked(false);
    setIsColAddIconClicked(false);
    setIsSectionAddIconClicked(false);
    setColIndex(null);
    setColIndexForAddSection(null);
    setIndexOfAddSection(null);
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
              (_, idx) => idx !== indexOfAddSection
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
    setIndexOfAddSection(null);
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
      const updatedPages = [...prevData.pages];
      const currentPage = updatedPages[0];
      const sections = [...currentPage.sections];

      const oldIndex = active.id;
      const newIndex = over.id;

      const draggingSection = sections[oldIndex];
      const targetSection = sections[newIndex];
      if (
        draggingSection.section_title === "Header" ||
        draggingSection.section_title === "Footer" ||
        targetSection.section_title === "Header" ||
        targetSection.section_title === "Footer"
      ) {
        return prevData;
      }

      const [movedSection] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, movedSection);

      updatedPages[0] = { ...currentPage, sections };
      return { ...prevData, pages: updatedPages };
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
        setSidebarDescription("");
        setSectionType("");
        setSidebarTitle("");
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
                      section_description:
                        editedDescription.trim() === ""
                          ? section.section_description
                          : editedDescription,
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
        setEditedDescription(null);
        setSidebarDescription("");
        setSectionType("");
        setIsTitlePopupOPen(false);
      }
    }

    if (isTitlePopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isTitlePopupOpen,
    sidebarTitle,
    sidebarDescription,
    editedSection,
    editedDescription,
  ]);

  return (
    <div className="main-container">
      {isSiteStrPopupOpen ? (
        <div
          className={`description-sidebar ${isClosing ? "closing" : ""}`}
          ref={siteStrRef}
        >
          <DescriptionSidebar
            websiteData={websiteData}
            isSiteStrPopupOpen={isSiteStrPopupOpen}
            setIsSiteStrPopupOpen={setIsSiteStrPopupOpen}
            siteStrRef={siteStrRef}
            setIsClosing={setIsClosing}
          />
        </div>
      ) : (
        <div
          className="description-sidebar-icon"
          onClick={() => setIsSiteStrPopupOpen(true)}
        >
          <FaAngleLeft />
          Site's structure
        </div>
      )}
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
                  setSidebarDescription(sidebarSection.description);
                  setSectionType(sidebarSection.type);
                  handleAddSection(sidebarSection, index);
                  setEditedSection(sidebarSection.title);
                  setEditedDescription(sidebarSection.description);
                  setIsTitlePopupOPen(true);
                  if (isHomeAddIconClicked) {
                    setRemoveIndex(0);
                  } else {
                    setRemoveIndex(colIndex);
                  }
                  if (isSectionAddIconClicked) {
                    setRemoveIndex(colIndexForAddSection);
                  }
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
              value={editedDescription}
              onChange={(e) => {
                setEditedDescription(e.target.value);
              }}
              className="textarea-field"
            ></textarea>

            <label>Section Type</label>
            <input
              disabled
              type="text"
              value={sectionType}
              className="input-field section-type"
            />
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
        <div
          className={`popup-container `}
          ref={popupRef}
        >
          <div className="popup-content">
            <h3>Add new page title</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={popupTitle}
              onChange={(e) => setPopupTitle(e.target.value)}
            />
            <button
              className={`proceed-button ${
                popupTitle.trim() === "" ? "btn-disable" : "btn-enable"
              }`}
              disabled={popupTitle.trim() === "" ? true : false}
              onClick={() => handleAddPage()}
            >
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
              modifiers={[restrictToWindowEdges]}
            >
              <SortableContext
                items={websiteData.pages[0].sections
                  .map((section, idx) =>
                    ["Header", "Footer"].includes(section.section_title)
                      ? null
                      : idx
                  )
                  .filter(Boolean)}
                strategy={verticalListSortingStrategy}
              >
                {websiteData.pages[0].sections.map((section, sectionIndex) => {
                  const isDisabled =
                    section.section_title === "Header" ||
                    section.section_title === "Footer";

                  return (
                    <SortableItem
                      key={sectionIndex}
                      id={sectionIndex}
                      disabled={isDisabled}
                    >
                      <div className="section">
                        <span className="section-title">
                          {section.section_title}
                        </span>
                        {!isDisabled && (
                          <>
                            <span
                              className="pencil-icon"
                              onClick={(e) => {
                                // e.stopPropagation();
                                setSidebarTitle(section.section_title);
                                setSidebarDescription(
                                  section.section_description
                                );
                                setIsTitlePopupOPen(true);
                                setEditedSection(section.section_title);
                                setEditedDescription(
                                  section.section_description
                                );
                                setRemoveIndex(0);
                                setIndexOfAddSection(sectionIndex);
                                setSectionType(section.section_type);
                              }}
                            >
                              <MdEdit size={14} />
                            </span>
                          </>
                        )}
                        {section.section_title !== "Footer" && (
                          <span
                            className="hover-plus-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsSectionAddIconClicked(true);
                              setIndexOfAddSection(sectionIndex);
                              setColIndexForAddSection(0);
                              setIsSidebarOpen(true);
                            }}
                          >
                            <IoMdAdd />
                          </span>
                        )}
                      </div>
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
          modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
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
                            <span style={{ fontSize: "13px", width: "80%" }}>
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
                          modifiers={[restrictToWindowEdges]}
                          onDragEnd={(event) =>
                            handleLowerPageDragEnd(event, pageIndex)
                          }
                        >
                          <SortableContext
                            items={websiteData.pages[pageIndex].sections
                              .map((section, idx) =>
                                ["Header", "Footer"].includes(
                                  section.section_title
                                )
                                  ? null
                                  : `${pageIndex}-${idx}`
                              )
                              .filter(Boolean)}
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
                                >
                                  <div className="section">
                                    <span className="section-title">
                                      {" "}
                                      {section.section_title}
                                    </span>

                                    {section.section_title !== "Header" &&
                                      section.section_title !== "Footer" && (
                                        <span
                                          className="pencil-icon"
                                          onClick={(e) => {
                                            if (
                                              section.section_title ===
                                                "Header" ||
                                              section.section_title === "Footer"
                                            )
                                              return;
                                            setSidebarTitle(
                                              section.section_title
                                            );
                                            setIsTitlePopupOPen(true);
                                            setEditedSection(
                                              section.section_title
                                            );
                                            setEditedDescription(
                                              section.section_description
                                            );
                                            setSidebarDescription(
                                              section.section_description
                                            );
                                            setRemoveIndex(pageIndex);
                                            setIndexOfAddSection(sectionIndex);
                                            setSectionType(
                                              section.section_type
                                            );
                                          }}
                                        >
                                          <MdEdit size={14} />
                                        </span>
                                      )}

                                    {section.section_title !== "Footer" && (
                                      <span
                                        className="hover-plus-icon"
                                        onClick={(e) => {
                                          setIsSectionAddIconClicked(true);
                                          setIndexOfAddSection(sectionIndex);
                                          setColIndexForAddSection(pageIndex);
                                          setIsSidebarOpen(true);
                                        }}
                                      >
                                        <IoMdAdd />
                                      </span>
                                    )}
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
      {/* <div className="footer-block">
        <div className="container">
          <div className="footcol product-by">
            Powered by{" "}
            <a href="https://42works.net/" target="_blank">
   
              <img src="../../svg-image-1.svg" alt="42 Works" />
            </a>
            .{" "}All Rights Reserved.
          </div>
        </div>
      </div> */}


      <div className="db-actions-line ng-star-inserted active">
      <div className="footcol product-by">
            Powered by{" "}
            <a href="https://42works.net/" target="_blank">
              {/* <img src="./42-logo.svg" /> Works */}
              <img src="../../svg-image-1.svg" alt="42 Works" />
            </a>
            .{" "}All Rights Reserved.
          </div>
        <ul className="db-steps item 4">
          <li className="active ng-star-inserted">
            <span>SITE INFO</span>
          </li>
          <li className="active ng-star-inserted">
            <span>PAGES</span>
          </li>
          <li className="ng-star-inserted color-font-step active">
            <span style={{color:"#ccc"}}>COLORS &amp; FONTS</span>
          </li>
        </ul>
    
       <a className="ds-btn-m ds-btn-outline item"  onClick={()=>{
            navigate('/color-template', {state:{jsonData}} )
           
            }} >
          <span>Next</span>
        </a>
       
      
      </div>

    </div>
  );
};

export default Website;
