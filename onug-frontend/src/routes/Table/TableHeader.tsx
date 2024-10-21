import { Header, ReadyList } from "components"
import { observer } from "mobx-react-lite"
import { gameBoardStore } from "store"
import { Ready } from "./Table.styles"

export const TableHeader: React.FC = observer(() => {
    const { players } = gameBoardStore

    return (
      <Header>
        <Ready>{players && <ReadyList players={players} />}</Ready>
      </Header>
    )
  }
)
