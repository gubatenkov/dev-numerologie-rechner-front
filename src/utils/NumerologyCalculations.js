/**
 * calculates the expression level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateExpressionLevel(firstNames, lastName, dateOfBirth) {
	return [
		{
			name: 'Ausdruckszahl',
			id: 'AZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 6
			}
		},
		{
			name: 'Berufszahl',
			id: 'BZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 1
			}
		},
		{
			name: 'Nachnamenszahl',
			id: 'NNZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 4
			}
		}
	];
}

/**
 * calculates the personal level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculatePersonalLevel(firstNames, lastName, dateOfBirth) {
	return [
		{
			name: 'Wurzelzahl',
			id: 'WZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 19
			}
		},
		{
			name: 'Lebenszahl',
			id: 'LZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: '27/9'
			}
		},
		{
			name: 'Identitätszahl',
			id: 'IZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 3
			}
		},
		{
			name: 'Gesundheitszahl',
			id: 'GZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 4
			}
		},
		{
			name: 'Geburtsdatumsraster',
			id: 'GDR',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'matrix',
				dimensions: {
					rows: 3,
					cols: 3
				},
				values: [3, 6, 9, null, null, null, 11, null, 7],
				highlighted: [6, 8]
			}
		},
		{
			name: 'GDR vorhandene Zahl',
			id: 'GDR-V',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 2
			}
		},
		{
			name: 'GDR fehlende Zahl',
			id: 'GDR-F',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 3
			}
		},
		{
			name: 'GDR isolierte Zahlen',
			id: 'GDR-I',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 1
			}
		}
	];
}

/**
 * calculates the development level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateDevelopmentLevel(firstNames, lastName, dateOfBirth) {
	return [
		{
			name: 'Talenzahl',
			id: 'TZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 8
			}
		},
		{
			name: 'Kreativitätszahl',
			id: 'KZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 5
			}
		},
		{
			name: 'Berufungszahl',
			id: 'BfZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 8
			}
		},
		{
			name: 'Visionszahl',
			id: 'VisZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 3
			}
		}
	];
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateSoulLevelNumbers(firstNames, lastName, dateOfBirth) {
	return [
		{
			name: 'Seelenzahl',
			id: 'SZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 6
			}
		},
		{
			name: 'Initiationszahl',
			id: 'IniZ',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 1
			}
		},
		{
			name: 'Seelische Matrix',
			id: 'SM',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'matrix',
				dimensions: {
					rows: 3,
					cols: 3
				},
				values: [1111, 2, null, 4, 555, null, null, 88, 99],
				highlighted: []
			}
		},
		{
			name: 'SM vorhandene Zahl',
			id: 'SM-V',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 8
			}
		},
		{
			name: 'Karmische Lektion',
			id: 'KL',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 2
			}
		},
		{
			name: 'Zahl des seelischen Ausgleichs',
			id: 'ZSA',
			textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
			result: {
				type: 'number',
				value: 7
			}
		}
	];
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateTimeLevelNumbers(firstNames, lastName, dateOfBirth) {
	return [];
}
