import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useStyles from './styles';
import globalUseStyles from '../../../../../common/globalUseStyles';

export type BuilderProductSpecs = {
  name: string;
  value: string;
};

type ProductProps = {
  id: string;
  title: string;
  mainImage: string;
  price: number;
  specs: BuilderProductSpecs[];
  handleSelect: (id: string) => void;
  selectedId: string;
};

const BuilderProduct: React.FC<ProductProps> = ({
  id,
  title,
  mainImage,
  price,
  specs,
  handleSelect,
  selectedId,
}) => {
  const styles = useStyles();
  const globalStyles = globalUseStyles();

  const showCheckIcon = () =>
    selectedId === id ? (
      <IconButton onClick={() => handleSelect('')}>
        <CloseRoundedIcon
          className={globalStyles.redBuilderIcon}
          fontSize="large"
        />
      </IconButton>
    ) : (
      <IconButton onClick={() => handleSelect(id)}>
        <SwapHorizIcon
          className={globalStyles.greenBuilderIcon}
          fontSize="large"
        />
      </IconButton>
    );

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftWrapper}>
        <img className={styles.image} src={mainImage} alt={title} />
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Box>
            {specs.map((spec) => (
              <Box key={spec.name} className={styles.specsWrapper}>
                <Typography
                  variant="h6"
                  paddingRight={1}
                >{`${spec.name}: `}</Typography>
                <Typography fontWeight="bold">{spec.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={styles.rightWrapper}>
        <Typography variant="h5">~{price}$</Typography>
        {selectedId ? (
          showCheckIcon()
        ) : (
          <IconButton onClick={() => handleSelect(id)}>
            <AddRoundedIcon
              className={globalStyles.greenBuilderIcon}
              fontSize="large"
              color="secondary"
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default BuilderProduct;
