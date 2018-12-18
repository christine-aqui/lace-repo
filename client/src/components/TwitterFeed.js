/* eslint-disable */
import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets';
// import { TwitterTimelineEmbed } from 'react-twitter-embed';

const handleUser = link => {
  // console.log('ok ', link);
  if (window.location.pathname === '/landing') {
    return (
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'CBCNews'
        }}
        options={{
          username: 'CBCNews',
          height: '600'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />
    );
  } else {
    return (
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: `${link}`
        }}
        options={{
          username: `${link}`,
          height: '600'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />
    );
  }
};

class TwitterFeed extends Component {
  render() {
    const { twitter } = this.props;
    return handleUser(twitter);
  }
}

export default TwitterFeed;

{
  /* <a className="twitter-timeline" data-width="1000" data-height="1000" data-dnt="true" href="https://twitter.com/OntarioPolitix?ref_src=twsrc%5Etfw">Tweets by OntarioPolitix</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
}
