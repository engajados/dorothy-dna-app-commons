import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import styles from './course_banner.module.scss';

export default function CourseBanner({
  handleClassChange,
  textNameTitle = ' Agricultura de precisão',
  textNameButton = 'inscrever-me',
  selectedCourseId,
}) {
  return (
    <Container className={styles.banner}>
      <Typography className={styles.text} variant="h5">
        {textNameTitle}
      </Typography>
      <Button variant="contained" className={styles.button} onClick={() => handleClassChange(selectedCourseId)}>
        {textNameButton}
      </Button>
    </Container>
  );
}
