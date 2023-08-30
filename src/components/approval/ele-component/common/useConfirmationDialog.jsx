import React, {useState} from 'react';

import Swal from "sweetalert2";

export const useConfirmationDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (title, text) => {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {
      setIsDialogOpen(false);
      return result.isConfirmed;
    });
  };

  return { isDialogOpen, openDialog };
};