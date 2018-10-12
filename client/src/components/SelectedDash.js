/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';

import MppInfo from './dashComponents/Mppinfo';
import SocialFeed from './dashComponents/SocialFeed';
import EventFeed from './dashComponents/EventFeed';
import NewsFeed from './dashComponents/NewsFeed';
import SpeechFeed from './dashComponents/SpeechFeed';
import VotingRecords from './dashComponents/VotingRecords';
import demoList from "./list/mppSocial";
const NewsAPI = require('newsapi')
import NEWS_KEY from '../newsKey';
const newsapi = new NewsAPI(NEWS_KEY);


const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '',
  },
  size: {
    height: '400px',
  },
  rightA: {
    'marginRight': '0px',
  },
};

export default class SelectedMPP extends Component {
  state = {
    mppLockup: this.props.match.params.mppName,
    name: '',
    position: '',
    url: '',
    photo: ' ',
    party:'',
    dateOfService:'',
    currentRiding:'',
    ridingMap:'',
    hansard: []
  };

    //load on Speech Feed
    loadHansard = () => {
      API.getHansard(this.state.speech)
      .then(res =>
        this.setState({ hansard: res.data}))
      .catch(err => console.log(err));
    };
    //load on Voting Records page
    loadVotesByMpp = () => {
      API.getVotesByMpp(this.state.votes)
      .then(res =>
        this.setState({ votes: res.data}))
      .catch(err => console.log(err));
    };

    // let url = window.location.href;
    mppSearch(){
      axios.get(`/api/mppName/${this.state.mppLockup}`,{
        name: name
      })
      .then(res => {
        console.log('ths is the res from get ', res.data[0])
        this.setState({
          name: res.data[0].name,
          position: res.data[0].careerDetails[0].positions,
          url: res.data[0].url,
          photo:res.data[0].photo,
          party:res.data[0].party,
          dateOfService:res.data[0].dateOfService,
          currentRiding:res.data[0].currentRiding,
          ridingMap:res.data[0].ridingMap
        })
      })
      .catch(err => console.log(err))
    }

    getNews(){
      newsapi.v2
      .topHeadlines({
        q: this.state.mppLockup,
        category: 'politics',
        language: 'en',
        country: 'ca'
      })
      .then(response => {
        response.totalResults === 0 ? console.log('no res') : console.log('this is the news ',response);
      })
      .catch(err => {
        console.log(err);
      });

    }

  componentDidMount(){
    this.mppSearch()
    this.getNews()
  }


  render() {
    const { name, position, url, photo, currentRiding, party } = this.state;
    return (
      <div>
        <MppInfo name={name} position={position} url={url} photo={photo} currentRiding={currentRiding} party={party} />
        <div className="outterDiv center w-80" style={styles.layout}>
          
          <div className="innerDiv-left">
            {/* <SocialFeed twitter={twitter}/> */}
            <EventFeed />
            <SpeechFeed customStyle={styles.rightA} />
          </div>
          <div className="innerDiv-right w-80 ">
            <NewsFeed customStyle={styles.rightA} />
            <VotingRecords customStyle={styles.rightA} />
          </div>
        </div>
      </div>
    );
  }
}