/* eslint-disable */
import React from 'react';
import './TwitterStyle.css'
const TwitterFeed = (props) => (
    <div className={props.className} style={
        {
            maxHeight: "489px",
            overflow: 'scroll'
        }
    }>
    <a className="twitter-timeline" href="https://twitter.com/onpoli?lang=en">Tweets by TwitterDev</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
)

export default TwitterFeed;

