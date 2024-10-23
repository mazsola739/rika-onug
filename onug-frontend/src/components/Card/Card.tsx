import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { NameBackground, PlayerName, StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(({ image, size, playerName }) => {
  const isSelected = false //TODO

  const handleCardClick = useCallback(() => {
  }, [])

  return (
    <StyledCard isSelected={isSelected} onClick={handleCardClick} size={size}>
      <CardImage image={image} size={size} />
      {playerName && <NameBackground src={'/assets/backgrounds/name3.png'} alt={image} />}
      <PlayerName>{playerName}</PlayerName>
    </StyledCard>
  )
})
