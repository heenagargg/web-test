import React, { useEffect, useRef, useState } from "react";
import OpenAI from 'openai';
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { useNavigate } from "react-router-dom";
import logoGif from "./assets/fade-stagger-circles.svg"
import { marked } from 'marked';
import TextAnimation from "./components/TextAnimation";


const App = () => {
    const [pages, setPages] = useState([]);
    const [isLoading,setIsLoading]=useState(null)
    const navigate = useNavigate();
    const examplesTexts = [
                        "A freelance website of a web developer",
                        "Portfolio showcasing graphic design work",
                        "A blog showcasing travel and photography",
                        "Website for SEO and Marketing agency",
                        "LunaGems is a handmade jewelry shop"
                    ];
    const [prompt, setPrompt] = useState("");
    const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    const sectionTypeEnums = z.enum(["header", "footer", "banner", "hero",  "about", "benefit", "posts_grid", "latest_posts", "contact", "call_to_action", "faq", "feature_highlight", "features_list", "social_proof", "gallery", "hero", "banner", "reviews", "service_detail", "testimonials", "pricing_table", "menu_listing", "informational_content_with_media", "informational_content_without_media"]);
    const returnSchema = z.object({
        website_title: z.string(),
        website_description: z.string(),
        website_type: z.string(),
        website_industry: z.enum(["Technology", "Finance", "Healthcare", "Education", "Entertainment", "Media & Publishing", "Real Estate", "Travel & Hospitality", "Automotive", "Non-Profit Organization", "Fashion", "Food & Beverage", "Beauty & Wellness", "Construction", "Legal Services", "Consulting"]),
        pages: z.array(
            z.object({
                page_type: z.string(), // Page type in slug format
                page_title: z.string(),
                page_description: z.string(),
                sections: z.array(
                    z.object({
                        section_type: sectionTypeEnums, // Section type in slug format
                        section_title: z.string(),
                        section_description: z.string()
                    })
                )
            })
        )
    });
    const handlePromptSubmit =  async (event) => {
        event.preventDefault();
        if( prompt ) {
            setIsLoading(true)
            const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `You are a helpful assistant that suggests website_type, website_industry and then generates website_title, website_description, and all pages with their respective sections for a website based on the suggested website_type, website_industry and given user prompt and return your response in the required JSON format.
                    Instructions to follow:
                    1. Personal Websites: If the website is a personal website, reference it as "my website" and all sections should say "me".
                    2. Minimum Pages: Propose at least 5 pages for any website.
                    3. Home Page:
                        3a. Create 5-7 distinct sections for the homepage.
                        3b. If the website provides services, create a features_list section on homepage.
                        3c. Include a "call to action" as the final section to engage visitors.
                    4. Service Page:
                        4a. If the website provides services, create a dedicated service page.
                        4b. Include one section per service, ending with a "call to action."
                    5. Blog Integration:
                        5a. For websites that support blogs, include a blog page.
                        5b. Add a posts_grid section to the blog page.
                        5c. Place a latest_posts section on the homepage, positioned as the second-to-last section.
                    6. Title and Description: Recommend a clear, relevant website title and a concise description based on the provided website type, industry, and idea.
                    7. Contact Page: For informational websites, include a contact page with a form. This should be the sole location for the contact form.
                    8. Universal Sections:
                        8a. Start all pages with a "Header" section titled "Header."
                        8b. Conclude all pages with a "Footer" section titled "Footer."
                        8c. On all pages except the homepage, include a "Banner" section using the page title as the section name.
                    9. Homepage Specifics: Ensure the homepage begins with a "Hero" section, complemented by other relevant sections.
                    10. Formatting:
                        10a. Use "slug" format for page_type and section_type fields.
                        10b. For section_description, provide concise, clear language that highlights the section’s purpose and key points.
                    ` 
                },
                { 
                    role: "user", 
                    content: prompt 
                },
            ],
            response_format: zodResponseFormat(returnSchema, "websiteUI"),
            });
           
            const returnData = completion.choices[0].message.parsed;
            navigate('/site-structure', {state:{returnData}} );
            setIsLoading(false)
          
        }else{
            alert("Please describe your website in a few words.");
        }
        setPrompt("");
    }

  useEffect(() => {
  }, []);


  return (
   <>
   {
    isLoading?
    <div className="loading-div">
        <img className="form-img" src="./bloxby.svg" alt="Bloxby" width={200} />
        <img src={logoGif} alt="loading..." height='100px' style={{marginTop:'-24px',marginBottom:'10px'}} />
        <TextAnimation/>
    </div>:
     <div className="main-container">
     <div className="form-container">
         <img className="form-img" src="./bloxby.svg" alt="Bloxby" width={200} />
         <h1 className="form-heading">What can I help you with?</h1>
         <form action="" id="userPromptForm" onSubmit={handlePromptSubmit}>
             <div className="form-control">
                 <textarea placeholder="Provide your website name and describe it in a few words." className="input-control" name="user_prompt" id="userPromptInput" onChange={(e) => setPrompt(e.target.value)} value={prompt}></textarea>
             </div>
             <div className="form-control">
                 <button className="submit-control btn-custom"  type="submit">Generate Your Website</button>
             </div>
         </form>
         <div className="examples">
             <div className="examples-container">
                 <div className="examples_items">
                     <div className="items">
                         {
                             examplesTexts.map((element, i) => {
                             return(<div className="example" key={ 'example' + i }>
                                 <span className="text" onClick={ () => { setPrompt(element) } }>{element}</span>
                             </div>);
                             })
                         }                     
                     </div>
                 </div>
                 <div className="examples_items">
                     <div className="items">
                         {
                             examplesTexts.map((element, i) => {
                             return(<div className="example" key={ 'example' + (examplesTexts.length + i) }>
                                 <span className="text">{element}</span>
                             </div>);
                             })
                         }                           
                     </div>
                 </div>
             </div>
         </div>
     </div>
     <div className="footer-block">
         <div className="container">
             {/* <div className="footcol copyright">@copyright { new Date().getFullYear() }. All rights reserved</div> */}
             <div className="footcol product-by">Powered by <a href="https://42works.net/" target="_blank"><img src="./42-logo.svg"/> Works</a></div>
         </div>
     </div>
 </div>
   }
   </>
  );
};

export default App;