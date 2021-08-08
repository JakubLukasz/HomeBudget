import styled from "styled-components";
import { useAddBill } from "../contexts/AddBillContext";
import { useRef, useEffect } from "react";
import closeIcon from "../assets/images/close.svg";
import Icon from "./Icon";

const Popup = styled.div`
  width: 90vw;
  height: 75vh;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  bottom: 100px;
  left: 5vw;
  right: -5vw;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
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
  margin: 0;
  margin-bottom: 50px;
`;

const PopupForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
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
  background: ${({ theme }) => theme.color.gray};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
  margin-bottom: 15px;
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
`;

const AddBillPopup = () => {
  const { setIsPopupOpen, setBill, setIsSubmited } = useAddBill();
  const titleRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    setIsSubmited(false);
  }, []);

  const addBillHandler = (e) => {
    e.preventDefault();
    setBill({
      title: titleRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
      amount: amountRef.current.value,
    });
    setIsSubmited(true);
    setIsPopupOpen((snapshot) => !snapshot);
  };

  const closePopupHandler = () => setIsPopupOpen((snapshot) => !snapshot);

  return (
    <Popup>
      <CloseButton onClick={closePopupHandler}>
        <Icon src={closeIcon} />
      </CloseButton>
      <Heading>BILL</Heading>
      <PopupForm onSubmit={addBillHandler}>
        <InputLabel htmlFor="title">TITLE</InputLabel>
        <InputField
          required
          ref={titleRef}
          type="text"
          id="title"
          name="title"
        ></InputField>
        <InputLabel htmlFor="category">CATEGORY</InputLabel>
        <InputField
          required
          ref={categoryRef}
          type="text"
          name="category"
        ></InputField>
        <InputLabel htmlFor="date">DATE OF PURCHASE</InputLabel>
        <InputField required ref={dateRef} type="date" name="date"></InputField>
        <InputLabel htmlFor="amount">AMOUNT</InputLabel>
        <InputField
          required
          ref={amountRef}
          type="number"
          name="amount"
        ></InputField>
        <SubmitButton type="submit">ADD BILL</SubmitButton>
      </PopupForm>
    </Popup>
  );
};

export default AddBillPopup;
