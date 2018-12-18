/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// next - Expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
//  ok

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    padding: '20px',
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  eventLayout: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  eventList: { width: '40rem', padding: '10px' },
  eventForm: { width: '40rem' }
});

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetails: [],
      followingId: '',
      userId: '',
      eventName: '',
      eventSpeaker: '',
      eventDate: '',
      eventLocation: ''
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  displayEvents() {
    axios
      .get('/api/events/', {})
      .then(res => {
        console.log(res);
        this.setState({
          eventDetails: res.data
        });
      })
      .catch(err => console.log(err));
  }

  formSubmission = event => {
    event.preventDefault();
    console.log('submitted!!!');
    const eventInfo = {
      userId: this.state.userId,
      eventName: this.state.eventName,
      eventSpeaker: this.state.eventSpeaker,
      eventDate: this.state.eventDate,
      eventLocation: this.state.eventLocation
    };
    axios
      .post('/api/submit/', eventInfo)

      .then(res => {
        this.displayEvents();
        // console.log(res.data)
      })
      .catch(err => console.log(err));

    // console.log(eventInfo);
    document.getElementById('standard-name-eventName').value = '';
    document.getElementById('standard-name-eventSpeaker').value = '';
    document.getElementById('standard-name-eventLocation').value = '';
    document.getElementById('datetime-local').value = '';
  };

  getCurrentUser = () => {
    axios
      .get('/api/currentUser')
      .then(res => {
        this.setState({ userId: res.data._id });
      })
      .catch(err => console.log(err));
  };

  //
  componentDidMount() {
    this.getCurrentUser();
    this.displayEvents();
  }

  render() {
    const { classes } = this.props;
    const { eventDetails } = this.state;
    return (
      <div className={classes.eventLayout}>
        <Paper className={classes.root} elevation={1}>
          <React.Fragment>
            <CssBaseline />
            <main className={classes.eventList}>
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
                  margin="normal"
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
                    shrink: true
                  }}
                  margin="normal"
                />
              </form>
              <Button
                onClick={event => this.formSubmission(event)}
                className={classes.button}
              >
                Submit
              </Button>
            </main>
          </React.Fragment>
        </Paper>
        <div className={classes.eventList}>
          {eventDetails.map((event, i) => (
            <div key={i}>
              <ExpansionPanel className={classes.expender}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading} component="h3">
                    {event.eventName}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography component="p" className="pa2">
                    <strong>Speaker: </strong>
                    {event.eventSpeaker}
                  </Typography>

                  <Typography component="p" className="pa2">
                    <strong>Date: </strong>
                    {event.eventDate.substring(0, 10)}
                  </Typography>

                  <Typography component="p" className="pa2">
                    <strong>Location: </strong>
                    {event.eventLocation}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

EventFeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventFeed);
