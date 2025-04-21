import React, { useState } from "react";
import "./ColorTemplatePage.css";
import emptyImage from "../assets/icons8-empty-64.png";
import { useLocation, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
const ColorTemplatePage = () => {
  const [theme, setTheme] = useState("material");
  const [colors, setColors] = useState("blue-grey");
  const [fonts, setFonts] = useState("material-font");
  const navigate=useNavigate()
    const location = useLocation();
    const returnData = location.state.jsonData ?? {};
  console.log("jsonData", returnData);
  console.log("colors",colors)
  console.log("theme",theme)
  console.log("fonts",fonts)
  return (
    <>
      <div className="website-customizer-box">
        <section
          className={`website-customizer-container ${fonts} ${theme} ${colors}`}
        >
          <div className="website-customizer-body-container">
            <div className="website-customizer-body">
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
              <div
                onClick={() => setColors("cyan-grey")}
                className={`AI color-item suggested ng-star-inserted cyan-grey ${
                  colors === "cyan-grey" ? "selected" : ""
                }  `}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(26, 188, 156)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(108, 117, 125)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("blue-brown")}
                className={`Indigo color-item ng-star-inserted ${
                  colors === "blue-brown" ? "selected" : ""
                } `}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(40, 53, 102)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(152, 100, 36)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("blue-grey")}
                className={`Han blue color-item ng-star-inserted  ${
                  colors === "blue-grey" ? "selected" : ""
                } `}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(58, 91, 204)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(137, 137, 137)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("pink-grey")}
                className={`Orchid color-item pink ng-star-inserted  ${
                  colors === "pink-grey" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(227, 54, 101)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(137, 137, 137)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("green-parrot")}
                className={`Basque color-item green ng-star-inserted ${
                  colors === "green-parrot" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(90, 94, 50)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(219, 199, 91)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("red-pink")}
                className={`Red berry color-item ng-star-inserted ${
                  colors === "red-pink" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(95, 25, 40)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(222, 135, 194)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("darkblue-grey")}
                className={`Purplish blue color-item ng-star-inserted ${
                  colors === "darkblue-grey" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(88, 51, 241)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(137, 137, 137)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("purple-yellow")}
                className={`Obsidian color-item shell ng-star-inserted ${
                  colors === "purple-yellow" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(130, 31, 160)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(244, 199, 48)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("brown-green")}
                className={`Beagle brown color-item ng-star-inserted ${
                  colors === "brown-green" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(141, 109, 54)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(158, 189, 89)" }}
                  ></div>
                </div>
              </div>
              <div
                onClick={() => setColors("orange-grey")}
                className={`Aurora color-item orange ng-star-inserted ${
                  colors === " orange-grey" ? "selected" : ""
                }`}
              >
                <div className="color-set-container">
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(237, 103, 68)" }}
                  ></div>
                  <div
                    className="color"
                    style={{ backgroundColor: "rgb(167, 162, 160)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="style-picker-container">
            <span className="title-small mb10">Themes</span>
            <div className="db-styles mt10">
              <div
                onClick={() => {
                  setTheme("classic");
                  setFonts("classic-font");
                }}
                className={`classNameic db-style ng-star-inserted ${
                  theme === "classic" ? "selected" : ""
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
                className={`db-style flat ng-star-inserted ${
                  theme === "flat" ? "selected" : ""
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
                className={`db-style material ng-star-inserted ${
                  theme === "material" ? "selected" : ""
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
                className={`db-style minimalistic ng-star-inserted ${
                  theme === "minimalistic" ? "selected" : ""
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
                className={`db-style soft ng-star-inserted ${
                  theme === "soft" ? "selected" : ""
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
        </div>
      </div>
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
          <li className="ng-star-inserted active">
            <span>COLORS &amp; FONTS</span>
          </li>
        </ul>
       <div className="back-generate-div">
       <a className="ds-btn-m ds-btn-outline item" onClick={()=>navigate('/site-structure', {state:{returnData}})} >
          <span >Back</span>
        </a>
        <a className="ds-btn-purple-blue ds-btn-m item ng-star-inserted">
          <i className="db-icon db-icon-ds-ai-generate mr8"></i>
          <span>Generate</span>
        </a>
       </div>
      </div>
    </>
  );
};

export default ColorTemplatePage;
