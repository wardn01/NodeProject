import styles from "./enemies.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Enemies component
 * @param {function} onSelect - Callback when an enemy is selected
 * @param {function} onClose - Callback when the component is closed
 * @returns JSX for the enemies component
 */
const Enemies = ({ onSelect, onClose }) => {
  const [enemies, setEnemies] = useState([]);

  // Fetch enemies from the backend
  useEffect(() => {
    const fetchEnemies = async () => {
      try {
        const responseData = await axios.get(
          "http://localhost:8000/enemy/all",
          {
            withCredentials: true,
          },
        );
        setEnemies(responseData.data.enemies);
      } catch (error) {
        console.error("Error fetching enemies:", error);
      }
    };
    fetchEnemies();
  }, []);

  return (
    <div className={styles.enemiesContainer}>
      <div className={styles.enemiesHeader}>
        <p className={styles.enemiesHeaderTitle}>Select an Adversary</p>
        <p className={styles.enemiesCloseButton} onClick={onClose}>
          X
        </p>
      </div>

      <div className={styles.enemiesList}>
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className={styles.enemyCard}
            // التعديل هنا: الصورة فقط، مثل Weapons تماماً
            style={{
              backgroundImage: `url(${enemy.image})`,
            }}
            onClick={() => {
              onSelect(enemy);
              onClose();
            }}
          >
            <div className={styles.cardContent}>
              <p className={styles.enemyName}>{enemy.name}</p>
              <div className={styles.statsGrid}>
                <span className={styles.enemyDetail}>❤️ {enemy.hp} HP</span>
                <span className={styles.enemyDetail}>
                  ⚔️ {enemy.attack} ATK
                </span>
                <span className={styles.enemyDetail}>
                  🛡️ {enemy.defense} DEF
                </span>
                <span className={`${styles.enemyDetail} ${styles.totalPower}`}>
                  🔥 Power: {enemy.total_power}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enemies;
