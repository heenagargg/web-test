import React, { useState } from 'react'
import './Website.css'
import { FaPlus } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
const Website = () => {
  const [isSidebarOpen,setIsSidebarOpen]=useState(null)
  const [isHomeAddIconClicked,setIsHomeAddIconClicked]=useState(null)
  const [isColAddIconClicked,setIsColAddIconClicked]=useState(null)
  const [colIndex,setColIndex]=useState(null)
   const [websiteData, setWebsiteData] = useState({
      website_title: "John Doe's Portfolio",
      website_description: "Showcasing 7+ years of expertise in web design, John Doe's Portfolio highlights innovative designs and successful projects, while providing insights into the crafting of user-friendly and engaging web experiences.",
      pages: [
        {
          page_type: "home",
          page_title: "Home",
          page_description: "Welcome to my portfolio, where creativity meets functionality in web design.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "hero",
              section_title: "Hero",
              section_description: "Explore my journey as a web designer with over 7 years of experience."
            },
            {
              section_type: "about_us",
              section_title: "About Us",
              section_description: "I'm a passionate web designer dedicated to producing stunning and effective websites."
            },
            {
              section_type: "services",
              section_title: "Services",
              section_description: "Services I offer to my clients."
            },
            {
              section_type: "contact_us",
              section_title: "Contact Us",
              section_description: "Get in touch for collaborations or inquiries."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        },
        {
          page_type: "about",
          page_title: "About Us",
          page_description: "Learn more about my background and design philosophy.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "about_company",
              section_title: "About DigiElevate",
              section_description: "Learn about our company and values."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        },
        {
          page_type: "case_studies",
          page_title: "Case Studies",
          page_description: "A compilation of my projects, showcasing my design capabilities and style.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "approach",
              section_title: "Our Approach to Success",
              section_description: "How we tackle each project to ensure success."
            },
            {
              section_type: "featured_cases",
              section_title: "Featured Case Studies",
              section_description: "Explore a selection of our top projects."
            },
            {
              section_type: "call_to_action",
              section_title: "Ready to Elevate Your Brand?",
              section_description: "Get in touch to start your next project."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        },
        {
          page_type: "services",
          page_title: "Services",
          page_description: "Explore the range of services I offer.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "digital_marketing",
              section_title: "Digital Marketing Services",
              section_description: "Our comprehensive digital marketing solutions."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        },
        {
          page_type: "contact",
          page_title: "Contact",
          page_description: "Get in touch for collaborations or inquiries.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "contact_form",
              section_title: "Contact DigiElevate",
              section_description: "Fill in the form below to reach out."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        },
        {
          page_type: "blog",
          page_title: "Blog",
          page_description: "Read our latest articles and insights.",
          sections: [
            {
              section_type: "header",
              section_title: "Header",
              section_description: ""
            },
            {
              section_type: "blog_content",
              section_title: "DigiElevate Blog",
              section_description: "Latest articles and insights."
            },
            {
              section_type: "recent_posts",
              section_title: "Recent Blog Posts",
              section_description: "Check out our newest content."
            },
            {
              section_type: "newsletter",
              section_title: "Related Content/Newsletter Signup",
              section_description: "Subscribe to our newsletter."
            },
            {
              section_type: "footer",
              section_title: "Footer",
              section_description: ""
            }
          ]
        }
      ]
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


    const handleAddSection=(newSection,index)=>{
      if(isHomeAddIconClicked){
        // setWebsiteData((prevData) => {
        //   return {
        //     ...prevData,
        //     pages: prevData.pages.map((page) => {
        //       if (page.page_type === "home") {
        //         return {
        //           ...page,
        //           sections: [
        //             ...page.sections,
        //             {
        //               section_type: "",
        //               section_title: newSection.title,
        //               section_description: "",
        //             },
        //           ],
        //         };
        //       }
        //       return page;
        //     }),
        //   };
        // });
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
      setIsSidebarOpen(false)
      setIsHomeAddIconClicked(false)
    }

  return (
    <div className='container'>
      {
        isSidebarOpen && (
          <div className="sidebar">
            <h2 className='sidebar-title'>Add Sections</h2>
            <div className='sidebar-list'>
              {SidebarSections.map((sidebarSection,index)=>(
                <div key={index} className='sidebar-section-item' onClick={()=>{
                
                  handleAddSection(sidebarSection,index)}}>
                  <div className="sidebar-text">
                    <p className='sidebar-section-title'>{sidebarSection.title}</p>
                    <div className="sidebar-section-description">{sidebarSection.description}</div>
                  </div>
                  <div className="plus-icon-div">
                    <FaPlus className='plus-icon' size={10} opacity={0.5}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      <div className="homePage-container">
        <div className="homePage">
          <div className="page-header">
            <div className="page-header-title">
              <span><FaHome /></span>
              <span>Home Page</span>
            </div>
            <div className="add-btn" onClick={()=>{
                setIsHomeAddIconClicked(true)
              setIsSidebarOpen(true)}}>
              <span>+</span>
            </div>
          </div>
          <div className="page-content">
            {websiteData.pages[0].sections.map((section,sectionIndex)=>{
              return (
                <div key={sectionIndex} className='section'>
                  {section.section_title}
                  </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="add-page-container">
        <button className='add-page-btn'>
          <span className='add-page-btn-icon'>+</span>
          Add Page
        </button>
      </div>



      <div className="lower-pages-container">
        {websiteData.pages.slice(1).map((page,index)=>{
          const pageIndex=index+1
          return (
            <div key={pageIndex} className='lower-page'>
              <div className="lower-page-header">
                <div className="lower-page-title">
                  <span style={{marginTop:'2px'}}><FaRegFile /></span>
                  <span>{page.page_title}</span>
                </div>
                <div className="add-btn" onClick={()=>{
                setIsColAddIconClicked(true)
              setIsSidebarOpen(true)}}>
              <span>+</span>
            </div>
              </div>
              <div>
                {page.sections.map((section,sectionIndex)=>{
                  return(
                    <div className='section' key={sectionIndex}>
                      {section.section_title}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Website