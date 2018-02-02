/**
 * calculates the expression level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateExpressionLevel(firstNames, lastName, dateOfBirth) {
	return {
		name: 'Ausdrucksebene',
		numbers: [
			{
				name: 'Ausdruckszahl',
				type: 'row',
				id: 'AZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 6
				},
				highlighted: false
			},
			{
				name: 'Berufszahl',
				type: 'row',
				id: 'BZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 1
				},
				highlighted: false
			},
			{
				name: 'Nachnamenszahl',
				type: 'row',
				id: 'NNZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 4
				},
				highlighted: false
			}
		]
	};
}

/**
 * calculates the personal level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculatePersonalLevel(firstNames, lastName, dateOfBirth) {
	return {
		name: 'Persönlichkeitsebene',
		numbers: [
			{
				name: 'Wurzelzahl',
				type: 'row',
				id: 'WZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 19
				},
				highlighted: false
			},
			{
				name: 'Lebenszahl',
				type: 'row',
				id: 'LZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: '27/9'
				},
				highlighted: false
			},
			{
				name: 'Identitätszahl',
				type: 'row',
				id: 'IZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 3
				},
				highlighted: false
			},
			{
				name: 'Gesundheitszahl',
				type: 'row',
				id: 'GZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 4
				},
				highlighted: false
			},
			{
				name: 'Geburtsdatumsraster',
				type: 'row',
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
				},
				highlighted: false
			},
			{
				name: 'GDR vorhandene Zahl',
				type: 'row',
				id: 'GDR-V',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 2
				},
				highlighted: false
			},
			{
				name: 'GDR fehlende Zahl',
				type: 'row',
				id: 'GDR-F',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 3
				},
				highlighted: false
			},
			{
				name: 'GDR isolierte Zahlen',
				type: 'row',
				id: 'GDR-I',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 1
				},
				highlighted: false
			}
		]
	};
}

/**
 * calculates the development level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateDevelopmentLevel(firstNames, lastName, dateOfBirth) {
	return {
		name: 'Entfaltungspotential',
		numbers: [
			{
				name: 'Talenzahl',
				type: 'row',
				id: 'TZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 8
				},
				highlighted: false
			},
			{
				name: 'Kreativitätszahl',
				type: 'row',
				id: 'KZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 5
				},
				highlighted: false
			},
			{
				name: 'Berufungszahl',
				type: 'row',
				id: 'BfZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 8
				},
				highlighted: false
			},
			{
				name: 'Visionszahl',
				type: 'row',
				id: 'VisZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 3
				},
				highlighted: false
			}
		]
	};
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateSoulLevelNumbers(firstNames, lastName, dateOfBirth) {
	return {
		name: 'Seelische Ebene',
		numbers: [
			{
				name: 'Seelenzahl',
				type: 'row',
				id: 'SZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 6
				},
				highlighted: false
			},
			{
				name: 'Initiationszahl',
				type: 'row',
				id: 'IniZ',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 1
				},
				highlighted: false
			},
			{
				name: 'Seelische Matrix',
				type: 'row',
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
				},
				highlighted: false
			},
			{
				name: 'SM vorhandene Zahl',
				type: 'row',
				id: 'SM-V',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 8
				},
				highlighted: false
			},
			{
				name: 'Karmische Lektion',
				type: 'row',
				id: 'KL',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'list',
					values: [3, 6, 7]
				},
				highlighted: false
			},
			{
				name: 'Zahl des seelischen Ausgleichs',
				type: 'row',
				id: 'ZSA',
				textShort: 'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.',
				result: {
					type: 'number',
					value: 7
				},
				highlighted: false
			}
		]
	};
}

/**
 * calculates the soul level numbers
 * @param {*} firstNames 
 * @param {*} lastName 
 * @param {*} dateOfBirth 
 */
export function calculateTimeLevelNumbers(firstNames, lastName, dateOfBirth) {
	return [
		{
			name: 'Vibratorische Zyklen',
			headings: ['Vibratorische Zyklen', 'VZ', null, 'Alter', null],
			numbers: [
				{
					type: 'customRow',
					values: [
						'Bildungszyklus',
						'VZ-B',
						3,
						'Geb',
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: false
				},
				{
					type: 'customRow',
					values: [
						'Produktivitätszyklus',
						'VZ-P',
						1,
						'ab 24',
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: true
				},
				{
					type: 'customRow',
					values: [
						'Erntezyklus',
						'VZ-E',
						5,
						'ab 60',
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: false
				}
			]
		},
		{
			name: 'Herausforderungen und Höhepunkte',
			headings: ['Herausforderungen und Höhepunkte', 'HF/HP', 'HF', 'HP', null],
			numbers: [
				{
					type: 'customRow',
					values: [
						'1. Herausforderung',
						'1.',
						'4 (2003 | 27 J.)',
						4,
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: false
				},
				{
					type: 'customRow',
					values: [
						'2. Herausforderung',
						'2.',
						'6 (2012 | 36 J.)',
						8,
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: false
				},
				{
					type: 'customRow',
					values: [
						'3. Herausforderung',
						'3.',
						'1 (2021 | 45 J.)',
						3,
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: true
				},
				{
					type: 'customRow',
					values: [
						'4. Herausforderung',
						'4.',
						'8 (2030 | 54 J.)',
						6,
						'Lorem Ipsum Metus scelerisque ante sollicitudin commodo.'
					],
					highlighted: false
				}
			]
		}
	];
}
