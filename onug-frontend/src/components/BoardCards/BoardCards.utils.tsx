import { GameCard } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  CenterCardContainer,
} from './BoardCards.styles'
import { gameBoardStore } from 'store'

const renderPlayerCards = () => {
  const { playerCards } = gameBoardStore

  return (
    <CardContainer>
      <PlayersCards>
        {playerCards.map(
          (
            {
              position,
              id,
              ready,
              selectable,
              alien,
              artifact,
              assassin,
              awesome,
              babyalien,
              bat,
              blob,
              bulb,
              clarity,
              claw,
              cow,
              diseased,
              dreamwolf,
              dress,
              drunk,
              empath,
              evil,
              family,
              fang,
              fear,
              friend,
              jest,
              like,
              lover,
              mason,
              mad,
              mortician,
              nice,
              pretty,
              seer,
              select,
              shield,
              smell,
              sus,
              swap,
              tanner,
              tap,
              target,
              traitor,
              trophy,
              ufo,
              vampire,
              villain,
              werewolf,
            },
            index
          ) => (
            <GameCard
              key={index}
              isCenter={false}
              id={id}
              position={position}
              ready={ready}
              selectable={selectable}
              alien={alien}
              artifact={artifact}
              assassin={assassin}
              awesome={awesome}
              babyalien={babyalien}
              bat={bat}
              blob={blob}
              bulb={bulb}
              clarity={clarity}
              claw={claw}
              cow={cow}
              diseased={diseased}
              dreamwolf={dreamwolf}
              dress={dress}
              drunk={drunk}
              empath={empath}
              evil={evil}
              family={family}
              fang={fang}
              fear={fear}
              friend={friend}
              jest={jest}
              like={like}
              lover={lover}
              mason={mason}
              mad={mad}
              mortician={mortician}
              nice={nice}
              pretty={pretty}
              seer={seer}
              select={select}
              shield={shield}
              smell={smell}
              villain={villain}
              sus={sus}
              swap={swap}
              tanner={tanner}
              tap={tap}
              target={target}
              traitor={traitor}
              trophy={trophy}
              ufo={ufo}
              vampire={vampire}
              werewolf={werewolf}
            />
          )
        )}
      </PlayersCards>
    </CardContainer>
  )
}

const renderCenterCard = () => {
  const { centerCards } = gameBoardStore
  const renderCard = (position: string, title: string) => {
    const card = centerCards.find((c) => c.position === position)
    return (
      card &&
      card.id !== null && (
        <CardContainer>
          <CardTitle>{title}</CardTitle>
          <CenterCards>
            <GameCard
              id={card.id}
              position={card.position}
              isCenter={true}
              selectable={card.selectable}
            />
          </CenterCards>
        </CardContainer>
      )
    )
  }

  return (
    <CenterCardContainer>
      {renderCard('center_wolf', 'Wolf')}
      <CardContainer>
        <CardTitle>Center</CardTitle>
        <CenterCards>
          {['center_left', 'center_middle', 'center_right'].map(
            (position, index) => {
              const card = centerCards.find((c) => c.position === position)
              return (
                card &&
                card.id !== null && (
                  <GameCard
                    key={index}
                    id={card.id}
                    position={card.position}
                    isCenter={true}
                    selectable={card.selectable}
                  />
                )
              )
            }
          )}
        </CenterCards>
      </CardContainer>
      {renderCard('center_villain', 'Villain')}
    </CenterCardContainer>
  )
}

export const dealtCardsUtils = {
  renderPlayerCards,
  renderCenterCard,
}
