import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import useStyles from './styles';
import BuilderProduct from '../BuilderProduct';

type ProductAccordionProps = {
  icon: string;
  category: string;
};

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  icon,
  category,
  children,
}) => {
  const styles = useStyles();
  const [expand, setExpand] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const toggleAccordion = () => {
    setExpand((prev) => !prev);
  };

  const onClickAdd = (productId: string) => {
    setSelectedId(productId);
    setExpand(false);
  };

  const DisplayReplace = () =>
    selectedId ? (
      <IconButton onClick={toggleAccordion}>
        <SwapHorizontalCircleIcon className={styles.button} color="secondary" />
      </IconButton>
    ) : (
      <IconButton onClick={toggleAccordion}>
        <AddBoxIcon className={styles.button} color="secondary" />
      </IconButton>
    );

  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        expandIcon={
          expand ? (
            <IconButton onClick={toggleAccordion}>
              <IndeterminateCheckBoxIcon
                className={styles.button}
                sx={{ color: 'tomatoRed' }}
              />
            </IconButton>
          ) : (
            <DisplayReplace />
          )
        }
      >
        <img className={styles.icon} src={`${icon}`} alt={`${category}`} />
        <Typography className={styles.title}>
          {!selectedId && `${category} is not selected`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ProductAccordion;
