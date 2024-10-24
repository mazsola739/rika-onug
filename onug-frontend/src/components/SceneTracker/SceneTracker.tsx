import { RoleImage } from 'components'
import { order } from 'data'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { deckStore, narrationStore } from 'store'
import { CardType } from 'types'
import { ActualScene, ActualSceneImages, StyledSceneTracker } from './SceneTracker.styles'

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
      const matchingCards: CardType[] = selectedCards.filter((card) => scene.card_id.includes(card.id))

      if (matchingCards.length > 0) {
        index++
        
        return (
          <ActualScene key={index} isCurrentScene={isCurrentScene} ref={isCurrentScene ? focusedSceneRef : null} >
            <p>{index}.</p>
            <ActualSceneImages>
              {matchingCards.map((card, index) => (
                <RoleImage image={card.card_name} key={index} size={55} />
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
