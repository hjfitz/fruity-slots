import { Spendable } from './Spendable.abstract'

export class User extends Spendable {
	constructor(availableCash: number) {
		super(availableCash, 'Player')
	}

	private logRemainingCash(): void {
		const remainingAmountHuman = this.availableCash.toFixed(2).toString()
		this.log(`You have £${remainingAmountHuman} left`)
	}

	public spend(cash: number): void {
		super.spend(cash)
		this.logRemainingCash()
	}
}