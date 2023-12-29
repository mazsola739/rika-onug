import { Button } from 'components'
import { Link } from 'react-router-dom'
import { LinkButtonProps } from './LinkButton.types'
import { observer } from 'mobx-react-lite'

export const LinkButton = observer(
  ({
    linkTo,
    onClick,
    disabled,
    buttontext,
    backgroundColor,
  }: LinkButtonProps) => (
    <Link to={linkTo}>
      <Button
        onClick={onClick}
        disabled={disabled}
        buttontext={buttontext}
        backgroundColor={backgroundColor}
      />
    </Link>
  )
)
