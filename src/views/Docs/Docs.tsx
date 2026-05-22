import styles from "./Docs.module.css";

const STACK = [
  { label: "React 19", desc: "UI framework" },
  { label: "TypeScript", desc: "Type safety" },
  { label: "Apollo Client v4", desc: "GraphQL & caching" },
  { label: "react-virtuoso", desc: "List virtualisation" },
  { label: "React Router v7", desc: "Routing" },
  { label: "Vite 7", desc: "Build tool" },
  { label: "Vitest", desc: "Testing" },
  { label: "CSS Modules", desc: "Styling" },
];

function Docs() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h2 className={styles.heading}>About</h2>
        <p className={styles.text}>
          Rick and Morty Explorer is a React 19 demo application for browsing and searching over 800
          characters from the Rick and Morty universe. It was built to showcase modern frontend
          engineering patterns around performance, error handling, and GraphQL state management.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Features</h2>
        <ul className={styles.list}>
          <li>Infinite scroll with virtualised rendering — only visible rows exist in the DOM</li>
          <li>URL-persistent search — results survive refresh and are fully shareable via link</li>
          <li>Typed Apollo cache with per-filter page accumulation</li>
          <li>Classified error handling for network, GraphQL, and unknown failures</li>
          <li>Inline load-more error recovery with retry, preventing infinite retry loops</li>
          <li>Scroll position restoration when navigating back from another route</li>
          <li>Keyboard focus management on route changes for screen-reader accessibility</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Stack</h2>
        <div className={styles.stack}>
          {STACK.map(({ label, desc }) => (
            <div key={label} className={styles.stackItem}>
              <span className={styles.stackLabel}>{label}</span>
              <span className={styles.stackDesc}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>API</h2>
        <p className={styles.text}>
          Powered by the open Rick and Morty GraphQL API. TypeScript types are generated from the
          live schema using <code>@graphql-codegen/client-preset</code>, so query variable and
          response shapes are checked at compile time — a field rename in the schema surfaces as a
          build error rather than a runtime surprise.
        </p>
        <div className={styles.links}>
          <a
            className={styles.link}
            href="https://rickandmortyapi.com/documentation/#graphql"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation ↗
          </a>
          <a
            className={styles.link}
            href="https://javascript.rickandmortyapi.com/modules/interfaces.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Type Definitions ↗
          </a>
        </div>
      </section>
    </div>
  );
}

export default Docs;
