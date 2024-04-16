import { FC } from "react";
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

interface WritePageHeaderProps {
  title: string;
}

const WritePageHeader: FC<WritePageHeaderProps> = ({ title }) => {
  const { diary, changeValue } = useDiaryStore((state) => state);

  const handleWeatherChange = (state: string) => {
    if (diary.weather === state) {
      return;
    }
    changeValue({ weather: state });
  };

  return (
    <WritePageHeaderContainer>
      <WritePageTitle>
        <span>{"<"}</span>
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
