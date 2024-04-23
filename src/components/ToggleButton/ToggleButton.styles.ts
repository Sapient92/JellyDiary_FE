import styled from "styled-components";

export const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 29px;
    border-radius: 20px;
    background-color: #7d8fb3;
  }
  > .toggle--checked {
    background-color: #3361ff;
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
  }
  > .toggle--checked {
    left: 23px;
    transition: 0.5s;
  }
`;
