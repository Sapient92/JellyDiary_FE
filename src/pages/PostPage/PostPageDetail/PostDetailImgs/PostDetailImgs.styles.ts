import styled from "styled-components";
import {
  PiCaretCircleLeftLight,
  PiCaretCircleRightLight,
} from "react-icons/pi";
import { PostImg } from "./index.tsx";

export const LeftClickButton = styled(PiCaretCircleLeftLight)`
  position: absolute;
  font-size: 36px;
  color: slategray;
  visibility: hidden;
`;

export const RightClickButton = styled(PiCaretCircleRightLight)`
  position: absolute;
  font-size: 36px;
  color: slategray;
  visibility: hidden;
  right: 0;
`;

export const PostDetailImgsContainer = styled.div<{
  $postImgs: PostImg[];
  $postIndex: number;
}>`
    display: flex;
    align-items: center;
    position: relative;
    background-color: #f0f0f0;
    height: 600px;

    &:hover {
        ${LeftClickButton} {
            visibility: ${({ $postImgs, $postIndex }) =>
              $postImgs.length === 1 || $postIndex === 0 ? "hidden" : "visible"}
        }

        ${RightClickButton} {
            visibility: ${({ $postImgs, $postIndex }) =>
              $postImgs.length === 1 || $postIndex === $postImgs.length - 1
                ? "hidden"
                : "visible"}
        }
`;

export const PostImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  img {
    max-height: 600px;
  }
`;

export const PostImgNavigatorContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PostImgNavigator = styled.div<{ $isView: boolean }>`
  margin: 0 2px 0 2px;
  width: 8px;
  height: 8px;
  background-color: ${(props) => (props.$isView ? "gray" : "white")};
  border-radius: 50%;
`;
