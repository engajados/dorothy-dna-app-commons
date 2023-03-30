import './ck-content-styles.css';
import styles from './content_renderer.module.scss';
import sanitize from 'sanitize-html';

export default function ContentRenderer({ type, selectedImageUrl, text }) {
  const sanitizedHtml = sanitize(text, {
    allowedTags: [
      'p',
      'a',
      'ul',
      'li',
      'ol',
      'br',
      'strong',
      'em',
      'u',
      'i',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'figure',
      'col',
      'colgroup',
    ],
    allowedAttributes: {
      img: ['src'],
      a: ['href'],
      '*': ['style', 'class'],
    },
    parseStyleAttributes: false,
  });

  return (
    <div className={'app-container'}>
      <div className={styles.content_wrapper}>
        {type === 'news' && <>{selectedImageUrl}</>}
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className={'ck-content'} />
      </div>
    </div>
  );
}
