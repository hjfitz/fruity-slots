export enum GameResult {
	Matching = 'Matching',
	Unique = 'Unique',
	Partial = 'Partial',
	NoWin = 'No Win',
}

type Rule = (n: number) => number

export type Engine = Record<GameResult, Rule>
