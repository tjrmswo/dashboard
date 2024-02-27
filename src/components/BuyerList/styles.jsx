import styled from "styled-components";

// div
export const Container = styled.div`
  display: grid;
  grid-template-columns: 18vw 5fr 3.5fr;
  grid-template-rows: 0.6fr 0.4fr 2fr;
  color: black;
  height: 100vh;
  .buyerList {
    display: grid;
    align-items: end;
    justify-content: start;
    font-family: "GmarketSans-Bold";
    font-size: 1.8rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
  .SearchContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    align-items: end;
    justify-content: start;
  }
  .buyListHeader {
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: #dcebc9;
    grid-column: 2 / span 3;
    font-size: 1.9rem;
    font-family: "GmarketSans-Medium";
  }
  .dataContainer {
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-column: 2 / span 3;
  }
`;

//input

export const InputContainer = styled.div`
  width: 10vw;
  display: grid;

  .input {
    outline: white;
    border: 1px solid white;
    margin: 0.3rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    background-color: #49b65e;
  }
`;

//form

export const Form = styled.form`
  width: 10vw;
`;

//select

export const SelectCategory = styled.select`
  text-align: center;
  width: 13vw;
  height: 4vh;
  border: none;
  background-color: #dcebc9;
  & :hover {
    outline: none;
  }
  font-family: "GmarketSans-Medium";
`;

//img

export const DownloadImg = styled.img`
  position: relative;
  bottom: 0.4rem;
  right: 0.5rem;
`;

export const AddressdownloadImg = styled.img`
  position: relative;
  bottom: 0.3rem;
  right: 3.2rem;
`;

export const DropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const StateDropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const UploaddropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const SearchIcon = styled.img`
  width: 2vw;
  height: 4vh;
  background-color: #49b65e;
  padding: 0.2rem 0.3rem 0.2rem 0.2rem;
`;
