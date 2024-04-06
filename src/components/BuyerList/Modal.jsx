/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { useEffect } from 'react';

// components
import { ModalContainer, CancelButton, SignImg } from './modalStyles';

// libraries
import { signModalState, selectBuyerListData, checkUserData } from '@/atom/state';
import { useRecoilState } from 'recoil';

// custom hooks
import useModifySign from '@/hooks/BuyerList/useModifySign';

const Modal = () => {
  // sign Img
  const [user, setUser] = useRecoilState(selectBuyerListData);
  const [isSign, setIsSign] = useRecoilState(signModalState);
  const [downloadData, setDownloadData] = useRecoilState(checkUserData);

  // close modal
  const closeModal = () => {
    setIsSign(false);
  };

  const modifySign = async (e) => {
    const modify = useModifySign(e, user, setUser);
    modify();
  };

  useEffect(() => {
    console.log('user: ', user);
    console.log('downloadData: ', downloadData);
  }, [user, downloadData]);

  return (
    <ModalContainer>
      <div className="CancelHeader">
        <div className="title">표지</div>
        <CancelButton onClick={closeModal}>X</CancelButton>
      </div>
      <div className="imgContainer">
        <SignImg src={downloadData[0].sign !== '' && downloadData[0].sign} />
      </div>
      <div className="buttonContainer">
        <label htmlFor="edit" className="editButton">
          수정
        </label>
        <input id="edit" type="file" onChange={(e) => modifySign(e)} accept="image/jpeg" />
      </div>
    </ModalContainer>
  );
};

export default Modal;
