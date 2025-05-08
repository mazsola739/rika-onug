import styled from '@emotion/styled'

export const StyledResultTable = styled.div`
  /* Box Model */
  border-radius: 5px;
  border: 3px solid white;
  width: calc(100% - 400px);
  margin: 1rem;

  & > h5:nth-of-type(1) {
    padding: 15px 0;

    align-content: center;
  }
`

export const Row = styled.div<{ isHeader?: boolean }>`
  /* Flexbox/Grid */
  display: flex;

  /* Typography */
  font-weight: ${({ isHeader }) => (isHeader ? 'bold' : 'normal')};

  /* Visuals */
  background-color: ${({ isHeader }) => (isHeader ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
`

export const Cell = styled.div<{ isFixedWidth?: boolean; isMaxWidth?: boolean; isFixedHeight?: boolean }>`
  /* Box Model */
  flex: ${({ isFixedWidth, isMaxWidth }) => (isFixedWidth ? '0 0 50px' : isMaxWidth ? '0 0 150px' : '1')};
  height: ${({ isFixedHeight }) => (isFixedHeight ? '1.875rem' : '50px')};
  border: 0.0625rem solid white;
  overflow: hidden;
  white-space: nowrap;

  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CellHeader = styled(Cell)`
  /* Flexbox/Grid */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Typography */
  font-weight: bold;
`

export const VotersCell = styled(Cell)`
  /* Flexbox/Grid */
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export const PlayerName = styled.div`
  /* Box Model */
  padding-left: 10px;

  /* Flexbox/Grid */
  display: grid;
  grid-template-columns: 50px 100px;
  grid-template-areas: 'icon name';
  align-items: center;
  justify-items: start;
  justify-content: center;
`

export const Icon = styled.span`
  /* Flexbox/Grid */
  grid-area: icon;
`

export const Name = styled.span`
  /* Flexbox/Grid */
  grid-area: name;
`

export const VoterName = styled.span``

export const Rank = styled.img`
  /* Box Model */
  width: 40px;
  height: 40px;
`
