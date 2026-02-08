import styles from "./about.module.css";

/**
 * About component
 * @returns JSX for the about component
 */
function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>🛡️ The Battle Forge</h1>
        <p className={styles.subtitle}>Craft Your Legend. Defy the Odds.</p>

        <div className={styles.description}>
          <p>
            Welcome, warrior. This is not merely a tool; it is your war room. In
            a world dominated by <strong>Shadow Knights</strong> and ancient
            beasts, blind courage is not enough. You need strategy.
          </p>
          <p>
            Here, you can forge the ultimate builds, equip legendary weapons
            like the
            <strong> Inferno Sword</strong> and <strong>Glacial Bow</strong>,
            and analyze your combat statistics against the fiercest enemies.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.icon}>⚔️</span>
            <h3>Forge Builds</h3>
            <p>Customize HP, ATK, and DEF to create the perfect warrior.</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>📊</span>
            <h3>Simulate</h3>
            <p>Calculate your win chances before stepping into the arena.</p>
          </div>
          <div className={styles.statCard}>
            <span className={styles.icon}>👹</span>
            <h3>Conquer</h3>
            <p>Study your enemies and exploit their weaknesses to win.</p>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Created for the bravest fighters.</p>
          <p className={styles.version}>v1.0.0 Visions</p>
        </div>
      </div>
    </div>
  );
}

export default About;
