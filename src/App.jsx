import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { useNavigate } from "react-router-dom";
import logoGif from "./assets/fade-stagger-circles.svg";
import { marked } from "marked";
import TextAnimation from "./components/TextAnimation";

const App = () => {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const examplesTexts = [
    "A freelance website of a web developer",
    "Portfolio showcasing graphic design work",
    "A blog showcasing travel and photography",
    "Website for SEO and Marketing agency",
    "LunaGems is a handmade jewelry shop",
  ];
  const [prompt, setPrompt] = useState("");
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const sectionTypeEnums = z.enum([
    "header",
    "footer",
    "banner",
    "hero",
    "about",
    "benefit",
    "post_grid",
    "contact",
    "call_to_action",
    "faq",
    "feature_highlight",
    "features_list",
    "social_proof",
    "gallery",
    "hero",
    "banner",
    "reviews",
    "testimonials",
    "pricing_table",
    "menu_listing",
    "informational_content_with_media",
    "informational_content_without_media",
  ]);
  const returnSchema = z.object({
    website_title: z.string(),
    website_description: z.string(),
    pages: z.array(
      z.object({
        page_type: z.string(), // Page type in slug format
        page_title: z.string(),
        page_description: z.string(),
        sections: z.array(
          z.object({
            section_type: sectionTypeEnums, // Section type in slug format
            section_title: z.string(),
            section_description: z.string(),
          })
        ),
      })
    ),
  });
  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (prompt) {
      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that suggests a website title, website description, and all pages with their respective sections for a website based on the given user prompt and return your response in the required JSON format.
                    Instructions to follow:
                    1. Create up to 5 pages for each website. Exclude any blog pages.
                    2. Propose a suitable website title and a concise website description based on the provided website idea.
                    3. Design an informational website with a contact form included on the contact page only.
                    4. Include a Header as a first section on all pages with section title as "Header".
                    5. Include a Footer as a last section on all pages with section title as "Footer".
                    6. Ensure the homepage features a Hero section along with other relevant sections.
                    7. Include a Banner section on all pages except the homepage, with the page title as the section title.
                    8. Use slug format for both page_type and section_type.
                    9. For "section_description": Describe what the section is about in concise and clear language. Outline the main purpose and key points the section intends to communicate.
                    `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: zodResponseFormat(returnSchema, "websiteUI"),
      });

      const returnData = completion.choices[0].message.parsed;
      navigate("/site-structure", { state: { returnData } });
      setIsLoading(false);
    } else {
      alert("Please describe your website in a few words.");
    }
    setPrompt("");
  };

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-div">
          <img
            className="form-img"
            src="./bloxby.svg"
            alt="Bloxby"
            width={200}
          />
          <img
            src={logoGif}
            alt="loading..."
            height="100px"
            style={{ marginTop: "-24px", marginBottom: "10px" }}
          />
          <TextAnimation />
        </div>
      ) : (
        <div className="main-container-1">
          <div className="form-container">
            <img
              className="form-img"
              src="./bloxby.svg"
              alt="Bloxby"
              width={200}
            />
            <h1 className="form-heading">What can I help you with?</h1>
            <form action="" id="userPromptForm" onSubmit={handlePromptSubmit}>
              <div className="form-control">
                <textarea
                  placeholder="Provide your website name and describe it in a few words."
                  className="input-control"
                  name="user_prompt"
                  id="userPromptInput"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                ></textarea>
              </div>
              <div className="form-control">
                <button className="submit-control btn-custom" type="submit">
                  Generate Your Website
                </button>
              </div>
            </form>
            <div className="examples">
              <div className="examples-container">
                <div className="examples_items">
                  <div className="items">
                    {examplesTexts.map((element, i) => {
                      return (
                        <div className="example" key={"example" + i}>
                          <span
                            className="text"
                            onClick={() => {
                              setPrompt(element);
                            }}
                          >
                            {element}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="examples_items">
                  <div className="items">
                    {examplesTexts.map((element, i) => {
                      return (
                        <div
                          className="example"
                          key={"example" + (examplesTexts.length + i)}
                        >
                          <span className="text">{element}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-block">
            <div className="container">
              {/* <div className="footcol copyright">@copyright { new Date().getFullYear() }. All rights reserved</div> */}
              <div className="footcol product-by">
                Powered by{" "}
                <a href="https://42works.net/" target="_blank">
                  {/* <img src="./42-logo.svg" /> Works */}
                  <img src="../svg-image-1.svg" alt="42 Works" />
                </a>
                .{" "}All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
