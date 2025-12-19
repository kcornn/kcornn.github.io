import styled from "@emotion/styled";

const ActionBtn = styled.button`
  background: transparent;
  color: var(--text);
  border: 1px solid transparent;
  padding: 8px;
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition:
    color 200ms ease,
    border-color 200ms ease,
    background-color 200ms ease;
  &:hover {
    border-color: var(--accent);
  }
  svg {
    font-size: 24px;
  }
`;

export default ActionBtn;
