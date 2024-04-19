import { FC, useEffect } from "react";
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
import { useDiaryStore } from "../../../store/writeStore/diaryStore.ts";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "../../../types/diaryType.ts";

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

  return (
    <WritePageHeaderContainer>
      <WritePageTitle>
        <span onClick={() => navigate(-1)}>{"<"}</span>
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
