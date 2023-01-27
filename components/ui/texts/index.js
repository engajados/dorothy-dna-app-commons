import styles from './texts.module.scss';

export const text1 = ({ children }) => {
  return <h1 className={styles.text1}>{children}</h1>;
};

export const text2 = ({ children }) => {
  return <h2 className={styles.text2}>{children}</h2>;
};

export const text3 = ({ children }) => {
  return <h3 className={styles.text3}>{children}</h3>;
};
