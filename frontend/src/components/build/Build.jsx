import styles from "./build.module.css";
import { useState } from "react";
import axios from "axios";
import Weapon from "../weapon/Weapon";
import SingleEnemy from "../singleEnemy/SingleEnemy";

const Build = ({ buildData, refreshBuilds }) => {
  const [stats, setStats] = useState({
    hp: buildData.hp,
    attack: buildData.attack,
    defense: buildData.defense,
  });

  const [points, setPoints] = useState(buildData.points);
  const [isModified, setIsModified] = useState(false);
  const [selectedWeaponId, setSelectedWeaponId] = useState(buildData.weapon_id);

  const handleStatChange = (stat, operation) => {
    if (operation === "increase") {
      if (points > 0) {
        setStats({ ...stats, [stat]: stats[stat] + 10 });
        setPoints(points - 1);
        setIsModified(true);
      }
    } else {
      const minValues = { hp: 100, attack: 10, defense: 10 };
      if (stats[stat] > minValues[stat]) {
        setStats({ ...stats, [stat]: stats[stat] - 10 });
        setPoints(points + 1);
        setIsModified(true);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/build/update/${buildData.id}`,
        {
          ...stats,
          points,
          weapon_id: selectedWeaponId,
        },
        { withCredentials: true },
      );

      setIsModified(false);
    } catch (error) {
      console.error("Error saving build:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/build/delete/${buildData.id}`, {
        withCredentials: true,
      });
      refreshBuilds();
    } catch (error) {
      console.error("Error deleting build:", error);
    }
  };
  return (
    <div className={styles.buildContainer}>
      <div className={styles.header}>
        <h2 className={styles.buildTitle}>{buildData.build_name}</h2>
        <div className={styles.headerControls}>
          <span className={styles.pointsBadge}>Points: {points}</span>
          <button className={styles.deleteButton} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>

      <div className={styles.arena}>
        <div className={styles.leftSide}>
          <div className={styles.imagePlaceholder}>Enemy Image</div>
          <SingleEnemy />
        </div>

        <div className={styles.vsContainer}>
          <span className={styles.vsText}>VS</span>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.imagePlaceholder}>Hero Image</div>

          <div className={styles.statsContainer}>
            <div className={styles.statRow}>
              <span>❤️ HP: {stats.hp}</span>
              <div className={styles.controls}>
                <button onClick={() => handleStatChange("hp", "decrease")}>
                  -
                </button>
                <button onClick={() => handleStatChange("hp", "increase")}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.statRow}>
              <span>⚔️ ATK: {stats.attack}</span>
              <div className={styles.controls}>
                <button onClick={() => handleStatChange("attack", "decrease")}>
                  -
                </button>
                <button onClick={() => handleStatChange("attack", "increase")}>
                  +
                </button>
              </div>
            </div>
            <div className={styles.statRow}>
              <span>🛡️ DEF: {stats.defense}</span>
              <div className={styles.controls}>
                <button onClick={() => handleStatChange("defense", "decrease")}>
                  -
                </button>
                <button onClick={() => handleStatChange("defense", "increase")}>
                  +
                </button>
              </div>
            </div>
          </div>

          <div className={styles.weaponSection}>
            <Weapon
              weaponId={selectedWeaponId}
              onSelect={(newId) => {
                setSelectedWeaponId(newId);
                setIsModified(true);
              }}
            />
          </div>

          {isModified && (
            <button className={styles.saveButton} onClick={handleSave}>
              💾 SAVE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Build;
