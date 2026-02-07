import styles from "./build.module.css";
import { useState, useRef, useEffect } from "react";
import { calculateWinChance } from "./utils";
import Weapon from "../weapon/Weapon";
import Enemy from "../enemy/Enemy";
import axios from "axios";

/**
 * build component
 * @returns build jsx
 */
const Build = ({ buildData, refreshBuilds }) => {
  const [stats, setStats] = useState({
    hp: buildData.hp,
    attack: buildData.attack,
    defense: buildData.defense,
    points: buildData.points,
  });

  const [isEdited, setIsEdited] = useState(false);

  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedEnemy, setSelectedEnemy] = useState(null);

  const [image, setImage] = useState(buildData.image);
  const fileInputRef = useRef(null);

  const [winChance, setWinChance] = useState(0);

  useEffect(() => {
    if (buildData) {
      setStats({
        hp: buildData.hp,
        attack: buildData.attack,
        defense: buildData.defense,
        points: buildData.points,
      });
      setImage(buildData.image);

      const fetchDetails = async () => {
        try {
          if (buildData.weapon_id) {
            const wRes = await axios.get(
              `http://localhost:8000/weapon/${buildData.weapon_id}`,
              { withCredentials: true },
            );
            setSelectedWeapon(wRes.data.weapon);
          } else {
            setSelectedWeapon(null);
          }

          if (buildData.enemy_id) {
            const eRes = await axios.get(
              `http://localhost:8000/enemy/${buildData.enemy_id}`,
              { withCredentials: true },
            );
            setSelectedEnemy(eRes.data.enemy);
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

  useEffect(() => {
    if (selectedEnemy) {
      const chance = calculateWinChance(stats, selectedWeapon, selectedEnemy);
      setWinChance(chance);
    } else {
      setWinChance(0);
    }
  }, [stats, selectedWeapon, selectedEnemy]);

  // --- Handlers ---

  const handleStatChange = (stat, operation) => {
    if (operation === "increase") {
      if (stats.points > 0) {
        setStats({
          ...stats,
          [stat]: stats[stat] + 10,
          points: stats.points - 1,
        });
        setIsEdited(true);
      }
    } else {
      const minValues = { hp: 100, attack: 10, defense: 10 };
      if (stats[stat] > minValues[stat]) {
        setStats({
          ...stats,
          [stat]: stats[stat] - 10,
          points: stats.points + 1,
        });
        setIsEdited(true);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8000/build/update/${buildData.id}`,
        {
          ...stats,
          weapon_id: selectedWeapon ? selectedWeapon.id : null,
          enemy_id: selectedEnemy ? selectedEnemy.id : null,
        },
        { withCredentials: true },
      );

      setIsEdited(false);
      refreshBuilds();
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.put(
        `http://localhost:8000/build/update/${buildData.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.imageUrl) {
        setImage(response.data.imageUrl);
      }

      refreshBuilds();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const heroImageStyle = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  // --- JSX ---

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
        {/* Left Side: Enemy */}
        <div className={styles.leftSide}>
          <Enemy
            enemyId={selectedEnemy ? selectedEnemy.id : null}
            onSelect={(enemy) => {
              setSelectedEnemy(enemy);
              setIsEdited(true);
            }}
          />
        </div>

        {/* Center: VS & Win Rate */}
        <div className={styles.vsContainer}>
          <span className={styles.vsText}>VS</span>

          {selectedEnemy && (
            <div
              className={styles.winRateContainer}
              style={{
                marginTop: "15px",
                textAlign: "center",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <div
                style={{
                  color: winChance >= 50 ? "#4cd137" : "#e84118",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  fontFamily: "var(--font-family-main)",
                  textShadow: "1px 1px 0 #000",
                }}
              >
                Win Chance: {winChance}%
              </div>

              {/* شريط التقدم المرئي */}
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#222",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid #444",
                  boxShadow: "inset 0 0 5px #000",
                }}
              >
                <div
                  style={{
                    width: `${winChance}%`,
                    height: "100%",
                    backgroundColor: winChance >= 50 ? "#4cd137" : "#e84118",
                    backgroundImage:
                      "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)",
                    backgroundSize: "1rem 1rem",
                    transition: "width 0.6s ease-out, background-color 0.3s",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Hero Stats & Weapon */}
        <div className={styles.rightSide}>
          <div
            className={styles.imagePlaceholder}
            style={heroImageStyle}
            onClick={() => fileInputRef.current.click()}
          >
            {!image && "Hero Image"}
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
              weaponId={selectedWeapon ? selectedWeapon.id : null}
              onSelect={(weapon) => {
                setSelectedWeapon(weapon);
                setIsModified(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Build;
