import styled from '@emotion/styled'
import { ResultTableCellProps } from './MessageBox.types'

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
  flex-wrap: wrap;
  gap: 5px;
`

export const StyledMessageBoxAnswer = styled.div`
  /* Flexbox/Grid */
  display: flex;
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
  flex-direction: column;
`

export const SelectedPlayer = styled.td``

export const PlayerPosition = styled.span`
  /* Box Model */
  padding: 5px 0;

  /* Typography */
  font-weight: lighter;
`

export const Voters = styled.td``



export const ResultTable = styled.div`
  /* Box Model */
  border: 2px solid white;
`

export const ResultRow = styled.div`
  /* Flexbox/Grid */
  display: flex;
`

export const ResultCell = styled.div<ResultTableCellProps>`
  /* Box Model */
  border: 0.0625rem solid white;
  overflow: hidden;
  white-space: nowrap;
  flex: ${({ isFixedWidth, isMaxWidth }) => (isFixedWidth ? '0 0 80px' : isMaxWidth ? '0 0 240px' : '1')};
  height: 30px;

  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  justify-content: center;
`