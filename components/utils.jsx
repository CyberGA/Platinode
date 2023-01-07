import styled from "styled-components";

export const UButton = styled.button`
  width: ${({ width }) => width ?? "fit-content"};
  background: ${({ bg }) => bg };
  outline: none;
  height: ${({ fit }) => (fit ? "fit-content" : "42px")};
  ${({ height }) => height && `height: ${height}`};
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    padding-inline: ${({ padX }) => padX ?? "87.5px"};
    font-size: ${({ mSize }) => mSize ?? "14px"};
  }
  @media (max-width: 425px) {
    font-size: 14px;
  }
`;