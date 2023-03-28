export default function ContentRenderer({ linkOrPage }) {
  return (
    <>
      <h1>Hello, world!</h1>
      <p>I`m a content renderer.</p>

      <p>
        at the current moment I only have this: <code>{linkOrPage}</code>
      </p>

      <h2>TODO:</h2>

      <ul>
        <li>
          read the endpoint at <code>/content</code> and
        </li>
        <li>apply html sanitize in me. </li>
      </ul>
    </>
  );
}
