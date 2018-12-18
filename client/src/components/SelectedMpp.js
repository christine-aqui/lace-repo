/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// inport components
import Loader from './Loader';
import SMData from './SMData'; //MPP data
import MppInfo from './dashComponents/Mppinfo';
// import FollowButton from './dashComponents/FollowButton';
import SocialList from './list/mppSocial';
// tools
// import { Animated } from 'react-animated-css';
//

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
    // heigth: '85vh'
  }
});

class PaperSheet extends Component {
  // State
  state = {
    mppLockup: this.props.match.params.mppName,
    lastName: '',
    name: '',
    position: [],
    url: '',
    photo: ' ',
    party: '',
    dateOfService: '',
    currentRiding: '',
    ridingMap: '',
    hansard: [],
    votes: [],
    parliamentNumber: '',
    telephone: '',
    twitter: '',
    facebook: '',
    userId: '',
    followingId: '',
    isLoading: true
  };
  // --end of state

  // Helper functions
  mppSearch() {
    axios
      .get(`/api/mppName/${this.state.mppLockup}`, {
        // name: name
      })
      .then(res => {
        this.setState({
          followingId: res.data[0]._id,
          lastName: res.data[0].lastName,
          name: res.data[0].name,
          position: res.data[0].careerDetails[0].positions,
          url: res.data[0].url,
          photo: res.data[0].photo,
          party: res.data[0].party,
          dateOfService: res.data[0].dateOfService,
          currentRiding: res.data[0].currentRiding,
          ridingMap: res.data[0].ridingMap,
          parliamentNumber: res.data[0].careerDetails[0].parliamentNumber,
          telephone: res.data[0].addressEmailId.Telephone
        });
        console.log('name set ', this.state.name);
      })
      .catch(err => console.log(err));
  }
  //
  getTwitter() {
    SocialList.forEach(tName => {
      if (tName.name === this.state.name) {
        return this.setState({ twitter: tName.twitter });
      }
    });
  }

  //
  getFacebook = () => {
    SocialList.forEach(fName => {
      // console.log('loop name ', fName.name);
      // console.log('state name ', this.state.name);
      // console.log(fName.name);
      // console.log(this.state.name);
      if (fName.name === this.state.name) {
        // console.log(fName.name);
        // console.log(this.state.name);
        // console.log(fName.facebook);
        return this.setState({ facebook: fName.facebook });
      }
    });
  };

  getCurrentUser = () => {
    axios
      .get('/api/currentUser')
      .then(res => {
        console.log('user res ', res);
        this.setState({ userId: res.data._id });
      })
      .catch(err => console.log(err));
  };
  // -- end of helpers
  // life cycle
  componentDidMount() {
    this.getCurrentUser();
    this.mppSearch();
    setTimeout(() => {
      this.getTwitter();
      this.getFacebook();
    }, 2000);
    setTimeout(() => this.setState({ isLoading: false }), 3000);
  }
  // --end of life cycle

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const {
      name,
      position,
      url,
      photo,
      currentRiding,
      party,
      parliamentNumber,
      telephone,
      twitter,
      facebook,
      mppLockup,
      userId,
      followingId,
      lastName,
      ridingMap
    } = this.state;

    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <MppInfo
            followingId={followingId}
            lastName={lastName}
            name={name}
            position={position}
            url={url}
            photo={photo}
            currentRiding={currentRiding}
            party={party}
            parliamentNumber={parliamentNumber}
            telephone={telephone}
            userId={userId}
            ridingMap={ridingMap}
          />
          {/* <FollowButton userId={userId} followingId={followingId} /> */}
          <SMData mppLockup={mppLockup} facebook={facebook} twitter={twitter} />
        </Paper>
      </div>
    );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
