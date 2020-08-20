import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SetUpStepTest from '../SetupSteps/SetUpStepTest/SetUpStepTest';
import ScheduleForm from '../../ScheduleForm/ScheduleForm';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class NewEvent extends Component {
  state = {};

  render() {
    return (
      <div>
        <SetUpStepTest />
        <ScheduleForm />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewEvent);
