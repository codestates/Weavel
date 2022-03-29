import react, { useState, useEffect } from "react";
import { areaData } from "../../components/PhotoUploadModal/SearchData";
import axios from "axios";
import {
  PhotoUploadContainer,
  PhotoUploadFileContainer,
  InputContainer,
  PhotoUploadInput,
  WeatherButton,
  BottomButtonContainer,
  UploadButton,
  CancelButton,
} from "./PhotoUploadModalNew.style";

function PhotoUploadModalNew({
  uploadHandler,
  token,
  setAllPhotoInfo,
  allPhotoInfo,
}) {
  const weatherArr = ["맑음", "구름", "비", "눈"];
  const [isClick, setIsClick] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const [file, setFile] = useState([]);
  const [date, setDate] = useState("");
  const [area, setArea] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [isFilled, setIsFilled] = useState(true);
  const [dataResult, setDataResult] = useState([]);

  const inputHandler = (e) => {
    if (e.target.name === "file" && e.target.files[0]) {
      e.target.files[0].preview = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    } else if (e.target.name === "area") {
      setArea(e.target.value);
    } else if (e.target.name === "comment") {
      setComment(e.target.value);
    } else if (typeof Number(e.target.name) === "number") {
      const defaultValue = {
        0: false,
        1: false,
        2: false,
        3: false,
      };
      defaultValue[e.target.name] = true;
      setIsClick(defaultValue);
      setWeather(e.target.name);
    }
  };

  useEffect(() => {
    if (file.preview && date && area && comment && weather) {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [file, date, area, comment, weather]);

  useEffect(() => {
    if (area.length > 0) {
      setDataResult(
        areaData.filter((data) => {
          if (data === area) {
            return false;
          }
          return data.includes(area);
        })
      );
    }
  }, [area]);

  const searchDataHandler = (e) => {
    setArea(e.target.innerText);
  };

  const formData = new FormData();
  formData.append("image", file);

  // 사진 업로드
  const handlePhotoUpload = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        handlePhotoInfoUpload(e, res.data.data);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  // 사진 정보 저장
  const handlePhotoInfoUpload = (e, photo) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/photo/info`,
        {
          id: photo.id,
          filename: photo.filename,
          date,
          area,
          comment,
          weather,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        uploadHandler(e);

        setAllPhotoInfo([
          {
            id: photo.id,
            image: photo.photoPath,
            filename: photo.filename,
            date,
            area,
            comment,
            weather,
          },
          ...allPhotoInfo,
        ]);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  return (
    <PhotoUploadContainer onClick={(e) => e.stopPropagation()}>
      <PhotoUploadFileContainer>
        <div id="img_container">
          {file.preview ? (
            <img id="preview_img" src={file.preview} alt="preview" />
          ) : (
            <img src="./images/upload.svg" alt="upload" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => inputHandler(e)}
          name="file"
        />
      </PhotoUploadFileContainer>
      <label>날짜</label>
      <InputContainer>
        <PhotoUploadInput
          type="date"
          name="date"
          onChange={(e) => inputHandler(e)}
        />
      </InputContainer>
      <label>지역</label>
      <InputContainer>
        <PhotoUploadInput
          placeholder="지역을 검색해 보세요"
          name="area"
          onChange={(e) => inputHandler(e)}
          value={area}
        />

        {dataResult[0] ? (
          <ul>
            {dataResult.map((data, idx) => {
              if (idx < 5) {
                return (
                  <li onClick={(e) => searchDataHandler(e)} key={idx}>
                    {data}
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          ""
        )}
      </InputContainer>
      <label>날씨</label>
      <InputContainer row={"row"}>
        {weatherArr.map((weather, idx) => {
          return (
            <WeatherButton
              key={idx}
              name={idx}
              onClick={(e) => inputHandler(e)}
              isClick={isClick[idx]}
            >
              {weather}
            </WeatherButton>
          );
        })}
      </InputContainer>
      <label>코멘트</label>
      <InputContainer>
        <PhotoUploadInput
          placeholder="25글자 이내로 남기고 싶은 코멘트를 적어주세요"
          maxLength="25"
          name="comment"
          onChange={(e) => inputHandler(e)}
        />
      </InputContainer>
      <BottomButtonContainer>
        <UploadButton
          disabled={isFilled}
          isFilled={isFilled}
          onClick={(e) => handlePhotoUpload(e)}
        >
          업로드
        </UploadButton>
        <CancelButton onClick={uploadHandler}>취소</CancelButton>
      </BottomButtonContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoUploadModalNew;
