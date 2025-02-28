import React, { useEffect, useRef, useState } from "react";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { marked } from "marked";
import CardsBoard from "./CardsBoard";
import WebsiteBuild from "./components/WebsiteGenerator";
import Website from "./components/Website";

const App = () => {
  const [pages, setPages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [initialData,setInitialData]=useState('')
  const navigate = useNavigate();
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
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
            section_type: z.string(), // Section type in slug format
            section_title: z.string(),
            section_description: z.string(),
          })
        ),
      })
    ),
  });
  const handlePromptSubmit = async (event) => {
    event.preventDefault();
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
                    4. Omit header and footer sections from all pages.
                    5. Ensure the homepage features a Hero section along with other relevant sections.
                    6. Include a Banner section on all pages except the homepage, with the page title as the section title.
                    7. Use slug format for both page_type and section_type.
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
      console.log(returnData);
      setInitialData(returnData)
      navigate("/web-test/website-building");
    } else {
      alert("Please describe your website in a few words.");
    }
    setPrompt("");
  };

  useEffect(() => {}, []);

  return (
    <div className="main-container">
      <Routes>
        <Route
          path="/web-test"
          element={
            <div className="form-container">
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
            </div>
          }
        />
        <Route path="/web-test/website-building" element={<Website/>}/>
        {/* <Route path="/web-test/website-building" element={<WebsiteBuild />} /> */}
        {/* <Route path="/web-test/website-building" element={<CardsBoard />} /> */}
      </Routes>
    </div>
  );
};

export default App;
