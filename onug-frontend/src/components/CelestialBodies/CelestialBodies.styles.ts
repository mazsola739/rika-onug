import styled from '@emotion/styled'

export const StyledCelestialBodies = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
`

//DAY
export const Sun = styled.img`
  border-radius: 50%;
  box-shadow:
    0 0 3.75rem 0.625rem #fff,
    0 0 6.25rem 1.25rem red,
    0 0 8.75rem 1.875rem gold;
  width: 2.1875rem;
  height: 2.1875rem;
  position: absolute;
  top: 15%;
  opacity: 1;
`

export const MorningSky = styled.span`
  position: absolute;
  opacity: 1;
  bottom: 45%;
  left: 60%;
`

//NIGHT
export const Moon = styled.img`
  border-radius: 50%;
  box-shadow:
    0 0 3.75rem 0.625rem #000,
    0 0 6.25rem 1.25rem blue,
    0 0 8.75rem 1.875rem silver;
  width: 2.1875rem;
  height: 2.1875rem;
  position: absolute;
  top: 15%;
  opacity: 0;
`

export const EveningSky = styled.span`
  position: absolute;
  opacity: 0;
  bottom: 45%;
  left: 60%;
`
