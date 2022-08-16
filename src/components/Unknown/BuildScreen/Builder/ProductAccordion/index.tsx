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
import { BuildProduct } from '../BuilderProduct';

type ProductAccordionProps = {
  icon: React.FC;
  category: string;
  selectedId: string;
  selectedProduct: BuildProduct | undefined;
  expand: boolean;
  toggleAccordion: () => void;
};

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  icon: Icon,
  category,
  children,
  selectedId,
  selectedProduct,
  expand,
  toggleAccordion,
}) => {
  const styles = useStyles();

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
