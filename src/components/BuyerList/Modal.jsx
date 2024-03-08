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
import { useRecoilState } from "recoil";

const Modal = (state) => {
  // sign Img
  const [user, setUser] = useRecoilState(selectBuyerListData);
  // modal state
  const [isSign, setIsSign] = useRecoilState(signModalState);
  const [isEbook, setIsEbook] = useRecoilState(EbookModalState);

  // close modal
  const closeModal = () => {
    if (user.uploadtype === "sign") {
      setIsSign(!isSign);
      if (isEbook) {
        setUser((prev) => ({
          ...prev,
          uploadtype: "ebook",
        }));
      }
    } else if (user.uploadtype === "ebook") {
      setIsEbook(!isEbook);
      if (isSign) {
        setUser((prev) => ({
          ...prev,
          uploadtype: "sign",
        }));
      }
    }
  };

  useEffect(() => {
    console.log("isSign: ", state);
  }, [state]);

  console.log(user);
  return (
    <ModalContainer>
      <div className="CancelHeader">
        <div className="title">표지</div>
        <CancelButton onClick={closeModal}>X</CancelButton>
      </div>
      <div className="imgContainer">
        <SignImg src={user[0].bookCover} />
      </div>
      <div className="buttonContainer">
        <EditButton>수정</EditButton>
      </div>
    </ModalContainer>
  );
};

export default Modal;
