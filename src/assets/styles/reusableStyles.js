import styled from 'styled-components';
import { devices } from './devices';

export const Modal = styled.div`
  width: 94vw;
  background-color: #ffffff;
  position: fixed;
  top: 3vw;
  bottom: 3vw;
  left: 3vw;
  right: 3vw;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const Form = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  padding: 10px 15px;
  outline: none;
`;

export const Label = styled.label`
  color: #000000;
  display: block;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin: 23px 0 3px 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 23px;
`;

export const Error = styled.p`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 5px 0 0;
`;
