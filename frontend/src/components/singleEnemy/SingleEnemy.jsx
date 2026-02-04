import styles from "./singleEnemy.module.css";
import { useState } from "react";
import AllEnemies from "../allEnemies/AllEnemies";

const SingleEnemy = () => {
  const [enemyData, setEnemyData] = useState(null);
  const [showEnemyList, setShowEnemyList] = useState(false);

  const handleEnemySelection = (selectedEnemy) => {
    setEnemyData(selectedEnemy);
    setShowEnemyList(false);
  };

  return (
    <div className={styles.singleEnemyContainer}>
      <button
        className={styles.selectButton}
        onClick={() => setShowEnemyList(true)}
      >
        SELECT AN ENEMY
      </button>
      {enemyData ? (
        <div className={styles.enemyCard}>
          <h2>{enemyData.name}</h2>
          <div className={styles.stats}>
            <p>❤️ HP: {enemyData.hp}</p>
            <p>⚔️ Attack: {enemyData.attack}</p>
            <p>🛡️ Defense: {enemyData.defense}</p>
            <p>🔥 Total Power: {enemyData.total_power}</p>
          </div>
        </div>
      ) : (
        <p className={styles.placeholderText}>No enemy selected yet.</p>
      )}
      {showEnemyList && (
        <div className={styles.popupOverlay}>
          <AllEnemies
            onSelect={handleEnemySelection}
            onClose={() => setShowEnemyList(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SingleEnemy;
