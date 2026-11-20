//************************************ Cached elements ************************************
//Character Name 
let charNameEl = document.querySelector('#CharName') 
// Charater Health Point
let charHPEl = document.querySelector('#charHP')
// Character Attack Skill Button
let charAttackSkillBtnEl = document.querySelector('#charAttackSkill')
// Charater Power Up Skill Button
let charPowerUpBtnEl = document.querySelector('#charPowerUp')
// Charater Potion Button
const charPotionBtnEl = document.querySelector('#charPotion') 

//Monster Display Action
let monsterActionDisplayEl = document.querySelector('#monsterActionDisplay')

//Battle Log 
let battleLogEl = document.querySelector('#battleLog')

//************************************ Classes ************************************
//Game Charatcer (Player or Monster) class with their stats: name, HP, Attack Skill, Power Up Skill, Healing Potion
class GameCharacter {
    constructor(name, hp=100, attackskill=15, powerup=1.5, potion=25) {
        this.gameCharName = name
        this.gameCharHP = hp
        this.gameCharAttackSkill = attackskill
        this.gameCharPowerUp = powerup
        this.gameCharisPoweredUp = false
        this.gameCharPotion = potion
    }

    //*********************** Methods Getters ***********************
    //Method: getgameCharName - Getting the charater name
    getName() {
        return this.gameCharName
    } 
    //Method: getGameCharHP - Getting the Charater HP
    getHP() {
        return this.gameCharHP
    }
    //Method: getgameCharAttackSkill - Getting the Character Attack Skill 
    getAttackSkill() {
        return this.gameCharAttackSkill
    }
    //Method: getgameCharPowerUp - Getting the Game Charater Power Up
    //Method: getgameCharisPoweredUp - Getting if the Game Charater is Powered Up
    //Method: getgameCharPotion - Getting the Game Charater Potion

    //*********************** Methods Getters ***********************
    //Method: setgameCharName
        setName(name){
        this.gameCharName=name
    } 

    //Method: setGameCharHP(num) - Setting the Charater HP
    //Method: setgameCharAttackSkill(num) - Setting the Character Attack Skill
    //Method: setgameCharPowerUp(num) - Setting the Game Charater Power Up
    //Method: setgameCharisPoweredUp(boolean) - Setting if the Game Charater is Powered Up
    //Method: setgameCharPotion(num) - Setting the Game Charater Potion

    //*********************** Methods ***********************
    //Method: Attack - Attack button skill is clicked
    //Method: Check Charater Health
    //Method: Calculate Damage
    //Method: Calculate Power Up Skill Damage
    //Method: Calculate Healing Potion 
    //Method: Check Power Up Skill Active or InActive 

}

//Charaters Objects
//Player
const player = new GameCharacter('Warrior', 150)
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
const bossMonster = new GameCharacter('Dungeon Boss')
// console.log(bossMonster)

//************************************ Functions ************************************
//Function: Display Charater stats - HP
const renderCharaterStats = () => {
    charHPEl.textContent = player.gameCharHP
}
renderCharaterStats()


//************************************ Event Listeners ************************************




