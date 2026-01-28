import styles from "./modal.module.css";
import { useState } from "react";
import axios from "axios";

const SingleEnemy = ({ enemyData }) => {
  if (!enemyData) return null;

  return (
    <div className={styles.enemyCard}>
      <h2>{enemyData.name}</h2>
      <p>HP: {enemyData.hp}</p>
      <p>Attack: {enemyData.attack}</p>
      <p>Defense: {enemyData.defense}</p>
      <p>Total Power: {enemyData.totalPower}</p>
    </div>
  );
};

export default SingleEnemy;
