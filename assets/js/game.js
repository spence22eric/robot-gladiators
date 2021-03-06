let fightOrSkip = function () {
  // ask player if they'd like to fight or skip using fightOrSkip function
  let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if the `promptFight` is NOT a valid value, then execute the following statements.
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  promptFight = promptFight.toLowerCase();

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    let confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);

      // return true if player wants to leave
      return true;
    }
    else {
      fightOrSkip();
    }
    shop();
  }
  return false;
}
let fight = function (enemy) {
  //  keep track of who goes first
  let isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > .5) {
    isPlayerTurn = false;
  }

  // repeat and execute as long as the enemy-robot is alive 
  while (playerInfo.health > 0 && enemy.health > 0) {

    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }


      // generate random damage value based on player's attack power
      let enemyDamage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - enemyDamage);

      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }

    }
    // if player gets attacked first
    else {

      // generate random damage value based on player's attack power
      let playerDamage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      playerInfo.health = Math.max(0, playerInfo.health - playerDamage);

      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};


let startGame = function () {
  // reset player stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (let i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));


      // pick new enemy to fight based on the index of the enemy Names array
      let pickedEnemyObj = enemyInfo[i];

      // reset enemy Health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the picked Enemy Name variable's value into the fight function, where it will assume the value of the enemy Name parameter
      fight(pickedEnemyObj);


      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use shop before next round
        let storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take player to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }

    // if player isn't alive, stop the game <---- this does not work
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

let endGame = function () {
  window.alert("The game has ended. Let's see how you did!");

  // check localStorage for high score, if it's not there, use 0
  let highScore = localStorage.getItem("highscore");

  // check localStorage for highscore, if it's not there, use 0
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than high score, player has a new high score
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money);
  }
  else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }

  // window.alert("The game has now ended. Let's see how you did!");
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  let playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }

};

let shop = function () {
  let shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

  shopOptionPrompt = parseInt(shopOptionPrompt);

  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();

      break;

    case 2:
      playerInfo.upgradeAttack();

      break;

    case 3:
      window.alert("Leaving the store.");
      // do nothing so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Please try again.");

      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
}

let randomNumber = function (min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

let getPlayerName = function () {
  let name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

let playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.")
      this.attack += 6;
      this.money - +7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

// You can also log multiple values at once like this
console.log(playerInfo.health, "Health: " + playerInfo.health, "Attack: " + playerInfo.attack);

let enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();