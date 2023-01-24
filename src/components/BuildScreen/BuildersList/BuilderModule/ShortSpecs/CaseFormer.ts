import { Case, ShortSpec } from '../../../../../../types/index';

const CaseFormer = (product: Case): ShortSpec[] => [
  { name: 'Fans number', value: product.fansTotal },
  { name: 'Size', value: product.size },
  { name: 'Form factor', value: product.motherboardFormFactor },
];

export default CaseFormer;
