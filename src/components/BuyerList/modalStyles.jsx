import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30vw;
  top: 15vh;
  width: 40vw;
  height: 80vh;
  background-color: white;
  border-radius: 0.5rem;

  // 삭제 버튼 컨테이너
  .CancelHeader {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: end;
    margin-bottom: 1rem;
    background-color: #dcebc9;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .title {
    width: 100%;
    text-align: start;
    padding: 0.7rem;
    font-family: "GmarketSans-Medium";
  }
  .imgContainer {
    width: 100%;
    text-align: center;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
  .buttonContainer {
    width: 100%;
    text-align: center;

    input[type="file"] {
      width: 0px;
    }
  }
  .editButton {
    width: 15vw;
    background-color: #ebfcd6;
    border: 2px solid #aaeb5a;
    &:focus {
      outline: none;
    }
    font-size: 1.2rem;
    border-radius: 1rem;
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-family: "GmarketSans-Medium";
  }
`;

// close button
export const CancelButton = styled.div`
  padding: 0.7rem;
  font-family: "GmarketSans-Medium";
`;

// sign Image
export const SignImg = styled.img`
  width: 25vw;
  height: 60vh;
`;
