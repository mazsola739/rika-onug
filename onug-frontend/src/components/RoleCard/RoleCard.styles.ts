import styled from '@emotion/styled'
import { StyledRoleCardProps } from './RoleCard.types'

export const StyledRoleCard = styled.div<StyledRoleCardProps>`
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};
  border: ${({ isSelected }) => (isSelected ? '0.0625rem solid yellow' : '0.0625rem solid transparent')};
  display: flex;
  flex-direction: column;
  height: 6.25rem;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  width: 6.25rem;
  transition: 0.75s;
`

export const RoleImage = styled.img<{ isSelected?: boolean }>`
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')};
  transition: 0.75s;
  width: 6.25rem;
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
  left: 50%;
  transition: 0.75s;
  padding: 0 5px;
  position: absolute;
  text-align: center;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

export const WakeUp = styled.span<StyledRoleCardProps>`
  text-shadow: ${({ isSelected }) => (isSelected ? '2px 2px 2px black' : '')};
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
  font-size: 14px;
  top: 10px;
  left: 85px;
  transition: 0.75s;
  padding: 2px;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
`
