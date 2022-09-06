// has 2 main columns, each also has 2 colums, 1 - spec, 2 - value
// has categories, like: Main, General, GPU, RAM...
// https://ek.ua/en/ASUS-GEFORCE-RTX-3060-DUAL-V2-OC-LHR.htm
const cleanComplexTable = (rawSpecsTable: any) => {
  const cleanedSpecsTable = rawSpecsTable.split('\n');

  const normalizedSpecsTable = cleanedSpecsTable
    .map((item: string, index: number) => {
      if (item.includes('Socket')) {
        let sockets = item;

        for (let i = index + 1; i < cleanedSpecsTable.length; i++) {
          if (cleanedSpecsTable[i]) {
            sockets += `,${cleanedSpecsTable[i]}`;
          } else break;
        }
        return sockets;
      } else {
        return item;
      }
    })
    .filter((item: string) => item.includes('\t'));

  return normalizedSpecsTable;
};

export default cleanComplexTable;
