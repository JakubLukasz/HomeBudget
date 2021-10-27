import styled from 'styled-components';
import { useInputData } from '../hooks/useInputData';
import React from 'react';
import PropTypes from 'prop-types';
import ModalTemplate from '../templates/ModalTemplate';
import { Typography, Button, Stack } from '@mui/material';
import { useUi } from '../hooks/useUi';

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

const SubCategoryModal = () => {
  const {
    setSelectedCategory,
    selectedGroup,
    getCategoryIcon,
    getSubCategories,
  } = useInputData();

  const {
    isSubCategoryModalOpen,
    setIsSubCategoryModalOpen,
    setIsCategoryModalOpen,
  } = useUi();

  const Icon = getCategoryIcon(selectedGroup);
  const subCategories = getSubCategories(selectedGroup);

  const selectCategory = (e) => {
    setIsSubCategoryModalOpen(false);
    setIsCategoryModalOpen(false);
    setSelectedCategory(e.target.innerText);
  };

  return (
    <ModalTemplate
      title="Select Category"
      isOpen={isSubCategoryModalOpen}
      onClose={() => setIsSubCategoryModalOpen(false)}
    >
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        {subCategories.map((category) => (
          <CategoryButton
            fullWidth
            variant="contained"
            key={category}
            onClick={selectCategory}
          >
            <Icon />
            <Typography variant="h6" component="p">
              {category}
            </Typography>
          </CategoryButton>
        ))}
      </Stack>
    </ModalTemplate>
  );
};

SubCategoryModal.propTypes = {
  subCategories: PropTypes.array,
  src: PropTypes.string,
  setIsSelectCategoryOpen: PropTypes.func,
  setIsSubCategoryModalOpen: PropTypes.func,
};

export default SubCategoryModal;
