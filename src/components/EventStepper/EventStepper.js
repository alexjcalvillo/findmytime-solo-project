import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

// import Material UI components
import { MobileStepper, Typography, Container, Grid } from '@material-ui/core';
class EventStepper extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };
  render() {
    const steps = this.props.events;
    const maxSteps = steps.length;
    return (
      <Container
        maxWidth="md"
        style={{ boxShadow: '3px 0px 3px 4px rgb(0, 0, 0, 0.3)' }}
        fixed
        disableGutters={true}
        alignItems="center"
        justify="center"
      >
        <Grid container spacing={0}>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              padding: '3%',
              backgroundColor: '#05AFF2',
            }}
          >
            Select the Events you wish to add to your calendar!
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              backgroundColor: '#d8d6d6',
              padding: '3%',
              overflow: 'scroll',
              height: '450px',
              maxHeight: '450px',
            }}
          >
            <Typography variant="h4">
              {steps[this.state.activeStep].summary}
            </Typography>
            <br />
            <Typography variant="h6">
              Organizer: {steps[this.state.activeStep].creator.email}
            </Typography>
            <Typography variant="subtitle1">
              Time:{' '}
              {moment(steps[this.state.activeStep].start.dateTime).format(
                'HH:mm A'
              )}{' '}
              -{' '}
              {moment(steps[this.state.activeStep].end.dateTime).format(
                'HH:mm A'
              )}
            </Typography>
            <Typography variant="subtitle1">
              Date:{' '}
              {moment(steps[this.state.activeStep].start.dateTime).format(
                'YYYY-MM-DD'
              )}
            </Typography>
            <br />
            <Typography variant="body1">
              Description:
              <br />
              {steps[this.state.activeStep].description}
            </Typography>
            Add Event?:
            <button
              className="log-in"
              onClick={this.props.addEvent(this.state.activeStep)}
            >
              Add
            </button>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={this.state.activeStep}
              nextButton={
                <button className="log-in" onClick={this.handleNext}>
                  Next
                </button>
              }
              backButton={
                <button className="log-in" onClick={this.handleBack}>
                  Back
                </button>
              }
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(EventStepper);
