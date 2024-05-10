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
    background-color: #f5f5f5;

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
