/* styles */
import styles from './course_card.module.scss';

/* images */
import backgroundImage from './test.jpg';

/* icons */
import Users from './../../components/ui/icons/Users';
import Clock from './../../components/ui/icons/Clock';
import Stack from './../../components/ui/icons/Stack';

export default function CourseCard({ title, description, steps, subscribes, duration, badges, certificates }) {
  return (
    <>
      <div className={styles.banner_wrapper}>
        <div className={styles.course_thumb} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className={styles.course_info}>
          <h2>{title}</h2>
          <div className={styles.course_specs}>
            <span>
              <Stack />
              <h3>{steps} etapas</h3>
            </span>
            <span>
              <Clock />
              <h3>{duration} horas</h3>
            </span>
            <span>
              <Users />
              <h3>{subscribes} inscritos</h3>
            </span>
          </div>
          <p>{description}</p>
        </div>
        <hr className={`${styles.separator}`} />
        <div className={`${styles.course_goals}`}>
          <div>
            <h3>Conquistas: </h3>
            <BadgeList badges={badges} />
          </div>
          <div>
            <h3>Certificados: </h3>
            <CertificatesList certificates={certificates} />
          </div>
        </div>
      </div>
    </>
  );
}

const BadgeList = ({ badges }) => {
  //https://codesandbox.io/s/f9524f?file=/App.js&utm_medium=sandpack
  return <>badges here</>;
};

const CertificatesList = ({ certificates }) => {
  //https://codesandbox.io/s/f9524f?file=/App.js&utm_medium=sandpack
  return <>certificates here</>;
};
