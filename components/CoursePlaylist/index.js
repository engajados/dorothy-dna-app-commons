/* react, libs */
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

/* dorothy */
import { useDorothy } from 'dorothy-dna-react';

/* images */
import backgroundImage from './test.jpg';

/* icons */
import Check from './../../components/ui/icons/Check';
import Lock from './../../components/ui/icons/Lock';

/* styles */
import styles from './course_playlist.module.scss';

/* components */
import CourseThumb from '../CourseThumb';

/* TODO:hasBiggerThumb has to come from parent component */
export default function CoursePlaylist({
  hasBiggerThumb,
  courseClasses,
  currentCourseId,
  currentClassId,
  handleClassChange,
}) {
  const queryClient = useQueryClient();
  const { server } = useDorothy();

  const mutations = {
    markAsWatched: useMutation(
      entity => {
        if (!entity.course_id || !entity.class_id) return;
        let endpoint = `${server}learning/course/${entity.course_id}/class/${entity.class_id}/watch`;
        if (entity.watched) {
          /* edit */
          return axios.put(endpoint, entity);
        } else {
          /* insert */
          return axios.post(endpoint, entity);
        }
      },
      { onSuccess: () => queryClient.invalidateQueries('course_classes') },
    ),
  };

  const handleWatched = async (newCourseIdRoute, newClassIdRoute, watched) => {
    await mutations.markAsWatched.mutateAsync({ course_id: newCourseIdRoute, class_id: newClassIdRoute, watched });

    handleClassChange(newCourseIdRoute, newClassIdRoute);
  };

  return (
    <>
      <div className={styles.card_box}>
        {hasBiggerThumb && <CourseThumb />}
        {courseClasses &&
          courseClasses.map(cl => (
            <div
              onClick={() => handleWatched(currentCourseId, cl.id, cl.watched)}
              className={`row ${styles.recoil} ${cl.id.toString() === currentClassId ? styles.active : ''}`}
              key={cl.id}
            >
              <CourseClass
                thumb={cl.id.toString() !== currentClassId && backgroundImage}
                title={cl.title}
                watched={cl.watched}
                isWatching={cl.id.toString() !== currentClassId}
              />
            </div>
          ))}
      </div>
    </>
  );
}

const CourseClass = ({ thumb, title, watched, isWatching }) => {
  let icon = watched ? !isWatching ? <div className={styles.is_watching}></div> : <Check /> : <Lock />;

  return (
    <>
      <div className={styles.course_class}>
        <div className={styles.class_status}>
          <span className={`${styles[watched ? 'done' : 'error']}`}>{icon}</span>
        </div>
        {thumb && (
          <div className={styles.class_thumb}>
            <img src={thumb} className={styles.small_thumb} alt="folhas de um pé de tomate" />
          </div>
        )}
        <div className={styles.class_info}>
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <h6 className={``}>155 visualizações</h6>
          </div>
        </div>
      </div>
    </>
  );
};
