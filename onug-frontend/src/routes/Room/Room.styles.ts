import styled from '@emotion/styled'
import { LogoProps } from './Room.types'

export const StyledRoom = styled.div`
  min-width: 100%;
  bottom: 90px;
  display: flex;
  flex-direction: column;
`

export const Logo = styled.div<LogoProps>`
  color: yellow;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 24px;
  margin: 10px 0 10px 10px;
  width: 200px;
  height: 140px;
  display: flex;
  text-align: center;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  align-items: center;
  filter: drop-shadow(5px 5px 5px black);
  background: ${({ backgroundImage }) => `url(/assets/rooms/${backgroundImage}.png)`} center center/contain no-repeat;
`

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 10px;
  gap: 10px;
`

export const StyledInfo  = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;
  gap: 10px;
`

export const RuleInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const RuleImage = styled.img`
  border: 1px solid white;
  border-radius: 50%;
  width: 80px;
`

export const RuleInfoDescription = styled.p`
  color: yellow;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 20px;
  margin: 0;
  padding: 5px;
  text-align: left;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
`

export const User = styled.div`
  width: 200px;
  height: 140px;
  display: flex;
  text-align: center;
  margin: 10px 10px 10px 0;
`

export const RoomCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  & > section:last-child {
    min-height: 100%;
  }
`

export const Users = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  text-align: center;
  margin-left: 10px;
`