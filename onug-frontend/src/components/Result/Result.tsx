import { StyledResult } from './Result.styles'
import { ResultProps } from './Result.types'

export const Result: React.FC<ResultProps> = () => {
  return (
    <StyledResult>
      <span>You lose / win - Team(s) won</span>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Votes</th>
            <th>Voters</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr>
              <td>💀</td>
              <td>Player_1</td>
              <td>2</td>
              <td>
                <span>Player_2</span>, <span>Player_3</span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </StyledResult>
  )
}
