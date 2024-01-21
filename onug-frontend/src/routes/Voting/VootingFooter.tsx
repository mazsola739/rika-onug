import { Footer, FooterButtons, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export const VootingFooter: React.FC = observer(() => {
  const handleStopGame = useCallback(() => {
    console.log('stop')
  }, [])

  const handleVoteNow = useCallback(() => {
    console.log('Vote now')
  }, [])

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleStopGame}
          buttontext={'STOP'}
          backgroundColor="red"
        />
        <Button
          onClick={handleVoteNow}
          buttontext={'VOTE NOW'}
          backgroundColor="orange"
        />
      </FooterButtons>
    </Footer>
  )
})
