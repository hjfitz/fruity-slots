import { Spendable } from './Spendable'

export class User extends Spendable {
	constructor(availableCash: number) {
		super(availableCash, 'Player')
	}
}