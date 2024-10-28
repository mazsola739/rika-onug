import styled from '@emotion/styled'
import { ReadyType } from './ReadyList.types'

export const StyledReadyList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 5px;
  min-width: 100%;
  border-bottom: 2px solid #969290;
  padding-bottom: 5px;
`

export const ReadyInfo = styled.div`
  align-items: center;
  display: flex;
  color: white;
  flex-direction: row;
  gap: 5px;
`

export const Ready = styled.span<ReadyType>`
  color: ${({ ready }) => (ready ? 'white' : 'rgba(255, 255, 255, 0.6)')};
  opacity: ${({ ready }) => (ready ? 1 : 0.6)};
  font-size: 14px;
`

export const Players = styled.h4`
  text-align: center;
`
