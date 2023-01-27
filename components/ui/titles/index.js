import styles from './titles.module.scss';

export const title1 = ({ children }) => {
  return <h1 className={styles.title1}>{children}</h1>;
};

export const title2 = ({ children }) => {
  return <h2 className={styles.title2}>{children}</h2>;
};

export const title3 = ({ children }) => {
  return <h3 className={styles.title3}>{children}</h3>;
};

export const title4 = ({ children }) => {
  return <h4 className={styles.title4}>{children}</h4>;
};

export const title5 = ({ children }) => {
  return <h5 className={styles.title5}>{children}</h5>;
};

export const title6 = ({ children }) => {
  return <h6 className={styles.title6}>{children}</h6>;
};
