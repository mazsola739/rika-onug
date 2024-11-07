import styled from '@emotion/styled'

export const ResultContainer = styled.div`
  border-radius: 5px;
  border: 3px solid white;
`

export const ResultTitle = styled.h4`
  text-align: center;
  color: yellow;
  margin: 0;
  padding: 8px;
`

// Row container with flex display to simulate Result rows
export const ResultRow = styled.div<{ isHeader?: boolean }>`
  display: flex;
  background-color: ${({ isHeader }) => (isHeader ? 'black' : 'transparent')};
  font-weight: ${({ isHeader }) => (isHeader ? 'bold' : 'normal')};
`

// Result cell with padding and borders
export const ResultCell = styled.div<{ isFixedWidth?: boolean; isMaxWidth?: boolean; isFixedHeight?: boolean }>`
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

// Header cell with bold text
export const ResultHeaderCell = styled(ResultCell)`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Voters cell (allowing wrap of voter names)
export const VotersCell = styled(ResultCell)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

// Player name with bold styling
export const PlayerName = styled.span`
  font-weight: bold;
  color: white;
`

// Voter name with italic style
export const VoterName = styled.span`
  font-style: italic;
  color: white;
`

// Styled image for vote tokens
export const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`
