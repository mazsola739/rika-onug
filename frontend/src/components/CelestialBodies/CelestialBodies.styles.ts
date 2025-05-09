import styled from '@emotion/styled'

export const StyledCelestialBodies = styled.div`
  /* Positioning */
  position: relative;

  /* Box Model */
  height: 100%;
  width: 100%;

  /* Flexbox/Grid */
  display: flex;
  justify-content: center;
  align-items: center;
`

//DAY
export const Sun = styled.img`
  /* Positioning */
  position: absolute;
  top: 15%;

  /* Box Model */
  border-radius: 50%;
  width: 35px;
  height: 35px;

  /* Visuals */
  box-shadow: 0 0 3.75rem 10px #fff, 0 0 6.25rem 1.25rem red, 0 0 8.75rem 1.875rem gold;
  opacity: 1;
`

export const MorningSky = styled.span`
  /* Positioning */
  position: absolute;
  bottom: 45%;
  left: 60%;

  /* Visuals */
  opacity: 1;
`

//NIGHT
export const Moon = styled.img`
  /* Positioning */
  position: absolute;
  top: 15%;

  /* Box Model */
  border-radius: 50%;
  width: 35px;
  height: 35px;

  /* Visuals */
  box-shadow: 0 0 3.75rem 10px #000, 0 0 6.25rem 1.25rem blue, 0 0 8.75rem 1.875rem silver;
  opacity: 0;
`

export const EveningSky = styled.span`
  /* Positioning */
  position: absolute;
  bottom: 45%;
  left: 60%;

  /* Visuals */
  opacity: 0;
`
