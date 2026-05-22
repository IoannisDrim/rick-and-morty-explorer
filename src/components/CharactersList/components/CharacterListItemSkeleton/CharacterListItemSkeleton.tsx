import styles from "../../CharactersList.module.css";

function CharacterListItemSkeleton() {
  return (
    <li className={styles.listItem}>
      <div className={styles.listContent}>
        <div className={styles.characterListItem}>
          <div className={`${styles.characterListItemImg} ${styles.characterSkeletonImg}`} />
          <div className={styles.characterListItemText}>
            <div className={styles.characterSkeletonText} />
          </div>
          <div className={styles.characterListItemText}>
            <div className={styles.characterSkeletonText} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default CharacterListItemSkeleton;
