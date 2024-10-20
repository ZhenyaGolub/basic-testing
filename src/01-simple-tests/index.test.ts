// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toBe(2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Exponentiate })).toBe(
      64,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 4, b: 3, action: ')' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: {}, b: [], action: ')' })).toBe(null);
  });
});
