import { Spendable } from './Spendable'
import { Slot } from './Slot'
import { Engine, GameResult } from './types'
import { allDifferent, allSame, hasConsecutiveChars } from './slot-logic'

export class Machine extends Spendable {
	private freePlays = 0
	constructor(private readonly fee: number, private readonly slots: Slot[], private readonly rules: Engine) {
		super(20, 'Machine')
	}

	private calculateResult(): GameResult {
		const chars = this.slots.map(slot => slot.getChar())

		if (allDifferent(chars)) 
			return GameResult.Unique

		if (allSame(chars)) 
			return GameResult.Matching

		if (hasConsecutiveChars(chars))
			return GameResult.Partial

		return GameResult.NoWin
	}

	private calculateWinnings(result: GameResult): number {
		const cashWon = this.rules[result](this.fee)
		return cashWon
	}
	
	private calculateFreePlays(winningsDiff: number): number {
		const plays = Math.floor(winningsDiff / this.fee)
		return plays
	}
	
	public play(): number {
		this.slots.forEach(slot => slot.setNewChar())

		console.log('*'.repeat(process.stdout.columns))
		this.log(`Slots: ${this.slotsToString()}`)
		console.log('*'.repeat(process.stdout.columns))

		const result = this.calculateResult()
		this.log(`The result of this round is ${result}`)

		const winnings = this.calculateWinnings(result)
		this.log(`Total amount won is: £${winnings.toFixed(2)}`)

		if (winnings > this.availableCash) {

			if (result === GameResult.Matching) {
				// Ugly hack - make sure we can always spend £20 without going under
				this.availableCash += 20
				return winnings
			}

			const winningsDiff = winnings - this.availableCash
			this.freePlays = this.calculateFreePlays(winningsDiff)
			this.log(`Unable to pay out! Awarding ${this.freePlays} free plays instead`)
			this.log(`There are ${this.freePlays} free plays remaining`)
			// return winningsDiff // requirements could be unclear based on what we'd expect from a machine
			return 0
		}

		return winnings
	
	}

	public slotsToString() {
		return this.slots.map(slot => slot.getChar()).join(', ')
	}

	public getFee(): number {
		return this.fee
	}

	public getFreePlays(): number {
		return this.freePlays
	}

	public useFreePlay(): void {
		this.freePlays -= 1
	}

}
