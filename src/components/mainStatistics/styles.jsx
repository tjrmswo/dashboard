import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 18vw 5fr 3.5fr;
  grid-template-rows: 0.6fr 0.4fr 2fr;
  color: black;
  height: 100vh;
  .mainstatistics {
    font-size: 2rem;
    display: grid;
    color: black;
    align-items: end;
    justify-content: start;
    font-family: "GmarketSans-Bold";
    font-size: 1.8rem;
  }
  .buttonRow {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: center;
    margin-right: 2rem;
  }
  .dayContainer {
    display: grid;
    text-align: center;
    align-items: center;
    font-family: "GmarketSans-Medium";
    background-color: #dcebc9;
    font-size: 1.5rem;
    margin-top: 2rem;
    width: 100%;
  }
  .dataTable {
    display: grid;
    justify-content: center;
    grid-row: span 2;
    margin-bottom: 2rem;
  }
  .chartContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
  }
  .buyer {
    display: flex;
    margin-right: 0.5rem;
  }
`;

export const Button = styled.button`
  width: 6vw;
  font-size: 1.2rem;
  background-color: #dcebc9;
  border: none;
`;

export const BuyerColor = styled.span`
  width: 1vw;
  height: 2vh;
  border-radius: 50%;
  background-color: rgb(86, 138, 53);
  margin-right: 0.5rem;
`;

export const SigupUserColor = styled.span`
  width: 1vw;
  height: 2vh;
  border-radius: 50%;
  background-color: rgb(124, 177, 72);
  margin-right: 0.5rem;
`;
