import styled from '@emotion/styled'

export const StyledLobby = styled.div`
  height: 100%;
  margin: auto;
  width: 100%;
  display: grid;
  gap: 20px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
`
export const Selection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const FormContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const InfoContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
`

export const Nickname = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-end;
`

export const SelectedRoom = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`

export const RoomBackground = styled.div<{ img: string }>`
  min-width: 200px;
  min-height: 200px;
  background: ${({ img }) => `url(${img}) center center/cover no-repeat`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  filter: drop-shadow(5px 5px 5px black);
`
