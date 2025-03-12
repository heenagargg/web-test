// import React, { useEffect } from "react";
// import {useLocation} from 'react-router-dom';
// import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js';

// const CardsBoard = () => {
//   const location = useLocation();
//   const jsonData = location.state.returnData ?? {};

//   useEffect(() => {
//     let returnDiv = document.getElementById("aiReturnData");
//     hljs.highlightBlock(returnDiv);
//   })
//   return (
//     <div className="main-container tree-container">
//         <div className="array-div">
//             <pre id="aiReturnData">
//                 <code className="language-html">
//                   { JSON.stringify(jsonData, undefined, 2) }
//                 </code>
//             </pre>
//         </div>
//     </div>
//   );
// };

// export default CardsBoard;