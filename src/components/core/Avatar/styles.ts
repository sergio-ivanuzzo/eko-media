import styled from "styled-components";

export const AvatarContainer = styled.div<IAvatarProps>`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  
  background: ${({ theme }) => theme.palette.gray.silver};
  
  > img {
    width: auto;
    height: 100%;
    margin-left: ${({ offset }) => `${offset}px`};
  }
`;
