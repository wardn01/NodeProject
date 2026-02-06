import styles from "./weapon.module.css";
import { useState, useEffect } from "react";
import Weapons from "../weapons/Weapons";
import axios from "axios";

const Weapon = ({ weaponId, onSelect }) => {
  const [weaponData, setWeaponData] = useState(null);
  const [showWeaponList, setShowWeaponList] = useState(false);

  const handleWeaponSelection = (selectedWeapon) => {
    setWeaponData(selectedWeapon);
    setShowWeaponList(false);

    if (onSelect) {
      onSelect(selectedWeapon.id);
    }
  };

  useEffect(() => {
    if (weaponId) {
      const fetchWeaponDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/weapon/${weaponId}`,
            { withCredentials: true },
          );
          setWeaponData(response.data.weapon);
        } catch (error) {
          console.error("Error fetching weapon details:", error);
        }
      };
      fetchWeaponDetails();
    } else {
      setWeaponData(null);
    }
  }, [weaponId]);

  return (
    <div className={styles.weaponContainer}>
      <div
        className={`${styles.weaponSlot} ${weaponData ? styles.equipped : styles.empty}`}
        onClick={() => setShowWeaponList(true)}
      >
        {weaponData ? (
          <div className={styles.slotContent}>
            <span className={styles.icon}>⚔️</span>
            <div className={styles.info}>
              <span className={styles.name}>{weaponData.name}</span>
              <span className={styles.stat}>+{weaponData.base_damage} ATK</span>
            </div>
          </div>
        ) : (
          <div className={styles.slotContent}>
            <span className={styles.plusIcon}>+</span>
            <span className={styles.placeholder}>Equip Weapon</span>
          </div>
        )}
      </div>

      {showWeaponList && (
        <div className={styles.popupOverlay}>
          <Weapons
            onSelect={handleWeaponSelection}
            onClose={() => setShowWeaponList(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Weapon;
