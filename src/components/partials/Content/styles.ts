import styled from "styled-components";

import Placeholder from "~/components/core/Placeholder";

export const ContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledPlaceholder = styled(Placeholder)`
  margin-top: 20px;
  font-size: 16px;
`;
