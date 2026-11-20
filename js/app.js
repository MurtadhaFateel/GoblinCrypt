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
const charPotionBtnEl = document.querySelector('#charPotion') 

//Monster Health point 
let monsterHPEl = document.querySelector('#monsterHP')
//Monster Display Action
let monsterActionDisplayEl = document.querySelector('#monsterActionDisplay')

//Battle Log 
let battleLogEl = document.querySelector('#battleLog')

//*************************************************** Classes ***************************************************
//Game Character (Player or Monster or Boss Monster) class with stats: Name, HP, Attack Skill, Power Up Skill, Power Up Skill Active/Inactive, Healing Potion 
class GameCharacter {
    constructor(name, hp=100, attackskill=15, powerup=1.5, potion=25) {
        this.gameCharName = name
        this.gameCharHP = hp
        this.gameCharAttackSkill = attackskill
        this.gameCharPowerUp = powerup
        this.gameCharisPoweredUp = false
        this.gameCharPotion = potion
    }

    //*********************** Method Getters ***********************
    //Getting the initial Character Values
    //Method: Get the Character Name
    getName() {
        return this.gameCharName
    } 
    //Method: Get the Character HP
    getHP() {
        return this.gameCharHP
    }
    //Method: Get Character Attack Skill 
    getAttackSkill() {
        return this.gameCharAttackSkill
    }
    //Method: Get the Character Power Up
    getPowerUp() {
        return this.gameCharPowerUp
    }
    //Method: Get whether Character if Powered Up is true
    getisPoweredUp() {
        return this.gameCharisPoweredUp
    }
    //Method: Get the Character Potion Heal Value 
    getPotion() {
        return this.gameCharPotion
    }

    //*********************** Method Setters ***********************
    //Setting the Character's new value
    //Method: Set Character Name 
    setName(name) {
        this.gameCharName=name
    } 
    //Method: Set Character new HP
    setHP(newValue) {
        this.gameCharHP=newValue
    }
    //Method: Set the Character Attack Skill
    setAttackSkill(newValue) {
        this.gameCharAttackSkill=newValue
    }
    //Method: Set the Game Character Power Up multiplier
    setPowerUp(newValue) {
        this.gameCharPowerUp=newValue
    }
    //Method: Set if the Game Character is Powered Up
    setisPoweredUp(isPoweredUp) {
        this.gameCharisPoweredUp=isPoweredUp
    }
    //Method: Set the Game Character Potion
    setPotion(newValue) {
        this.gameCharPotion=newValue
    }

    //*********************** Methods ***********************
    //Method: Attack - Attack button skill is clicked
    attack() {
        //Boolean to check if character is Alive
        let isAlive = this.checkCharacterHealth()
        if(isAlive === false) {
            // Log if character HP is 0 for testing
            // console.log('Character dead')
            return 0 
        }
        // log if character HP is > 0 for testing
        // console.log('Alive') 

        //Variable to get Character Attack Skill Base Damage
        let baseAttackDmg = this.getAttackSkill()
        //Boolean to check if character is Powered Up 
        let isPoweredUp = this.getisPoweredUp()
        //If statement to check if character is Powered Up, then apply the power up multiplier and reset the power up 
        if(isPoweredUp===true) {
            let powerUP = this.getPowerUp()
            let damage = baseAttackDmg * powerUP
            //Reset the Power Up
            this.setisPoweredUp(false) 
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
    //Method: Calculate Healing Potion 
    //Method: Calculate Power Up Skill Damage - needed?
    //Method: Check Power Up Skill Active or InActive

}

//Characters and Monsters Objects
//Player
const player = new GameCharacter('Warrior', 120)
// console.log(player)
//Monster 1
const monster1 = new GameCharacter('Goblin')
// console.log(monster1)
//Monster 2
const monster2 = new GameCharacter('Goblin')
// console.log(monster2)
//Monster 3 
const monster3 = new GameCharacter('Goblin')
// console.log(monster3)
//Dungeon Boss 
const bossMonster1 = new GameCharacter('Dungeon Boss')
// console.log(bossMonster)
//Array for Monsters/Boss Objects 
const monsters = [monster1, monster2, monster3, bossMonster1]

//Test Player Take Damage
// player.takeDamage(40)
// console.log(`Player HP after taking damage: ${player.getHP()}`)
//Test Monster 1 Take Damage
// monsters[0].takeDamage(40)
// console.log(`Monster 1 HP after taking Damage: ${monsters[0].getHP()}`)

//************************************ Functions ************************************
//Function: Display Character Stats - Health Point
const renderPlayerStats = () => {
    charHPEl.textContent = player.getHP()
}
renderPlayerStats()

//How to streamline this for all monsters/bosses or seperate for monster/bosses - store character objects in an Array? 
//Function: Display Character Stats - Health Point
const renderMonsterStats = () => {
    monsterHPEl.textContent = monster1.getHP()
}
renderMonsterStats()


//************************************ Event Listeners ************************************
//Event Listener: Player Attack Skill Button Clicked
charAttackSkillBtnEl.addEventListener('click', () => {
    let playerAttackDmg = player.attack()
    console.log(`Player Name: ${player.getName()} attacked for ${playerAttackDmg} damage.`)
})

//Event Listener: Player Power Up Skill Button Clicked

//Event Listener: player Healing Potion Button Clicked 




