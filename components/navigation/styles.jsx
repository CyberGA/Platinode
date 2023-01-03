import styled from "styled-components/";

export const Container = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    padding: 14px 32px;
    width: 100%;

    @media (max-width: 1000px) {
        padding-left: 40px;
        padding-right: 40px;
    }
`;

export const NavLink = styled.a`
    font-size: 18px;
    transition: all 350ms ease-out;
    pointer-events: ${({ disabled}) => (disabled ? "none" : "auto")};
    color: ${({active}) => active ? "rgb(138, 129, 248)" : "inherit"};
    font-weight: ${({active}) => active ? "bold" : "normal"};

    &:hover {
        color: rgb(138, 129, 248);
    }
`;