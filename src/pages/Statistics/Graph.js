import styled from "styled-components";
import leftArrow from "../../assets/images/left-arrow.svg";
import rightArrow from "../../assets/images/right-arrow.svg";
import Icon from "../../components/Icon";
import { useState } from "react";
import { useGraph } from "../../contexts/GraphContext";
import { Doughnut, Line } from "react-chartjs-2";
import { useEffect } from "react/cjs/react.development";

const Container = styled.div``;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  padding: 10px 15px;
  border-radius: 7px;
`;

const Settings = styled.div`
  display: flex;

  button {
    background-color: ${({ theme }) => theme.color.lightSecondary};
    padding: 10px 15px;
    border-radius: 7px;
    flex: 1;
    margin: 10px 5px 0;
  }
`;

const ControlsButton = styled.button``;

const ControlsText = styled.span`
  font-size: 2rem;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: auto;
`;

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const Graph = () => {
  const [graphValue, setGraphValue] = useState("MONTH");
  const { transactions } = useGraph();

  const getYear = () => {
    const today = new Date();
    return today.getFullYear();
  };

  const getMonth = () => {
    const today = new Date();
    // return String(today.getMonth() + 1).padStart(2, "0");
    switch (today.getMonth()) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  };

  const getWeek = () => {
    const today = new Date();
    return `${String(today.getDate() - 7).padStart(2, "0")} - ${String(
      today.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <Container>
      <DoughnutGraph />
      <div>
        <Controls>
          <ControlsButton>
            <StyledIcon src={leftArrow} />
          </ControlsButton>
          <ControlsText>{graphValue}</ControlsText>
          <ControlsButton>
            <StyledIcon src={rightArrow} />
          </ControlsButton>
        </Controls>
        <Settings>
          <button onClick={() => setGraphValue(getYear)}>YEAR</button>
          <button onClick={() => setGraphValue(getMonth)}>MONTH</button>
          <button onClick={() => setGraphValue(getWeek)}>WEEK</button>
        </Settings>
      </div>
    </Container>
  );
};

export default Graph;
