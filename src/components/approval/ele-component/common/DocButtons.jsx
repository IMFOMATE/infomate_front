import React from 'react';
import styles from './DocButtons.module.css';
function DocButtons({button}) {
  return (
      <div className={styles.buttons}>
        {button}
      </div>
  );
}

export default DocButtons;