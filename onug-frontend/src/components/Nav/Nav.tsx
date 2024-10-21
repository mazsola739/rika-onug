import { observer } from 'mobx-react-lite';
import { StyledNav, UnorderedLists } from './Nav.styles';
import { NavProps } from './Nav.types';
import { NavListItem } from './NavListItem';

export const Nav: React.FC<NavProps> = observer(({ anchorList }) => {

  return (
    <StyledNav>
      <UnorderedLists>
        {anchorList.map((anchor, index) => (
          <NavListItem key={index} anchor={anchor} />
        ))}
      </UnorderedLists>
    </StyledNav>
  );
});
