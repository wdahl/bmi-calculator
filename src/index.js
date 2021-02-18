import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function toKilo(pounds) {
  return pounds * 0.453592
}

function toPound(kilo){
  return kilo / 0.453592
}

function toMeter(inches){
  return inches * 0.0254
}

function toInch(meter){
  return meter / 0.0254
}

class BmiInput extends Component {
  constructor(props){
    super(props);
    this.handleMassChange = this.handleMassChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  handleMassChange(e) {
    this.props.onMassChange(e.target.value);
  }
  handleHeightChange(e){
    this.props.onHeightChange(e.target.value);
  }

  render(){
    const mass = this.props.mass;
    const height = this.props.height;
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter Mass in {scale=='kg' ? 'kilograms' : 'pounds'}:</legend>
        <input value={mass} onChange={this.handleMassChange} />
        <legend>Enter Height in {scale=='kg' ? 'meters' : 'inches'}</legend>
        <input value={height} onChange={this.handleHeightChange} />
      </fieldset>
    )
  }
}

class BmiCalculator extends Component{
  constructor(props){
    super(props);
    this.state = {
      mass: 0,
      height: 0,
      scale: 'kg'
    }

    this.handleKiloChange = this.handleKiloChange.bind(this);
    this.handlePoundsChange = this.handlePoundsChange.bind(this);
    this.handleMeterChange = this.handleMeterChange.bind(this);
    this.handleInchChange = this.handleInchChange.bind(this);
  }

  handleKiloChange(mass){
    this.setState({
      mass,
      scale: 'kg'
    })
  }

  handlePoundsChange(mass){
    this.setState({
      mass, 
      scale: 'lb'
    })
  }

  handleMeterChange(height){
    this.setState({
      height,
      scale: 'kg'
    })
  }

  handleInchChange(height){
    this.setState({
      height,
      scale: 'lb'
    })
  }

  render(){
    const scale = this.state.scale;
    const mass = this.state.mass;
    const height = this.state.height;

    const kilo = scale === 'lb' ? toKilo(mass) : mass
    const meter = scale === 'lb' ? toMeter(height): height

    const pounds = scale === 'kg' ? toPound(mass): mass
    const inch = scale === 'kg' ? toInch(height): height

    return(
      <div>
        <BmiInput scale='kg' mass={kilo} height={meter} onMassChange={this.handleKiloChange} onHeightChange={this.handleMeterChange} />
        <BmiInput scale='lb' mass={pounds} height={inch} onMassChange={this.handlePoundsChange} onHeightChange={this.handleInchChange} />
        <label>
          BMI:
          <p>{(kilo/(meter**2)) ? kilo/(meter**2) : ''}</p>
        </label>
      </div>
    )
  }
}

ReactDOM.render(
  <BmiCalculator/>,
  document.getElementById('root')
);