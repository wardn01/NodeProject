import styles from "./enemy.module.css";
import { useState, useEffect } from "react";
import Enemies from "../enemies/Enemies";
import axios from "axios";

const Enemy = ({ enemyId, onSelect }) => {
  const [enemyData, setEnemyData] = useState(null);
  const [showEnemyList, setShowEnemyList] = useState(false);

  const handleEnemySelection = (selectedEnemy) => {
    setEnemyData(selectedEnemy);
    setShowEnemyList(false);
    if (onSelect) {
      onSelect(selectedEnemy);
    }
  };

  useEffect(() => {
    if (enemyId) {
      const fetchEnemyDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/enemy/${enemyId}`,
            { withCredentials: true },
          );
          setEnemyData(response.data.enemy);
        } catch (error) {
          console.error("Error fetching enemy details:", error);
        }
      };
      fetchEnemyDetails();
    } else {
      setEnemyData(null);
    }
  }, [enemyId]);

  // تجهيز ستايل الصورة ديناميكياً
  const placeholderStyle = enemyData?.image
    ? {
        backgroundImage: `url(${enemyData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <div className={styles.enemyContainer}>
      {/* تم ربط كلاس active هنا ليظهر التوهج عند اختيار وحش */}
      <div
        className={`${styles.imagePlaceholder} ${enemyData ? styles.active : ""}`}
        style={placeholderStyle}
      >
        {!enemyData && "Enemy Image"}
      </div>

      <button
        className={styles.selectButton}
        onClick={() => setShowEnemyList(true)}
      >
        {enemyData ? "CHANGE ADVERSARY" : "SELECT AN ENEMY"}
      </button>

      <div className={styles.enemyCard}>
        {enemyData ? (
          <div className={styles.enemyInfo}>
            <h2 className={styles.enemyName}>{enemyData.name}</h2>
            <div className={styles.stats}>
              <p>❤️ HP: {enemyData.hp}</p>
              <p>⚔️ ATK: {enemyData.attack}</p>
              <p>🛡️ DEF: {enemyData.defense}</p>
              <p className={styles.totalPower}>
                🔥 Power: {enemyData.total_power}
              </p>
            </div>
          </div>
        ) : (
          <p className={styles.placeholderText}>No enemy selected yet.</p>
        )}
      </div>

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
