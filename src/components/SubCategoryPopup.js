import styled from "styled-components";
import { devices } from "../assets/devices";
import { useSate } from "react";
import Icon from "./Icon";
import previousIcon from "../assets/images/previous.svg";
import { useAddBill } from "../contexts/AddBillContext";

const Popup = styled.div`
  width: 94vw;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  top: 3vw;
  bottom: 3vw;
  left: 3vw;
  right: 3vw;
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

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  left: 25px;
  border: none;
  background: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin: 10px 0;

  @media ${devices.mobileM} {
    margin: 40px 0 20px;
  }
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
`;

const CategoryIcon = styled(Icon)`
  height: 20px;
  width: auto;
  fill: white;
`;

const IconContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px;
  border-radius: 50%;
`;

const CategorySpan = styled.span`
  font-size: 1.6rem;
  font-weight: 900;
  margin-left: 20px;
`;

const SubCategoryPopup = ({
  subCategories,
  src,
  setIsSubCategoryPopupOpen,
  setIsSelectCategoryOpen,
}) => {
  const { setSelectedCategory } = useAddBill();
  const closeHandler = () => setIsSubCategoryPopupOpen((snapshot) => !snapshot);
  const selectCategory = (e) => {
    console.log(e.target);
    closeHandler();
    setIsSelectCategoryOpen((snapshot) => !snapshot);
    setSelectedCategory({ title: e.target.innerText, src });
  };

  return (
    <Popup>
      <CloseButton onClick={closeHandler}>
        <Icon src={previousIcon} />
      </CloseButton>
      <Heading>Select Category</Heading>
      {subCategories.map((category) => (
        <CategoryButton key={category} onClick={selectCategory}>
          <IconContainer>
            <CategoryIcon src={src} />
          </IconContainer>
          <CategorySpan>{category}</CategorySpan>
        </CategoryButton>
      ))}
    </Popup>
  );
};

export default SubCategoryPopup;
