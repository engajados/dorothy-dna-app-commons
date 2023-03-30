import * as React from "react";
import styles from './styles.module.scss';


export default function Title6({ value }, ...rest) {
  return (
    <div className={`${styles.title6}`}>
      {value}
    </div>
  );
}