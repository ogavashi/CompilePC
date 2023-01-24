/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveAssemblyDto, User } from '../../../../../types';
import Assemblies from '../../../../api/assemblies';
import { BuilderMode, ROUTES } from '../../../../common/constants';
import { saveAssemblySchema } from '../../../../common/schemas';
import {
  selectAssembly,
  selectMode,
  selectTitle,
  selectUpdateAssemblyId,
} from '../../../../store/builder/selectors';
import { selectUser } from '../../../../store/user/selectors';
import { UIContext } from '../../../UIContext';

import useStyles from './styles';
import { eraseAssembly, setMode } from '../../../../store/builder/slice';

type SaveModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, handleClose }) => {
  const styles = useStyles();

  const user = useSelector(selectUser);

  const assembly = useSelector(selectAssembly);

  const mode = useSelector(selectMode);

  const oldTitle = useSelector(selectTitle);

  const assemblyId = useSelector(selectUpdateAssemblyId);

  const { setAlert } = useContext(UIContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(
    ({
      title,
      userData,
      userAssembly,
    }: {
      title: string;
      userData: User;
      userAssembly: SaveAssemblyDto;
    }) => {
      if (mode === BuilderMode.EDIT && assemblyId) {
        return Assemblies.update(assemblyId, title, userData, userAssembly);
      }
      return Assemblies.save(title, userData, userAssembly);
    },
    {
      onError: () =>
        setAlert({
          show: true,
          severity: 'error',
          message: `Could not save assembly. Try again later.`,
        }),
      onSuccess: (data) => {
        setAlert({
          show: true,
          severity: 'success',
          message: `Successfully saved assembly.`,
        });
        navigate(generatePath(ROUTES.ASSEMBLY, { id: data }));
        dispatch(
          setMode({
            builderMode: BuilderMode.NEW,
            id: null,
            assemblyTitle: null,
          }),
        );
        dispatch(eraseAssembly());
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      title: oldTitle || '',
    },
    validationSchema: saveAssemblySchema,
    onSubmit: async (values) => {
      const { title } = values;

      if (!user) {
        setAlert({
          show: true,
          severity: 'warning',
          message: 'Please, authorize before saving assembly',
        });
        navigate(ROUTES.LOGIN);
        return;
      }

      const normalizedAssembly = Object.fromEntries(
        Object.entries(assembly).filter(([, value]) => value),
      );

      const assemblyParts = Object.fromEntries(
        Object.entries(normalizedAssembly).map(([key, value]) => [
          key,
          value!.id,
        ]),
      );

      mutate({ title, userData: user, userAssembly: assemblyParts });
    },
  });

  const title = useMemo(() => {
    let value;
    switch (mode) {
      case BuilderMode.EDIT:
        value = 'Edit';
        break;
      case BuilderMode.NEW:
        value = 'Save';
        break;
      default:
        break;
    }
    return value;
  }, [mode]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={styles.modal}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography gutterBottom variant="h2">
          {title} assembly
        </Typography>
        <TextField
          className={styles.input}
          placeholder="Enter name"
          id="title"
          label="Title"
          variant="outlined"
          color="secondary"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Divider className={styles.divider} />
        <Box display="flex" flexDirection="row">
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            className={styles.button}
            type="submit"
            disabled={isLoading}
          >
            {title}
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            className={styles.button}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveModal;
