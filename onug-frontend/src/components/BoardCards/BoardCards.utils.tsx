import { BoardCard } from 'components'
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
        {playerCards.map((card, index) => (
          <BoardCard
            key={index}
            isCenter={false}
            id={card.id}
            position={card.position}
            selectable_cards={card.selectable_cards}
            aliens={card.aliens}
            artifact={card.artifact}
            assassin={card.assassin}
            awesome={card.awesome}
            babyalien={card.babyalien}
            bat={card.bat}
            blob={card.blob}
            bulb={card.bulb}
            clarity={card.clarity}
            claw={card.claw}
            cow={card.cow}
            diseased={card.diseased}
            dreamwolf={card.dreamwolf}
            dress={card.dress}
            drunk={card.drunk}
            empath={card.empath}
            evil={card.evil}
            family={card.family}
            fang={card.fang}
            fear={card.fear}
            friend={card.friend}
            jest={card.jest}
            like={card.like}
            lovers={card.lovers}
            masons={card.masons}
            mad={card.mad}
            mortician={card.mortician}
            nice={card.nice}
            pretty={card.pretty}
            seer={card.seer}
            select={card.select}
            shield={card.shield}
            smell={card.smell}
            villains={card.villains}
            sus={card.sus}
            swap={card.swap}
            tanner={card.tanner}
            tap={card.tap}
            target={card.target}
            traitor={card.traitor}
            trophy={card.trophy}
            ufo={card.ufo}
            vampires={card.vampires}
            werewolves={card.werewolves}
          />
        ))}
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
            <BoardCard
              id={card.id}
              position={card.position}
              isCenter={true}
              selectable_cards={card.selectable_cards}
              spy={card.spy}
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
                  <BoardCard
                    key={index}
                    id={card.id}
                    position={card.position}
                    isCenter={true}
                    selectable_cards={card.selectable_cards}
                    spy={card.spy}
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
