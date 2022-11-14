import cn from 'classnames/bind';
import styles from './big_square_test_component.module.scss';

let cx = cn.bind(styles);

export default function BigSquareTestComponent({ parentClassNames = {} }) {
  let halfColor2 = cx({ half_color_2: true }, parentClassNames['half_color_2']);

  return (
    <>
      <div className={cn(styles.center, { ...parentClassNames['center'] })}>
        <div className={cn(styles.big_square, parentClassNames['big_square'])}>
          <div className={cn(styles.half_color_1, parentClassNames['half_color_1'])}></div>
          <div className={halfColor2}></div>
        </div>
      </div>
    </>
  );
}
