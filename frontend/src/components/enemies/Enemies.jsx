import styles from "./enemies.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Enemies = ({ onSelect, onClose }) => {
  const [allEnemies, setAllEnemies] = useState([]);

  useEffect(() => {
    const fetchEnemies = async () => {
      try {
        const enemiesData = await axios.get(
          "http://localhost:8000/enemy/enemies",
        );
        setAllEnemies(enemiesData.data.enemies);
      } catch (error) {
        console.error("Error fetching enemies:", error);
      }
    };

    fetchEnemies();
  }, []);

  return (
    <div className={styles.enemiesContainer}>
      <div className={styles.enemiesHeader}>
        <p className={styles.enemiesHeaderTitle}>Select an enemy</p>
        <p className={styles.enemiesCloseButton} onClick={onClose}>
          X
        </p>
      </div>

      <div className={styles.enemiesList}>
        {allEnemies.map((enemy) => (
          <div
            key={enemy.id}
            className={styles.enemyCard}
            onClick={() => {
              onSelect(enemy);
              onClose();
            }}
          >
            <p className={styles.enemyName}>{enemy.name}</p>
            <p className={styles.enemyDetail}>❤️ HP: {enemy.hp}</p>
            <p className={styles.enemyDetail}>⚔️ Attack: {enemy.attack}</p>
            <p className={styles.enemyDetail}>🛡️ Defense: {enemy.defense}</p>
            <p className={styles.enemyDetail}>
              🔥 Total Power: {enemy.total_power}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enemies;
