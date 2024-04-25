import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import { DiaryType } from "../../../types/diaryType.ts";

import {
  CloudyBtn,
  PartlySunnyBtn,
  RainBtn,
  SnowBtn,
  SunnyBtn,
  WritePageHeaderContainer,
  WritePageTitle,
  WritePageWeatherContainer,
} from "./WritePageHeader.styles.ts";

interface WritePageHeaderProps {
  title: string;
  data?: DiaryType;
}

const WritePageHeader: FC<WritePageHeaderProps> = ({ title, data }) => {
  const { diary, changeValue } = useDiaryStore((state) => state);
  const { weather } = data || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (weather) {
      changeValue({ weather });
    }
  }, []);

  const handleWeatherChange = (state: string) => {
    if (diary.weather === state) {
      return;
    }
    changeValue({ weather: state });
  };

  const handleGoBackClick = () => {
    navigate(-1);
  };

  return (
    <WritePageHeaderContainer>
      <WritePageTitle>
        <span onClick={handleGoBackClick}>{"<"}</span>
        <p>📝 {title}</p>
      </WritePageTitle>
      <WritePageWeatherContainer>
        <SunnyBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("맑음")}
        />
        <PartlySunnyBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("구름낀")}
        />
        <CloudyBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("흐림")}
        />
        <RainBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("비")}
        />
        <SnowBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("눈")}
        />
      </WritePageWeatherContainer>
    </WritePageHeaderContainer>
  );
};

export default WritePageHeader;
