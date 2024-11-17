import styled from '@emotion/styled'

export const StyledResultTable = styled.div`
  border-radius: 5px;
  border: 3px solid white;
  width: calc(100% - 400px);
`

export const Row = styled.div<{ isHeader?: boolean }>`
  display: flex;
  background-color: ${({ isHeader }) => (isHeader ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
  font-weight: ${({ isHeader }) => (isHeader ? 'bold' : 'normal')};
`

export const Cell = styled.div<{ isFixedWidth?: boolean; isMaxWidth?: boolean; isFixedHeight?: boolean }>`
  flex: ${({ isFixedWidth, isMaxWidth }) => (isFixedWidth ? '0 0 50px' : isMaxWidth ? '0 0 200px' : '1')};
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

export const PlayerName = styled.div`
  display: grid;
  grid-template-columns: 50px 150px;
  grid-template-areas: 'icon name';
  align-items: center;
  justify-items: start;
  justify-content: center;
  padding-left: 10px;
`

export const Icon = styled.span`
  grid-area: icon;
  font-size: 16px;
`
export const Name = styled.span`
  grid-area: name;
`

export const VoterName = styled.span``

export const Rank = styled.img`
  width: 40px;
  height: 40px;
`
