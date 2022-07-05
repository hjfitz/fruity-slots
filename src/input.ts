import inquirer from 'inquirer'

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
