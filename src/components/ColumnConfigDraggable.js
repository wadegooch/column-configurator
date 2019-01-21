import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { VISIBLE } from './columns';

class ColumnConfigDraggable extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
      isDisabled: false
    }
    this.handleHover = this.handleHover.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleHover(isHovered) {
    this.setState({
      isHovered: isHovered
    });
  }

  handleDoubleClick(event) {
    if (VISIBLE === this.props.parentName) {
      this.setState({
        isDisabled: !this.state.isDisabled
      });
    }
  }

  render() {
    return (
      <Draggable key={this.props.keyRef}
        draggableId={this.props.draggableId}
        isDragDisabled={this.state.isDisabled}
        index={this.props.index}
      >
        {(provided) => (
          <div ref={provided.innerRef}
            onMouseEnter={() => this.handleHover(true)}
            onMouseLeave={() => this.handleHover(false)}
            onDoubleClick={() => this.handleDoubleClick()}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.state.isHovered && !this.state.isDisabled && <i className="fas fa-bars"></i>}
            {this.state.isDisabled && <i className="fas fa-lock"></i>}
            {this.props.column.name}
          </div>
        )}
      </Draggable>
    );
  }
}

export default ColumnConfigDraggable;
