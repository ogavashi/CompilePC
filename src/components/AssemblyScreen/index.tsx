import React, { useContext, useCallback } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AssemblyCard from './AssemblyCard';
import ImageCarousel from '../ImageCarousel';
import useStyles from './styles';
import { UIContext } from '../UIContext';
import { getCarouselData } from '../../utils/assembly';
import useGetAssembly from '../../hooks/useGetAssembly';
import { selectUser } from '../../store/user/selectors';
import Loader from '../Loader';
import ErrorScreen from '../ErrorScreen';

const AssemblyScreen = () => {
  const { setAlert } = useContext(UIContext);

  const { id } = useParams();

  const styles = useStyles();

  const user = useSelector(selectUser);

  const {
    data: userAssembly,
    isError,
    isLoading,
  } = useGetAssembly(id as string);

  const handleShare = useCallback(() => {
    setAlert({
      show: true,
      severity: 'success',
      message: `Copied link to clipboard.`,
    });

    const link = window.location.href;

    navigator.clipboard.writeText(link);
  }, [setAlert]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  const items = getCarouselData(userAssembly.assembly);

  return (
    <Box className={styles.wrapper}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" gutterBottom>
          {userAssembly.title}
        </Typography>
        {userAssembly.userId !== user?.id && (
          <Typography variant="h3" gutterBottom sx={{ fontWeight: '400' }}>
            Author: {userAssembly.username}
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center">
        <Box className={styles.leftWrapper}>
          <ImageCarousel items={items} />
        </Box>
        <AssemblyCard userAssembly={userAssembly} handleShare={handleShare} />
      </Box>
    </Box>
  );
};

export default AssemblyScreen;
