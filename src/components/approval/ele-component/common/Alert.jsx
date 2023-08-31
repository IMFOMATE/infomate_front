import React from 'react';
import Swal from "sweetalert2";
export default function Alert({title, text, icon}){

  return Swal.fire({
    icon: icon,
    title: title ? title : '',
    text: text
  });
}