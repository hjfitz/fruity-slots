import { Machine } from './Machine'
import { Slot } from './Slot'
import { User } from './User'



export class Session {
	constructor(private readonly player: User, private readonly machine: Machine) {}

	public doRound() {
		const fee = this.machine.getFee()
		console.log(`The game fee is: ${fee}`)

		if (this.machine.getFreePlays() > 0) {
			this.machine.useFreePlay()
		} else {
			this.player.spend(fee)
			this.machine.earn(fee)
		}

		const cashWon = this.machine.play()

		this.player.earn(cashWon)
		this.machine.spend(cashWon)
		this.machine.logFreePlays()
	}

	public canSessionContinue(): boolean {
		const fee = this.machine.getFee()
		const remainingSpendableMoney = this.player.getRemainingCash()
		const playerHasEnoughCash = fee <= remainingSpendableMoney

		const hasFreePlays = this.machine.getFreePlays() > 0

		return playerHasEnoughCash || hasFreePlays

	}
}


export function buildSession(availablePlayerCash: number, chars: string[], sessionFee: number): Session {
	const slots = Array.from({length: 4}, () => new Slot(chars))

	const machine = new Machine(sessionFee, slots)

	const player = new User(availablePlayerCash)

	const playSession = new Session(player, machine)

	return playSession
}
