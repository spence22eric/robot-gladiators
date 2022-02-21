let fight = function (enemy) {
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    let promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from player Money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("player Money", playerInfo.money)
        break;
      }
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
  let shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      if (playerInfo.money >= 7) {
        window.alert("Refilling player's helath by 20 for 7 dollars.");

        // increase health and decrease money
        playerInfo.health = playerInfo.health + 20;
        playerInfo.money = playerInfo.money - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;

    case "UPGRADE": // new case
    case "upgrade":
      if (playerInfo.money >= 7) {
        window.alert("Upgrading players attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerInfo.attack = playerInfo.attack + 6;
        playerInfo.money = playerInfo.money - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;

    case "LEAVE": // new case
    case "leave":
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

let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

let playerInfo = {
  name: window.prompt("what is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }    
  },
  upgradeAttack: function() {
    if (this.money >=7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.")
      this.attack +=6;
      this.money -+7;
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