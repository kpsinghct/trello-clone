import { XYCoord, useDragLayer } from 'react-dnd'
import { CustomDragLayerContainer } from './styles'
import { Column } from './Column'

export const CustomDragLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
    if (!currentOffset) {
      return {
        display: 'none'
      }
    } else {
      const { x, y } = currentOffset;
      const transform = `translate(${x}px, ${y}px)`;
      return {
        transform,
        WebkitTransform: transform
      }
    }


  }

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column id={item.id} text={item.text} index={item.index} />
      </div>
    </CustomDragLayerContainer>
  ) : null

}