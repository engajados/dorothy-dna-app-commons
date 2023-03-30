import * as React from "react";
import styles from './styles.module.scss';


export default function Text3({ value }, ...rest) {
  return (
    <div className={`${styles.text3}`}>
      {value}
    </div>
  );
}