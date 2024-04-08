import { FC, useState } from "react";
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
}

const WritePageHeader: FC<WritePageHeaderProps> = ({ title }) => {
  const [wheather, setWheather] = useState({
    sunny: false,
    partlySunny: false,
    cloudy: false,
    rain: false,
    snow: false,
  });

  const handleWeatherChange = (weather: string) => {
    setWheather({
      sunny: false,
      partlySunny: false,
      cloudy: false,
      rain: false,
      snow: false,
      [weather]: true,
    });
  };

  return (
    <WritePageHeaderContainer>
      <WritePageTitle>
        <span>{"<"}</span>
        <p>📝 {title}</p>
      </WritePageTitle>
      <WritePageWeatherContainer>
        <SunnyBtn
          $sunny={wheather.sunny}
          onClick={() => handleWeatherChange("sunny")}
        />
        <PartlySunnyBtn
          $partlySunny={wheather.partlySunny}
          onClick={() => handleWeatherChange("partlySunny")}
        />
        <CloudyBtn
          $cloudy={wheather.cloudy}
          onClick={() => handleWeatherChange("cloudy")}
        />
        <RainBtn
          $rain={wheather.rain}
          onClick={() => handleWeatherChange("rain")}
        />
        <SnowBtn
          $snow={wheather.snow}
          onClick={() => handleWeatherChange("snow")}
        />
      </WritePageWeatherContainer>
    </WritePageHeaderContainer>
  );
};

export default WritePageHeader;
