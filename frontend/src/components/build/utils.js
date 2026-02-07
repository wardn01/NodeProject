const getEnemyElement = (enemyName) => {
  if (!enemyName) return "Neutral";
  const name = enemyName.toLowerCase();
  if (name.includes("fire") || name.includes("blaze") || name.includes("magma"))
    return "Fire";
  if (name.includes("ice") || name.includes("frost") || name.includes("bound"))
    return "Ice";
  if (name.includes("sand") || name.includes("hulk") || name.includes("wisp"))
    return "Sand";
  if (name.includes("shadow") || name.includes("void")) return "Shadow";
  return "Neutral";
};

const getDamageMultiplier = (weaponType, enemyElement) => {
  if (!weaponType) return 1;

  switch (weaponType) {
    case "Ice":
      if (enemyElement === "Fire") return 1.5;
      if (enemyElement === "Ice") return 0.5;
      if (enemyElement === "Sand") return 1.2;
      break;
    case "Fire":
      if (enemyElement === "Ice") return 1.5;
      if (enemyElement === "Fire") return 0.5;
      if (enemyElement === "Sand") return 0.8;
      break;
    case "Wind":
      if (enemyElement === "Sand") return 1.5;
      if (enemyElement === "Shadow") return 1.1;
      break;
    default:
      return 1;
  }
  return 1;
};

export const calculateWinChance = (heroStats, weapon, enemy) => {
  if (!enemy) return 0;

  const heroHP = heroStats.hp;
  const heroDef = heroStats.defense;

  let heroAtk = heroStats.attack + (weapon ? weapon.base_damage : 0);

  const enemyElement = getEnemyElement(enemy.name);
  const multiplier = weapon
    ? getDamageMultiplier(weapon.element_type, enemyElement)
    : 1;

  heroAtk = Math.floor(heroAtk * multiplier);

  const dmgToEnemy = Math.max(1, heroAtk - enemy.defense);
  const dmgToHero = Math.max(1, enemy.attack - heroDef);

  const turnsToKillEnemy = Math.ceil(enemy.hp / dmgToEnemy);
  const turnsToDie = Math.ceil(heroHP / dmgToHero);

  if (turnsToDie >= turnsToKillEnemy) {
    return 100;
  } else {
    const chance = (turnsToDie / turnsToKillEnemy) * 100;
    return Math.floor(chance);
  }
};
