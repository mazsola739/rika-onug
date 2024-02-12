import { deckStore, narrationStore } from 'store'
import { order } from 'data'
import { CardType } from 'types'
import { CardImage } from 'components'
import {
  ActualScene,
  ActualSceneImages,
  StyledSceneTracker,
} from './SceneTracker.styles'
import { observer } from 'mobx-react-lite'
import { useRef, useEffect } from 'react'

export const SceneTracker: React.FC = observer(() => {
  const { selectedCards } = deckStore
  const focusedSceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focusedSceneRef.current) {
      focusedSceneRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [narrationStore.title])

  const renderSceneImages = () => {
    let index = 0
    return order.map((scene) => {
      if (scene.condition) {
        if (!scene.condition(selectedCards)) {
          return null
        }
      }
      const isCurrentScene = narrationStore.title === scene.scene_title
      const matchingCards: CardType[] = selectedCards.filter((card) =>
        scene.card_id.includes(card.id)
      )
      if (matchingCards.length > 0) {
        index++
        return (
          <ActualScene
            key={scene.scene_number}
            isCurrentScene={isCurrentScene}
            ref={isCurrentScene ? focusedSceneRef : null}
          >
            <p>{index}.</p>
            <ActualSceneImages>
              {matchingCards.map((card) => (
                <CardImage image={card.card_name} key={card.id} size={55} />
              ))}
            </ActualSceneImages>
          </ActualScene>
        )
      } else {
        return null
      }
    })
  }

  return <StyledSceneTracker>{renderSceneImages()}</StyledSceneTracker>
})
