import { Footer, FooterButtons, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

export const GameVoteFooter: React.FC = observer(() => {
  const handleVoteNow = useCallback(() => {
    console.log('Vote now')
  }, [])

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleVoteNow}
          buttonText={'VOTE NOW'}
          variant="orange"
        />
      </FooterButtons>
    </Footer>
  )
})
