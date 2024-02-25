import styled from '@emotion/styled'
import { ActualSceneProps } from './SceneTracker.types'

export const StyledSceneTracker = styled.div`
  margin-left: auto;
  max-width: 150px;
  height: 100%;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 1px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`

export const ActualScene = styled.div<ActualSceneProps>`
  display: flex;
  color: ${({ isCurrentScene }) => (isCurrentScene ? '#FF5733' : 'transparent')};
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  border: ${({ isCurrentScene }) =>
    isCurrentScene ? '2px solid #FF5733' : '2px solid transparent'};
`
export const ActualSceneImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`
