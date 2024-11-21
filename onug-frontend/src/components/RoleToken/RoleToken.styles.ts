import styled from '@emotion/styled'

export const StyledRoleToken = styled.img<{
  bgImg: string
  isSelected: boolean
  size: number
}>`
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.8')};
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-size: cover;
  transition: 0.75s;
  width: ${({ size }) => size}px;
  z-index: 20;
  border-radius: 50%;
  border: 3px solid white;
  filter: drop-shadow(3px 3px 3px black);

  &:hover {
    transition: 0.75s;
    transform: scale(1.1);
    opacity: 1;
  }
`
