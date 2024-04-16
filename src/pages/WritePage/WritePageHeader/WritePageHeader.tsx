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
  const changeValue = useDiaryStore((state) => state.changeValue);
  const { weather } = useDiaryStore((state) => state.diary);

  console.log(weather);
  const handleWeatherChange = (state: string) => {
    if (weather === state) {
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
          weather={weather}
          onClick={() => handleWeatherChange("맑음")}
        />
        <PartlySunnyBtn
          weather={weather}
          onClick={() => handleWeatherChange("구름낀")}
        />
        <CloudyBtn
          weather={weather}
          onClick={() => handleWeatherChange("흐림")}
        />
        <RainBtn weather={weather} onClick={() => handleWeatherChange("비")} />
        <SnowBtn weather={weather} onClick={() => handleWeatherChange("눈")} />
      </WritePageWeatherContainer>
    </WritePageHeaderContainer>
  );
};

export default WritePageHeader;
