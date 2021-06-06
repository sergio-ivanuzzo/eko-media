import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.palette.gray.silver};
    height: 100px;
`;
