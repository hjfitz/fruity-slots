import crypto from 'node:crypto'

export class Slot {
	private char: string
	private possibleChars: string[]

	constructor(possibleChars: string[]) {
		this.possibleChars = possibleChars
		this.char = this.generateNewChar()
	}

	private generateNewChar(): string {
		const idx = crypto.randomInt(0, this.possibleChars.length)
		return this.possibleChars[idx]
	}

	public setNewChar() {
		this.char = this.generateNewChar()
	}

	public getChar(): string {
		return this.char
	}
}