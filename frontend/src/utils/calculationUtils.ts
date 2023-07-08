/**
 *
 * @param str string to find variables in
 * @returns set of unique variables
 */
export const findVariables = (str: string) => {
  const regex = /(?<![a-zA-Z])[a-zA-Z](?=[+\-*/()]|$)/gm;
  const variables = new Set<string>();
  let m;

  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach((match) => {
      variables.add(match);
    });
  }

  return Array.from(variables);
};

/**
 * this function fixes a issue with order of operations for multiplication where cases like
 * (77)/(7)7 will be evaluated as (77)/(7*7) instead of (77/7)*7
 * @param str string to add multiplication signs to
 * @returns string with multiplication signs added
 */
export const addMultiplicationSigns = (str: string) => {
  const regex = /\)(?=\(|\d)/gm;
  const subst = `)*`;

  // The substituted value will be contained in the result variable
  return str.replace(regex, subst);
};

/**
 *
 * @param str string to replace variables in
 * @param variablesValues variable value assignment
 * @returns a string with variables replaced with their values
 */
export const replaceVariables = (str: string, variablesValues: Record<string, number | ''>) => {
  const variables = findVariables(str);
  let newStr = str;

  console.log(variablesValues);

  variables.forEach((variable) => {
    if (variablesValues[variable] !== '') {
      const currRegex = new RegExp(variable, `gm`);
      newStr = newStr.replace(currRegex, variablesValues[variable].toString());
    }
  });

  return newStr;
};

export const isNumber = (str: string) => {
  return !isNaN(parseFloat(str)) && !isNaN(Number(str));
};
