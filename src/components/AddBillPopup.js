import styled from "styled-components";
import { useAddBill } from "../contexts/AddBillContext";
import { useRef, useEffect, useState } from "react";
import closeIcon from "../assets/images/close.svg";
import SelectCategoryPopup from "./SelectCategoryPopup";
import Icon from "./Icon";
import { devices } from "../assets/devices";
import { useFirestore } from "../contexts/FirestoreContext";
import ErrorBox from "./ErrorBox";

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
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  @media ${devices.tablet} {
    width: 500px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
  }
`;

const PopupMain = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 15px;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }

  @media ${devices.mobileL} {
    padding: 30px 40px;
  }

  @media ${devices.tablet} {
    padding: 15px 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 30px;
  height: 30px;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin: 10px 0;

  @media ${devices.mobileM} {
    margin: 20px 0;
  }

  @media ${devices.laptop} {
    margin: 0;
  }
`;

const PopupForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  height: 100%;
`;

const InputLabel = styled.label`
  color: black;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const InputField = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.4rem;
  font-weight: 800;
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  padding: 10px 15px;
  margin-bottom: 15px;

  @media ${devices.mobileM} {
    margin-bottom: 20px;
  }

  @media ${devices.laptop} {
    margin-bottom: 5px;
  }
`;

const SwitchContainer = styled.div`
  width: 100%;
  font-weight: 900;
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 7px;
  overflow: hidden;
  margin: 10px 0 15px;

  @media ${devices.mobileM} {
    margin-bottom: 20px;
  }

  @media ${devices.laptop} {
    margin-bottom: 10px;
  }
`;

const SwitchButton = styled.button`
  width: 50%;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: 900;
  background-color: ${({ theme, isSpent }) =>
    isSpent ? theme.color.primary : "white"};
  color: ${({ theme, isSpent }) => (isSpent ? "white" : theme.color.primary)};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

const MoneyInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Currency = styled.div`
  color: #ffffff;
  background-color: black;
  font-weight: 700;
  margin-left: 10px;
  font-size: 1.4rem;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  color: black;
  font-weight: 900;
`;

const SubmitButton = styled.button`
  width: 100%;
  font-size: 1.7rem;
  font-weight: 800;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 10px;

  @media ${devices.mobileM} {
    margin-top: 30px;
  }

  @media ${devices.laptop} {
    margin-top: 5px;
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  @media ${devices.mobileM} {
    margin-bottom: 20px;
  }

  @media ${devices.laptop} {
    margin-bottom: 5px;
  }
`;

const SelectCategory = styled.button`
  flex: 4;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.2rem;
  font-weight: 800;
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  margin-left: 10px;
  padding: 10px 15px;

  @media ${devices.mobileL} {
    margin-left: 30px;
    flex: 1;
  }
`;

const CategoryView = styled.p`
  flex: 3;
  display: inline-block;
  margin: 0;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.4rem;
  font-weight: 800;
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media ${devices.mobileL} {
    flex: 1;
  }
`;

const AddBillPopup = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
  const [isErrorBoxOpen, setIsErrorBoxOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const { getCurrency } = useFirestore();
  const { setIsPopupOpen, addNewBill, selectedCategory, setSelectedCategory } =
    useAddBill();
  const titleRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    currencyHandler();
  }, []);

  const currencyHandler = async () => {
    const currencyValue = await getCurrency();
    setCurrency(currencyValue);
  };

  const addBillHandler = (e) => {
    e.preventDefault();
    if (
      titleRef.current.value !== "" &&
      categoryRef.current.innerText !== "Not Selected..." &&
      dateRef.current.value !== "" &&
      amountRef.current.value !== ""
    ) {
      addNewBill({
        title: titleRef.current.value,
        categoryTitle: categoryRef.current.innerText,
        categorySrc: selectedCategory.src,
        date: dateRef.current.value,
        amount: parseFloat(amountRef.current.value),
        isSpent: isSpent,
        currency: currency,
      });
      setSelectedCategory("");
      setIsPopupOpen((snapshot) => !snapshot);
    } else {
      setIsErrorBoxOpen(true);
    }
  };

  const selectCategoryHandler = () =>
    setIsSelectCategoryOpen((snapshot) => !snapshot);

  const changeSwitchColor = () => setIsSpent((snapshot) => !snapshot);

  const closePopupHandler = () => {
    setSelectedCategory("");
    setIsPopupOpen((snapshot) => !snapshot);
  };

  return (
    <Popup>
      <PopupMain>
        {isSelectCategoryOpen && (
          <SelectCategoryPopup
            setIsSelectCategoryOpen={setIsSelectCategoryOpen}
          />
        )}
        <CloseButton onClick={closePopupHandler}>
          <Icon src={closeIcon} />
        </CloseButton>
        <Heading>BILL</Heading>
        <PopupForm onSubmit={addBillHandler}>
          {isErrorBoxOpen && <ErrorBox setIsErrorBoxOpen={setIsErrorBoxOpen} />}
          <InputLabel htmlFor="title">TITLE</InputLabel>
          <InputField
            ref={titleRef}
            type="text"
            id="title"
            name="title"
          ></InputField>
          <InputLabel htmlFor="category">CATEGORY</InputLabel>
          <CategoryContainer>
            <CategoryView ref={categoryRef}>
              {selectedCategory.title
                ? selectedCategory.title
                : "Not Selected..."}
            </CategoryView>
            <SelectCategory type="button" onClick={selectCategoryHandler}>
              SELECT CATEGORY
            </SelectCategory>
          </CategoryContainer>
          <InputLabel htmlFor="date">DATE OF PURCHASE</InputLabel>
          <InputField ref={dateRef} type="date" name="date"></InputField>
          <InputLabel htmlFor="amount">AMOUNT</InputLabel>
          <MoneyInputContainer>
            <InputField
              ref={amountRef}
              type="number"
              name="amount"
              step="0.01"
            ></InputField>
            <Currency>{currency}</Currency>
          </MoneyInputContainer>
          <SwitchContainer>
            <SwitchButton
              isSpent={isSpent}
              type="button"
              onClick={changeSwitchColor}
            >
              SPENT
            </SwitchButton>
            <SwitchButton
              isSpent={!isSpent}
              type="button"
              onClick={changeSwitchColor}
            >
              EARNED
            </SwitchButton>
          </SwitchContainer>
          <SubmitButton type="submit">ADD BILL</SubmitButton>
        </PopupForm>
      </PopupMain>
    </Popup>
  );
};

export default AddBillPopup;
