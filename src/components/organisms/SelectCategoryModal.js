import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { useInputData } from '../../hooks/useInputData';
import { useUi } from '@Hooks/useUi';
import ModalTemplate from '@Components/templates/ModalTemplate';
import { Button, Stack, Typography } from '@mui/material';

const CategoryButton = styled(Button)`
  justify-content: flex-start;
  padding: 10px;
  padding-left: 20px;
  font-size: 1rem;
  text-transform: capitalize;
  & .MuiSvgIcon-root {
    font-size: 2rem;
    margin-right: 10px;
  }
`;

const SelectCategoryModal = () => {
  const { setSelectedGroup, mainCategories } = useInputData();

  const {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    setIsSubCategoryModalOpen,
  } = useUi();

  const openSubCategoryModalHandler = (title) => {
    setSelectedGroup(title);
    setIsSubCategoryModalOpen(true);
  };

  return (
    <ModalTemplate
      title="Select Category"
      isOpen={isCategoryModalOpen}
      onClose={() => setIsCategoryModalOpen(false)}
    >
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        {mainCategories.map(({ Icon, title }) => (
          <CategoryButton
            fullWidth
            variant="contained"
            key={title}
            onClick={() => openSubCategoryModalHandler(title)}
          >
            <Icon />
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </CategoryButton>
        ))}
      </Stack>
    </ModalTemplate>
  );
};

SelectCategoryModal.propTypes = {
  setIsSelectCategoryOpen: PropTypes.func,
};

export default SelectCategoryModal;
