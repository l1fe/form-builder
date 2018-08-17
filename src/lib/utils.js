export const isVariable = str => str && str.startsWith('{') && str.endsWith('}');

export const evaluateExpression = (expression, values) => {
  const terms = expression.split(' ');

  const expressionWithValues = terms.map((term) => {
    if (isVariable(term)) {
      const variable = term.substr(1, term.length - 2);
      const value = values[variable] || false;

      if (typeof value === 'string') {
        return `'${value}'`;
      } else {
        return value;
      }
    }

    return term;
  }).join(' ');

  try {
    const result = eval(expressionWithValues);
    return result;
  } catch (err) {
    return false;
  }
}
