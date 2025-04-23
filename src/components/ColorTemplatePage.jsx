import React, { useRef, useState } from "react";
import "./ColorTemplatePage.css";
import emptyImage from "../assets/icons8-empty-64.png";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import ColorThief from "colorthief";
const colorThief = new ColorThief();
const ColorTemplatePage = () => {
  const imgRef = useRef();
  const [theme, setTheme] = useState("material");
  const [logoURL, setLogoURL] = useState("");
  const [colors, setColors] = useState([
    [[26, 188, 156], [108, 117, 125]],
    [[40, 53, 102], [152, 100, 36]],
    [[58, 91, 204], [137, 137, 137]],
    [[227, 54, 101], [137, 137, 137]],
    [[90, 94, 50], [219, 199, 91]],
    [[95, 25, 40], [222, 135, 194]],
    [[88, 51, 241], [137, 137, 137]],
    [[130, 31, 160], [244, 199, 48]],
    [[141, 109, 54], [158, 189, 89]],
    [[237, 103, 68], [167, 162, 160]]
  ]);
  const [activeColor, setActiveColor] = useState([[26, 188, 156], [108, 117, 125]]);
  const [fonts, setFonts] = useState("material-font");
  const navigate = useNavigate()
  const location = useLocation();
  const returnData = location.state.jsonData ?? {};
  console.log("jsonData", returnData);
  console.log("color", activeColor)
  console.log("theme", theme)
  console.log("fonts", fonts)
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp']

  const handleLogoUpload = (e) => {
    e.preventDefault();
    let elem = e.currentTarget;

    let selectedFiles = elem.files;
    if (selectedFiles.length) {
      let fileObj = selectedFiles[0];

      if (allowedFileTypes.includes(fileObj.type)) {
        var imgDataUrl = URL.createObjectURL(fileObj);
        imgRef.current.src = imgDataUrl;
      } else {
        elem.value = "";
        alert("Please select an image file");
      }
    }
  }

  const getColors = () => {
    // Make sure image is loaded
    if (imgRef.current.complete) {
      var colorPallete = colorThief.getPalette(imgRef.current, 2)
      colors.push(colorPallete)
      setColors([...colors])
      setActiveColor(colorPallete)
    }
  }

  const generateColor = (color, index) => {
    if (typeof (color) === "object" && color.length >= index) {
      return "rgb(" + color[index].toString() + ")";
    } else {
      return "rgb(0,0,0)";
    }
  }
  return (
    <>
      <div className="website-customizer-box" style={{ '--accentColor': generateColor(activeColor, 0), '--secondaryColor': generateColor(activeColor, 1) }} >
        <section
          className={`website-customizer-container ${fonts} ${theme}`}
        >
          <div className="website-customizer-body-container">
            <div className="website-customizer-body">
              <img src="" alt="Site Logo" ref={imgRef} className="site-logo-main" onLoad={getColors} />
              <div className="website-customizer-image-section mb25">
                <div className="section-image-container">
                  <img src={emptyImage} alt="empty-img" />
                </div>
                <div className="section-main-container">
                  <div className="subtitle">Overline</div>
                  <div className="title">
                    See how our
                    <br />
                    display text
                    <br />
                    enhances appeal.
                  </div>
                  <div className="description">
                    This is a clear example of body large
                    <br />
                    text, showcasing its readability and
                    <br />
                    impact on visual hierarchy.
                  </div>
                  <div className="actions">
                    <button className="main-btn">Button</button>
                    <button className="secondary-btn">Button</button>
                  </div>
                </div>
              </div>
              <div className="website-customizer-card-section mb60">
                <div className="section-action-container">
                  <div className="section-action-user-container">
                    <div className="user-avatar-container"></div>
                    <div className="user-info-container">
                      <div>Name Surname</div>
                      <div>@username</div>
                    </div>
                  </div>
                  <div className="section-description-container mt20 mb20">
                    This is a detailed example of review text, highlighting its
                    clarity and
                    <br />
                    effectiveness in providing comprehensive feedback. It
                    ensures that all
                    <br />
                    aspects are covered, making it easier for readers to
                    understand and
                  </div>
                  <div className="section-actions-container">
                    <div>
                      <i className="db-icon db-icon-back">
                        <IoIosArrowRoundBack />
                      </i>
                    </div>
                    <div>
                      <i className="db-icon db-icon-back2">
                        <IoIosArrowRoundForward />
                      </i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="website-customizer-contact-section">
                <div className="section-contact-container">
                  <div className="section-contact-header-container">
                    Contact us
                  </div>
                  <div className="contact-input-container mb20">
                    <label className="input-label mb10">Email</label>
                    <input placeholder="Placeholder" />
                  </div>
                  <div className="contact-input-container mb24">
                    <label className="input-label mb10">Message</label>
                    <input placeholder="Placeholder" />
                  </div>
                  <div className="contact-checkbox">
                    <input
                      type="checkbox"
                      // checked=""
                      id="contact-check"
                      className="custom-checkbox"
                    />
                    <label
                      htmlFor="contact-check"
                      className="ds-checkbox-label green"
                    >
                      <span>
                        I accept the <strong>Terms</strong>
                      </span>
                    </label>
                  </div>
                  <button className="main-btn">Button</button>
                </div>
                <div className="section-contact-image-container">
                  <img src={emptyImage} alt="empty-img" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="db-design">
          <div className="title mb8">Style your future website</div>
          <div className="description mb30">
            Play with fonts, colors, and styles to craft the
            <br />
            look of your future website.
          </div>
          <div className="color-picker-container mb24">
            <span className="title-small mb6">Colors</span>
            <div className="db-list">
              {colors.map((color) => {
                console.log(color);
                return <div
                  onClick={() => setActiveColor(color)}
                  className={`AI color-item suggested ${color === activeColor ? "selected" : ""
                    }`}
                >
                  <div className="color-set-container">
                    <div
                      className="color"
                      style={{ backgroundColor: generateColor(color, 0) }}
                    ></div>
                    <div
                      className="color"
                      style={{ backgroundColor: generateColor(color, 1) }}
                    ></div>
                  </div>
                </div>
              })}

            </div>
          </div>
          <div className="style-picker-container mb24">
            <span className="title-small mb10">Themes</span>
            <div className="db-styles mt10">
              <div
                onClick={() => {
                  setTheme("classic");
                  setFonts("classic-font");
                }}
                className={`classNameic db-style ${theme === "classic" ? "selected" : ""
                  }`}
              >
                <div>
                  <span className="theme-title">Classic</span>
                  <span className="theme-paragraph">
                    This is your paragraph.
                  </span>
                </div>
                <a className="classNameic theme-btn">
                  <span>Button</span>
                </a>
              </div>
              <div
                onClick={() => {
                  setTheme("flat");
                  setFonts("flat-font");
                }}
                className={`db-style flat ${theme === "flat" ? "selected" : ""
                  }`}
              >
                <div>
                  <span className="theme-title">Flat</span>
                  <span className="theme-paragraph">
                    This is your paragraph.
                  </span>
                </div>
                <a className="flat theme-btn">
                  <span>Button</span>
                </a>
              </div>
              <div
                onClick={() => {
                  setTheme("material");
                  setFonts("material-font");
                }}
                className={`db-style material ${theme === "material" ? "selected" : ""
                  }`}
              >
                <div>
                  <span className="theme-title">Material</span>
                  <span className="theme-paragraph">
                    This is your paragraph.
                  </span>
                </div>
                <a className="material theme-btn">
                  <span>Button</span>
                </a>
              </div>
              <div
                onClick={() => {
                  setTheme("minimalistic");
                  setFonts("minimalistic-font");
                }}
                className={`db-style minimalistic ${theme === "minimalistic" ? "selected" : ""
                  }`}
              >
                <div>
                  <span className="theme-title">Minimalistic</span>
                  <span className="theme-paragraph">
                    This is your paragraph.
                  </span>
                </div>
                <a className="minimalistic theme-btn">
                  <span>Button</span>
                </a>
              </div>
              <div
                onClick={() => {
                  setTheme("soft");
                  setFonts("soft-font");
                }}
                className={`db-style soft ${theme === "soft" ? "selected" : ""
                  }`}
              >
                <div>
                  <span className="theme-title">Soft</span>
                  <span className="theme-paragraph">
                    This is your paragraph.
                  </span>
                </div>
                <a className="soft theme-btn">
                  <span>Button</span>
                </a>
              </div>
            </div>
          </div>
          <div className="custom-color-container mb24">
            <span class="title-small mb6">Add Logo</span>
            <div className="logo-color-theif">
              <input type="file" accept=".png,.jpg,.jpeg" onChange={handleLogoUpload} />
            </div>
          </div>

        </div>
      </div>
      <div className="db-actions-line active">
        <div className="footcol product-by">
          Powered by{" "}
          <a href="https://42works.net/" target="_blank">
            {/* <img src="./42-logo.svg" /> Works */}
            <img src="../../svg-image-1.svg" alt="42 Works" />
          </a>
          .{" "}All Rights Reserved.
        </div>
        <ul className="db-steps item 4">
          <li className="active">
            <span>SITE INFO</span>
          </li>
          <li className="active">
            <span>PAGES</span>
          </li>
          <li className="active">
            <span>COLORS &amp; FONTS</span>
          </li>
        </ul>
        <div className="back-generate-div">
          <a className="ds-btn-m ds-btn-outline item" onClick={() => navigate('/site-structure', { state: { returnData } })} >
            <span >Back</span>
          </a>
          <a className="ds-btn-purple-blue ds-btn-m item">
            <i className="db-icon db-icon-ds-ai-generate mr8"></i>
            <span>Generate</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ColorTemplatePage;
