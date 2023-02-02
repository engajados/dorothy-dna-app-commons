/* react, libs */
import { useState } from 'react';

/* icons */
import Play from './../../components/ui/icons/Play';
import Clock from './../../components/ui/icons/Clock';
import Stack from './../../components/ui/icons/Stack';
import Check from './../../components/ui/icons/Check';

/* styles */
import styles from './course_thumb.module.scss';

/* commons */
import { Title2, Title3 } from '../ui/titles';

export default function CourseThumb({
  textToShow,
  showInfo,
  thumbImg,
  steps,
  duration,
  classesWatched,
  handleClassChange,
}) {
  const [showPlayCourseButton, _showPlayCourseButton] = useState(false);

  return (
    <>
      <div
        className={styles.thumb_wrapper}
        onMouseOver={() => _showPlayCourseButton(true)}
        onMouseLeave={() => _showPlayCourseButton(false)}
        onClick={handleClassChange}
      >
        <div
          className={styles.thumb_image}
          style={{
            backgroundImage: `url(${thumbImg})`,
          }}
        />
        <div className={styles.thumb_box}>
          {showPlayCourseButton && (
            <span className={styles.course_watch}>
              <Title2>{textToShow} curso</Title2>
              <Play />
            </span>
          )}

          {showInfo && (
            <div className={styles.course_info}>
              <ProgressBar steps={steps} classesWatched={classesWatched} />

              <div className={styles.course_minidash}>
                <span>
                  <Stack />
                  <Title3>{steps}</Title3>
                </span>
                <span>
                  <Clock />
                  <Title3>{duration}h</Title3>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const ProgressBar = ({ steps, classesWatched }) => {
  const [progress, _progress] = useState(1);

  useState(() => {
    _progress((classesWatched / steps) * 100);
  }, [steps, classesWatched]);

  return (
    <>
      {progress < 100 && (
        <div className={styles.progress_bar}>
          <span className={styles.bar} style={{ width: `${progress}%` }} />
        </div>
      )}
      {progress >= 100 && (
        <div className={styles.progress_done}>
          <Check />
        </div>
      )}
    </>
  );
};
