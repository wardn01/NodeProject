import styles from "./weapons.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Weapons component
 * @param {function} onSelect - Callback when a weapon is selected
 * @param {function} onClose - Callback when the component is closed
 * @returns JSX for the weapons component
 */
const Weapons = ({ onSelect, onClose }) => {
  const [weapons, setWeapons] = useState([]);

  // Fetch weapons from the backend
  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const responseData = await axios.get(
          "http://localhost:8000/weapon/all",
          {
            withCredentials: true,
          },
        );
        setWeapons(responseData.data.weapons);
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };

    fetchWeapons();
  }, []);

  return (
    <div className={styles.weaponsContainer}>
      <div className={styles.weaponsHeader}>
        <p className={styles.weaponsHeaderTitle}>Select a weapon</p>

        <p className={styles.weaponsHeaderCloseButton} onClick={onClose}>
          X
        </p>
      </div>

      {weapons.map((weapon) => {
        return (
          <div
            key={weapon.id}
            className={styles.weaponCard}
            style={{ backgroundImage: `url(${weapon.image})` }}
            onClick={() => {
              onSelect(weapon);
              onClose();
            }}
          >
            <p className={styles.weaponName}>{weapon.name}</p>

            <div className={styles.weaponDetailsRow}>
              <p className={styles.weaponDetail}>
                🌟 Type: {weapon.element_type}
              </p>
              <p className={styles.weaponDetail}>
                ⚔️ Attack: {weapon.base_damage}
              </p>
            </div>

            <p className={styles.weaponDetail}>📝 {weapon.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Weapons;
