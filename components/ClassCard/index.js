/* react, libs */
import { useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';

/* styles */
import styles from './class_card.module.scss';

/* commons */
import { Title2, Title3 } from '../ui/titles';
import { Text1, Text2 } from '../ui/texts';

/* icons */
import Play from '../ui/icons/Play';
import Pause from '../ui/icons/Pause';

export default function ClassCard({ title, subtitle, description, materials }) {
  const ref = useRef(null);

  const [isPlaying, _isPlaying] = useState(false);

  useEffect(() => {
    isPlaying ? ref.current.pause() : ref.current.play();
  }, [isPlaying]);

  return (
    <>
      <div className={styles.video_wrapper}>
        <div className={styles.video_player} onClick={() => _isPlaying(!isPlaying)}>
          <ClassVideoPlayer
            ref={ref}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />

          <div className={styles.video_control_panel}>
            <span className={styles.play_or_pause}>{isPlaying ? <Pause /> : <Play />}</span>
          </div>
        </div>
        <div className={styles.class_info}>
          <Title2>
            <strong>
              {title} - {subtitle}
            </strong>
          </Title2>
          <div className="mt-2">
            <Text1>{description}</Text1>
          </div>
          <div className="mt-4">
            <Title3>Materiais de Apoio:</Title3>
            <Text2 className="mt-2">
              {materials ? /* materials.map() */ 'TODO: [listar materiais]' : 'Sem nada por aqui!'}
            </Text2>
          </div>
        </div>
      </div>
    </>
  );
}

const ClassVideoPlayer = forwardRef(function ClassVideoPlayer({ src, type }, ref) {
  //https://codesandbox.io/s/f9524f?file=/App.js&utm_medium=sandpack
  return (
    <video width={`100%`} height={`100%`} ref={ref} controls>
      <source src={src} type={type} />
    </video>
  );
});
