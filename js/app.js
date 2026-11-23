//*************************************************** Cached elements ***************************************************
//Character Name 
let charNameEl = document.querySelector('#charName') 
// Character Health Point
let charHPEl = document.querySelector('#charHP')
// Character Attack Skill Button
let charAttackSkillBtnEl = document.querySelector('#charAttackSkill')
// Character Power Up Skill Button
let charPowerUpBtnEl = document.querySelector('#charPowerUp')
// Character Potion Button
let charPotionBtnEl = document.querySelector('#charPotion') 

//Monster Name
let monsterNameEl = document.querySelector('#monsterName')
//Monster Health Point 
let monsterHPEl = document.querySelector('#monsterHP')
//Monster Display Action
let monsterActionDisplayEl = document.querySelector('#monsterActionDisplay')

//Battle Log 
let battleLogEl = document.querySelector('#battleLogMessages')

//*************************************************** Variables ***************************************************
//Game is not over
let gameOver = false
//Monster's turn is not active
let isMonsterTurnActive = false 
//Monster's chosen action
let monsterActionType = null 

//*************************************************** Classes ***************************************************
//Game Character (Player or Monster or Boss Monster) class with stats: Name, HP, Attack Skill, Power Up Skill, Power Up Skill Active/Inactive, Healing Potion 
class GameCharacter {
    constructor(name, hp=100, attackSkillBaseDmg=15, powerUpMultiplier=1.5, healingAmountPotion=25) {
        this.name = name
        this.hp = hp
        this.attackSkillBaseDmg = attackSkillBaseDmg
        this.powerUpMultiplier = powerUpMultiplier
        this.isPoweredUp = false
        this.healingAmountPotion = healingAmountPotion
    }

    //*********************** Method Getters ***********************
    //Getting the initial Character Values
    //Method: Get the Character Name
    getName() {
        return this.name
    }
    //Method: Get the Character HP
    getHP() {
        return this.hp
    }
    //Method: Get Character Attack Skill 
    getAttackSkill() {
        return this.attackSkillBaseDmg
    }
    //Method: Get the Character Power Up
    getPowerUp() {
        return this.powerUpMultiplier
    }
    //Method: Get whether Character is Powered Up (Boolean)
    getIsPoweredUp() {
        return this.isPoweredUp
    }
    //Method: Get the Character Potion Heal Value 
    getPotion() {
        return this.healingAmountPotion
    }

    //*********************** Method Setters ***********************
    //Setting the Character's new value
    //Method: Set Character Name 
    setName(name) {
        this.name=name
    } 
    //Method: Set Character new HP
    setHP(newValue) {
        this.hp=newValue
    }
    //Method: Set the Character Attack Skill
    setAttackSkill(newValue) {
        this.attackSkillBaseDmg=newValue
    }
    //Method: Set the Game Character Power Up multiplier
    setPowerUp(newValue) {
        this.powerUpMultiplier=newValue
    }
    //Method: Set if the Game Character is Powered Up
    setIsPoweredUp(isPoweredUp) {
        this.isPoweredUp=isPoweredUp
    }
    //Method: Set the Game Character Potion
    setPotion(newValue) {
        this.healingAmountPotion=newValue
    }

    //************************************ Methods ************************************

    //Method: Attack - Calculates Attack Skill Damage and checks if it is Powered Up or not 
    attack() {
        //Boolean to check if character is Alive
        let isAlive = this.checkCharacterHealth()
        //If HP is 0 or less than 0, Stops and returns 0 Damage (Character Defeated)
        if(isAlive === false) {
            return 0 
        }

        //Variable to get Character Attack Skill Base Damage
        let baseAttackDmg = this.getAttackSkill()
        //Boolean to check if character is Powered Up 
        let isPoweredUp = this.getIsPoweredUp()

        //If statement to check if character is Powered Up, then apply the Power Up once then reset  
        if(isPoweredUp === true) {
            //Get Powered Up Attack Damage from method 
            let damage = this.getPoweredUpAttackDmg()
            //Reset the Power Up
            this.setIsPoweredUp(false) 
            //Return the Powered Up Attack Damage
            return damage
        }
        //Return base Attack Damage if character is not Powered Up 
        return baseAttackDmg
    }

    //Method: Check Character Health (Character Health Point is greater than 0 or alive)
    checkCharacterHealth()
    {
        let characterHealth = this.getHP()
        return characterHealth > 0
    }

    //Method: Take Damage (Reduce Character Health Point until it reaches 0)
    takeDamage(receivedDamage) {
        //Safeguard if Damage Received is less than 0
        if(receivedDamage < 0) {
            receivedDamage = 0
        }

        //Current Character (Player or Monster) HP 
        let currentHP = this.getHP()
        //Updated Character HP after receiving damage
        let updatedHP = currentHP-receivedDamage

        //Safeguard if Character (Player or Monster) HP goes below 0
        if(updatedHP < 0) {
            //If HP less than 0 then assign value to 0 to prevent going into negative value
            updatedHP = 0
        }

        //Set the updated HP value after receiving damage
        this.setHP(updatedHP)
    }

    //Method: Calculate Powered Up Attack Damage
    getPoweredUpAttackDmg() {
        //Variable to get Character Attack Skill Base Damage
        let baseAttackSkillDmg = this.getAttackSkill()
        //Variable to get Character Power Up Multiplier 
        let powerUp = this.getPowerUp()
        //Return Powered Up Attack
        return baseAttackSkillDmg * powerUp
    }

    //Method: Calculate Healing Potion
    getHealingPotionAmount() {
        //Character's current HP
        let currentHP = this.getHP()
        //Character's Healing Potion 
        let healingAmountPotion = this.getPotion()
        //Replenish Character's HP wtih Potion
        healingAmountPotion = currentHP + healingAmountPotion
        //Set Character's new HP after healing
        this.setHP(healingAmountPotion)
        return healingAmountPotion
    }

    //Method: Executed Actions - checks the chosen actionType string ('attack', 'powerUp' or 'potion') to decide which character (Player or Monster) move to execute (against target when attacking) 
    executedActions(actionType, target) {
        //Boolean Acted Turn (True if valid move executed, else false)
        let  actedTurn = false
        //If chosen action is an Attack
        if(actionType === 'attack') {
            //Calculates how much damage this character (Player or Monster) deals (Including PowerUp)
            let damage = this.attack()
            //Applies the damage to the targeted character's (Player or Monster) HP 
            target.takeDamage(damage)
            //Valid turn recorded 
            actedTurn = true
        //If chosen action is a Power Up
        } else if(actionType === 'powerUp') {
            //Sets the PowerUP as active on current Character (Player or Monster), so their next Attack will be Powered Up
            this.setIsPoweredUp(true)
            //Valid turn recorded 
            actedTurn = true
        //If chosen action is a Healing Potion 
        } else if(actionType === 'potion') {
            //Heals this character (Player or Monster) using Healing Potion
            this.getHealingPotionAmount()
            //Valid turn recorded
            actedTurn = true
        }
        //Returns true if valid action executed, else false
        return actedTurn
    }

    //Method: Player Turn - Stops if either Player or Monster HP is 0, then runs Player's chosen button action
    playerTurn(actionType, targetMonster) {
        //Safeguard: If statement to check if this player's HP is 0 or target monster HP is 0
        if(this.checkCharacterHealth() === false || targetMonster.checkCharacterHealth() === false) {
            //Stops the turn returns false because Player or Monster is already defeated 
            return false
        }
        //Executes the player's chosen action against targeted Monster and returns actedTurn from executedActions (True or False)
        return this.executedActions(actionType, targetMonster)
    }

    //Method: Monster Turn - Stops if either Player or Monster HP is 0, then picks random monster move and actions it
    monsterTurn(targetPlayer) {
        //Safeguard: If statement to check if this monster's HP is 0 or target player HP is 0
        if(this.checkCharacterHealth() === false || targetPlayer.checkCharacterHealth() === false) {
            //Stops the turn returns false because Player or Monster is already defeated 
            return false    
        }

        //Monster Randomized Actions List 
        let monsterActions = ['attack', 'powerUp', 'potion']
        //Generates random index from monsterActions Array
        let randomIndex = Math.floor(Math.random() * monsterActions.length)
        //Select random monster action based on the index
        let randomMonsterAction = monsterActions[randomIndex]
        //Store Monster chosen action 
        monsterActionType = randomMonsterAction
        //Executes Monster's random chosen action against target player and returns actedTurn from executedActions (True or False)
        return this.executedActions(randomMonsterAction, targetPlayer)
    }
}

//Characters and Monsters Objects
//Player
const player = new GameCharacter('Warrior', 120)
//Monster 1
const monster1 = new GameCharacter('Goblin 1', 20)
//Monster 2
const monster2 = new GameCharacter('Goblin 2', 20)
//Monster 3 
const monster3 = new GameCharacter('Goblin 3', 20)
//Dungeon Boss 
const bossMonster1 = new GameCharacter('Dungeon Boss', 20)
//Array for Monsters/Boss Objects 
const monsters = [monster1, monster2, monster3, bossMonster1]

//************************************ Functions ************************************
//Function: Disable or Enable Player's action button on UI
const setPlayerActionBtnDisabled = (isDisabled) => {
    //Toggle disable state on all player's action buttons
    charAttackSkillBtnEl.disabled = isDisabled
    charPowerUpBtnEl.disabled = isDisabled
    charPotionBtnEl.disabled = isDisabled 
}

//Function: Display Character Stats - Name and Health Point
const renderPlayerStats = () => {
    charNameEl.textContent = player.getName()
    charHPEl.textContent = player.getHP()
}
//Check for Player stats - Name and Health Point 
renderPlayerStats()

//Function: Keep Track of Current Monster from the Monsters Array
let currentMonsterIndex = 0
const getCurrentMonster = () => {
    return monsters[currentMonsterIndex]
}

//Function: Display active Monster/Boss Name and Health Point
const renderMonsterStats = () => {
    let activeMonster = getCurrentMonster()
    monsterNameEl.textContent = activeMonster.getName()
    monsterHPEl.textContent = activeMonster.getHP()
}
//Check for Monster stats - Name and Health Point 
renderMonsterStats()

//Function: Check if Player or Monster HP is 0, set game is over and disable action buttons if Player defeated or all Monsters are defeated, or spawn the next Monster and update UI & battle log
const checkBattleEnded = () => {
    //Get the monster active in battle 
    let monster = getCurrentMonster()

    //Check if player's health is 0 (false = 0)
    if(player.checkCharacterHealth() === false) {
        //Game Over - battle has ended
        gameOver = true 
        //Disable Player's action buttons if game is over
        setPlayerActionBtnDisabled(true)
        //Display Monster's action display to show battle has ended
        monsterActionDisplayEl.textContent = `${monster.getName()} has won the battle!`

        //Display Player defeat message to battle log 
        battleLogEl.innerHTML += `<p>${player.getName()} has been defeated!</p>`
        //Auto scroll to show latest battle log 
        battleLogMsgScroll()
        return 
    }

    //Check if the current monster's health is 0 
    if(monster.checkCharacterHealth() === false) {
        //Display Monster's action display to show current monster was defeated
        monsterActionDisplayEl.textContent = `${monster.getName()} was defeated!`

        //Display that this monster was defeated in the battle log
        battleLogEl.innerHTML += `<p>${monster.getName()} has been defeated!</p>`
        //Auto scroll to show latest battle log 
        battleLogMsgScroll()

        //Check if there are remaining Monsters in the Monsters Array
        if(currentMonsterIndex < monsters.length - 1) {
            //Move to the next monster
            currentMonsterIndex++
            //Update Monster's Name & HP on UI
            renderMonsterStats()
            //Display new monster is ready in Monster's action display
            monsterActionDisplayEl.textContent = `${getCurrentMonster().getName()} is waiting for your move.`
            //Display the next Monster in the battle log
            battleLogEl.innerHTML += `<p>${getCurrentMonster().getName()} has spawned!</p>`
            //Auto scroll to show latest battle log 
            battleLogMsgScroll()
        } else {
            //No remaining Monsters are available and Player has won - Game Over - battle has ended
            gameOver = true 
            //Disable Player's action buttons
            setPlayerActionBtnDisabled(true)
            //Victory message to battle log
            battleLogEl.innerHTML += `<p>You have defeated every monster, Victory!</p>`
            //Auto scroll to show latest battle log 
            battleLogMsgScroll()
        }
    }
}

//Function: Monster's takes its turn after a 1 second delay, locks Player's buttons, executes Monster action, checks if game is over, update UI/battle log and unlock Player's buttons
const handleMonsterTurn = () => {
    //Get the monster active in battle 
    let monster = getCurrentMonster()

    //Safeguard: Stop if game is over or either Player or Monster has 0 HP
    if(gameOver === true || monster.checkCharacterHealth() === false || player.checkCharacterHealth() === false) {
        //Unlock Player's turn
        isMonsterTurnActive = false
        //Disable Player's action buttons if game is over
        setPlayerActionBtnDisabled(gameOver === true)
        return
    }

    //Lock Player turn while Monster prepares its action
    isMonsterTurnActive = true 
    //Disable Player's action button during monster's turn
    setPlayerActionBtnDisabled(true)
    //Display monster turn status in Monster action display
    monsterActionDisplayEl.textContent = `${monster.getName()} is choosing a move...`

    //Wait for 1 second before taking monster's turn 
    setTimeout(() => {
        //Safeguard: stop if game is over or either Player or Monster HP is 0 after 1 second delay
        if(gameOver === true || monster.checkCharacterHealth() === false || player.checkCharacterHealth() === false) {
            //Unlock Player's turn after Monster finishes its turn
            isMonsterTurnActive = false 
            //Disable Player's action buttons if game is over
            setPlayerActionBtnDisabled(gameOver === true)
            return 
        }

        //Check if Monster is Powered Up before turn
        let isMonsterPoweredUp = monster.getIsPoweredUp()

        //Execute Monster's turn against player and store boolean result
        let monsterActed = monster.monsterTurn(player)

        //Update UI, Monster's action display and battle log if Monster acted, or log inactivity if Monster has not acted
        if(monsterActed === true) {
            //Update Player's & Monster's HP on UI
            renderPlayerStats()
            renderMonsterStats()

            //Display Monster's actions ('attack', 'powerUp' or 'potion') in Monster action display and battle log
            if(monsterActionType === 'attack') {
                let monsterDmg = monster.getAttackSkill()
                //Add Comment Here ***********
                if(isMonsterPoweredUp === true) {
                    monsterDmg = monster.getPoweredUpAttackDmg()
                    //Display Monster Powered Up Attack
                    monsterActionDisplayEl.textContent = `${monster.getName()} used a powered up attack`
                    //Add Comment Here ***********
                    battleLogEl.innerHTML += `<p>${monster.getName()} used a powered up attack on ${player.getName()} for total damage: ${monsterDmg} against ${player.getName()} HP: ${player.getHP()}.</p>`
                    //Auto scroll to show latest battle log 
                    battleLogMsgScroll()
                } else {
                    //Display Monster Normal Attack
                    monsterActionDisplayEl.textContent = `${monster.getName()} attacked.`
                    //Add Comment Here ***********
                    battleLogEl.innerHTML +=`<p>${monster.getName()} attacked ${player.getName()} for total damage: ${monsterDmg} against ${player.getName()} HP: ${player.getHP()}.</p>`
                    //Auto scroll to show latest battle log 
                    battleLogMsgScroll()
                }
            } else if (monsterActionType === 'powerUp') {
                //Display Monster Power Up
                monsterActionDisplayEl.textContent = `${monster.getName()} used a Power Up.`
                //Add Comment Here ***********
                battleLogEl.innerHTML += `<p>${monster.getName()} used a Power Up ${monster.getPowerUp()}x next attack ${monster.getPoweredUpAttackDmg()} damage.</p>`
                //Auto scroll to show latest battle log 
                battleLogMsgScroll()

            } else if (monsterActionType === 'potion') {
                //Display Monster Healing Potion
                monsterActionDisplayEl.textContent = `${monster.getName()} used a potion.`
                //Add Comment Here ***********
                battleLogEl.innerHTML += `<p>${monster.getName()} healed ${monster.getPotion()} HP with potion. Current HP: ${monster.getHP()}.</p>`
                //Auto scroll to show latest battle log 
                battleLogMsgScroll()
            }

        } else {
            //Display when monster did not take an action 
            monsterActionDisplayEl.textContent = `${monster.getName()} did nothing.`

            //Display Monster's inactivity in battle log 
            battleLogEl.innerHTML += `<p>${monster.getName()} could not act this turn.</p>`
            //Auto scroll to show latest battle log 
            battleLogMsgScroll()
        }

        //Check if battle has ended after Monster's turn
        checkBattleEnded()
        //Unlock Player's turn after Monster finishes its turn
        isMonsterTurnActive = false 
        //Disable Player's action buttons if game is over
        setPlayerActionBtnDisabled(gameOver === true)

    }, 1000)
}

//Function: Handle player button click, executes Player's action, update UI/battlelog, check if game is over, and switch to Monster's turn if it is alive
const handlePlayerTurn = (actionType) => {
    //Get the Monster active in battle 
    let monster = getCurrentMonster()

    //Safeguard: Stop if game is over or monster turn is active 
    if(gameOver === true || isMonsterTurnActive === true) {
        return 
    }

    //Safeguard: Stop if Player or Monster HP is 0
    if(player.checkCharacterHealth() === false || monster.checkCharacterHealth() === false) {
        return 
    }

    //Check if Player is Powered Up before turn
    let isPlayerPoweredUp = player.getIsPoweredUp()

    //Execute Player's selected action & store boolean result
    let playerActed = player.playerTurn(actionType, monster)

    //Safeguard - Stop if action could not be executed
    if (playerActed !== true) {
        return 
    } 

    //Update Player's & Monster's Name & HP on UI
    renderPlayerStats()
    renderMonsterStats()

    //Display Player action to battle log based on action
    if(actionType === 'attack') {
        let playerDmg = player.getAttackSkill()
        //Add Comment Here ***********
        if(isPlayerPoweredUp === true) {
            playerDmg = player.getPoweredUpAttackDmg()
            
            //Display battle log Player Powered Up Attack
            battleLogEl.innerHTML += `<p>${player.getName()} used a powered up attack on ${monster.getName()} for total damage: ${playerDmg} against ${monster.getName()} HP: ${monster.getHP()}.</p>`
            //Auto scroll to show latest battle log 
            battleLogMsgScroll()
        } else {
            //Display battle log Player Normal Attack 
            battleLogEl.innerHTML += `<p>${player.getName()} attacked ${monster.getName()} for total damage: ${playerDmg} against ${monster.getName()} HP: ${monster.getHP()}.</p>`
            //Auto scroll to show latest battle log 
            battleLogMsgScroll()
        }

    } else if (actionType === 'powerUp') {
        //Display battle log Player used Power Up for next Attack
        battleLogEl.innerHTML += `<p>${player.getName()} used a Power Up ${player.getPowerUp()}x next attack ${player.getPoweredUpAttackDmg()} damage.</p>`
        //Auto scroll to show latest battle log 
        battleLogMsgScroll()
    } else if (actionType === 'potion') {
        //Display battle log Player used Healing Potion 
        battleLogEl.innerHTML += `<p>${player.getName()} healed ${player.getPotion()} HP with potion. Current HP: ${player.getHP()}.</p>`
        //Auto scroll to show latest battle log 
        battleLogMsgScroll()
    }

    //Check if battle has ended after Player's action
    checkBattleEnded()

    //Continue Monster turn if the game is not over
    if(gameOver === false) {
        //Monster take its turn if alive
        if(monster.checkCharacterHealth() === true){
            handleMonsterTurn()
        }
    }
}

//Function: Auto-Scroll Battle Log Messages
const battleLogMsgScroll = () => {
    //Auto scroll to the bottom to show latest battle log message
    battleLogEl.scrollTop = battleLogEl.scrollHeight
}

//************************************ Event Listeners ************************************
//Event Listener: Player Attack Skill Button Clicked
charAttackSkillBtnEl.addEventListener('click', () => {
    handlePlayerTurn('attack')
})

//Event Listener: Player Power Up Skill Button Clicked
charPowerUpBtnEl.addEventListener('click', () => {
    handlePlayerTurn('powerUp')
})

//Event Listener: Player Healing Potion Button Clicked 
charPotionBtnEl.addEventListener('click', () => {
    handlePlayerTurn('potion')
})
