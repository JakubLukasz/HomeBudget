import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import Icon from '../Icon';
import { useInputData } from '../../hooks/useInputData';
import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';

const Modal = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  overflow: auto;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }

  @media ${devices.mobileL} {
    padding: 30px 40px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 2rem;
  text-transform: capitalize;
`;

const CategoryButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 7px;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.color.lightSecondary};

  @media ${devices.laptop} {
    padding: 8px;
    margin-top: 7px;
  }
`;

const CategoryIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
  fill: white;
`;

const IconContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px;
  border-radius: 50%;

  @media ${devices.laptop} {
    padding: 5px;
  }
`;

const CategorySpan = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 20px;
`;

const SubCategoryModal = ({
  subCategories,
  src,
  setIsSubCategoryModalOpen,
  setIsSelectCategoryOpen,
}) => {
  const { setSelectedCategory } = useInputData();
  const closeHandler = () => setIsSubCategoryModalOpen((snapshot) => !snapshot);
  const selectCategory = (e) => {
    closeHandler();
    setIsSelectCategoryOpen((snapshot) => !snapshot);
    setSelectedCategory({ title: e.target.innerText, src });
  };

  return (
    <Modal>
      <Header>
        <BackButton click={closeHandler} />
        <Heading>select</Heading>
      </Header>
      {subCategories.map((category) => (
        <CategoryButton key={category} onClick={selectCategory}>
          <IconContainer>
            <CategoryIcon src={src} />
          </IconContainer>
          <CategorySpan>{category}</CategorySpan>
        </CategoryButton>
      ))}
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
