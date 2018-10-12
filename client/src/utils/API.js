/* eslint-disable */
import axios from 'axios';
import React from 'react';
import SelectedMPP from '../components/SelectedDash';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


export default {
  getHansard: function(name) {
    return axios.get('/api/hansard' + name).then(res => {
      console.log(res.data)
    })
  },
  getRecentBills: function() {
    return axios.get('/api/recentBills')
    .then(res => {
      console.log(res.data)
    })
  },
  getVotesByMpp: function() {
    return axios.get('./api/mppVotes' + name)
    .then(res => {
      console.log(res.data)
    })
  },
    findByName: function(value) {
    return axios.get('/api/mppName/' + value).then(res => {
      // console.log(res.data)
      const url = res.data[0].url
      const picture = res.data[0].photo
      const name = res.data[0].name
      const position = res.data[0].careerDetails[0].positions
      console.log(url, picture, name, position)
    });
  }
}
