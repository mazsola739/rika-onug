import { Button, ButtonGroup, Card, Token } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { roomStore, selectionStore, voteStore } from 'store'
import {
  Avatar,
  CardPosition,
  Character,
  MessageBoxCard,
  Names,
  Narration,
  NarrationImage,
  NarrationText,
  Player,
  PlayerName,
  Players,
  Rule,
  SelectedTitle,
  StyledCouncilNarration,
  StyledInfo,
  StyledInfoPanel,
  StyledPlayerNames,
  StyledSelectedCards,
  StyledSuspicion
} from './InfoPanel.styles'
import { InfoPanelProps } from './InfoPanel.types'

export const InfoPanel: React.FC<InfoPanelProps> = observer(({ children }) => <StyledInfoPanel>{children}</StyledInfoPanel>)

export const Suspicion: React.FC = observer(() => {
  const { handleDone } = useClickHandler()
  const { selectedCards } = selectionStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltipp: you cant vote yourself
  return (
    <StyledSuspicion>
      <SelectedTitle>{'Your Prime Suspect!'}</SelectedTitle>
      <SelectedCards />
      <ButtonGroup>
        <Button onClick={() => handleDone(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
      </ButtonGroup>
    </StyledSuspicion>
  )
})

export const SelectedCards: React.FC = observer(() => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }
  const { selectedCards } = selectionStore
  

  return (
    <StyledSelectedCards>
      {selectedCards.map((card, index) => (
        <MessageBoxCard key={index}>
          <CardPosition>{`card`}</CardPosition>
          <Card image="card_background" onClick={() => onCardClick(card)} size={40} />
        </MessageBoxCard>
      ))}
    </StyledSelectedCards>
  )
})

export const CouncilNarration: React.FC = observer(() => {
  return (
    <StyledCouncilNarration>
      {voteStore.narrations &&
        voteStore.voteNarration.map((scene, index) => (
          <Narration key={index}>
            <NarrationImage src={`/assets/cards/${scene.image}.webp`} alt="info" />
            <NarrationText>{scene.text}</NarrationText>
          </Narration>
        ))}
    </StyledCouncilNarration>
  )
})

export const Info: React.FC = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const imgSrc = detailedCardInfo.id !== 0 ? `/assets/cards/${detailedCardInfo.card_name}.webp` : ''

  return (
    <StyledInfo>
      {imgSrc && <Avatar src={imgSrc} alt="info" />}
      <Character>{detailedCardInfo.display_name.toLocaleUpperCase()}</Character>
      <Rule>{detailedCardInfo.rules}</Rule>
    </StyledInfo>
  )
})

export const PlayerNames: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const { roomPlayers: players } = roomStore

  return (
    <StyledPlayerNames>
      <Players>Locked in {room_id.toLocaleUpperCase().replace('_', ' ')} together with</Players>
      <Names>
        {players &&
          players.map(({ player_name }, index) => (
            <Fragment key={index}>
              <Player>
                <Token tokenName={`${index + 1}`} size={25} />
                <PlayerName>{player_name}</PlayerName>
              </Player>
            </Fragment>
          ))}
      </Names>
    </StyledPlayerNames>
  )
})
