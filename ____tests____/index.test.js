const objToString = require('..');

test('String', () => {
	expect(objToString('test string')).toBe('test string');
});

test('Number', () => {
	expect(objToString(100)).toBe('100');
});

test('Null', () => {
	expect(objToString(null)).toBe('null');
});

test('Undefined', () => {
	expect(objToString(undefined)).toBe('undefined');
});

test('Boolean', () => {
	expect(objToString(false)).toBe('false');
	expect(objToString(true)).toBe('true');
});

test('Array', () => {
	expect(objToString([1, 2, 3, 4, 5])).toBe('[1, 2, 3, 4, 5]');
});

test('Array Mix', () => {
	expect(objToString([[[1, 2, 3], 2, 3]])).toBe('[[[1, 2, 3], 2, 3]]');
});

test('Object', () => {
	expect(objToString({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toBe('{ a: 1, b: 2, c: 3, d: 4, e: 5 }');
});

test('Object Mix', () => {
	expect(objToString({ a: { b: { c: 0 } } })).toBe('{ a: { b: { c: 0 } } }');
});

