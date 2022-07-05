import { Spendable } from './Spendable'
import { Slot } from './Slot'
import { Engine, GameResult } from './types'
import { allDifferent, allSame, hasConsecutiveChars } from './slot-logic'

const ENGINE: Engine = {
	[GameResult.Matching]: () => 20,
	[GameResult.Unique]:  () => 10,
	[GameResult.Partial]: (fee: number) => Math.abs(fee * 5),
	[GameResult.NoWin]: () => 0,
}

export class Machine extends Spendable {
	private freePlays = 0
	constructor(private readonly fee: number, private readonly slots: Slot[]) {
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
		
		const cashWon = ENGINE[result](this.fee)
		
		return cashWon
	}
	
	private calculateFreePlays(winningAmount: number): number {
		// we know that the winning amount will be greater than the amount of 
		const diff = winningAmount - this.availableCash
		const plays = Math.floor(diff / this.fee)
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
			if (result !== GameResult.Matching) {
				this.freePlays = this.calculateFreePlays(winnings)
				this.log(`Unable to pay out! Awarding ${this.freePlays} free plays instead`)
			}
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

	public logFreePlays(): void {
		this.log(`There are ${this.freePlays} free plays remaining`)
	}
}