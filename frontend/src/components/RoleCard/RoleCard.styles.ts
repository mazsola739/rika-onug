import styled from '@emotion/styled'
import { RoleCardStylesProps } from './RoleCard.types'

export const StyledRoleCard = styled.div<RoleCardStylesProps>`
  /* Positioning */
  position: relative;

  /* Box Model */
  height: 6.25rem;
  width: 6.25rem;
  border: ${({ isSelected }) => (isSelected ? '0.0625rem solid yellow' : '0.0625rem solid transparent')};
  overflow: hidden;
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* Visuals */
  background-color: ${({ isSelected }) => (isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent')};
  transition: 0.75s;
`

export const RoleImage = styled.img<RoleCardStylesProps>`
  /* Positioning */
  z-index: 1;

  /* Box Model */
  width: 6.25rem;

  /* Visuals */
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.6')};
  filter: ${({ isSelected }) => (isSelected ? 'drop-shadow(8px 5px 5px black);' : '')};
  transition: 0.75s;

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

export const RoleCardName = styled.span<RoleCardStylesProps>`
  /* Typography */
  color: ${({ isSelected }) => (isSelected ? 'rgba(255,255,255, 1)' : 'rgba(255,255,255, 0.4)')};
  text-shadow: ${({ isSelected }) => (isSelected ? '2px 2px 2px black' : '')};
  font-size: 12px;
  text-align: center;

  /* Box Model */
  padding: 0 5px;

  /* Positioning */
  position: absolute;
  left: 50%;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 2;

  /* Visuals */
  transition: 0.75s;
`

export const WakeUp = styled.span<RoleCardStylesProps>`
  /* Typography */
  text-shadow: ${({ isSelected }) => (isSelected ? '2px 2px 2px black' : '')};
  font-size: 14px;

  /* Visuals */
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0')};
  transition: 0.75s;

  /* Box Model */
  padding: 2px;

  /* Positioning */
  position: absolute;
  top: 10px;
  left: 85px;
  transform: translate(-50%, -50%);
  z-index: 2;
`
