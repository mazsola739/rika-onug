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

  filter: ${({ isSelected }) => (isSelected ? 'drop-shadow(0.5rem 0.3125rem 0.3125rem black);' : '')};

  &:hover {
    transition: 0.75s;
    transform: scale(1.1);
    opacity: 1;

    + span {
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      text-shadow: 0.125rem 0.125rem 0.125rem black;
    }
  }
`

export const RoleCardName = styled.span<StyledRoleCardProps>`
  color: ${({ isSelected }) => (isSelected ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0.4)')};
  text-shadow: ${({ isSelected }) => (isSelected ? '0.125rem 0.125rem 0.125rem black' : '')};
  font-size: 0.75rem;
  left: 50%;
  transition: 0.75s;
  padding: 0 0.3125rem;
  position: absolute;
  text-align: center;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
