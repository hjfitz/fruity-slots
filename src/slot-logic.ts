
// repetitions can only appear once in the string as the length is 4
// we can go for a fairly naive approach
export function hasConsecutiveChars(chars: string[]): boolean {
	let prev: string | undefined
	const freqMap = new Map<string, number>
	for (const char of chars) {
		const curFreq = freqMap.get(char) || 1
		if (char === prev) {
			freqMap.set(char, curFreq + 1)
		}
		prev = char
	}
	const mostConsecutive = [...freqMap.entries()].sort(([,freq1], [,freq2]) => freq1 - freq2)
	return !!mostConsecutive.length
}

export function allSame(chars: string[]): boolean {
	const allMatchingChars = chars.filter((char) => char === chars[0])
	return allMatchingChars.length === chars.length
}

export function allDifferent(chars: string[]): boolean {
	const uniqChars = [...new Set(chars)]
	return chars.length === uniqChars.length
}