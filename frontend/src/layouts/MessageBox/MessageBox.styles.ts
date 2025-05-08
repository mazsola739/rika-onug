import styled from '@emotion/styled'

export const StyledMessageBox = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Box Model */
  border-radius: 1.25rem;
  padding-bottom: 10px;

  /* Visuals */
  background-color: rgba(150, 146, 144, 0.2);
`

export const Message = styled.div`
  /* Box Model */
  padding: 5px;

  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`

export const MessageText = styled.span`
  /* Box Model */
  padding: 0;
`

export const StyledMessageBoxCards = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`

export const StyledMessageBoxAnswer = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3px;
`

export const MessageBoxItem = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ItemPosition = styled.span`
  /* Box Model */
  padding: 5px 0;

  /* Typography */
  font-size: 12px;
  font-weight: lighter;
`

export const PlayerPosition = styled.span`
  /* Box Model */
  padding: 5px 0;

  /* Typography */
  font-weight: lighter;
`

export const StyledSelectable = styled.div`
  /* Flexbox/Grid */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const StyledMessageBoxVoteResult = styled.div`
  /* Flexbox/Grid */
  display: flex;
`
