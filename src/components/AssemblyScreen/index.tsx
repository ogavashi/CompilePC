import React, { useContext, useCallback } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorLoading } from '../Icons';
import AssemblyCard from './AssemblyCard';
import ImageCarousel from './ImageCarousel';
import useStyles from './styles';
import { UIContext } from '../UIContext';
import { getCarouselData } from '../../utils/assembly';
import useGetAssembly from '../../hooks/useGetAssembly';
import { selectUser } from '../../store/user/selectors';

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
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '90vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="secondary" size="5rem" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '90vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ErrorLoading className={styles.image} />
        <Typography variant="h2">Couldn&#39;t load assembly</Typography>
      </Box>
    );
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
        <AssemblyCard
          assembly={userAssembly.assembly}
          handleShare={handleShare}
        />
      </Box>
    </Box>
  );
};

export default AssemblyScreen;
