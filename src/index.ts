import { doGameLoop, getAvailablePlayerCash } from './input'
import { buildSession } from './Session'

const ALPHABET = ['A', 'B', 'C', 'D', 'E']
const FEE = 0.2

async function main() {
	const availablePlayerCash = await getAvailablePlayerCash()
	const session = buildSession(availablePlayerCash, ALPHABET, FEE)

	await doGameLoop(session)

	console.log('\nThank you for playing!')

}

void main()
