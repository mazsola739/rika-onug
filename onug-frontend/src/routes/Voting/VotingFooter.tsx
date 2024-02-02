import { Footer, FooterButtons, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export const VotingFooter: React.FC = observer(() => {
  const handleStopGame = useCallback(() => {
    console.log('stop')
  }, [])

  const handleVoteNow = useCallback(() => {
    console.log('Vote now')
  }, [])

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handleStopGame} buttonText={'STOP'} variant="red" />
        <Button
          onClick={handleVoteNow}
          buttonText={'VOTE NOW'}
          variant="orange"
        />
      </FooterButtons>
    </Footer>
  )
})
