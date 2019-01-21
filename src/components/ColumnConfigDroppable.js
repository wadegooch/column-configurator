import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ColumnConfigDraggable from './ColumnConfigDraggable';

class ColumnConfigDroppable extends Component {
  constructor() {
    super();
    this.buildRows = this.buildRows.bind(this);
  }

  buildRows() {
    return this.props.columns.map((key, index) => {
      return <ColumnConfigDraggable column={this.props.columns[index]}
        key={key.id}
        keyRef={key.id}
        draggableId={key.id}
        index={index}
        parentName={this.props.name}
      />
    });
  }

  render() {
    return (
      <Droppable droppableId={this.props.name}>
        {(provided) => (
          <div ref={provided.innerRef}
            className="droppableContainer"
          >
            {this.buildRows()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default ColumnConfigDroppable;
