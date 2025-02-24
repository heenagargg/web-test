import React, { useState } from "react";
import Board from "./components/Board";
import AddColumn from "./components/AddColumn";
import Column from "./components/Column";
import HomeColumn from "./components/HomeColumn";
import { FaPlus } from "react-icons/fa"; // For the plus icon

const App = () => {
  const [columns, setColumns] = useState([]);
  const [homeColumn, setHomeColumn] = useState([
    {
      id: 0,
      title: "Home",
      tasks: ["Header","Hero",'About Us','Testimonails',"Contact","Footer"],
    },
  ]);
  const [selected, setSelected] = useState(null);
  // const sections = [
  //   { title: "Custom section", description: "Describe any section you want" },
  //   { title: "About section", description: "Provide info about the company" },
  //   { title: "Benefit section", description: "Explain the benefit of your offering" },
  //   { title: "Benefits section", description: "Showcase key benefits" },
  //   { title: "Blog section", description: "Display blog posts" },
  //   { title: "Contact section", description: "Encourage visitors to contact company" },
  //   {title:"Call to Action section",description:'Urge users to take action'},
  //   { title: "FAQ section", description: "Answer common questions" },
  //   {title:'Feature section',description:'Highlight a feature in details'},
  //   {title:'Features list section',description:'Highlight core features'},
  //   { title: "Gallery section", description: "Showcase images or media" },
  //   {title:'Hero section',description:'Highlight the main message'},
  //   {title:'Logos section',description:'Display logos of key customers'},
  //   { title: "Portfolio section", description: "Showcase portfolio items" },
  //   { title: "Pricing section", description: "Display service or product prices" },
  //   {title:'Reviews section',description:'Showcase customer reviews'},
  //   { title: "Services section", description: "Explain a service in details" },
  //   {title:'Services list section',description:'Showcase your solutions'},
  //   { title: "Team section", description: "Introduce the team" },
  //   { title: "Testimonials section", description: "Showcase clients' success stories" },
  //   {title:'Title section',description:'Display a page title'}
  // ];
  return (
    <div className="main-container tree-container">
         {/* <div className="sidebar">
           <h2 className="sidebar-title">Add Sections</h2>
           <div className="section-list">
             {sections.map((section, index) => (
               <div
                 key={index}
                 className={`section-item ${selected === index ? "selected" : ""}`}
                 onClick={() => setSelected(index)}
               >
                 <div className="section-text">
                   <h3 className="section-title">{section.title}</h3>
                   <p className="section-description">{section.description}</p>
                 </div>
                 <FaPlus className="plus-icon" />
               </div>
             ))}
           </div>
         </div> */}
      <div style={{ alignSelf: "center" }} className="page root-page">
        {
          <HomeColumn
            col={homeColumn}
            columns={[homeColumn]}
            setColumns={setHomeColumn}
            index={0}
          />
        }
      </div>
      <AddColumn columns={columns} setColumns={setColumns} className='page root-page' />
      <Board columns={columns} setColumns={setColumns} />
    </div>
  );
};

export default App;



// import React, { useState, useEffect, useRef } from "react";
// import Tree from "react-d3-tree";
// import AddColumn from "./components/AddColumn";
// import Column from "./components/Column";
// import HomeColumn from "./components/HomeColumn";

// const App = () => {
//   const [columns, setColumns] = useState([]);
//   const [homeColumn, setHomeColumn] = useState([
//     {
//       id: 0,
//       title: "Home",
//       tasks: ["Header"],
//     },
//   ]);
//   const [treeData, setTreeData] = useState({});
//   const nodeRefs = useRef({});

//   useEffect(() => {
//     setTreeData({
//       name: "Home",
//       attributes: {
//         component: <HomeColumn col={homeColumn} setColumns={setHomeColumn} />,
//       },
//       children: [
//         {
//           name: "add page",
//           attributes: {
//             component: <AddColumn columns={columns} setColumns={setColumns} />,
//           },
//           children: columns?.map((col, index) => ({
//             name: `column ${index + 1}`,
//             attributes: {
//               component: (
//                 <Column
//                   key={col.id}
//                   col={col}
//                   setColumns={setColumns}
//                   index={index}
//                   columns={columns}
//                 />
//               ),
//             },
//           })),
//         },
//       ],
//     });
//   }, [columns, homeColumn]);

//   const renderForeignObjectNode = ({ nodeDatum }) => {
//     return (
//       <g ref={(el) => (nodeRefs.current[nodeDatum.name] = el)}>
//         <foreignObject width="100%" height="100%" x="-150" y="-50">
//           <div
//             // style={{
//             //   textAlign: "center",
//             //   width: "auto",
//             //   height: "auto",
//             //   backgroundColor: "white",
//             //   border: "1px solid black",
//             //   borderRadius: "5px",
//             //   padding: "10px",
//             // }}
//           >
//             {nodeDatum.attributes?.component}
//           </div>
//         </foreignObject>
//       </g>
//     );
//   };

//   return (
//     <div className="main-container" style={{ width: "100vw", height: "100vh" }}>
//       <Tree
//         data={treeData}
//         orientation="vertical"
//         renderCustomNodeElement={renderForeignObjectNode}
//         translate={{ x: window.innerWidth / 2, y: 150 }}
//         separation={{ siblings: 3, nonSiblings: 3 }}
//         nodeSize={{ x: 350, y: 250 }} // Adjusted dynamically
//         pathFunc="step"
//         draggable={false}
//       />
//     </div>
//   );
// };

// export default App;

