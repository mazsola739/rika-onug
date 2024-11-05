import { MenuButton } from 'components/MenuButton/MenuButton';
import { UPDATE_ROOM } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { deckStore, wsStore } from 'store';
import { FilterButtonProps } from './Filter.types';

export const FilterButton: React.FC<FilterButtonProps> = observer(({ expansion }) => {
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge();
  const room_id = sessionStorage.getItem('room_id');
  const token = sessionStorage.getItem('token');

  const isSelected = deckStore.selectedExpansions.includes(expansion);

  const handleClick = useCallback(() => {
    sendJsonMessage?.({
      type: UPDATE_ROOM,
      expansion,
      room_id,
      token,
    });
  }, [sendJsonMessage, room_id, expansion]);

  const bgImg = `/assets/backgrounds/expansion_${expansion.toLocaleLowerCase().replace(' ', '')}.webp`

  return <MenuButton bgImg={bgImg} isSelected={isSelected} onClick={handleClick} />
});
