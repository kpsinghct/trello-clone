import { DragItem } from '../DragItem'

export const isHidden = (
  isPreview: boolean | null,
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(!isPreview &&
    draggedItem &&
    draggedItem.type === itemType &&
    draggedItem.id === id)
}