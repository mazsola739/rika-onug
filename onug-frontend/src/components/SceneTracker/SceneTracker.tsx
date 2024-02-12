import { deckStore } from 'store'
import { order } from 'data'
import { CardType } from 'types'
import { CardImage } from 'components'

export const SceneTracker: React.FC = () => {
  const { selectedCards } = deckStore

  const renderSceneImages = () => {
    return order.map((scene) => {
      if (scene.condition) {
        if (!scene.condition(selectedCards)) {
          return null
        }
      }

      const matchingCards: CardType[] = selectedCards.filter((card) =>
        scene.card_id.includes(card.id)
      )
      if (matchingCards.length > 0) {
        return (
          <div key={scene.scene_number}>
            <div>
              {matchingCards.map((card) => (
                <CardImage image={card.card_name} key={card.id} size={75} />
              ))}
            </div>
          </div>
        )
      } else {
        return null
      }
    })
  }

  return <div>{renderSceneImages()}</div>
}
