import * as React from "react";
import styles from './styles.module.scss';


export default function Title4({ value }, ...rest) {
  return (
    <div className={`${styles.title4}`}>
      {value}
    </div>
  );
}