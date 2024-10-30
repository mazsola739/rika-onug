import { Button, ButtonGroup, Footer } from "components"
import { observer } from "mobx-react-lite"
import { useCallback } from "react"

export const VoteFooter: React.FC = observer(() => {
  const handleVoteNow = useCallback(() => {
    console.log('Vote now')
  }, [])

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleVoteNow} buttonText={'VOTE NOW'} variant="orange" />
      </ButtonGroup>
    </Footer>
  )
})
