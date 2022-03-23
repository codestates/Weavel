import react, { useState, useEffect } from "react";
import { areaData } from "../../components/PhotoUploadModal/SearchData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  PhotoUploadContainer,
  PhotoUploadFileContainer,
  InputContainer,
  PhotoUploadInput,
  WeatherButton,
  BottomButtonContainer,
  UploadButton,
  CancelButton,
} from "../PhotoUploadModalNew/PhotoUploadModalNew.style";

function PhotoEditModalNew({
  photoEditHandler,
  isSelectInfo,
  setAllPhotoInfo,
  allPhotoInfo,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
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
  const [photoId, setPhotoId] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [isFilled, setIsFilled] = useState(true);
  const [dataResult, setDataResult] = useState([]);
  useEffect(() => {
    const selectedInfo = isSelectInfo[0];
    if (selectedInfo) {
      let comment = selectedInfo.comment;
      let area = selectedInfo.area;
      let weather = selectedInfo.weather;
      let date = selectedInfo.date;
      let file = {
        preview: `${process.env.REACT_APP_API_URL}/${selectedInfo.image}`,
        filename: selectedInfo.filename,
      };
      let photoId = selectedInfo.id;
      setComment(comment);
      setArea(area);
      setDate(date);
      const defaultValue = {
        0: false,
        1: false,
        2: false,
        3: false,
      };
      defaultValue[weather] = true;
      setIsClick(defaultValue);
      setWeather(weather);
      setFile(file);
      setPhotoId(photoId);
    }
  }, []);

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

  // 사진 수정
  const handlePhotoEdit = (e) => {
    if (formData) {
      for (let pair of formData.entries()) {
        //string
        //object
        if (typeof pair[1] === "string") {
          handlePhotoInfoEdit();
        } else if (typeof pair[1] === "object") {
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/photo?id=${photoId}`,
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
              handlePhotoInfoEdit(e, res.data.data);
            })
            .catch((err) => {
              console.error(`signin error: ${err.message}`);
            });
        }
      }
    }
  };

  // 사진 정보 수정
  const handlePhotoInfoEdit = (e, photo) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/photo/info`,
        {
          id: photoId,
          filename: file.filename,
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
        const filterPhoto = allPhotoInfo.filter((photo) => {
          return photo.id !== photoId;
        });
        setAllPhotoInfo([
          {
            id: photoId,
            image: file.preview.slice(20),
            filename: file.filename,
            date,
            area,
            comment,
            weather,
          },
          ...filterPhoto,
        ]);
        photoEditHandler();
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
            <img src={"./images/upload.svg"} alt="upload" />
          )}
        </div>
        <input type="file" onChange={(e) => inputHandler(e)} name="file" />
      </PhotoUploadFileContainer>
      <label>날짜</label>
      <InputContainer>
        <PhotoUploadInput
          type="date"
          name="date"
          onChange={(e) => inputHandler(e)}
          value={date}
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
          value={comment}
          onChange={(e) => inputHandler(e)}
        />
      </InputContainer>
      <BottomButtonContainer>
        <UploadButton
          disabled={isFilled}
          isFilled={isFilled}
          onClick={handlePhotoEdit}
        >
          수정
        </UploadButton>
        <CancelButton onClick={photoEditHandler}>취소</CancelButton>
      </BottomButtonContainer>
    </PhotoUploadContainer>
  );
}

export default PhotoEditModalNew;
