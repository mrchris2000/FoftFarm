// Game state initialization
export const initialGameState = {
  cows: 0,
  grain: 0,
  money: 2000,
  milk: 0,
  cowPrice: 50,
  grainPrice: 30,
  dairy: 0,
  farm: 0,
  grainPlanted: 0,
  turn: 0,
  eventLog: [],
};

// Calculate next turn
export function calculateNextTurn(state) {
  const newState = { ...state };
  const events = [];

  // Milk production and sales
  newState.milk = newState.cows * Math.random() * newState.dairy;
  newState.money += newState.milk;

  // Grain growth from planted grain
  if (newState.grainPlanted > newState.grain) {
    newState.grainPlanted = newState.grain;
  }
  newState.grain += newState.grainPlanted * (newState.farm / 50);

  // Feed cows (they eat grain)
  newState.grain -= newState.cows / 2;

  // If not enough grain, cows die
  if (newState.grain < 0) {
    const cowsLost = Math.floor(Math.random() * (-newState.grain / 2));
    newState.cows = Math.max(0, newState.cows - cowsLost);
    newState.grain = 0;
    if (cowsLost > 0) {
      events.push(`⚠️ ${cowsLost} cows died from starvation!`);
    }
  }

  // Natural grain loss (rats, etc)
  newState.grain -= newState.grain * (Math.random() * 0.01);

  // Price stabilization for cows
  if (newState.cowPrice < 50) {
    newState.cowPrice += Math.random() * ((50 - newState.cowPrice) / 4);
  } else {
    newState.cowPrice -= Math.random() * ((newState.cowPrice - 50) / 4);
  }

  // Price stabilization for grain
  if (newState.grainPrice < 10) {
    newState.grainPrice += Math.random() * ((10 - newState.grainPrice) / 8);
  } else {
    newState.grainPrice -= Math.random() * (newState.grainPrice - 10);
  }

  // Random price fluctuations
  newState.cowPrice += Math.random() * 4 - Math.random() * 4;
  newState.grainPrice += Math.random() * 2 - Math.random() * 2;

  // Interest/maintenance costs
  if (newState.money < 0) {
    newState.money += newState.money * 0.1; // 10% interest on debt
  } else {
    newState.money -= newState.money * 0.001; // 0.1% maintenance
  }

  // Ensure prices don't go negative
  if (newState.cowPrice < 0.1) newState.cowPrice = 0.1;
  if (newState.grainPrice < 1) newState.grainPrice = 1;

  // Random events
  checkRandomEvents(newState, events);

  newState.turn += 1;
  newState.eventLog = events;

  return newState;
}

function checkRandomEvents(state, events) {
  // Bankruptcy
  if (state.money < -100000) {
    events.push("💥 BANKRUPT! The bank has confiscated your farm!");
    state.cows = 0;
    state.money = 200;
    state.grain = 0;
    state.farm = 0;
    state.dairy = 0;
    state.grainPlanted = 0;
    return;
  }

  // BSE Alert
  if (state.cows > 100 && Math.floor(Math.random() * 30) === 15) {
    events.push("🦠 BSE Alert! Your herd is affected!");
    state.cowPrice -= Math.random() * 100;
    const cowsLost = Math.floor(Math.random() * (state.cows / 2));
    state.cows -= cowsLost;
  }

  // Rats eat grain
  if (state.grain > 100000 && Math.floor(Math.random() * 200) === 15) {
    const grainLost = Math.floor(Math.random() * state.grain);
    events.push(`🐀 Rats Eat Grain! Lost ${Math.floor(grainLost)} tons!`);
    state.grain -= grainLost;
  }

  // Grain infection
  if (state.grain > 1000000 && Math.floor(Math.random() * 5000) === 250) {
    events.push("🦠 Grain infected! Total loss!");
    state.grain = 0;
  }

  // Robbery
  if (state.money > 1000000 && Math.floor(Math.random() * 300) === 15) {
    const stolen = Math.floor(Math.random() * (state.money / 2));
    events.push(`🥷 You are robbed! Lost $${Math.floor(stolen)}!`);
    state.money -= stolen;
  }

  // Bank threatens mortgage disclosure
  if (state.money < 0 && Math.floor(Math.random() * 300) === 15) {
    const cowsBribed = Math.floor(Math.random() * (state.cows / 6));
    events.push(`🏦 Bank threatens foreclosure! Bribed with ${cowsBribed} cows!`);
    state.cows -= cowsBribed;
  }

  // Major theft
  if (state.money >= 900000000) {
    events.push("🚨 Major theft reported!");
    state.money = 9999999;
  }

  // Overcrowding
  if (state.cows > state.farm * 10000) {
    events.push("👮 Arrested for overcrowding animals! Fine: $1,000,000");
    state.money -= 1000000;
  }

  // Too much grain storage
  if (state.grain > state.farm * 10000000) {
    events.push("⚖️ Grain confiscated for poor storage! Farm damaged!");
    state.farm = 1;
    state.grain = 0;
  }

  // Sick cows
  if (state.cows > 2000 && Math.floor(Math.random() * 200) === 15) {
    const vetBill = state.cows * 10;
    events.push(`🏥 Cows ill! Vet bill: $${vetBill}`);
    state.money -= vetBill;
  }

  // Farmland deterioration
  if (state.farm > 0 && Math.floor(Math.random() * 3000) === 75) {
    events.push("🌾 Farmland deteriorates!");
    state.farm -= 1;
  }

  // Dairy damage
  if (state.dairy > 0 && Math.floor(Math.random() * 3000) === 75) {
    events.push("🌪️ Dairy damaged by high winds!");
    state.dairy -= 1;
  }
}

// Trading functions
export function buyCows(state, quantity) {
  const newState = { ...state };
  let cowPurchasePrice = newState.cowPrice;
  const cowPriceMin = newState.cowPrice / 2;

  for (let i = quantity; i > 0; i--) {
    newState.cowPrice += Math.random();
    cowPurchasePrice -= Math.random();
  }

  if (cowPurchasePrice < cowPriceMin) {
    cowPurchasePrice = cowPriceMin;
  }

  const totalCost = cowPurchasePrice * quantity;
  newState.money -= totalCost;
  newState.cows += quantity;

  return newState;
}

export function sellCows(state, quantity) {
  if (quantity > state.cows) {
    return state;
  }

  const newState = { ...state };
  let cowSalePrice = newState.cowPrice;

  for (let i = quantity; i > 0; i--) {
    newState.cowPrice -= Math.random() * 5;
    cowSalePrice -= Math.random() * 5;
  }

  if (newState.cowPrice < 5) {
    newState.cowPrice = 5;
  }

  if (cowSalePrice < newState.cowPrice - 10) {
    cowSalePrice = newState.cowPrice - 4;
  }

  const totalEarned = cowSalePrice * quantity;
  newState.money += totalEarned;
  newState.cows -= quantity;

  return newState;
}

export function buyGrain(state, quantity) {
  const newState = { ...state };
  const totalCost = quantity * newState.grainPrice;
  newState.money -= totalCost;
  newState.grain += quantity;
  newState.grainPrice += Math.random() * quantity;

  return newState;
}

export function sellGrain(state, quantity) {
  if (quantity > state.grain) {
    return state;
  }

  const newState = { ...state };
  const salePrice = 5;
  newState.grain -= quantity;
  newState.money += quantity * salePrice;
  newState.grainPrice -= Math.random() * quantity;
  if (newState.grainPrice < 1) {
    newState.grainPrice = 1;
  }

  return newState;
}

export function improveDairy(state) {
  const newState = { ...state };
  let cost = Math.pow(10, newState.dairy / 2);
  if (cost > 1000000) {
    cost = 1000000;
  }

  if (newState.money >= cost) {
    newState.dairy += 1;
    newState.money -= cost;
  }

  return newState;
}

export function improveFarm(state) {
  const newState = { ...state };

  if (newState.farm >= 7) {
    return state; // Farm is already at max
  }

  const cost = Math.pow(10, newState.farm);

  if (newState.money >= cost) {
    newState.money -= cost;
    newState.farm += 1;
  }

  return newState;
}

export function hireBull(state) {
  const newState = { ...state };

  if (newState.cows > 20 && newState.money > 200) {
    const cost = Math.max(200, 10 * newState.cows);
    newState.money -= cost;
    const newCows = Math.floor(Math.random() * (newState.cows / 2));
    newState.cows += newCows;
  }

  return newState;
}

export function sowGrain(state, quantity) {
  const newState = { ...state };
  const maxAllowed = Math.min(10000 + state.farm * 1000, state.grain);

  if (quantity > maxAllowed) {
    newState.grainPlanted = maxAllowed;
    newState.farm = Math.max(0, newState.farm - 1);
  } else {
    newState.grainPlanted = quantity;
  }

  return newState;
}

export function getDairyCost(dairy) {
  let cost = Math.pow(10, dairy / 2);
  if (cost > 1000000) {
    cost = 1000000;
  }
  return cost;
}

export function getFarmCost(farm) {
  if (farm >= 7) {
    return 0;
  }
  return Math.pow(10, farm);
}

export function getMaxGrainToSow(state) {
  return Math.min(10000 + state.farm * 1000, state.grain);
}
