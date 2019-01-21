import React, { Component } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import { DragDropContext } from 'react-beautiful-dnd';
import { COLUMNS, AVAILABLE, VISIBLE } from './columns';
import ColumnConfigDroppable from './ColumnConfigDroppable';
import ColumnConfigModal from './ColumnConfigModal';

class ColumnConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      available: COLUMNS,
      visible: [],
      showModal: false
    }
    this.initialState = this.state;
    this.resetForm = this.resetForm.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  resetForm() {
    this.setState(this.initialState);
  }

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const columns = this.reorder(
        this.state[source.droppableId],
        source.index,
        destination.index
      );

      this.setState({ [source.droppableId]: columns });
    } else {
      const result = this.move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
      );

      this.setState({
        available: result[AVAILABLE],
        visible: result[VISIBLE]
      });
    }
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={10}>
            <Row>
              <h4>Configure Data Fields</h4>
            </Row>
            <Row>
              <h6>Drag &amp; drop between columns to configure visible data.</h6>
            </Row>
          </Col>
        </Row>
        <Row className="contextContainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Col xs={5} className="dragDropCol">
              <Row>
                <h6>Available</h6>
              </Row>
              <Row className="availableBorder">
                <ColumnConfigDroppable name="available"
                  columns={this.state.available}
                />
              </Row>
            </Col>
            <Col xs={5} className="dragDropCol">
              <Row>
                <h6>Visible</h6>
              </Row>
              <Row>
                <ColumnConfigDroppable name="visible"
                  columns={this.state.visible}
                />
              </Row>
            </Col>
          </DragDropContext>
        </Row>
        <Row>
          <ButtonToolbar className="configButtons">
            <Col>
              <Button variant="primary"
                onClick={() => this.handleShow()}
              >
                Submit
              </Button>
            </Col>
            <Col>
              <Button variant="secondary"
                onClick={() => this.resetForm()}
              >
                Cancel
              </Button>
            </Col>
          </ButtonToolbar>
        </Row>
        <ColumnConfigModal data={this.state}
          handleClose={this.handleClose}
        />
      </Container>
    );
  }
}

export default ColumnConfigForm;
