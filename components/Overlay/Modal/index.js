import React, { useState, useEffect } from 'react';
import Text2 from '../../Typography/Texts/Text2';
import styles from './styles.module.scss';
import { ReactComponent as Close } from '../../../icons/close.svg';
import Button from '../../Actions/Button';
import { isEmpty } from 'lodash';

export default function Modal({
  children,
  size,
  title,
  actionlabel,
  sidebar,
  contentpadding,
  modalState,
  onModalChange,
}) {
  const [state, setModalState] = useState(modalState);

  useEffect(() => {
    setModalState(modalState);
  }, [modalState]);

  useEffect(() => {
    onModalChange(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleCloseModal = () => {
    setModalState('hide');
  };

  return (
    <div className={`${styles.modal} ${styles[state]}`}>
      <div className={`${styles.backdrop}`} onClick={() => handleCloseModal()}></div>
      <div className={`${styles.dialog}  ${styles[size]}`}>
        <div className={`${styles.header}`}>
          <div className={`${styles.title}`}>
            <Text2>{title}</Text2>
          </div>
          <div className={`${styles.close}`} onClick={() => handleCloseModal()}>
            <Close />
          </div>
        </div>
        <div className={`${styles.contentwrapper} ${styles[contentpadding]}`}>
          {!isEmpty(sidebar) && <div className={`${styles.sidebar}`}>{sidebar}</div>}
          <div className={`${styles.body}`}>{children}</div>
        </div>
        <div className={`${styles.footer}`}>
          <div className={`${styles.indicators}`}></div>
          <div className={`${styles.actions}`}>
            <div className={`${styles.addanother}`}>
              <Button variant="link">Adicionar outra</Button>
            </div>
            <Button variant="link" onClick={() => handleCloseModal()}>
              Cancelar
            </Button>
            <Button variant="primary">{actionlabel}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
