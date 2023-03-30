import * as React from "react";
import styles from './styles.module.scss';


export default function Title1({ value }, ...rest) {
  return (
    <div className={`${styles.title1}`}>
      {value}
    </div>
  );
}