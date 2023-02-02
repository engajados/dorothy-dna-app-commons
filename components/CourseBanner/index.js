import React from 'react';
import { Container, Button } from '@mui/material';
import styles from './course_banner.module.scss';
import { Title1 } from './../ui/titles';

export default function CourseBanner({
  handleClassChange,
  textNameTitle = ' Agricultura de precisão',
  textNameButton = 'inscrever-me',
  selectedCourseId,
}) {
  return (
    <Container className={styles.banner}>
      <div className={styles.custom_title}>
        <Title1>{textNameTitle}</Title1>
      </div>
      <Button variant="contained" className={styles.button} onClick={() => handleClassChange(selectedCourseId)}>
        {textNameButton}
      </Button>
    </Container>
  );
}
