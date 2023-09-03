import React from 'react';
import mainCss from "../../common/main.module.css";

function DocumentHeader(props) {
  return (
      <div className={mainCss.maintitle}>
        <h2>{props.name}</h2>
      </div>
  );
}

export default DocumentHeader;