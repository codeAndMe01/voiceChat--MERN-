import React from "react";
import Card from "../../src/components/shared/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className="cardWrapper">
      <Card >
        <svg className={styles.spinner}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
        >
          <path
            d="M19.778.001A20 20 0 1 1 .542 24.627l3.876-.922a16.016 16.016 0 1 0 15.404-19.72L19.778.001Z"
            fill="#5453E0"
          />
        </svg>
        <span className={styles.message}> {message}</span>
      </Card>
    </div>
  );
};

export default Loader;
