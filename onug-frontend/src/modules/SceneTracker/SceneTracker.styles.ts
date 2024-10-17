import styled from 'styled-components'
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
  color: ${({ isCurrentScene }) => (isCurrentScene ? 'white' : 'transparent')};
  border-radius: 5px;
  border: ${({ isCurrentScene }) =>
    isCurrentScene ? '2px solid yellow' : '2px solid transparent'};
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  filter: ${({ isCurrentScene }) =>
    isCurrentScene ? 'drop-shadow(8px 5px 5px black);' : ''};
  opacity: ${({ isCurrentScene }) => (isCurrentScene ? '1' : '0.6')};
  text-shadow: ${({ isCurrentScene }) =>
  isCurrentScene ? '2px 2px 2px black' : ''};
`
export const ActualSceneImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`
