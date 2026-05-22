import { memo, useState } from "react";
import styles from "../../CharactersList.module.css";
import type { CharacterListItemProps } from "./CharacterListItem.types";

function getInitial(name: string | null): string {
  return name ? name[0].toUpperCase() : "?";
}

const CharacterListItem = memo(({ item }: CharacterListItemProps) => {
  const [imgError, setImgError] = useState(false);
  const showFallback = imgError || !item.image;

  return (
    <li className={styles.listItem}>
      <div className={styles.listContent}>
        <div className={styles.characterListItem}>
          {showFallback ? (
            <div className={styles.characterImgInitial} aria-hidden="true">
              {getInitial(item.name)}
            </div>
          ) : (
            <img
              className={styles.characterListItemImg}
              src={item.image!}
              alt={item.name ?? ""}
              height={48}
              width={48}
              onError={() => setImgError(true)}
            />
          )}
          <div className={styles.characterListItemText}>{item.name}</div>
          <div className={styles.characterListItemText}>{item.species}</div>
        </div>
      </div>
    </li>
  );
});

CharacterListItem.displayName = "CharacterListItem";
export default CharacterListItem;
