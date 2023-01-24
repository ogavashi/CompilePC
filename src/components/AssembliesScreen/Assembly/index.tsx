import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link, generatePath } from 'react-router-dom';
import { UserAssembly } from '../../../../types';
import { getCarouselData } from '../../../utils/assembly';
import ImageCarousel from '../../ImageCarousel';
import ShortSpecs from './ShortSpecs';
import useStyles from './styles';
import { ROUTES } from '../../../common/constants';

type AssemblyProps = {
  userAssembly: UserAssembly;
  handleDelete: (value: string) => void;
  isDeleting: boolean;
};

const Assembly: React.FC<AssemblyProps> = ({
  userAssembly,
  handleDelete,
  isDeleting,
}) => {
  const styles = useStyles();

  const { assembly, title, id } = userAssembly;

  const carouselItems = getCarouselData(assembly);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.images}>
        <ImageCarousel
          imageWidth="200px"
          boxHeight="200px"
          items={carouselItems}
        />
      </Box>
      <Box className={styles.details} flexGrow={2}>
        <Link
          style={{ textDecoration: 'none' }}
          to={generatePath(ROUTES.ASSEMBLY, { id })}
        >
          <Typography className={styles.title} variant="h5">
            {title}
          </Typography>
        </Link>
        <ShortSpecs assembly={assembly} />
      </Box>
      <Box>
        <IconButton disabled={isDeleting} onClick={() => handleDelete(id)}>
          <CloseRoundedIcon className={styles.redIcon} fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Assembly;
