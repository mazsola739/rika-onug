import styled from '@emotion/styled'
const backgroundImage = '/assets/backgrounds/background_new.png'

export const StyledApp = styled.div`
  background: transparent url(${backgroundImage}) center center/cover no-repeat;
  background-size: 100% 100%;
  text-align: center;
  height: 100vh;
`
export const ConnectionStatusIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
`
