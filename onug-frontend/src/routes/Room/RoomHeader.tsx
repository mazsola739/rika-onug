import { Header } from 'components'
import { identifier_player } from 'constant'
import { cards } from 'data'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { actionStoreUtils } from 'utils'

export const RoomHeader = observer(() => {
  const { getRandomNumber } = actionStoreUtils
  const randomcard = getRandomNumber(1, cards.length)
  const card_name = cards[randomcard].card_name
  const card_display = cards[randomcard].display_name
  const card_rules = cards[randomcard].rules

  const cardSrc = useMemo(
    () => require(`../../assets/cards/${card_name}.png`),
    [card_name]
  )
  const randomAvatarNumber = getRandomNumber(1, 20)
  const randomPlayerNumber = getRandomNumber(1, 12)
  const avatarSrc = useMemo(
    () => require(`../../assets/avatars/avatar_${randomAvatarNumber}.jpg`),
    [randomAvatarNumber]
  )

  return (
    <Header>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img src={cardSrc} alt={card_name} style={{ width: '100px' }} />
          <p>
            {card_display}: {card_rules}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            src={avatarSrc}
            alt={`${randomAvatarNumber}`}
            style={{ width: '80px', height: '80px' }}
          />
          <p>{`${identifier_player}.identifier_player${randomPlayerNumber}_text`}</p>
        </div>
      </div>
    </Header>
  )
})
