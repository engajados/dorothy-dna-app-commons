import * as React from "react";
import styles from './styles.module.scss';


export default function Title3({ value }, ...rest) {
  return (
    <div className={`${styles.title3}`}>
      {value}
    </div>
  );
}