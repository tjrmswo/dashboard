/* eslint-disable no-unused-vars */
// components
import {
  ModalContainer,
  CancelButton,
  SignImg,
  EditButton,
} from "./modalStyles";

//libraries
import {
  signModalState,
  selectBuyerListData,
  EbookModalState,
} from "@/atom/state";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const EbookModal = () => {
  // sign Img
  const [user, setUser] = useRecoilState(selectBuyerListData);
  const [isEbook, setIsEbook] = useRecoilState(EbookModalState);
  // close modal
  const closeModal = () => {
    setIsEbook(false);
  };

  //   useEffect(() => {
  //     console.log("user: ", user);
  //   }, [user]);

  return (
    <ModalContainer>
      <div className="CancelHeader">
        <div className="title">전자책</div>
        <CancelButton onClick={closeModal}>X</CancelButton>
      </div>
      <div className="imgContainer">
        <SignImg src={user[0].ebook} alt="전자책 표지" />
      </div>
      <div className="buttonContainer">
        <EditButton>수정</EditButton>
      </div>
    </ModalContainer>
  );
};

export default EbookModal;
