import styles from "./allEnemies.module.css";
import { useState } from "react";
import axios from "axios";

// import SingleEnemy from "../singleEnemy/SingleEnemy";

const AllEnemies = () => {
  const [allEnemies, setAllEnemies] = useState([]);

  //   function handleLoadEnemies() {
  //     axios
  //       .get("http://localhost:8000/enemy/allEnemies", { withCredentials: true })
  //       .then((res) => {
  //         setEnemies(res.data);
  //       })
  //       .catch((err) => console.error("Error fetching enemies:", err));
  //   }

  return (
    <div className={styles.allEnemiesContainer}>
      <div className={styles.enemiesHeader}>
        <p>Select an enemy</p>
      </div>
      <div className={styles.enemiesList}>
        {enemies.map((enemy) => (
          <div key={enemy.id} className={styles.enemyCard}>
            <h3 className={styles.enemyName}>{enemy.name}</h3>
            <p className={styles.enemyDetail}>HP: {enemy.hp}</p>
            <p className={styles.enemyDetail}>Attack: {enemy.attack}</p>
            <p className={styles.enemyDetail}>Defense: {enemy.defense}</p>
            <p className={styles.enemyDetail}>TotalPower: {enemy.totalPower}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEnemies;
