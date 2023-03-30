import * as React from "react";
import styles from './styles.module.scss';


export default function Title2({ value }, ...rest) {
  return (
    <div className={`${styles.title2}`}>
      {value}
    </div>
  );
}