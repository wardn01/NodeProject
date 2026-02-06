import styles from "./weapons.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Weapons = ({ onSelect, onClose }) => {
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const weaponsData = await axios.get(
          "http://localhost:8000/weapon/all",
          {
            withCredentials: true,
          },
        );
        setWeapons(weaponsData.data.weapons);
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
        <p className={styles.weaponsCloseButton} onClick={onClose}>
          X
        </p>
      </div>
      {weapons.map((weapon) => (
        <div
          key={weapon.id}
          className={styles.weaponCard}
          onClick={() => {
            onSelect(weapon);
            onClose();
          }}
        >
          <p className={styles.weaponName}>{weapon.name}</p>
          <p className={styles.weaponDetail}> Type: {weapon.element_type}</p>
          <p className={styles.weaponDetail}>⚔️ Attack: {weapon.base_damage}</p>
          <p className={styles.weaponDetail}>
            Description: {weapon.description}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Weapons;
