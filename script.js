let money = 0;
let power = 1;
let luck = 0;
let inventory = [];

function clickCoin() {
  money += power;
  updateStats();
}

function updateStats() {
  document.getElementById("money").textContent = money;
  document.getElementById("power").textContent = power;
  document.getElementById("luck").textContent = luck;
}

function buyUpgrade(type) {
  if (type === "power" && money >= 50) {
    money -= 50;
    power++;
    logMessage("Upgraded Power → Click Power is now " + power);
  } else if (type === "luck" && money >= 100) {
    money -= 100;
    luck++;
    logMessage("Upgraded Luck → Luck is now " + luck + "%");
  } else {
    logMessage("Not enough money for upgrade.");
  }
  updateStats();
}

function buyBox(box) {
  let cost, rarityChance;
  if (box === 1) { cost = 10; rarityChance = [70, 25, 5]; }
  if (box === 2) { cost = 50; rarityChance = [50, 35, 15]; }
  if (box === 3) { cost = 200; rarityChance = [30, 40, 30]; }

  if (money < cost) {
    logMessage("Not enough money for Box " + box);
    return;
  }

  money -= cost;
  updateStats();

  let rarity = getRarity(rarityChance);
  let food = getFood(rarity);
  inventory.push(food + " (" + rarity + ")");
  updateInventory();
  logMessage("Opened Box " + box + " → " + food + " (" + rarity + ")");
}

function getRarity(chances) {
  let roll = Math.random() * 100;
  roll -= luck; // luck increases chance for better rarity
  if (roll < chances[0]) return "Common";
  else if (roll < chances[0] + chances[1]) return "Rare";
  else return "Epic";
}

function getFood(rarity) {
  const foods = {
    "Common": ["🍎 Apple", "🍞 Bread", "🥔 Potato"],
    "Rare": ["🍕 Pizza", "🍔 Burger", "🍣 Sushi"],
    "Epic": ["🍫 Chocolate", "🍰 Cake", "🍤 Lobster"]
  };
  let list = foods[rarity];
  return list[Math.floor(Math.random() * list.length)];
}

function updateInventory() {
  let inv = document.getElementById("inventory");
  inv.innerHTML = "";
  inventory.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    inv.appendChild(li);
  });
}

function logMessage(msg) {
  let log = document.getElementById("log");
  log.innerHTML += msg + "<br>";
  log.scrollTop = log.scrollHeight;
}
