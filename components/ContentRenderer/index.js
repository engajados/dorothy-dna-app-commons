import SanitizedHTML from 'react-sanitized-html';

import './ck-content-styles.css';

export default function ContentRenderer({ type, text }) {
  return (
    <>
      <SanitizedHTML
        allowedTags={[
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
        ]}
        allowedAttributes={{
          p: ['style'],
          img: ['src'],
          a: ['href'],
          table: ['class'],
          figure: ['class', 'style'],
          col: ['style'],
          td: ['class'],
          th: ['class'],
          tr: ['class'],
        }}
        html={text}
        className={'ck-content'}
      />
    </>
  );
}
