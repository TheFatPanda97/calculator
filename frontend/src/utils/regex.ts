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
