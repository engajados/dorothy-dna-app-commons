import React from 'react';
import { Container, Button, Typography } from  '@mui/material';
import styles from './course_banner.module.scss';

export default  function CourseBanner({ 
    className = " Agricultura de precisão",
    

}) {
    return (
      <Container className={styles.banner}>
        <Typography className={styles.text}variant="h5">
        {className}
        </Typography>
        <Button variant="contained" className={styles.button}>
          Click Me
        </Button>
      </Container>
    );
  }
  
