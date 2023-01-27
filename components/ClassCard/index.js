/* styles */
import styles from './class_card.module.scss';

/* commons */
import { Title2, Title3 } from '../ui/titles';
import { Text1, Text2 } from '../ui/texts';

export default function ClassCard({ title, subtitle, description, materials }) {
  return (
    <>
      <div className={styles.video_wrapper}>
        <div className={styles.video_player}>
          <ClassVideo src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
        </div>
        <div className={styles.class_info}>
          <Title2>
            <strong>
              {title} - {subtitle}
            </strong>
          </Title2>
          <div className="mt-4">
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

const ClassVideo = ({ src, type }) => {
  //https://codesandbox.io/s/f9524f?file=/App.js&utm_medium=sandpack
  return (
    <video width={`100%`} height={`100%`}>
      <source src={src} type={type} />
    </video>
  );
};
