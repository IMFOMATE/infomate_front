import React from 'react';
import {NavLink} from "react-router-dom";
import NavListCss from './Navlist.module.css';

function Navlist({title, data}) {

  const active = {color: 'var(--color-hard)', fontWeight:'bold'};
  return (
    <>
      <div className={NavListCss.title}>{title}</div>
      <ol>
        {
          data.map((d, index) =>
            <li key={index} className={NavListCss.list}>
              <NavLink to={d.link} className={NavListCss.list_link} style={({isActive}) => isActive ? active : Navlist.list} >
                {d.text}
              </NavLink>
            </li>
          )
        }
      </ol>
    </>
  );
}



export default Navlist;