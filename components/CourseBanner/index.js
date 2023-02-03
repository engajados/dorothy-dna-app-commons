import { Button } from '@mui/material';
import styles from './course_banner.module.scss';
import { Title1 } from './../ui/titles';
import backgroundImage from './static_banner_cover.jpg';

export default function CourseBanner({
  handleClassChange,
  textNameTitle = ' Agricultura de precisão',
  textNameButton = 'inscrever-me',
  selectedCourseId,
}) {
  return (
    <div className={styles.banner}>
      <div className={styles.cover} style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className={styles.action_box}>
        <div className={styles.custom_title}>
          <Title1>{textNameTitle}</Title1>
        </div>
        <Button variant="contained" className={styles.button} onClick={() => handleClassChange(selectedCourseId)}>
          {textNameButton}
        </Button>
      </div>
    </div>
  );
}
