import { useNavigate } from 'react-router-dom'

export const useRedirect = () => {
  const navigate = useNavigate()

  const redirectTo = (path: string) => {
    navigate(path)
  }

  return { redirectTo }
}
