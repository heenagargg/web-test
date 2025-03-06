import React from "react";
import {useLocation} from 'react-router-dom';
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/highlight.min.js';

const CardsBoard = () => {
  const location = useLocation();
  const jsonData = location.state ?? {};
  return (
    <div className="main-container tree-container">
        <div className="array-div">
            <pre id="aiReturnData"></pre>
        </div>
    </div>
  );
};

export default CardsBoard;