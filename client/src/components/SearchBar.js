/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios'
// import API from '../utils/API';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', mppLookUp: '' }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('search key pressed')
        axios.post(`/api/mppName/${this.state.value}`)
        .then(res => {
            console.log(res.data)
            window.location ='/mpp/'+ this.state.value;
        })
    };

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('enter key pressed')

            axios.post(`/api/mppName/${this.state.value}`)
            .then(res => {
                console.log(res.data)
                window.location ='/mpp/'+ this.state.value;
            })

        }
    }


    // re-route to MPP dashboard

    render() {
        return (
            <div className="searchbar" style={{ display: 'inline-flex' }}>
                <input type='text' placeholder="search politicans"  className="input-reset ba b--black-20  mb2 db w-100 gray f6 f5-ns dib "
                onChange={event => this.handleChange(event)}
                onKeyPress={ event => this.handleKeyPress(event)}
                />
                <button className=" mb2 mr3"
                onClick={event => this.handleSubmit(event)}
                >
                <i className="fa fa-search"></i>
                </button>
            </div>
        )
    }
}



export default SearchBar;