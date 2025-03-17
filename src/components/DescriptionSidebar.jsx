import React, { useEffect, useRef } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
const DescriptionSidebar = ({
  websiteData,
  isSiteStrPopupOpen,
  setIsSiteStrPopupOpen,
  siteStrRef,
  setIsClosing,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (siteStrRef.current && !siteStrRef.current.contains(event.target)) {
        setIsClosing(true);
        setTimeout(() => {
          setIsSiteStrPopupOpen(false);
          setIsClosing(false);
        }, 500);
      }
    }

    if (isSiteStrPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSiteStrPopupOpen]);

  return (
    <div className="description-sidebar-container">
      <div className="description-top">
        <div className="description-sidebar-title">
          <div>Your site's structure</div>
          <div
            className="desc-cross-icon"
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                setIsSiteStrPopupOpen(false);
                setIsClosing(false);
              }, 500);
            }}
          >
            <RxCross2 />
          </div>
        </div>
        <div className="description-sidebar-subtitle">
          The structure is based on your site brief
        </div>
        <div className="site-brief-info">
          <div className="site-brief-title">site brief</div>
          <div className="site-brief-info-items">
            <div className="site-brief-info-item">
              <div className="site-label">Website name</div>
              <div className="brief-info-value-div">
                <div className="brief-info-value">
                  {websiteData.website_title}
                </div>
              </div>
            </div>
            <div className="site-brief-info-item">
              <div className="site-label">Website type</div>
              <div className="brief-info-value-div">
                <div className="brief-info-value">{websiteData.website_type}</div>
              </div>
            </div>
            <div className="site-brief-info-item">
              <div className="site-label">Industry</div>
              <div className="brief-info-value-div">
                <div className="brief-info-value">{websiteData.website_industry}</div>
              </div>
            </div>
            <div className="site-brief-info-item">
              <div className="site-label">Number of pages</div>
              <div className="brief-info-value-div">
                <div className="brief-info-value">
                  {websiteData.pages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-brief-description">
          <div className="desc-title">Enhanced site description</div>
          <div className="desc-description">
            {websiteData.website_description}
          </div>
        </div>
      </div>
      <div className="description-bottom">
        <div className="desc-icon">
          <BsInfoCircleFill />
        </div>
        <p className="desc-para">You can always customize it later.</p>
      </div>
    </div>
  );
};

export default DescriptionSidebar;
