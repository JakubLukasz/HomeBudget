import styled from "styled-components";
import { devices } from "../../assets/devices";
import closeIcon from "../../assets/images/close.svg";
import Icon from "../../components/Icon";
import { useEffect, useRef, useState } from "react";

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

const DateInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const DateEl = styled.button`
  display: inline;
  border: none;
  background: none;
  outline: none;
  height: 25px;
  width: 25px;
  background-color: ${({ theme }) => theme.color.regularPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  font-size: 1.2rem;
  font-weight: 900;
  color: #ffffff;

  &.clicked {
    background-color: ${({ theme }) => theme.color.primary};
  }
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

  @media ${devices.mobileM} {
    margin-top: 30px;
  }
`;

const AddExpensesPopup = ({ setIsExpensesPopupOpen }) => {
  useEffect(() => {
    generateDate();
  }, []);
  const [months, setMonths] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isMonthClicked, setIsMonthClicked] = useState(false);
  const titleRef = useRef();
  const amountRef = useRef();
  const dayRef = useRef();

  const closePopupHandler = () => {
    setIsExpensesPopupOpen(false);
  };

  const generateDate = () => {
    const month = [];
    for (let j = 1; j <= 12; j++) {
      month.push(j);
    }
    setMonths(month);
  };

  const AddExpense = (e) => {
    e.preventDefault();
    console.log(selectedMonths);
  };

  const chooseMonth = (e) => {
    const monthValue = parseInt(e.target.innerText);
    if (e.target.classList.contains("clicked")) {
      setSelectedMonths((oldArray) =>
        oldArray.splice(selectedMonths.indexOf(monthValue), 1)
      );
    } else {
      setSelectedMonths((oldArray) => [...oldArray, monthValue]);
    }
    e.target.classList.toggle("clicked");
    // setIsMonthClicked((snapshot) => !snapshot);
  };

  return (
    <Popup>
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
        <InputLabel>DAY OF COLLECTION ( 1-28 )</InputLabel>
        <InputField ref={dayRef} type="number" id="day" name="day"></InputField>
        <InputLabel>MONTH OF COLLECTION</InputLabel>
        <DateInput>
          {months &&
            months.map((monthNumber) => (
              <DateEl
                onClick={chooseMonth}
                className={isMonthClicked && "clicked"}
              >
                {monthNumber}
              </DateEl>
            ))}
        </DateInput>
        <SubmitButton type="submit">Add Expense</SubmitButton>
      </PopupForm>
    </Popup>
  );
};

export default AddExpensesPopup;
