import styles from "./build.module.css";
import { useState, useRef, useEffect } from "react";
import { calculateWinChance } from "./utils";
import Weapon from "../weapon/Weapon";
import Enemy from "../enemy/Enemy";
import axios from "axios";

/**
 * Build component
 * @param {object} buildData - Data for the build to display
 * @param {function} refreshBuilds - Callback function to refresh the list of builds
 * @returns JSX for the build component
 */
const Build = ({ buildData, refreshBuilds }) => {
  const [stats, setStats] = useState({
    hp: buildData.hp,
    attack: buildData.attack,
    defense: buildData.defense,
    points: buildData.points,
    image: buildData.image,
  });

  const [isEdited, setIsEdited] = useState(false);

  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedEnemy, setSelectedEnemy] = useState(null);

  const fileInputRef = useRef(null);

  const [winChance, setWinChance] = useState(0);

  // Fetch weapon and enemy details when buildData changes
  useEffect(() => {
    if (buildData) {
      setStats({
        hp: buildData.hp,
        attack: buildData.attack,
        defense: buildData.defense,
        points: buildData.points,
        image: buildData.image,
      });

      const fetchDetails = async () => {
        try {
          if (buildData.weapon_id) {
            const responseData = await axios.get(
              `http://localhost:8000/weapon/${buildData.weapon_id}`,
              { withCredentials: true },
            );
            setSelectedWeapon(responseData.data.weapon);
          } else {
            setSelectedWeapon(null);
          }

          if (buildData.enemy_id) {
            const responseData = await axios.get(
              `http://localhost:8000/enemy/${buildData.enemy_id}`,
              { withCredentials: true },
            );
            setSelectedEnemy(responseData.data.enemy);
          } else {
            setSelectedEnemy(null);
          }
        } catch (err) {
          console.error("Error fetching details:", err);
        }
      };
      fetchDetails();
    }
  }, [buildData]);

  // Recalculate win chance whenever stats, selected weapon, or selected enemy changes
  useEffect(() => {
    if (selectedEnemy) {
      const chance = calculateWinChance(stats, selectedWeapon, selectedEnemy);
      setWinChance(chance);
    } else {
      setWinChance(0);
    }
  }, [stats, selectedWeapon, selectedEnemy]);

  // Handle stat changes (increase/decrease)
  const handleStatChange = (stat, operation) => {
    const changeAmount = stat === "hp" ? 50 : 10;

    if (operation === "increase") {
      if (stats.points > 0) {
        setStats({
          ...stats,
          [stat]: stats[stat] + changeAmount,
          points: stats.points - 1,
        });
        setIsEdited(true);
      }
    } else {
      const minValues = { hp: 50, attack: 10, defense: 10 };

      if (stats[stat] > minValues[stat]) {
        setStats({
          ...stats,
          [stat]: stats[stat] - changeAmount,
          points: stats.points + 1,
        });
        setIsEdited(true);
      }
    }
  };

  // Handle saving the build
  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("hp", stats.hp);
      formData.append("attack", stats.attack);
      formData.append("defense", stats.defense);
      formData.append("points", stats.points);

      formData.append("weapon_id", selectedWeapon ? selectedWeapon.id : "");
      formData.append("enemy_id", selectedEnemy ? selectedEnemy.id : "");

      if (stats.imageFile) {
        formData.append("image", stats.imageFile);
      }

      const response = await axios.put(
        `http://localhost:8000/build/update/${buildData.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.imageUrl) {
        setStats((prev) => ({
          ...prev,
          image: response.data.imageUrl,
          imageFile: null,
        }));
      }

      setIsEdited(false);
      refreshBuilds();
    } catch (error) {
      console.error("Error saving build:", error);
    }
  };

  // Handle deleting the build
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

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setStats((prevStats) => ({
      ...prevStats,
      image: previewUrl,
      imageFile: file,
    }));

    setIsEdited(true);
  };

  const heroImageStyle = stats.image
    ? { backgroundImage: `url(${stats.image})` }
    : {};

  return (
    <div className={styles.buildContainer}>
      <div className={styles.header}>
        <h2 className={styles.buildTitle}>{buildData.build_name}</h2>
        <div className={styles.headerControls}>
          {isEdited && (
            <button className={styles.saveButton} onClick={handleSave}>
              💾 SAVE
            </button>
          )}
          <span className={styles.pointsBadge}>Points: {stats.points}</span>
          <button className={styles.deleteButton} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>

      <div className={styles.arena}>
        <div className={styles.leftSide}>
          <Enemy
            enemyId={selectedEnemy ? selectedEnemy.id : null}
            onSelect={(enemy) => {
              setSelectedEnemy(enemy);
              setIsEdited(true);
            }}
          />
        </div>

        <div className={styles.vsContainer}>
          <span className={styles.vsText}>VS</span>

          {selectedEnemy && (
            <div className={styles.winRateContainer}>
              <div
                className={`${styles.winRateText} ${winChance >= 50 ? styles.highChance : styles.lowChance}`}
              >
                Win Chance: {winChance}%
              </div>

              <div className={styles.winRateBarTrack}>
                <div
                  className={`${styles.winRateBarFill} ${winChance >= 50 ? styles.fillHigh : styles.fillLow}`}
                  style={{ width: `${winChance}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.rightSide}>
          <div
            className={styles.imagePlaceholder}
            style={heroImageStyle}
            onClick={() => fileInputRef.current.click()}
          >
            {!stats.image && "Hero Image"}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <div className={styles.statsContainer}>
            <div className={styles.statRow}>
              <span>❤️ HP: {stats.hp}</span>
              <div className={styles.controls}>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("hp", "decrease")}
                >
                  -
                </button>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("hp", "increase")}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.statRow}>
              <span>⚔️ ATK: {stats.attack}</span>
              <div className={styles.controls}>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("attack", "decrease")}
                >
                  -
                </button>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("attack", "increase")}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.statRow}>
              <span>🛡️ DEF: {stats.defense}</span>
              <div className={styles.controls}>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("defense", "decrease")}
                >
                  -
                </button>
                <button
                  className={styles.controlButton}
                  onClick={() => handleStatChange("defense", "increase")}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className={styles.weaponSection}>
            <Weapon
              weaponId={selectedWeapon ? selectedWeapon.id : null}
              onSelect={(weapon) => {
                setSelectedWeapon(weapon);
                setIsEdited(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Build;
