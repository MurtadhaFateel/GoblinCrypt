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

//Game Charatcer (Player or Monster) class with their stats: name, HP, Attack Skill, Power Up Skill, Healing Potion
class GameCharater {
    constructor(name, hp=100, attackskill=20, powerup=1.5, potion=25) {
        this.charNameEl = name
        this.charHPEl = hp
        this.charAttackSkillBtnEl = attackskill
        this.charPowerUpBtnEl = powerup
        this.charPotionBtnEl = potion
    }
}

//Charaters Objects
//Player
const player = new GameCharater('Warrior')
console.log(player)
//Monster 1
const monster1 = new GameCharater('Goblin')
console.log(monster1)
//Monster 2
const monster2 = new GameCharater('Goblin')
console.log(monster2)
//Monster 3 
const monster3 = new GameCharater('Goblin')
console.log(monster3)
//Dungeon Boss 
const bossMonster = new GameCharater('Dungeon Boss')
console.log(bossMonster)



