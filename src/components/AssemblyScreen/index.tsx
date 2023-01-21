import React, { useContext, useCallback, useMemo } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AssemblyCard from './AssemblyCard';
import ImageCarousel from './ImageCarousel';
import useStyles from './styles';
import { UIContext } from '../UIContext';
import { selectAssembly } from '../../store/builder/selectors';
import { getCarouselData } from '../../utils/assembly';

const mockItems = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
    imageUrl: 'https://s.ek.ua/jpg/2069418.jpg',
  },
  {
    name: 'Random Name #2',
    description: 'Probably the most random thing you have ever seen!',
    imageUrl: 'https://s.ek.ua/jpg/2069418.jpg',
  },
  {
    name: 'Random Name #3',
    description: 'Probably the most random thing you have ever seen!',
    imageUrl: 'https://s.ek.ua/jpg/2069418.jpg',
  },
];

const AssemblyScreen = () => {
  const { setAlert } = useContext(UIContext);

  const assembly = useSelector(selectAssembly);

  const styles = useStyles();

  const handleShare = useCallback(() => {
    setAlert({
      show: true,
      severity: 'success',
      message: `Copied link to clipboard.`,
    });
    // TODO: Fix later
    const link = window.location.href;

    navigator.clipboard.writeText(link);
  }, [setAlert]);

  const items = getCarouselData(assembly);

  return (
    <Box className={styles.wrapper}>
      <Typography variant="h2" gutterBottom>
        Assembly name
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box className={styles.leftWrapper}>
          <ImageCarousel items={items} />
        </Box>
        <AssemblyCard handleShare={handleShare} />
      </Box>
    </Box>
  );
};

export default AssemblyScreen;
