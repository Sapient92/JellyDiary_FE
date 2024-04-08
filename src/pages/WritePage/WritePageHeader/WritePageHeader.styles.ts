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
export const SunnyBtn = styled(MdOutlineWbSunny)<{ $sunny: boolean }>`
  color: ${(props) => (props.$sunny ? "#3EA9E5" : "#c4c4c4")};
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const CloudyBtn = styled(LuCloudy)<{ $cloudy: boolean }>`
  color: ${(props) => (props.$cloudy ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const PartlySunnyBtn = styled(IoPartlySunnyOutline)<{
  $partlySunny: boolean;
}>`
  color: ${(props) => (props.$partlySunny ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const RainBtn = styled(BsCloudRain)<{ $rain: boolean }>`
  color: ${(props) => (props.$rain ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
export const SnowBtn = styled(IoIosSnow)<{ $snow: boolean }>`
  color: ${(props) => (props.$snow ? "#3EA9E5" : "#c4c4c4")};
  margin-left: 20px;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;
