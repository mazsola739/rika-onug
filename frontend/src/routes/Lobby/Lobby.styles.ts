import styled from '@emotion/styled'

export const StyledLobby = styled.div`
  /* Positioning */
  margin: auto;

  /* Box Model */
  height: 100%;
  width: 100%;

  /* Flexbox/Grid */
  display: grid;
  gap: 20px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`

export const Selection = styled.div`
  /* Box Model */
  width: 100%;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

export const FormContainer = styled.div`
  /* Box Model */
  min-width: 300px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const InfoContainer = styled.div`
  /* Box Model */
  min-width: 300px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`

export const Nickname = styled.div`
  /* Box Model */
  min-width: 300px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
`

export const SelectedRoom = styled.div`
  /* Box Model */
  margin-top: 20px;

  /* Typography */
  font-size: 16px;
  font-weight: bold;
`

export const RoomBackground = styled.div<{ img: string }>`
  /* Box Model */
  min-width: 200px;
  min-height: 200px;
  border-radius: 50%;

  /* Flexbox/Grid */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Visuals */
  background: ${({ img }) => `url(${img}) center center/cover no-repeat`};
  filter: drop-shadow(5px 5px 5px black);
`
