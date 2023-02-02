/* react, libs */
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

/* dorothy */
import { useDorothy } from 'dorothy-dna-react';

/* icons */
import Check from './../../components/ui/icons/Check';
import Lock from './../../components/ui/icons/Lock';

/* styles */
import styles from './course_playlist.module.scss';

/* components */
import CourseThumb from '../CourseThumb';

/* commons */
import { Title3, Title6 } from '../ui/titles';
import { useEffect, useState } from 'react';

/* TODO:hasBiggerThumb has to come from parent component */
export default function CoursePlaylist({
  isUserEnrolled,
  isDone,
  courseClasses,
  currentCourseId,
  currentClassId,
  handleClassChange,
}) {
  const queryClient = useQueryClient();
  const { server } = useDorothy();

  const [textToShow, _textToShow] = useState(null);
  const [nextClassThumb, _nextClassThumb] = useState(null);

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

  useEffect(() => {
    if (!courseClasses) return;
    let mostAdvancedClass = courseClasses.filter(course => course.watched).sort((a, b) => b.order_seq - a.order_seq)[0];

    let mostAdvancedClassIndex = courseClasses.findIndex(cl => cl.id === mostAdvancedClass.id);

    let next = courseClasses[mostAdvancedClassIndex + 1];
    let first = courseClasses[0];

    _textToShow(isUserEnrolled ? (isDone ? 'Recomeçar' : 'Começar') : 'Continuar');
    _nextClassThumb(!next ? first.thumb : next.thumb);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseClasses]);

  return (
    <>
      <div className={styles.card_box}>
        <CourseThumb
          textToShow={textToShow}
          showInfo={false}
          thumbImg={nextClassThumb}
          handleClassChange={handleClassChange}
        />

        {courseClasses &&
          courseClasses.map(cl => (
            <div
              onClick={() => handleWatched(currentCourseId, cl.id, cl.watched)}
              className={`row ${styles.recoil} ${cl.id.toString() === currentClassId ? styles.active : ''}`}
              key={cl.id}
            >
              <CourseClass
                thumb={cl.thumb}
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
        <div className={styles.class_thumb}>
          <img src={thumb} className={styles.small_thumb} alt="folhas de um pé de tomate" />
        </div>
        <div className={styles.class_info}>
          <div>
            <Title3>{title}</Title3>
          </div>
          <div>
            <Title6 className={``}>155 visualizações</Title6>
          </div>
        </div>
      </div>
    </>
  );
};
