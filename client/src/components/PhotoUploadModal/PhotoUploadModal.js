// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ConfirmButton, CancelButton, ButtonContainer } from "../Modal/Modal.style";
// import { InputLabel, EmailInput } from "../../pages/LoginPage/LoginPage.style";
// import { area } from "./SearchData";

// import AutoComplete from "./AutoComplete";
// import { Sunny, Cloud, Rain, Snow } from "../../pages/SignupPage/SignupPage.style";

// import { WeatherBox } from "../EditUserInfoModal/EditUserInfoModal.style";
// import { PhotoUploadContainer, DateInput } from "./PhotoUploadModal.style";
// import { EditInfoContainer } from "../EditUserInfoModal/EditUserInfoModal.style";
// import EditUpload from "../PhotoUpload/EditUpload";

// function PhotoUploadModal({
//   openCloseModalHandler,
//   loginUserInfo,
//   token,
//   allPhotoInfo,
//   isPhotoWeather,
//   photoIdx,
//   OnlyOneWeatherHandle,
// }) {
// 수정작업을 위한 단계
//   useEffect(() => {
//     const getAllPhotosInfo = (token) => {
//       axios({
//         method: "get",
//         url: "http://localhost:4000/photo/info",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }).then((res) => {
//         console.log(allPhotoInfo);
//         console.log("사진정보받기~~~~~2", res.data);
//       });
//     };
//   }, []);
//   console.log("모달달", allPhotoInfo, token);

//   const [photoInfo, setphotoInfo] = useState({
//     weather: allPhotoInfo[photoIdx].weather,
//     date: allPhotoInfo[photoIdx].date,
//     area: allPhotoInfo[photoIdx].area,
//     comment: allPhotoInfo[photoIdx].comment,
//   });

//   function commentHandler(e) {
//     const newphotoInfo = { ...photoInfo };
//     if (e.target.name === "comment") {
//       newphotoInfo.comment = e.target.value;
//       console.log(e.target.value);
//     }
//     if (e.target.name === "date") {
//       newphotoInfo.date = e.target.value;
//     }
//     if (e.target.name === "area") {
//       newphotoInfo.area = e.target.value;
//     }
//     newphotoInfo.weather = isPhotoWeather.num;
//     setphotoInfo(newphotoInfo);
//   }

//   //

//   const [editFileInfo, seteditFileInfo] = useState({
//     userId: loginUserInfo.id,
//     newpath: null,
//     newfilename: null,
//   });

//   const formData = new FormData();
//   // formData.append("userId", loginUserInfo.id);
//   formData.append("image", editFileInfo.newpath);
//   // formData.append("newfilename", allPhotoInfo[photoIdx]);
//   // formData.append("id", allPhotoInfo[photoIdx].id);

//   // 사진 수정
//   const handlePhotoEdit = (e) => {
//     axios
//       .put(`http://localhost:4000/photo/id=?${allPhotoInfo[photoIdx].id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         handlePhotoInfoEdit(e, res.data.data);
//         console.log("ss");
//       })
//       .catch((err) => {
//         console.error(`signin error: ${err.message}`);
//       });
//   };

//   const setFileEditHandle = (file) => {
//     seteditFileInfo(file);
//   };

//   const handlePhotoInfoEdit = (e) => {
//     axios
//       .put(
//         "http://localhost:4000/photo/info",

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//           photo: {
//             id: allPhotoInfo[photoIdx].id,
//             filename: editFileInfo.newpath.path,
//             ...photoInfo,
//           },
//         },
//         { withCredentials: true },
//       )
//       .then((res) => {
//         console.log(res);
//         openCloseModalHandler(e);
//       })
//       .catch((err) => {
//         console.error(`signin error: ${err.message}`);
//       });
//   };

//   return (
//     <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
//       <EditUpload
//         allPhotoInfo={allPhotoInfo}
//         photoIdx={photoIdx}
//         editFileInfo={editFileInfo}
//         setFileEditHandle={setFileEditHandle}
//         token={token}
//         loginUserInfo={loginUserInfo}
//       />
//       <EditInfoContainer margin={"270px"}>
//         <InputLabel>날짜</InputLabel>
//         <DateInput
//           name="date"
//           onChange={(e) => commentHandler(e)}
//           placeholder="YYYY.MM.DD 형식으로 입력해주세요"
//           value={photoInfo.date}
//           maxLength="10"
//         />
//         <InputLabel>지역</InputLabel>
//         <AutoComplete
//           photoIdx={photoIdx}
//           allPhotoInfo={allPhotoInfo}
//           photoInfo={photoInfo}
//           name="area"
//           suggestions={area}
//           commentHandler={(e) => commentHandler(e)}
//         />
//         <InputLabel>날씨</InputLabel>
//         <WeatherBox margin={"0 10px 15px 34px"}>
//           <Sunny
//             isSunnyPhoto={isPhotoWeather.sunny}
//             id="1"
//             onClick={(e) => OnlyOneWeatherHandle(e)}
//           >
//             맑음
//           </Sunny>
//           <Cloud
//             isCloudPhoto={isPhotoWeather.cloud}
//             id="2"
//             onClick={(e) => OnlyOneWeatherHandle(e)}
//           >
//             구름
//           </Cloud>
//           <Rain isRainPhoto={isPhotoWeather.rain} id="3" onClick={(e) => OnlyOneWeatherHandle(e)}>
//             비
//           </Rain>
//           <Snow isSnowPhoto={isPhotoWeather.snow} id="4" onClick={(e) => OnlyOneWeatherHandle(e)}>
//             눈
//           </Snow>
//         </WeatherBox>
//         <InputLabel>코멘트</InputLabel>
//         <EmailInput
//           name="comment"
//           onChange={(e) => commentHandler(e)}
//           placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
//           maxLength="25"
//           value={photoInfo.comment}
//         />
//         <span>
//           <ButtonContainer>
//             <ConfirmButton onClick={(e) => handlePhotoInfoEdit(e)}>업로드</ConfirmButton>
//             <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
//           </ButtonContainer>
//         </span>
//       </EditInfoContainer>
//     </PhotoUploadContainer>
//   );
// }

// export default PhotoUploadModal;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ConfirmButton, CancelButton, ButtonContainer } from "../Modal/Modal.style";
// import { InputLabel, EmailInput } from "../../pages/LoginPage/LoginPage.style";
// import { area } from "./SearchData";

// import AutoComplete from "./AutoComplete";
// import { Sunny, Cloud, Rain, Snow } from "../../pages/SignupPage/SignupPage.style";

// import { WeatherBox } from "../EditUserInfoModal/EditUserInfoModal.style";
// import { PhotoUploadContainer, DateInput } from "./PhotoUploadModal.style";
// import { EditInfoContainer } from "../EditUserInfoModal/EditUserInfoModal.style";
// import EditUpload from "../PhotoUpload/EditUpload";

// function PhotoUploadModal({
//   token,
//   loginUserInfo,
//   isShowWeatherInfo,
//   openCloseModalHandler,
//   isPhotoWeather,
//   OnlyOneWeatherHandle,
//   photoIdx,
//   allPhotoInfo,
// }) {
//   console.log(token);
//   const [photoInfo, setphotoInfo] = useState({
//     weather: [],
//     date: null,
//     area: null,
//     comment: null,
//   });

//   useEffect(() => {
//     const getAllPhotosInfo = (token) => {
//       axios({
//         method: "get",
//         url: "http://localhost:4000/photo/info",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }).then((res) => {
//         console.log(allPhotoInfo);
//         console.log("사진정보받기~~~~~2", res.data);
//       });
//     };
//   }, []);
//   console.log("모달달", allPhotoInfo, token);

//   const [photoInfo, setphotoInfo] = useState({
//     weather: allPhotoInfo[photoIdx].weather,
//     date: allPhotoInfo[photoIdx].date,
//     area: allPhotoInfo[photoIdx].area,
//     comment: allPhotoInfo[photoIdx].comment,
//   });

//   function commentHandler(e) {
//     const newphotoInfo = { ...photoInfo };
//     if (e.target.name === "comment") {
//       newphotoInfo.comment = e.target.value;
//       console.log(e.target.value);
//     }
//     if (e.target.name === "date") {
//       newphotoInfo.date = e.target.value;
//     }
//     if (e.target.name === "area") {
//       newphotoInfo.area = e.target.value;
//     }
//     newphotoInfo.weather = isPhotoWeather.num;
//     setphotoInfo(newphotoInfo);
//   }

//   //

//   const [editFileInfo, seteditFileInfo] = useState({
//     userId: loginUserInfo.id,
//     newpath: null,
//     newfilename: null,
//   });
//   function commentHandler(e) {
//     const newphotoInfo = { ...photoInfo };
//     if (e.target.name === "comment") {
//       newphotoInfo.comment = e.target.value;
//     }
//     if (e.target.name === "date") {
//       newphotoInfo.date = e.target.value;
//     }
//     if (e.target.name === "area") {
//       newphotoInfo.area = e.target.value;
//     }
//     newphotoInfo.weather = isPhotoWeather.num;
//     setphotoInfo(newphotoInfo);
//     console.log(newphotoInfo);
//     console.log("!!!!", fileInfo.image);
//   }

//   const [fileInfo, setFileInfo] = useState({
//     userId: loginUserInfo.id,
//     image: null,
//     filename: null,
//   });

//   const formData = new FormData();

//   // formData.append("userId", loginUserInfo.id);
//   formData.append("image", fileInfo.image);

//   // 사진 업로드
//   const handlePhotoUpload = (e) => {
//     console.log(e);
//     axios
//       .post(
//         "http://localhost:4000/photo/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         },
//         { withCredentials: true },
//       )
//       .then((res) => {
//         console.log("데이터 콘솔로그", res.data);
//         console.log(res.data.message);
//         handlePhotoInfoUpload(e, res.data.data);
//       })
//       .catch((err) => {
//         console.error(`signin error: ${err.message}`);
//       });
//   };

//   const setFileHandle = (file) => {
//     setFileInfo(file);
//   };

//   const handlePhotoInfoUpload = (e, photo) => {
//     axios
//       .post(
//         "http://localhost:4000/photo/info",
//         {
//           id: photo.id,
//           filename: photo.filename,
//           ...photoInfo,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//         { withCredentials: true },
//       )
//       .then((res) => {
//         console.log(res);
//         openCloseModalHandler(e);
//       })
//       .catch((err) => {
//         console.error(`signin error: ${err.message}`);
//       });
//   };

//   return (
//     <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
//       <EditUpload
//         allPhotoInfo={allPhotoInfo}
//         photoIdx={photoIdx}
//         editFileInfo={editFileInfo}
//         setFileEditHandle={setFileEditHandle}
//         token={token}
//         loginUserInfo={loginUserInfo}
//       />
//       <EditInfoContainer margin={"270px"}>
//         <InputLabel>날짜</InputLabel>
//         <EmailInput
//           name="date"
//           onChange={(e) => commentHandler(e)}
//           placeholder="YYYY.MM.DD 형식으로 입력해주세요"
//           maxLength="10"
//         />
//         <InputLabel>지역</InputLabel>
//         <AutoComplete
//           photoInfo={photoInfo}
//           name="area"
//           suggestions={area}
//           commentHandler={(e) => commentHandler(e)}
//         />
//         <InputLabel>날씨</InputLabel>
//         <WeatherBox margin={"0 10px 15px 34px"}>
//           <Sunny
//             isSunnyPhoto={isPhotoWeather.sunny}
//             id="1"
//             onClick={(e) => OnlyOneWeatherHandle(e)}
//           >
//             맑음
//           </Sunny>
//           <Cloud
//             isCloudPhoto={isPhotoWeather.cloud}
//             id="2"
//             onClick={(e) => OnlyOneWeatherHandle(e)}
//           >
//             구름
//           </Cloud>
//           <Rain isRainPhoto={isPhotoWeather.rain} id="3" onClick={(e) => OnlyOneWeatherHandle(e)}>
//             비
//           </Rain>
//           <Snow isSnowPhoto={isPhotoWeather.snow} id="4" onClick={(e) => OnlyOneWeatherHandle(e)}>
//             눈
//           </Snow>
//         </WeatherBox>
//         <InputLabel>코멘트</InputLabel>
//         <EmailInput
//           name="comment"
//           onChange={(e) => commentHandler(e)}
//           placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
//           maxLength="25"
//         />
//         <span>
//           <ButtonContainer>
//             <ConfirmButton onClick={(e) => handlePhotoUpload(e)}>업로드</ConfirmButton>
//             <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
//           </ButtonContainer>
//         </span>
//       </EditInfoContainer>
//     </PhotoUploadContainer>
//   );
// }

// export default PhotoUploadModal;

import React, { useEffect, useState } from "react";
import { ConfirmButton, CancelButton, ButtonContainer } from "../Modal/Modal.style";
import axios from "axios";
import { InputLabel, EmailInput } from "../../pages/LoginPage/LoginPage.style";
import { area } from "./SearchData";
import AutoComplete from "./AutoComplete";
import { Sunny, Cloud, Rain, Snow } from "../../pages/SignupPage/SignupPage.style";

import { WeatherBox } from "../EditUserInfoModal/EditUserInfoModal.style";
import { PhotoUploadContainer } from "./PhotoUploadModal.style";
import { EditInfoContainer } from "../EditUserInfoModal/EditUserInfoModal.style";
import EditUploadCopy from "../PhotoUpload/EditUploadCopy";

function PhotoUploadModal({
  openCloseModalHandler,
  loginUserInfo,
  token,
  isPhotoWeather,
  OnlyOneWeatherHandle,
  photoIdx,
  allPhotoInfo,
  setPhotoIdx,
}) {
  const [photoInfo, setphotoInfo] = useState({
    weather: [],
    date: null,
    area: null,
    comment: null,
  });

  const [isnowPhotoWeather, setIsnowPhotoWeather] = useState({
    sunny: false,
    cloud: false,
    rain: false,
    snow: false,
    num: null,
  });
  useEffect(() => {
    const showWeather = { ...isnowPhotoWeather };
    if (isPhotoWeather === "1") {
      showWeather.sunny = true;
    } else if (isPhotoWeather === "2") {
      showWeather.cloud = true;
    } else if (isPhotoWeather === "3") {
      showWeather.rain = true;
    } else if (isPhotoWeather === "4") {
      showWeather.snow = true;
    }
    setIsnowPhotoWeather(showWeather);
  }, []);
  function weatherButtonHandler(e) {
    const photoweather = {
      sunny: false,
      cloud: false,
      rain: false,
      snow: false,
      num: null,
    };
    if (e.target.id === "1") {
      photoweather.sunny = true;
      photoweather.num = "1";
    } else if (e.target.id === "2") {
      photoweather.cloud = true;
      photoweather.num = "2";
    } else if (e.target.id === "3") {
      photoweather.rain = true;
      photoweather.num = "3";
    } else if (e.target.id === "4") {
      photoweather.snow = true;
      photoweather.num = "4";
    }
    setIsnowPhotoWeather({ ...photoweather });
  }
  function commentHandler(e) {
    const newphotoInfo = { ...photoInfo };
    if (e.target.name === "comment") {
      allPhotoInfo[photoIdx].comment = e.target.value;
      newphotoInfo.comment = e.target.value;
    }
    if (e.target.name === "date") {
      allPhotoInfo[photoIdx].date = e.target.value;
      newphotoInfo.date = e.target.value;
    }
    if (e.target.name === "area") {
      newphotoInfo.area = e.target.value;
    }
    newphotoInfo.weather = isnowPhotoWeather.num;
    setphotoInfo(newphotoInfo);
    // if (isPhotoWeather.sunny === true) {
    //   newphotoInfo.weather = "1";
    // } else if (isPhotoWeather.sunny === true) {
    //   newphotoInfo.weather = "2";
    // } else if (isPhotoWeather.sunny === true) {
    //   newphotoInfo.weather = "3";
    // } else if (isPhotoWeather.sunny === true) {
    //   newphotoInfo.weather = "4";
    // }
    // OnlyOneWeatherHandle(e);
    setphotoInfo(newphotoInfo);
  }

  const [fileInfo, setFileInfo] = useState({
    userId: loginUserInfo.id,
    image: null,
    filename: null,
  });

  const formData = new FormData();

  // formData.append("userId", loginUserInfo.id);
  formData.append("image", fileInfo.image);

  // 사진 업로드
  const handlePhotoUpload = (e) => {
    axios
      .put(
        `http://localhost:4000/photo?id=${photoIdx}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true },
      )
      .then((res) => {
        handlePhotoInfoUpload(e, allPhotoInfo[photoIdx], photoIdx);
        console.log(res.data.date);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  const setFileHandle = (file) => {
    setFileInfo(file);
  };

  const handlePhotoInfoUpload = (e, photo, photoIdx) => {
    axios
      .put(
        "http://localhost:4000/photo/info",
        {
          id: photoIdx,
          filename: allPhotoInfo[photoIdx].filename,
          ...photoInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        openCloseModalHandler(e);
      })
      .catch((err) => {
        console.error(`ssadsadin error: ${err.message}`);
      });
  };

  return (
    <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
      <EditUploadCopy
        allPhotoInfo={allPhotoInfo}
        photoIdx={photoIdx}
        token={token}
        loginUserInfo={loginUserInfo}
        fileInfo={fileInfo}
        setFileHandle={setFileHandle}
        setPhotoIdx={setPhotoIdx}
      />
      <EditInfoContainer margin={"270px"}>
        <InputLabel>날짜</InputLabel>
        <EmailInput
          value={allPhotoInfo[photoIdx].date}
          name="date"
          onChange={(e) => commentHandler(e)}
          placeholder="YYYY.MM.DD 형식으로 입력해주세요"
          maxLength="10"
        />
        <InputLabel>지역</InputLabel>
        <AutoComplete
          photoInfo={photoInfo}
          name="area"
          suggestions={area}
          commentHandler={(e) => commentHandler(e)}
        />
        <InputLabel>날씨</InputLabel>
        <WeatherBox margin={"0 10px 15px 34px"}>
          <Sunny
            // allPhotoInfo[photoIdx].weather[0] === "1" ? true : false
            isSunnyPhoto={isnowPhotoWeather.sunny}
            id="1"
            onClick={(e) => weatherButtonHandler(e)}
          >
            맑음
          </Sunny>
          <Cloud
            isCloudPhoto={isnowPhotoWeather.cloud}
            id="2"
            onClick={(e) => weatherButtonHandler(e)}
          >
            구름
          </Cloud>
          <Rain
            isRainPhoto={isnowPhotoWeather.rain}
            id={"3"}
            onClick={(e) => weatherButtonHandler(e)}
          >
            비
          </Rain>
          <Snow
            isSnowPhoto={isnowPhotoWeather.snow}
            id={"4"}
            onClick={(e) => weatherButtonHandler(e)}
          >
            눈
          </Snow>
        </WeatherBox>
        <InputLabel>코멘트</InputLabel>
        <EmailInput
          value={allPhotoInfo[photoIdx].comment}
          name="comment"
          onChange={(e) => commentHandler(e)}
          placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
          maxLength="25"
        />
        <span>
          <ButtonContainer>
            <ConfirmButton onClick={(e) => handlePhotoUpload(e)}>업로드</ConfirmButton>
            <CancelButton onClick={openCloseModalHandler}>취소</CancelButton>
          </ButtonContainer>
        </span>
      </EditInfoContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoUploadModal;
