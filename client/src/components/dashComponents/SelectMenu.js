/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/lib/Creatable';
import arrayNames from '../list/arrayNames';

const customStyles = {
  option: () => ({
    color: '#009688',
    padding: 2
  }),
  //
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
};
export default class SelectMenu extends Component {
  state = {
    value: ''
  };
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue.label);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    axios
      .post(`/api/mppName/${newValue.label}`)
      .then(res => {
        // console.log(res.data + 'me');
        this.setState({ value: newValue.label });
        // console.log(this.state.value + 'me1');
        // console.log(res + 'me res');
        window.location = `/mpp/${this.state.value}`;
        this.loading = false;
      })
      .catch(err => console.log(err));
  };
  handleInputChange = (value, actionMeta) => {
    console.group('Input Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        // onInputChange={this.handleInputChange}
        options={arrayNames}
        defaultValue
        styles={customStyles}
      />
    );
  }
}
