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
let battleLogEl = document.querySelector('#battleLog')

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
        //Return 0 Damage if Character is defeated (0 HP)
        if(isAlive === false) {
            return 0 
        }

        //Variable to get Character Attack Skill Base Damage
        let baseAttackDmg = this.getAttackSkill()
        //Boolean to check if character is Powered Up 
        let isPoweredUp = this.getIsPoweredUp()

        //If statement to check if character is Powered Up, then apply the power up once then reset  
        if(isPoweredUp===true) {
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
        //Safe Guard if Damage Received is less than 0
        if(receivedDamage < 0) {
            receivedDamage = 0
        }

        //Current Character HP 
        let currentHP = this.getHP()
        //Updated Character HP after receiving damage
        let updatedHP = currentHP-receivedDamage

        //Safe Guard if Character HP goes below 0
        if(updatedHP < 0) {
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
        let playerCurrentHP = this.getHP()
        let healingAmountPotion = this.getPotion()
        healingAmountPotion = playerCurrentHP + healingAmountPotion
        this.setHP(healingAmountPotion)
        return healingAmountPotion
    }  
}

//Characters and Monsters Objects
//Player
const player = new GameCharacter('Warrior', 120)
// console.log(player)
//Monster 1
const monster1 = new GameCharacter('Goblin 1')
// console.log(monster1)
//Monster 2
const monster2 = new GameCharacter('Goblin 2')
// console.log(monster2)
//Monster 3 
const monster3 = new GameCharacter('Goblin 3')
// console.log(monster3)
//Dungeon Boss 
const bossMonster1 = new GameCharacter('Dungeon Boss', 200)
// console.log(bossMonster1)
//Array for Monsters/Boss Objects 
const monsters = [monster1, monster2, monster3, bossMonster1]

//Test Player Take Damage
// player.takeDamage(40)
// console.log(`Player HP after taking damage: ${player.getHP()}`)
//Test Monster 1 Take Damage
// monsters[0].takeDamage(10)
// console.log(`${monsters[0].getName()} HP after taking Damage: ${monsters[0].getHP()}`)
//Monster 2
// monsters[1].takeDamage(10)
// console.log(`${monsters[1].getName()} HP after taking Damage: ${monsters[1].getHP()}`)
//Monster 3
// monsters[2].takeDamage(10)
// console.log(`${monsters[2].getName()} HP after taking Damage: ${monsters[2].getHP()}`)
//Monster 4 Boss
// monsters[3].takeDamage(10)
// console.log(`${monsters[3].getName()} HP after taking Damage: ${monsters[3].getHP()}`)

//************************************ Functions ************************************

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

//************************************ Event Listeners ************************************
//Event Listener: Player Attack Skill Button Clicked
charAttackSkillBtnEl.addEventListener('click', () => {
    let playerAttackDmg = player.attack()
    console.log(`Player Name: ${player.getName()} attacked for ${playerAttackDmg} damage.`)
})

//Event Listener: Player Power Up Skill Button Clicked
charPowerUpBtnEl.addEventListener('click', () => {
    player.setIsPoweredUp(true)
    let playerPowerUp = player.getPowerUp()
    console.log(`Player Name: ${player.getName()} has powered up it's attack by ${playerPowerUp} for next turn.`)
})

//Event Listener: Player Healing Potion Button Clicked 
charPotionBtnEl.addEventListener('click', () => {
    let healingAmountPotion = player.getHealingPotionAmount()
    let healingPotion = player.getPotion()
    charHPEl.textContent = player.getHP()
    console.log(`Player: ${player.getName()} has has used a potion and healed for amount: ${healingPotion}. Total Health Point: ${healingAmountPotion}`)
})



