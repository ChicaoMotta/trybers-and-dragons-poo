import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy?: Energy | undefined;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _dexterity: number;

  constructor(public name: string) {
    this._dexterity = Math.ceil(Math.random() * 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = Math.ceil(Math.random() * 10);
    this._defense = Math.ceil(Math.random() * 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: Math.ceil(Math.random() * 10),
    };
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength() {
    return this._strength;
  }

  get defense() {
    return this._defense;
  }

  get dexterity() {
    return this._dexterity;
  }

  get energy() {
    if (this._energy) {
      return { ...this._energy };
    }
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  special?(enemy: Fighter): void {
    if (this._energy) this._energy.amount -= enemy.strength;
  }

  levelUp(): void {
    const levelUpJuice = Math.ceil(Math.random() * 10);
    this._maxLifePoints += levelUpJuice;
    this._strength += levelUpJuice;
    this._dexterity += levelUpJuice;
    this._defense += levelUpJuice;
    if (this._energy) {
      this._energy.amount = 10;
    }
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const dmg = attackPoints - this._defense;

    if (this._lifePoints < 0) return this._lifePoints;
    if (dmg > 0) {
      this._lifePoints -= dmg;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
}
