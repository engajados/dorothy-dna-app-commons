/* styles */
import styles from './course_card.module.scss';

/* icons */
import Users from './../../components/ui/icons/Users';
import Clock from './../../components/ui/icons/Clock';
import Stack from './../../components/ui/icons/Stack';

/* commons */
import { Title2, Title3 } from '../ui/titles';
import { Text1 } from '../ui/texts';

export default function CourseCard({ title, description, steps, thumb, subscribes, duration, badges, certificates }) {
  return (
    <>
      <div className={styles.banner_wrapper}>
        <div className={styles.course_thumb} style={{ backgroundImage: `url(${thumb})` }} />
        <div className={styles.course_info}>
          <Title2>
            <strong>
              {title} {/* - {subtitle} */}
            </strong>
          </Title2>
          <div className={styles.course_specs}>
            <span>
              <Stack />
              <Title3>{steps} etapas</Title3>
            </span>
            <span>
              <Clock />
              <Title3>{duration} horas</Title3>
            </span>
            <span>
              <Users />
              <Title3>{subscribes} inscritos</Title3>
            </span>
          </div>
          <Text1>{description}</Text1>
        </div>
        <hr className={`${styles.separator}`} />
        <div className={`${styles.course_goals}`}>
          <div>
            <Title3>Conquistas: </Title3>
            <BadgeList badges={badges} />
          </div>
          <div>
            <Title3>Certificados: </Title3>
            <CertificatesList certificates={certificates} />
          </div>
        </div>
      </div>
    </>
  );
}

const BadgeList = ({ badges }) => {
  return <>badges here</>;
};

const CertificatesList = ({ certificates }) => {
  return <>certificates here</>;
};
