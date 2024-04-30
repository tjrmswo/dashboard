import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 18vw 5fr 3.5fr;
  grid-template-rows: 0.6fr 0.4fr 2fr;
  color: black;
  height: 100vh;
  .SignupUserList {
    display: grid;
    color: black;
    align-items: end;
    justify-content: start;
    font-family: "GmarketSans-Bold";
    font-size: 2rem;
  }
  .gender {
    width: 25vw;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-family: "GmarketSans-Medium";
    background-color: #dcebc9;
  }
  .SubscriberHeader {
    width: 50vw;
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-family: "GmarketSans-Medium";
    background-color: #dcebc9;
    margin-right: 2rem;
  }
  .roundchartContainer {
    height: 30vh;
    display: grid;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
  }
  .SubscriberList {
    display: grid;
    grid-row: span 3;
    margin-right: 2rem;
  }

  .ageHeader {
    width: 25vw;
    height: 8vh;
    display: grid;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-family: "GmarketSans-Medium";
    background-color: #dcebc9;
  }
  .stickChartContainer {
    height: 30vh;
    display: grid;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
  }
`;
