const cleanComplexTable = (rawSpecsTable: any) => {
  const cleanedSpecsTable = rawSpecsTable
    .split('\n')
    .filter((item: string) => item.includes('\t'));
  return cleanedSpecsTable;
};

export default cleanComplexTable;
