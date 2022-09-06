// has 2 main columns, each also has 2 colums, 1 - spec, 2 - value
// has categories, like: Main, General, GPU, RAM...
// https://ek.ua/en/ASUS-GEFORCE-RTX-3060-DUAL-V2-OC-LHR.htm
const cleanComplexTable = (rawSpecsTable: any) => {
  const cleanedSpecsTable = rawSpecsTable
    .split('\n')
    .filter((item: string) => item.includes('\t'));
  return cleanedSpecsTable;
};

export default cleanComplexTable;
