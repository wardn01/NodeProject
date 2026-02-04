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
      <button
        className={styles.selectButton}
        onClick={() => setShowWeaponList(true)}
      >
        SELECT A WEAPON
      </button>
      {weaponData ? (
        <div className={styles.weaponCard}>
          <h2>{weaponData.name}</h2>
          <div className={styles.stats}>
            <p> Type: {weaponData.type}</p>
            <p>⚔️ Attack: {weaponData.base_damage}</p>
            <p>Description: {weaponData.description}</p>
          </div>
        </div>
      ) : (
        <p className={styles.placeholderText}>No weapon selected yet.</p>
      )}
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
