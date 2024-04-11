import React from "react";
import styles from "./loader.module.css";
const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
