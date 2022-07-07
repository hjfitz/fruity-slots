import inquirer from 'inquirer'
import {Session} from './Session'

export async function getAvailablePlayerCash(): Promise<number> {
	const cashPrompt = inquirer.createPromptModule()

	const {userCash} = await cashPrompt([{
		type: 'number',
		name: 'userCash',
		message: 'How much cash do you have to spend?',
	}])

	if (Number.isNaN(userCash)) 
		return getAvailablePlayerCash()

	return userCash
}

export async function willUserContinue(): Promise<boolean> {
	const continuePrompt = inquirer.createPromptModule()
	const shouldContinue = await continuePrompt([{
		type: 'confirm',
		name: 'continue',
		message: 'Play the fruit machine?'
	}])
	return shouldContinue.continue
}

export async function doGameLoop(session: Session): Promise<void> {
	const canContinue = async () => (await willUserContinue() && session.canSessionContinue())

	while (await canContinue()) {
		session.doRound()
	}
}
