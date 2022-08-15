import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import useStyles from './styles';

const parts = [
  {
    id: '1',
    name: 'Ryzen 5 3600',
    price: 700,
    mainImage:
      'https://www.amd.com/system/files/2019-06/238593-ryzen-5-pib-left-facing-1260x709.png',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
  {
    id: '2',
    name: 'Ryzen 5 2600',
    price: 600,
    mainImage: 'https://mzimg.com/120/61/g4tmbzmxe61.jpg',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
  {
    id: '3',
    name: 'Ryzen 5 5600',
    price: 500,
    mainImage:
      'https://ae04.alicdn.com/kf/S99721446a0814d2e9340b7938ebc2ca4D/AMD-Ryzen-5-5600-R5-5600-3-5-6-12.png',
    specs: [
      { name: 'Socket', value: 'AM4' },
      { name: 'Series', value: 'AMD Ryzen' },
    ],
  },
];

type ProductAccordionProps = {
  icon: React.FC;
  category: string;
  selectedId: string;
  expand: boolean;
  toggleAccordion: () => void;
};

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  icon: Icon,
  category,
  children,
  selectedId,
  expand,
  toggleAccordion,
}) => {
  const styles = useStyles();

  const selectedProduct = parts.find((part) => part.id === selectedId);

  const DisplayReplace = () =>
    selectedId ? (
      <IconButton onClick={toggleAccordion}>
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton onClick={toggleAccordion}>
        <AddRoundedIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={
          expand ? (
            <IconButton onClick={toggleAccordion}>
              <RemoveRoundedIcon fontSize="large" className={styles.redIcon} />
            </IconButton>
          ) : (
            <DisplayReplace />
          )
        }
      >
        {selectedId ? (
          <img
            className={styles.productIcon}
            src={selectedProduct?.mainImage}
            alt={selectedProduct?.name}
          />
        ) : (
          <Icon />
        )}
        <Typography variant="h5" className={styles.title}>
          {selectedId ? selectedProduct?.name : `${category} is not selected`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ProductAccordion;
