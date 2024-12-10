function parseYear(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue) === true) {
    return undefined;
  }

  return value;
}

export function parseFilterParams(query) {
  const { minYear, maxYear } = query;

  const parsedMinYear = parseYear(minYear);
  const parsedMaxYear = parseYear(maxYear);

  return {
    minYear: parsedMinYear,
    maxYear: parsedMaxYear,
  };
}
