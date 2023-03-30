import * as React from "react";
import styles from './styles.module.scss';


export default function Title5({ value }, ...rest) {
  return (
    <div className={`${styles.title5}`}>
      {value}
    </div>
  );
}