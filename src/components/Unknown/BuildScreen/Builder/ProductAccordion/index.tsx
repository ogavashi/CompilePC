import React, { useContext } from 'react';
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
import { BuildScreenContext } from '../../../BuildScreenContext';
import { FetchedProduct, ProductCategory } from '../../../../../../types';

type ProductAccordionProps = {
  icon: React.FC;
  category: ProductCategory;
  selectedId: string;
  // eslint-disable-next-line react/require-default-props
  selectedProduct?: FetchedProduct;
};

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  icon: Icon,
  category,
  children,
  selectedId,
  selectedProduct,
}) => {
  const styles = useStyles();

  const { selectedBuilder, handleSelectBuilder } =
    useContext(BuildScreenContext);

  const DisplayReplace = () =>
    selectedId ? (
      <IconButton onClick={() => handleSelectBuilder(category)}>
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton onClick={() => handleSelectBuilder(category)}>
        <AddRoundedIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  return (
    <Accordion
      className={styles.wrapper}
      expanded={selectedBuilder === category}
    >
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={
          selectedBuilder === category ? (
            <IconButton onClick={() => handleSelectBuilder(category)}>
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
          {selectedId
            ? selectedProduct?.name
            : `${category.builderTitle} is not selected`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ProductAccordion;
