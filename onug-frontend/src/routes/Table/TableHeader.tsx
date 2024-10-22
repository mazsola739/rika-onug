import { Header, ReadyList } from "components"
import { observer } from "mobx-react-lite"
import { boardStore } from "store"
import { Ready } from "./Table.styles"

export const TableHeader: React.FC = observer(() => {
    const { players } = boardStore

    return (
      <Header>
        <Ready>{players && <ReadyList players={players} />}</Ready>
      </Header>
    )
  }
)
