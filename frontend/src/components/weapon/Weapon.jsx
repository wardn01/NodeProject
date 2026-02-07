import styles from "./weapon.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Weapons from "../weapons/Weapons";

/**
 * Weapon component
 * @param {number} weaponId - ID of the weapon to display
 * @param {function} onSelect - Callback function when a weapon is selected
 * @returns JSX for the weapon component
 */
const Weapon = ({ weaponId, onSelect }) => {
  const [weaponData, setWeaponData] = useState(null);
  const [showWeaponList, setShowWeaponList] = useState(false);

  // Handle weapon selection from the list
  const handleWeaponSelection = (selectedWeapon) => {
    setWeaponData(selectedWeapon);
    setShowWeaponList(false);

    if (onSelect) {
      onSelect(selectedWeapon);
    }
  };

  // Fetch weapon details when weaponId changes
  useEffect(() => {
    if (weaponId) {
      const fetchWeapon = async () => {
        try {
          const responseData = await axios.get(
            `http://localhost:8000/weapon/${weaponId}`,
            { withCredentials: true },
          );
          setWeaponData(responseData.data.weapon);
        } catch (error) {
          console.error("Error fetching weapon details:", error);
        }
      };
      fetchWeapon();
    } else {
      setWeaponData(null);
    }
  }, [weaponId]);

  // Determine the weapon image to display
  const weaponImage = weaponData ? weaponData.image : null;

  return (
    <div className={styles.weaponContainer}>
      <div
        className={`${styles.weaponSlot} ${weaponData ? styles.equipped : styles.empty}`}
        style={{ backgroundImage: `url(${weaponImage})` }}
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
