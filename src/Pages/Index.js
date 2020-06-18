import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import DrawSchema from './DrawSchema';

var tmpInputs = [];

class Index extends React.Component {
  state = {
    inputNumber: 0,
    inputs: [],
    layerNumbers: 0,
    isInputHandled: false,
    isLayerHandled: false
  };

  savingInputs = (value, index) => {
    tmpInputs[index] = value;
    return tmpInputs;
  };

  createInputRows = (inputNumber) => {
    var inputs = [];
    for (let i = 0; i < inputNumber; i++) {
      inputs.push(
        <Form.Control
          style={{ marginTop: 10 }}
          type="number"
          key={i}
          onChange={(e) => this.savingInputs(e.target.value, i)}
        />
      );
    }
    return inputs;
  };

  render() {
    const { inputNumber, inputs, layerNumbers, isInputHandled, isLayerHandled } = this.state;
    // console.log([ inputNumber, inputs, layerNumbers ]);\
    return (
      <div>
        <Container style={{ marginTop: 50 }}>
          <Row style={{ minHeight: 250 }}>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label className="text-center">Input Sayisini Seciniz</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  className="text-center"
                  onChange={(e) => {
                    this.setState({ inputNumber: e.target.selectedIndex + 1 });
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              {inputNumber > 0 && (
                <React.Fragment>
                  <Form.Label className="text-center">Input Verilerini Giriniz</Form.Label>
                  {this.createInputRows(inputNumber)}
                </React.Fragment>
              )}
            </Col>
          </Row>
          <Button
            className="ml-auto d-block"
            variant="primary"
            onClick={() => this.setState({ isInputHandled: true, inputs: tmpInputs })}
          >
            Kaydet
          </Button>
          <hr />
          {isInputHandled && (
            <React.Fragment>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label className="text-center">Ara Layer Noron Sayisini Seciniz</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      className="text-center"
                      onChange={(e) => {
                        this.setState({ layerNumbers: e.target.selectedIndex + 1 });
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="ml-auto d-block"
                variant="primary"
                onClick={() => this.setState({ isLayerHandled: true })}
              >
                Kaydet
              </Button>
              <hr />
            </React.Fragment>
          )}
          <Row>{isLayerHandled && <DrawSchema inputs={inputs} layerNumbers={layerNumbers} />}
          {/* <DrawSchema /> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Index;
