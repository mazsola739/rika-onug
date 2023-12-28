import { Button } from 'components'
import { Link } from 'react-router-dom'
import { LinkButtonProps } from './LinkButton.types'

export const LinkButton = ({
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
