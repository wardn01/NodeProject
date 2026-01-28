import styles from "./allEnemies.module.css";

const AllEnemies = ({ allEnemies, setSelectedEnemy, setPropAllEnemies }) => {
  return (
    <div className={styles.allEnemiesContainer}>
      <div className={styles.allEnemiesHeader}>
        <p className={styles.allEnemiesHeaderTitle}>Select an enemy</p>
        <p
          className={styles.allEnemiesCloseButton}
          onClick={() => setPropAllEnemies(false)}
        >
          X
        </p>
      </div>

      <div className={styles.enemiesList}>
        {allEnemies.map((enemy) => (
          <div
            key={enemy.id}
            className={styles.enemyCard}
            onClick={() => setSelectedEnemy(enemy)}
          >
            <p className={styles.enemyName}>{enemy.name}</p>
            <p className={styles.enemyDetail}>HP: {enemy.hp}</p>
            <p className={styles.enemyDetail}>Attack: {enemy.attack}</p>
            <p className={styles.enemyDetail}>Defense: {enemy.defense}</p>
            <p className={styles.enemyDetail}>
              TotalPower: {enemy.total_power}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEnemies;
