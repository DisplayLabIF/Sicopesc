import styled, { keyframes } from "styled-components";
import { OpacityAnimation, OpacityHideAnimation } from "../../../styles/animations";

const MoveShow = keyframes`
  from{
    transform: translatex(-300px)
  }to{
    transform: translatex(0);
  }

`;

const MoveHide = keyframes`
  from{
    transform: translatex(0)
  }to{
    transform: translatex(-300px);
  }
`;

export const Container = styled.div`
  display: ${props => props.show ? 'flex'  : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  animation: ${props => props.hideAnimation ? OpacityHideAnimation  : OpacityAnimation} 150ms;
  animation-fill-mode: backwards;
  animation-delay: ${props => props.hideAnimation ? '200ms' : '0ms'};
  .sidebar{
    box-sizing: border-box;
    min-height: 100%;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    animation: ${props => props.hideAnimation ? MoveHide : MoveShow} 150ms;
    animation-fill-mode: backwards;
    animation-delay: ${props => props.hideAnimation ? '0ms' : '150ms'};
    z-index: 2;
    position: relative;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
    }
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0 !important;
      align-items: center;
    }
    li {
      display: flex;
      padding: 7px;
      font-size: 12pt;
      width: 100%;
      align-items: center;
      justify-content: center;
      a {
        width: 100%;
        color: ${props => props.theme.colors.text};
        text-decoration: none;
      }
      .showSidebar {
        animation-name: moveShow;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
      }
      .hideSidebar {
        animation-name: moveHide;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
      }
    }
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.2)" : "tranparent"};

  span, a {
    color: ${(props) => props.active && "#fff"};
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;

export const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
