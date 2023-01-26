/* react, libs */
import { useState } from 'react';
/* import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
 */
/* dorothy */
/* import { useDorothy } from 'dorothy-dna-react'; */

/* images */
import backgroundImage from './test.jpg';

/* icons */
import Play from './../../components/ui/icons/Play';
import Clock from './../../components/ui/icons/Clock';
import Stack from './../../components/ui/icons/Stack';

/* styles */
import styles from './course_thumb.module.scss';

export default function CourseThumb({ steps = 9, duration = '2h', progress }) {
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
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
        <div className={styles.thumb_box}>
          {showPlayCourseButton && (
            <span className={styles.course_watch}>
              <h2>{progress ? 'Continuar' : 'Começar'} curso</h2>
              <Play />
            </span>
          )}

          <div className={styles.course_info}>
            <div className={styles.progress_bar}>progress bar</div>
            <div className={styles.course_minidash}>
              <span>
                <Stack />
                <h3>{steps}</h3>
              </span>
              <span>
                <Clock />
                <h3>{duration}</h3>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
