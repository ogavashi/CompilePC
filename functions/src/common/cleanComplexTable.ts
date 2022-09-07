// has 2 main columns, each also has 2 colums, 1 - spec, 2 - value
// has categories, like: Main, General, GPU, RAM...
// https://ek.ua/en/ASUS-GEFORCE-RTX-3060-DUAL-V2-OC-LHR.htm
const cleanComplexTable = (rawSpecsTable: any) => {
  const cleanedSpecsTable = rawSpecsTable.split('\n');

  const normalizedSpecsTable = cleanedSpecsTable.filter((item: string) => {
    if (item.includes('Socket')) {
      const indexOfSocketSpec = cleanedSpecsTable.indexOf(item);
      const lastIndexOfSocketSpec = cleanedSpecsTable.indexOf(
        '',
        indexOfSocketSpec,
      );

      let sockets = item;

      cleanedSpecsTable.forEach((spec: string, specIndex: number) => {
        if (
          specIndex > indexOfSocketSpec &&
          specIndex < lastIndexOfSocketSpec
        ) {
          sockets += `,${spec}`;
        }
      });

      item = sockets;
    }

    return item.includes('\t');
  });

  return normalizedSpecsTable;
};

export default cleanComplexTable;
