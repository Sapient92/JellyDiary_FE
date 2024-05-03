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
          onClick={() => handleWeatherChange("SUNNY")}
        />
        <PartlySunnyBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("PARTLY_SUNNY")}
        />
        <CloudyBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("CLOUDY")}
        />
        <RainBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("RAINNING")}
        />
        <SnowBtn
          weather={diary.weather}
          onClick={() => handleWeatherChange("SNOWING")}
        />
      </WritePageWeatherContainer>
    </WritePageHeaderContainer>
  );
};

export default WritePageHeader;
