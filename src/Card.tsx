import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './AppStateContext';
import { CardDragItem } from './DragItem';
import { CardContainer } from './styles'
import { useItemDrag } from './useItemDrag';

interface CardProps {
  text: string,
  index: number,
  id: string,
  columnId: string
}

export const Card = ({ text, index, id, columnId }: CardProps) => {
  const { dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId
      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
      })
      item.index = index;
      item.columnId = targetColumn;
    }
  })
  drag(drop(ref));

  return <CardContainer>{text}</CardContainer>
}