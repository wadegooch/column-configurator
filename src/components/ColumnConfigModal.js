import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ColumnConfigModal extends Component {
  constructor() {
    super();
    this.buildModalOutput = this.buildModalOutput.bind(this);
  }

  buildModalOutput(data) {
    return data.map((column, index) => {
      return <p key={column.id}>
        [{index}] {column.id}: {column.name}
      </p>
    });
  }

  render() {
    return (
      <Modal show={this.props.data.showModal} onHide={() => this.props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Column Configuration Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6}>
              <h5>Available Columns</h5>
              <h6>Column list size: {this.props.data.available.length}</h6>
              <hr />
              {this.buildModalOutput(this.props.data.available)}
            </Col>
            <Col xs={6}>
              <h5>Visible Columns</h5>
              <h6>Column list size: {this.props.data.visible.length}</h6>
              <hr />
              {this.buildModalOutput(this.props.data.visible)}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ColumnConfigModal;
