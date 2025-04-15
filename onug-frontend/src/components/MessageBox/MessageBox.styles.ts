import styled from '@emotion/styled'

export const StyledMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1.25rem;
  background-color: rgba(150, 146, 144, 0.2);
  padding-bottom: 10px;
`

export const Narration = styled.div`
  padding: 5px;
  display: flex;
  gap: 8px;
  align-items: center;
`

export const NarrationText = styled.span`
  color: yellow;
  padding: 0;
`
export const MessageText = styled.span`
  padding: 0;
`

export const Message = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`

export const StyledMessageBoxCards = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  flex-wrap: wrap;
`

export const StyledMessageBoxAnswer = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

export const MessageBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ItemPosition = styled.span`
  font-size: 12px;
  font-weight: lighter;
  padding: 5px 0;
`

export const PlayerPosition = styled.span`
  font-weight: lighter;
  padding: 5px 0;
`

export const StyledSelectable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const StyledMessageBoxVoteResult = styled.div`
  display: flex;
`
