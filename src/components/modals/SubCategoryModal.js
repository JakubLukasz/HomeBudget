import styled from 'styled-components';
import { useInputData } from '../../hooks/useInputData';
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { Typography, Button, Stack } from '@mui/material';

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
    isSubCategoryModalOpen,
    selectedGroup,
    setIsSubCategoryModalOpen,
    setIsCategoryModalOpen,
    getCategoryIcon,
    getSubCategories,
  } = useInputData();

  const Icon = getCategoryIcon(selectedGroup);
  const subCategories = getSubCategories(selectedGroup);

  const selectCategory = (e) => {
    setIsSubCategoryModalOpen(false);
    setIsCategoryModalOpen(false);
    setSelectedCategory(e.target.innerText);
  };

  return (
    <Modal
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
    </Modal>
  );
};

SubCategoryModal.propTypes = {
  subCategories: PropTypes.array,
  src: PropTypes.string,
  setIsSelectCategoryOpen: PropTypes.func,
  setIsSubCategoryModalOpen: PropTypes.func,
};

export default SubCategoryModal;
