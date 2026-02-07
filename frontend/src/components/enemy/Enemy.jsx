import styles from "./enemy.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Enemies from "../enemies/Enemies";

/**
 * Enemy component
 * @param {number} enemyId - ID of the enemy to display details for
 * @param {function} onSelect - Callback function when an enemy is selected
 * @returns JSX for the enemy component
 */
const Enemy = ({ enemyId, onSelect }) => {
  const [enemyData, setEnemyData] = useState(null);
  const [showEnemyList, setShowEnemyList] = useState(false);

  // Handle enemy selection from the list
  const handleEnemySelection = (selectedEnemy) => {
    setEnemyData(selectedEnemy);
    setShowEnemyList(false);
    if (onSelect) {
      onSelect(selectedEnemy);
    }
  };

  // Fetch enemy details when enemyId changes
  useEffect(() => {
    if (enemyId) {
      const fetchEnemy = async () => {
        try {
          const responseData = await axios.get(
            `http://localhost:8000/enemy/${enemyId}`,
            { withCredentials: true },
          );
          setEnemyData(responseData.data.enemy);
        } catch (error) {
          console.error("Error fetching enemy details:", error);
        }
      };
      fetchEnemy();
    } else {
      setEnemyData(null);
    }
  }, [enemyId]);

  return (
    <div className={styles.enemyContainer}>
      <div
        className={`${styles.imagePlaceholder} ${enemyData ? styles.active : ""}`}
        style={
          enemyData?.image ? { backgroundImage: `url(${enemyData.image})` } : {}
        }
      >
        {!enemyData && "Enemy Image"}
      </div>

      <div className={styles.enemyCard}>
        {enemyData ? (
          <div className={styles.enemyInfo}>
            <h2 className={styles.enemyName}>{enemyData.name}</h2>
            <div className={styles.stats}>
              <p className={styles.enemyDetail}>❤️ HP: {enemyData.hp}</p>
              <p className={styles.enemyDetail}>⚔️ ATK: {enemyData.attack}</p>
              <p className={styles.enemyDetail}>🛡️ DEF: {enemyData.defense}</p>
              <p className={styles.totalPower}>
                🔥 Power: {enemyData.total_power}
              </p>
            </div>
          </div>
        ) : (
          <p className={styles.placeholderText}>No enemy selected yet.</p>
        )}
      </div>

      <button
        className={styles.selectButton}
        onClick={() => setShowEnemyList(true)}
      >
        {enemyData ? "CHANGE ADVERSARY" : "SELECT AN ENEMY"}
      </button>

      {showEnemyList && (
        <div className={styles.popupOverlay}>
          <Enemies
            onSelect={handleEnemySelection}
            onClose={() => setShowEnemyList(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Enemy;
