import styled, { keyframes } from "styled-components";

interface SpinnerBladeProps {
  idx: number;
  total: number;
}
const bladeFade = keyframes`
    0% {
        background: #888;
    }
    100%{
        background: transparent;
    }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 2rem;
`;

export const SpinnerBlade = styled.div<SpinnerBladeProps>`
  position: absolute;
  background: transparent;
  width: 1rem;
  height: 0.2rem;
  transform: rotate() (${(p) => `${p.idx * (360 / p.total)}deg`});
  transform-origin: 150% 50%;
  animation: ${bladeFade} 1s infinite linear;
  animation-delay: ${(p) => p.idx * (1 / p.total)}s;
`;
