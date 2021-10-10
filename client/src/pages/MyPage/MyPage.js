import React, { useState, useEffect } from "react";
import { MyPageContainer, ModalContainer } from "./MyPage.style";
import MyPageTop from "../../components/MyPageTop/MyPageTop";
import MyPageMiddle from "../../components/MyPageMiddle/MyPageMiddle";
import MyPagePhotos from "../../components/MyPagePhotos/MyPagePhotos";
import EditUserInfoModal from "../../components/EditUserInfoModal/EditUserInfoModal";
import PhotoUploadModal from "../../components/PhotoUploadModal/PhotoUploadModal";
import { EditUserInfoButton } from "../../components/MyPageTop/MyPageTop.style";
import Modal from "../../components/Modal/Modal";

function MyPage() {
  const [isModal, setIsModal] = useState({
    photoUpload: false,
    editUserInfo: false,
    deleteAccount: false,
    deletePhoto: false,
  });

  const openCloseModalHandler = (e) => {
    let newIsModal = { ...isModal };

    if (e.target.name === "photoUpload") {
      newIsModal.photoUpload = !newIsModal.photoUpload;
    } else if (e.target.name === "editUserInfo") {
      newIsModal.editUserInfo = !newIsModal.editUserInfo;
    } else if (e.target.name === "deleteAccount") {
      newIsModal.deleteAccount = !newIsModal.deleteAccount;
    } else if (e.target.name === "deletePhoto") {
      newIsModal.deletePhoto = !newIsModal.deletePhoto;
    } else {
      if (isModal.photoUpload) {
        newIsModal.photoUpload = !newIsModal.photoUpload;
      } else if (isModal.deleteAccount) {
        newIsModal.deleteAccount = !newIsModal.deleteAccount;
      } else if (isModal.deletePhoto) {
        newIsModal.deletePhoto = !newIsModal.deletePhoto;
      } else {
        newIsModal.editUserInfo = !newIsModal.editUserInfo;
      }
    }
    setIsModal(newIsModal);
  };

  const { photoUpload, editUserInfo, deleteAccount, deletePhoto } = isModal;

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow =
      photoUpload || editUserInfo || deleteAccount || deletePhoto
        ? "hidden"
        : "auto";
  }, [photoUpload, editUserInfo, deleteAccount, deletePhoto]);

  return (
    <MyPageContainer>
      <MyPageTop openCloseModalHandler={openCloseModalHandler} />
      <MyPageMiddle />
      <MyPagePhotos openCloseModalHandler={openCloseModalHandler} />
      {isModal.photoUpload ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <PhotoUploadModal
            openCloseModalHandler={openCloseModalHandler}
          ></PhotoUploadModal>
        </ModalContainer>
      ) : null}
      {isModal.editUserInfo ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <EditUserInfoModal
            openCloseModalHandler={openCloseModalHandler}
          ></EditUserInfoModal>
        </ModalContainer>
      ) : null}
      {isModal.deleteAccount ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <Modal
            message={"정말 탈퇴하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></Modal>
        </ModalContainer>
      ) : null}
      {isModal.deletePhoto ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <Modal
            message={"사진을 삭제하시겠습니까?"}
            openCloseModalHandler={openCloseModalHandler}
          ></Modal>
        </ModalContainer>
      ) : null}
    </MyPageContainer>
  );
}

export default MyPage;
