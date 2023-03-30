import * as React from "react";
import Text1 from "../../Typography/Texts/Text1";
import styles from './styles.module.scss';


export default function Button({ icon, value, variant }, ...rest) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      <div className={`${styles.icon}`}>{icon}</div>
      <Text1 value={value}></Text1>
    </button>
  );
}