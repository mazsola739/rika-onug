import styled from '@emotion/styled'
import { StyledRoleCardProps } from './RoleCard.types'

export const StyledRoleCard = styled.div<StyledRoleCardProps>`
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};
  border: ${({ isSelected }) => (isSelected ? '1px solid yellow' : '1px solid transparent')};
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  width: 100px;
  transition: 0.75s;
`

export const RoleImage = styled.img<{ isSelected?: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')};
  transition: 0.75s;
  width: 100px;
  z-index: 1;

  filter: ${({ isSelected }) => (isSelected ? 'drop-shadow(8px 5px 5px black);' : '')};

  &:hover {
    transition: 0.75s;
    transform: scale(1.1);
    opacity: 1;

    + span {
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      text-shadow: 2px 2px 2px black;
    }
  }
`

export const RoleCardName = styled.span<StyledRoleCardProps>`
  color: ${({ isSelected }) => (isSelected ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0.4)')};
  text-shadow: ${({ isSelected }) => (isSelected ? '2px 2px 2px black' : '')};
  font-size: 12px;
  font-weight: 500;
  left: 50%;
  min-width: 100%;
  transition: 0.75s;
  padding: 0 5px;
  position: absolute;
  text-align: center;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
