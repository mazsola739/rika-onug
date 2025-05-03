export interface ButtonProps {
  buttonText?: string
  onClick: () => void
  disabled?: boolean
  variant: string
  size?: number
}

export interface StyledButtonProps {
  variant: string
  size?: number
}
