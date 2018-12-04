/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import UnFollowButton from './dashComponents/UnFollowButton'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },

  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }
});

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mppInfo: [],
      followingId: '',
      userId: '',
      eventName: '',
      eventSpeaker: '',
      eventDate: '',
      eventLocation: ''
    }
  }
  formSubmission = () => {
    console.log(this.state)
    const eventInfo = {
      eventSpeaker: this.state.eventSpeaker,
      eventDate: this.state.eventDate,
      eventLocation: this.state.eventLocation
    }
    console.log(eventInfo);
    document.getElementById("standard-name-eventName").value = '';
    document.getElementById("standard-name-eventSpeaker").value = '';
    document.getElementById("standard-name-eventLocation").value = '';
    document.getElementById("datetime-local").value = '';

  }
  getUserMpps = () => {
    axios.get('/api/userMpps')
      .then(res => {

        this.setState({
          mppInfo: res.data.followingId,
          userId: res.data._id
        })
      })
      .catch(err => console.log(err));
  }
  // handleUnFollow = (event, info) => {
  //   console.log('unfollow key!!!')
  //   axios.put(`/api/unfollow/${info.userId}&${info.followingId}`)
  //     .then(res => {
  //     })
  //     .catch(err => console.log(err));
  // }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  componentDidMount() {
    this.getUserMpps();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>

          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}

            <Grid container spacing={40}>
              {/* {this.state.userinfo = Object.keys(this.state.userinfo)} */}
              {/* {this.state.userinfo.map(userid => { */}
              {/* {Object.assign({},userId)} */}
              {this.state.mppInfo.map(info =>
                <Grid sm={6} md={4} lg={3}  >
                  <Card className={classes.card} key={info._id} >
                    <CardMedia
                      className={classes.cardMedia}
                      image={info.photo}
                      title={info.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {info.name}
                      </Typography>
                      <Typography>
                        Riding: {info.currentRiding}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/mpp/${info.lastName}`}>
                        <Button size="small" color="primary">
                          Details
                        </Button>
                      </Link>
                      <UnFollowButton variant="contained" size="small" color="primary" className={classes.button}
                        followingId={info._id}
                        userId={this.state.userId}
                      >
                        {console.log(this.state.userId)}
                      </UnFollowButton>
                    </CardActions>
                  </Card>

                </Grid>
              )}
            </Grid>
            
          </div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name-eventName"
              label="Event Name"
              className={classes.textField}
              value={this.state.eventName}
              onChange={this.handleChange('eventName')}
              margin="normal"
            />
            <TextField
              id="standard-name-eventSpeaker"
              label="Event Speaker"
              className={classes.textField}
              value={this.state.eventSpeaker}
              onChange={this.handleChange('eventSpeaker')}
              margin="normal"
            />
            <TextField
            id="standard-name-eventLocation"
            label="Event Location"
            className={classes.textField}
            value={this.state.eventLocation}
            onChange={this.handleChange('eventLocation')}
            />
            <TextField
              id="datetime-local"
              label="Date"
              type="date"
              defaultValue="2017-05-24"
              value={this.state.eventDate}
              onChange={this.handleChange('eventDate')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <button onClick={this.formSubmission}>Submit</button>
        </main>
      </React.Fragment>
    );
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  mppInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(UserPage);