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
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { Builder } from '../../../../../../types';
import {
  selectAssemblyPart,
  selectOpenedBuilder,
} from '../../../../../store/builder/selectors';
import { openBuilder } from '../../../../../store/builder/slice';

type ProductAccordionProps = {
  icon: React.FC;
  builder: Builder;
  children: React.ReactNode;
};

const ProductAccordion: React.FC<ProductAccordionProps> = ({
  icon: Icon,
  builder,
  children,
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const openedBuilder = useSelector(selectOpenedBuilder);

  const selectedPart = useSelector(selectAssemblyPart(builder.categoryName));

  const DisplayReplace = () =>
    selectedPart ? (
      <IconButton onClick={() => dispatch(openBuilder(builder.categoryName))}>
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton onClick={() => dispatch(openBuilder(builder.categoryName))}>
        <AddRoundedIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  return (
    <Accordion
      className={styles.wrapper}
      expanded={openedBuilder === builder.categoryName}
    >
      <AccordionSummary
        className={styles.accordionSummary}
        expandIcon={
          openedBuilder === builder.categoryName ? (
            <IconButton
              onClick={() => dispatch(openBuilder(builder.categoryName))}
            >
              <RemoveRoundedIcon fontSize="large" className={styles.redIcon} />
            </IconButton>
          ) : (
            <DisplayReplace />
          )
        }
      >
        <Icon />
        <Typography variant="h5" className={styles.title}>
          {selectedPart
            ? selectedPart?.name
            : `${builder.builderTitle} is not selected`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ProductAccordion;
