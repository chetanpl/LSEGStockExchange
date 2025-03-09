import styled from "styled-components";
const bgColorPrimary = "#041ffd";
const borderColor = "#78bfff";
const bgColorHighlight = "#b7cdff";
const textColorPrimary = "#fff";
  
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background: ${bgColorPrimary};
  margin-bottom: 1rem;
  position: relative;
`;

export const  Logo = styled.img`
  left: 10px;
  height: 65px;
  border: 0;
    background-size: cover;
    padding: 0;
    margin: 0;
`;

export const  Container = styled.div`
  padding: 1.5rem;
  width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  margin: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
    border: 10px solid ${borderColor};
`;

export const  Title = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
`;
export const  ItemsTitle = styled.p`
float:left;
background-color:${bgColorHighlight}
`;
export const  Result = styled.p`
background-color:${bgColorHighlight}
`;

export const  Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  background: ${(props) => props.bg || "#e5e7eb"};
  color: ${(props) => (props.bg === "#2563eb" || props.bg === "#ef4444" ? "white" : "black")};
  &:hover {
    opacity: 0.8;
  }
`;
export const  ItemSelectionContainer = styled.div`
  width: 50%;
`;
export const  ResultContainer = styled.div`
  width: 36%;
  background-color: ${textColorPrimary}
  border-left: 2px solid blue;
  text:center;
`;
