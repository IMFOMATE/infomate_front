import React from 'react';
import mainCss from "../../components/common/main.module.css";
import {Outlet, useLocation} from "react-router-dom";


function DocumentMain() {
  const location = useLocation();
  const type = location.state;

  return (
      <>
        <div className={mainCss.maintitle}>
          <h2>{type}</h2>
        </div>
        <Outlet/>
      </>
  );
}

export default DocumentMain;