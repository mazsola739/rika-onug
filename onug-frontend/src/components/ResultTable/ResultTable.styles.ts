import styled from '@emotion/styled'

export const StyledResultTable = styled.div`
  border-radius: 5px;
  border: 3px solid white;
  width: calc(100% - 400px);
`

export const TableTitle = styled.h4`
  text-align: center;
  color: yellow;
  margin: 0;
  padding: 8px;
`

export const Row = styled.div<{ isHeader?: boolean }>`
  display: flex;
  background-color: ${({ isHeader }) => (isHeader ? 'black' : 'transparent')};
  font-weight: ${({ isHeader }) => (isHeader ? 'bold' : 'normal')};
`

export const Cell = styled.div<{ isFixedWidth?: boolean; isMaxWidth?: boolean; isFixedHeight?: boolean }>`
  flex: ${({ isFixedWidth, isMaxWidth }) => (isFixedWidth ? '0 0 45px' : isMaxWidth ? '0 0 120px' : '1')};
  color: white;
  height: ${({ isFixedHeight }) => (isFixedHeight ? '30px' : '50px')};
  border: 1px solid white;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CellHeader = styled(Cell)`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VotersCell = styled(Cell)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

export const PlayerName = styled.span`
  font-weight: bold;
  color: white;
`

export const VoterName = styled.span`
  font-style: italic;
  color: white;
`

export const Rank = styled.img`
  width: 40px;
  height: 40px;
`
