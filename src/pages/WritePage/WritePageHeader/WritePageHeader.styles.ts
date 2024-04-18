import styled from "styled-components";
import { LuCloudy } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { BsCloudRain } from "react-icons/bs";
import { IoIosSnow } from "react-icons/io";

export const WritePageHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 80px;
`;

export const WritePageTitle = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #e1d8d8;
    font-size: 30px;
    font-weight: bolder;

    &:hover {
      cursor: pointer;
      color: lightslategray;
    }
  }

  p {
    margin-left: 60px;
    color: black;
    font-weight: bold;
    cursor: default;
  }
`;

export const WritePageWeatherContainer = styled.div``;
export const SunnyBtn = styled(MdOutlineWbSunny)<{ weather: string }>`
  color: ${(props) => (props.weather === "맑음" ? "#3EA9E5" : "#c4c4c4")};
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const CloudyBtn = styled(LuCloudy)<{ weather: string }>`
  color: ${(props) => (props.weather === "흐림" ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const PartlySunnyBtn = styled(IoPartlySunnyOutline)<{
  weather: string;
}>`
  color: ${(props) => (props.weather === "구름낀" ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const RainBtn = styled(BsCloudRain)<{ weather: string }>`
  color: ${(props) => (props.weather === "비" ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const SnowBtn = styled(IoIosSnow)<{ weather: string }>`
  color: ${(props) => (props.weather === "눈" ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
