/* styles */
import styles from './class_card.module.scss';

export default function ClassCard({ title, subtitle, description, materials }) {
  return (
    <>
      <div className={styles.video_wrapper}>
        <div className={styles.video_player}>
          <ClassVideo src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
        </div>
        <div className={styles.class_info}>
          <h2>
            {title} - {subtitle}
          </h2>
          <p className="mt-2">{description}</p>
          <div className="mt-4">
            <h3>Materiais de Apoio:</h3>
            <p className="mt-2">
              {materials ? /* materials.map() */ 'TODO: [listar materiais]' : 'Sem nada por aqui!'}
            </p>
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
