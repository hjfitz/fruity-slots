export class Spendable {
	constructor(protected availableCash: number, private readonly name: string) {}

	public getRemainingCash(): number {
		return this.availableCash
	}

	private getHumanReadableRemainingCash() {
		return `£${this.availableCash.toFixed(2)}`
	}

	protected log(...args: unknown[]) {
		console.log(`[${this.name}]`, ...args)
	}

	public spend(cash: number): void {
		this.availableCash -= cash
		this.log(`Spending ${cash}. There is ${this.getHumanReadableRemainingCash()} now left`)
	}

	public earn(cash: number): void {
		this.availableCash += cash
		this.log(`Earned ${cash}. There is ${this.getHumanReadableRemainingCash()} now left`)
	}
}