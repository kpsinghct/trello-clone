import React, { useRef } from 'react';
import { useDrop } from "react-dnd"
import { AddNewItem } from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { useAppState } from "./AppStateContext"
import { Card } from './Card';
import { useItemDrag } from './useItemDrag'
import { DragItem } from './DragItem';
import { isHidden } from './utils/isHidden'
interface ColumnProps {
  text: string
  index: number,
  id: string
  isPreview?: boolean
}

export const Column = ({
  text,
  index,
  id,
  isPreview
}: ColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
      item.index = hoverIndex;
    }
  })

  drag(drop(ref));

  return (
    <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card text={task.text} key={task.id} index={i} columnId={id} id={id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })}
        dark
      />
    </ColumnContainer>
  )
}