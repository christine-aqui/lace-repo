import React from 'react';

const styles = {
  layout: {
    height: '500px',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
};

const SocialFeed = () => (
  <article id="" style={styles.layout} className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
    <div className="tc">
      {/* <h1 className="f4">Social Feed</h1> */}
      <hr className="mw3 bb bw1 b--black-10" />
    </div>
    <div className="lh-copy measure center f6 black-70">
      <a className="twitter-timeline" href="https://twitter.com/fordnation?lang=en">
        Tweets by TwitterDev
      </a>{' '}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
    </div>
  </article>
);

export default SocialFeed;