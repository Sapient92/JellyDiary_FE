import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePostInputStore } from "../../../store/postStore/postStore.ts";
import { WriteInputType } from "../../../types/postType.ts";

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
  data?: WriteInputType;
}

const WritePageHeader: FC<WritePageHeaderProps> = ({ title, data }) => {
  const { post, changeValue } = usePostInputStore((state) => state);
  const { weather } = data || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (weather) {
      changeValue({ weather });
    }
  }, []);

  const handleWeatherChange = (state: string) => {
    if (post.weather === state) {
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
        <p>📝 </p>
        <p>{title}</p>
      </WritePageTitle>
      <WritePageWeatherContainer>
        <SunnyBtn
          weather={post.weather}
          onClick={() => handleWeatherChange("SUNNY")}
        />
        <PartlySunnyBtn
          weather={post.weather}
          onClick={() => handleWeatherChange("PARTLY_SUNNY")}
        />
        <CloudyBtn
          weather={post.weather}
          onClick={() => handleWeatherChange("CLOUDY")}
        />
        <RainBtn
          weather={post.weather}
          onClick={() => handleWeatherChange("RAINNING")}
        />
        <SnowBtn
          weather={post.weather}
          onClick={() => handleWeatherChange("SNOWING")}
        />
      </WritePageWeatherContainer>
    </WritePageHeaderContainer>
  );
};

export default WritePageHeader;
