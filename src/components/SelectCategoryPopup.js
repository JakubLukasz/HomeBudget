import styled from "styled-components";
import { devices } from "../assets/devices";
import closeIcon from "../assets/images/close.svg";
import Icon from "./Icon";
import SubCategoryPopup from "./SubCategoryPopup";
import { useState } from "react";
import foodIcon from "../assets/images/food.svg";
import carIcon from "../assets/images/car.svg";
import homeIcon from "../assets/images/home.svg";
import shoppingIcon from "../assets/images/shoppingBag.svg";
import feesIcon from "../assets/images/fees.svg";
import entertainmentIcon from "../assets/images/person.svg";
import otherIcon from "../assets/images/square.svg";

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
  right: 25px;
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

const SelectCategoryPopup = ({ setIsSelectCategoryOpen }) => {
  const mainCategories = [
    {
      src: foodIcon,
      title: "Food",
      subCategories: ["Groceries", "Bar, Cafe", "Restaurant"],
    },
    {
      src: carIcon,
      title: "Car",
      subCategories: [
        "Car",
        "Car Insurance",
        "Car Repair",
        "Car Leasing",
        "Parking",
      ],
    },
    {
      src: homeIcon,
      title: "Home",
      subCategories: ["Tools", "Furniture", "House and Garden", "Repairs"],
    },
    {
      src: shoppingIcon,
      title: "Shopping",
      subCategories: [
        "Electronics",
        "Clothes",
        "Body Care",
        "Accessories",
        "Education",
        "Pets",
        "Health Care",
        "Children",
        "Gifts",
      ],
    },
    {
      src: feesIcon,
      title: "Fees",
      subCategories: [
        "Internet Bill",
        "Phone Bill",
        "Tax",
        "Mandate",
        "Streaming Services",
        "Subscription Services",
        "Car Fee",
        "Bank Loans",
        "Health Insurance",
        "Electricity Bill",
        "Rent",
      ],
    },
    {
      src: entertainmentIcon,
      title: "Entertainment",
      subCategories: [
        "Alcohol",
        "Events",
        "Sports",
        "Motorcycle",
        "Bike",
        "Books",
        "Hobby",
        "Holidays",
        "Software, Games",
      ],
    },
    {
      src: otherIcon,
      title: "Other",
      subCategories: [
        "Sale",
        "Taxi",
        "Public Transport",
        "Long Distance Transport",
      ],
    },
  ];
  const [isSubCategoryPopupOpen, setIsSubCategoryPopupOpen] = useState(false);
  const [categoryObj, setCategoryObj] = useState(null);

  const closePopupHandler = () =>
    setIsSelectCategoryOpen((snapshot) => !snapshot);

  const openSubCategoryPopupHandler = (subCategoryObj) => {
    setCategoryObj(subCategoryObj);
    setIsSubCategoryPopupOpen((snapshot) => !snapshot);
  };
  return (
    <Popup>
      {isSubCategoryPopupOpen && (
        <SubCategoryPopup
          {...categoryObj}
          setIsSubCategoryPopupOpen={setIsSubCategoryPopupOpen}
          setIsSelectCategoryOpen={setIsSelectCategoryOpen}
        />
      )}
      <CloseButton onClick={closePopupHandler}>
        <Icon src={closeIcon} />
      </CloseButton>
      <Heading>Select Category</Heading>
      {mainCategories.map(({ src, title, subCategories }) => (
        <CategoryButton
          key={title}
          onClick={() => openSubCategoryPopupHandler({ subCategories, src })}
        >
          <IconContainer>
            <CategoryIcon src={src} />
          </IconContainer>
          <CategorySpan>{title}</CategorySpan>
        </CategoryButton>
      ))}
    </Popup>
  );
};

export default SelectCategoryPopup;
