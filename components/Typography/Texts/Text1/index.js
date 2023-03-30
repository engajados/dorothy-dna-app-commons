import * as React from "react";
import styles from './styles.module.scss';


export default function Text1({ value }, ...rest) {
  return (
    <div className={`${styles.text1}`}>
      {value}
    </div>
  );
}