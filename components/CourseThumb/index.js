/* react, libs */
import { useState } from 'react';
/* import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
 */
/* dorothy */
/* import { useDorothy } from 'dorothy-dna-react'; */

/* icons */
import Play from './../../components/ui/icons/Play';
import Clock from './../../components/ui/icons/Clock';
import Stack from './../../components/ui/icons/Stack';

/* styles */
import styles from './course_thumb.module.scss';

/* commons */
import { Title2, Title3 } from '../ui/titles';

export default function CourseThumb({ textToShow, showInfo, thumbImg, steps, duration, progress }) {
  const [showPlayCourseButton, _showPlayCourseButton] = useState(false);
  /* 
  const queryClient = useQueryClient();
  const { server } = useDorothy();
  const mutations = {
    markAsWatched: useMutation(
      entity => {
        if (!entity.course_id || !entity.class_id) return;
        let endpoint = `${server}learning/course/${entity.course_id}/class/${entity.class_id}/watch`;
        if (entity.watched) {
          // edit
          return axios.put(endpoint, entity);
        } else {
          // insert
          return axios.post(endpoint, entity);
        }
      },
      { onSuccess: () => queryClient.invalidateQueries('course_classes') },
    ),
  }; */

  /* useEffect(() => {
    console.log('_showPlayCourseButton', showPlayCourseButton);
  }, [showPlayCourseButton]); */

  return (
    <>
      <div
        className={styles.thumb_wrapper}
        onMouseOver={() => _showPlayCourseButton(true)}
        onMouseLeave={() => _showPlayCourseButton(false)}
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
              <div className={styles.progress_bar}>progress bar</div>
              <div className={styles.course_minidash}>
                <span>
                  <Stack />
                  <Title3>{steps}</Title3>
                </span>
                <span>
                  <Clock />
                  <Title3>{duration}</Title3>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
