// clean table has 2 columns: 1 - spec name, 2 - value
// https://ek.ua/en/KINGSTON-FURY-KF432C16BBK2-16.htm
const cleanSimpleTable = (rawSpecsTable: any) => {
  const splittedTable = rawSpecsTable.split('\n');
  const cleanedSpecsTable = splittedTable
    .map((item: string, index: number) => {
      if (item.includes('\t')) return `${splittedTable[index - 1]}${item}`;
      return null;
    })
    .filter((item: string | null) => item && item !== '\n');
  return cleanedSpecsTable;
};

export default cleanSimpleTable;
