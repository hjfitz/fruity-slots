import inquirer from 'inquirer'
import { getAvailablePlayerCash } from './input'
import { buildSession } from './Session'

const ALPHABET = ['A', 'B', 'C', 'D', 'E']
const FEE = 0.2

async function main() {
	const availablePlayerCash = await getAvailablePlayerCash()
	const session = buildSession(availablePlayerCash, ALPHABET, FEE)

	const continuePrompt = inquirer.createPromptModule()

	let canPlay = true
	while (canPlay) {
		const shouldContinue = await continuePrompt([{
			type: 'confirm',
			name: 'continue',
			message: 'Play the fruit machine?'
		}])
		session.doRound()

		canPlay = shouldContinue.continue && session.canSessionContinue()
	}

	console.log('\nThank you for playing!')

}

void main()
