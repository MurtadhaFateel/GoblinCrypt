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
        this.charName = name
        this.charHP = hp
        this.charAttackSkill = attackskill
        this.charPowerUp = powerup
        this.charPotion = potion
    }

    //Method: Check Charater Health
    
    //Method: Calculate Damage
    
    //Method: Calculate Power Up Skill Damage
    
    //Method: Calculate Healing Potion 
    
    //Method: Check Power Up Skill Active or InActive 

}

//Charaters Objects
//Player
const player = new GameCharacter('Warrior', 200)
console.log(player)
//Monster 1
const monster1 = new GameCharacter('Goblin')
console.log(monster1)
//Monster 2
const monster2 = new GameCharacter('Goblin')
console.log(monster2)
//Monster 3 
const monster3 = new GameCharacter('Goblin')
console.log(monster3)
//Dungeon Boss 
const bossMonster = new GameCharacter('Dungeon Boss')
console.log(bossMonster)

//************************************ Functions ************************************
//Function: Display Charater stats
const renderCharaterStats = () => {
    charHPEl.textContent = player.charHP
}
renderCharaterStats()


//************************************ Event Listeners ************************************




