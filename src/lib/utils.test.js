import { isVariable, evaluateExpression } from './utils';

describe('isVariable() tests', () => {
  test('returns true if the input variable has valid syntax', () => {
    const str = '{variable}';
    const result = isVariable(str);
    expect(result).toBeTruthy();
  });

  test('returns false if the input variable has invalid syntax', () => {
    expect(isVariable('{variable')).toBeFalsy();
    expect(isVariable('variable')).toBeFalsy();
    expect(isVariable('variable}')).toBeFalsy();
    expect(isVariable('')).toBeFalsy();
    expect(isVariable(null)).toBeFalsy();
    expect(isVariable(undefined)).toBeFalsy();
    expect(isVariable(NaN)).toBeFalsy();
  });
});

describe('evaluateExpression() tests', () => {
  test('returns true if the input expression equals true', () => {
    const values = { 'x': 'hello', 'y': true };
    const expression = '{x} && {y}';
    expect(evaluateExpression(expression, values)).toBeTruthy();
  });

  test('returns false if the input expression equals false', () => {
    const values = { 'x': 'hello', 'y': false };
    const expression = '{x} && {y}';
    expect(evaluateExpression(expression, values)).toBeFalsy();
  });

  test('returns false if the input expression has invalid syntax', () => {
    const values = { 'x': 'hello', 'y': false };
    const expression = '{x} && {y} && z';
    expect(evaluateExpression(expression, values)).toBeFalsy();
  });
});
