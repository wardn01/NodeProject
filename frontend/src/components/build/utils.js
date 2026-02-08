const getEnemyElement = (enemyName) => {
  if (!enemyName) return "Neutral";
  const name = enemyName.toLowerCase();

  if (name.includes("fire") || name.includes("blaze") || name.includes("magma"))
    return "Fire";
  if (name.includes("ice") || name.includes("frost") || name.includes("bound"))
    return "Ice";
  if (name.includes("sand") || name.includes("hulk") || name.includes("wisp"))
    return "Sand";
  if (
    name.includes("shadow") ||
    name.includes("void") ||
    name.includes("knight") ||
    name.includes("skeleton")
  )
    return "Shadow";
  return "Neutral";
};

const getDamageMultiplier = (weaponType, enemyElement) => {
  if (!weaponType) return 1;

  switch (weaponType) {
    case "Fire":
      if (enemyElement === "Ice") return 1.3;
      if (enemyElement === "Fire") return 0.7;
      if (enemyElement === "Sand") return 1.1;
      break;
    case "Ice":
      if (enemyElement === "Sand") return 1.3;
      if (enemyElement === "Ice") return 0.7;
      if (enemyElement === "Fire") return 0.9;
      break;
    case "Wind":
      if (enemyElement === "Shadow") return 1.4;
      if (enemyElement === "Sand") return 1.2;
      break;
    default:
      return 1;
  }
  return 1;
};

const calculateDamage = (atk, def) => {
  const damage = atk * (100 / (100 + def));
  return Math.max(5, Math.floor(damage));
};

export const calculateWinChance = (heroStats, weapon, enemy) => {
  if (!enemy || !heroStats) return 0;

  const heroHP = heroStats.hp;
  const heroDef = heroStats.defense;
  let heroAtk = heroStats.attack + (weapon ? weapon.base_damage : 0);

  const enemyElement = getEnemyElement(enemy.name);
  const weaponType = weapon ? weapon.element_type : "Neutral";
  const multiplier = getDamageMultiplier(weaponType, enemyElement);

  heroAtk = heroAtk * multiplier;
  const dmgToEnemy = calculateDamage(heroAtk, enemy.defense);
  const dmgToHero = calculateDamage(enemy.attack, heroDef);
  const turnsToKillEnemy = Math.ceil(enemy.hp / dmgToEnemy);
  const turnsToDie = Math.ceil(heroHP / dmgToHero);
  if (turnsToDie >= turnsToKillEnemy) {
    return 100;
  } else {
    let chance = (turnsToDie / turnsToKillEnemy) * 100;
    chance = Math.max(1, Math.floor(chance));
    return chance > 95 ? 95 : chance;
  }
};
