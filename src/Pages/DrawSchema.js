import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

var tmpWeigts;

class DrawSchema extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: this.props.inputs,
      layerNumbers: this.props.layerNumbers,
      layersValues: [],
      layerWeights: [],
      isActive: false,
      activeNode: 0,
      activeLayer: 0,
      result : null
    };

    tmpWeigts = new Array(this.state.inputs.length);
    for (let i = 0; i < tmpWeigts.length; i++) {
      tmpWeigts[i] = new Array(this.state.layerNumbers);
    }
  }

  renderLayers = () => {
    const { layerNumbers } = this.state;
    var layers = [];
    for (let i = 0; i < layerNumbers; i++) {
      layers.push(
        <div key={i} className={`single-layer ${i + 1 === this.state.activeLayer && 'active'}`}>
          NET{i + 1}
          <p> {this.state.layersValues[i]}</p>
          <div className="weight-inputs">
            {/* Layer Weight Info */}
            <Form.Control
              type="input"
              placeholder={`W - ${i + 1}`}
              onFocus={() => {
                this.setState({ isActive: false, activeNode: 0, activeLayer: 0 });
              }}
              onChange={(e) => this.handleLayersWeight(e.target.value, i)}
            />
          </div>
        </div>
      );
    }
    return layers;
  };

  handleLayersWeight = (data, i) => {
    let layerWeights = new Array(this.state.layerNumbers);
    layerWeights = this.state.layerWeights;
    layerWeights[i] = data;
    this.setState({ layerWeights });
  };

  handleInputChange = (data, i, k) => {
    tmpWeigts[i][k] = data;
  };

  renderInputs = (inputs = this.state.inputs, layerNumbers = this.state.layerNumbers) => {
    let arr = [];

    for (let i = 0; i < inputs.length; i++) {
      let layers = [];
      for (let j = 0; j < layerNumbers; j++) {
        layers.push(
          <Form.Control
            key={j}
            type="number"
            placeholder={`w${i + 1},${j + 1}`}
            onFocus={() => {
              this.setState({ isActive: !this.state.isActive, activeNode: i + 1, activeLayer: j + 1 });
            }}
            onChange={(e) => this.handleInputChange(e.target.value, i, j)}
          />
        );
      }
      arr.push(
        <div className="inputs" key={i}>
          <div
            className={`single-input  ${i === 0 && i !== this.state.inputs.length - 1
              ? 'first-node'
              : i === this.state.inputs.length - 1 ? 'last-node' : 'middle'} ${i + 1 === this.state.activeNode &&
              'active'}`}
          >
            {inputs[i]}
            <div className="weight-inputs">{layers}</div>
          </div>
        </div>
      );
    }

    return arr;
  };

  calcLayers = () => {
    const { inputs, layerNumbers } = this.state;
    var results = [];
    var layersValues = [];
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < tmpWeigts[i].length; j++) {
        console.log(inputs[i] * tmpWeigts[i][j]);
        results.push(inputs[i] * tmpWeigts[i][j]);
      }
    }

    for (let j = 0; j < layerNumbers; j++) {
      let sum = 0;
      for (let i = 0 + j; i < results.length; i += layerNumbers) {
        sum += results[i];
      }
      layersValues.push(sum);
    }
    this.setState({ layersValues });
    console.log(layersValues);
  };


  calcResult = () => {
    const {layerWeights, layersValues, layerNumbers} = this.state;
    let result = 0;

    for(let i = 0; i < layerNumbers; i++){
      result += layerWeights[i] * layersValues[i];
    }
    console.log(result);
    this.setState({result});
  }

  render() {
    const { inputs, layerNumbers } = this.state;
    if (inputs.length > 0 && layerNumbers > 0) {
      return (
        <React.Fragment>
          <Col md={4}>
            {/* <div className="inputs">
              {inputs.map((r, i) => (
                <div
                  key={i}
                  className={`single-input  ${i === 0 && i !== this.state.inputs.length - 1
                    ? 'first-node'
                    : i === this.state.inputs.length - 1 ? 'last-node' : 'middle'} ${i + 1 === this.state.activeNode &&
                    'active'}`}
                >
                  {r}
                  <div className="weight-inputs">
                    {inputs.map(
                      (j, k) => (
                        // k < layerNumbers && (
                        // Input weight data
                        <Form.Control
                          key={j}
                          type="number"
                          placeholder={`w${i + 1},${k + 1}`}
                          onFocus={() => {
                            this.setState({ isActive: !this.state.isActive, activeNode: i + 1, activeLayer: k + 1 });
                          }}
                          onChange={(e) => this.handleInputChange(e.target.value, i, k)}
                        />
                      )
                      // Input weight data
                      // )
                    )}
                  </div>
                </div>
              ))}
            </div> */}
            {this.renderInputs()}
          </Col>
          <Col md={4} className="layers">
            {this.renderLayers()}
          </Col>
          <Col md={4} className="layers">
            <div className="output">Output 
            <div>
              {this.state.result !== null && this.state.result}
            </div>
            </div>
          </Col>
          <hr />
          <Col md={4}>
            <Button className="ml-auto mr-auto d-block mb-5" variant="danger" onClick={() => this.calcLayers()}>
              Hesapla
            </Button>
          </Col>
          <Col md={4}>
            <Button className="ml-auto mr-auto d-block mb-5" variant="danger" onClick={() => this.calcResult()}>
              Hesapla
            </Button>
          </Col>
        </React.Fragment>
      );
    }
  }
}

export default DrawSchema;
