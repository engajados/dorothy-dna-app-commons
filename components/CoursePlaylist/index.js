/* images */
import backgroundImage from './test.jpg';
/* icons */
import Check from './../../components/ui/icons/Check';
import Lock from './../../components/ui/icons/Lock';
/* styles */
import styles from './course_playlist.module.scss';
// import { useState, useEffect } from 'react';

export const CoursePlaylist = ({
  hasBiggerThumb = false,
  courseClasses,
  currentCourseId,
  currentClassId,
  changeClass,
}) => {
  return (
    <>
      <div className={styles.card_box}>
        {hasBiggerThumb && <h1>this is a bigger thumb</h1>}
        {courseClasses &&
          courseClasses.map(cl => (
            <div
              className={`row ${styles.recoil} ${cl.id.toString() === currentClassId ? styles.active : ''}`}
              key={cl.id}
              onClick={() => changeClass(currentCourseId, cl.id)}
            >
              <CourseClass
                thumb={cl.thumb}
                title={cl.title}
                /* subscribers={cl.subscribers}
                  watched={cl.watched} */
              />
            </div>
          ))}
      </div>
    </>
  );
};

const CourseClass = ({ thumb, title, /* subscribers, watched, */ status = true }) => {
  let icon = status ? <Check /> : <Lock />;

  return (
    <>
      <div className={styles.course_class}>
        <div className={styles.class_status}>
          <span className={`${styles[status ? 'done' : 'error']}`}>{icon}</span>
        </div>
        <div className={styles.class_thumb}>
          <img src={backgroundImage} className={styles.the_thumb} alt="folhas de um pé de tomate" />
        </div>
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
