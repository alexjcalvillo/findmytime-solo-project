import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetUpStepTest from '../SetupSteps/SetUpStepTest/SetUpStepTest';
import ScheduleForm from '../../ScheduleForm/ScheduleForm';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class NewEvent extends Component {
  state = {};

  handleNext = (data) => {
    console.log(data);
    if (data.daysOfWeek.length > 1) {
      data.freq = undefined;
    }
    console.log(data);
    this.props.dispatch({
      type: 'POST_EVENT',
      payload: data,
    });
    this.props.dispatch({ type: 'FETCH_USER' });

    this.props.history.push('/main-view');
  };
  render() {
    return (
      <div>
        {/* <SetUpStepTest /> */}
        <ScheduleForm handleNext={this.handleNext} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(NewEvent));
