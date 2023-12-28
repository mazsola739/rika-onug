import { Header } from 'components'
import { cards } from 'data'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

export const RoomHeader = observer(() => {
  const randomcard = Math.floor(Math.random() * cards.length) + 1
  const card_name = cards[randomcard].card_name
  const card_rules = cards[randomcard].rules

  const cardSrc = useMemo(
    () => require(`../../assets/cards/${card_name}.png`),
    [card_name]
  )
  const randomnumber = Math.floor(Math.random() * 20) + 1
  const avatarSrc = useMemo(
    () => require(`../../assets/avatars/avatar_${randomnumber}.jpg`),
    [randomnumber]
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
          <p>{card_rules}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img
            src={avatarSrc}
            alt={`${randomnumber}`}
            style={{ width: '80px', height: '80px' }}
          />
          <p>Player {randomnumber}</p>
        </div>
      </div>
    </Header>
  )
})
