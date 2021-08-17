import styled from "styled-components";
import { devices } from "../../assets/devices";
import closeIcon from "../../assets/images/close.svg";
import Icon from "../../components/Icon";
import { useEffect, useRef, useState } from "react";
import { useAddBill } from "../../contexts/AddBillContext";
import FormError from "../../components/FormError";
import { useFirestore } from "../../contexts/FirestoreContext";

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

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }

  @media ${devices.mobileL} {
    padding: 30px 40px;
  }

  @media ${devices.tablet} {
    width: 500px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    padding: 15px 20px;
  }
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
  outline: none;
  padding: 10px 15px;
  margin-bottom: 15px;

  @media ${devices.mobileM} {
    margin-bottom: 20px;
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

const SubmitButton = styled.button`
  border: none;
  width: 100%;
  font-size: 1.7rem;
  font-weight: 800;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 10px;
  cursor: pointer;

  @media ${devices.mobileM} {
    margin-top: 30px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 900;
`;

const Checkbox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const SwitchContainer = styled.div`
  width: 100%;
  background: none;
  border: none;
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
  border: none;
  background: none;
  width: 50%;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: 900;
  background-color: white;
  color: ${({ theme }) => theme.color.primary};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &.clicked {
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
  }
`;

const AddExpensesPopup = ({ setIsExpensesPopupOpen }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [checkedMonths, setCheckedMonths] = useState(
    new Array(months.length).fill(false)
  );
  const [isSpent, setIsSpent] = useState(true);
  const [isFormCorect, setIsFormCorect] = useState(true);
  const [currency, setCurrency] = useState("");

  const { addNewExpense } = useAddBill();
  const { getUserData } = useFirestore();

  const titleRef = useRef();
  const amountRef = useRef();
  const dayRef = useRef();

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = async () => {
    const { currency } = await getUserData();
    setCurrency(currency);
  };

  const changeSwitchColor = () => {
    setIsSpent((snapshot) => !snapshot);
  };

  const handleOnChange = (position) => {
    const updatedCheckedMonths = checkedMonths.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedMonths(updatedCheckedMonths);
  };

  const closePopupHandler = () => {
    setIsExpensesPopupOpen(false);
  };

  const AddExpense = (e) => {
    e.preventDefault();
    if (
      titleRef.current.value !== "" &&
      dayRef.current.value <= "28" &&
      dayRef.current.value >= "1" &&
      checkedMonths.filter((month) => month === true).length >= 1 && // number of checked months
      amountRef.current.value !== ""
    ) {
      addNewExpense({
        title: titleRef.current.value,
        months: checkedMonths,
        dayOfCollection: parseFloat(dayRef.current.value),
        amount: parseFloat(amountRef.current.value),
        isSpent: isSpent,
        currency: currency,
      });
      closePopupHandler();
    } else {
      setIsFormCorect(false);
    }
  };

  return (
    <Popup>
      {!isFormCorect && <FormError setIsFormCorect={setIsFormCorect} />}
      <Heading>Add Expenses</Heading>
      <CloseButton onClick={closePopupHandler}>
        <Icon src={closeIcon} />
      </CloseButton>
      <PopupForm onSubmit={AddExpense}>
        <InputLabel htmlFor="title">TITLE</InputLabel>
        <InputField
          ref={titleRef}
          type="text"
          id="title"
          name="title"
        ></InputField>
        <InputLabel htmlFor="amount">AMOUNT</InputLabel>
        <InputField
          ref={amountRef}
          type="number"
          id="amount"
          name="amount"
        ></InputField>
        <InputLabel>DAY OF COLLECTION ( 1 - 28 )</InputLabel>
        <InputField ref={dayRef} type="number" id="day" name="day"></InputField>
        <InputLabel>MONTH OF COLLECTION ( 1 - 12 )</InputLabel>
        <Checkbox>
          {months.map((month, index) => (
            <div key={month}>
              <CheckboxInput
                type="checkbox"
                id={month}
                name="month"
                value={month}
                checked={checkedMonths[index]}
                onChange={() => handleOnChange(index)}
              ></CheckboxInput>
              <CheckboxLabel>{month}</CheckboxLabel>
            </div>
          ))}
        </Checkbox>
        <SwitchContainer>
          <SwitchButton
            type="button"
            onClick={changeSwitchColor}
            className={isSpent && "clicked"}
          >
            SPENT
          </SwitchButton>
          <SwitchButton
            type="button"
            onClick={changeSwitchColor}
            className={!isSpent && "clicked"}
          >
            EARNED
          </SwitchButton>
        </SwitchContainer>
        <SubmitButton type="submit">ADD EXPENSE</SubmitButton>
      </PopupForm>
    </Popup>
  );
};

export default AddExpensesPopup;
