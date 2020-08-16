import React, { Component } from 'react';
import { connect } from 'react-redux';
// imports items for creating new rrule string
import { RRule, RRuleSet, rrulestr } from 'rrule';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import styles from './RRuleSelector.module.css';

class RRuleSelector extends Component {
  state = {
    freq: '',
    startDate: '',
    endDate: '',
    interval: '',
    byweekday: {
      SU: false,
      MO: false,
      TU: false,
      WE: false,
      TH: false,
      FR: false,
      SA: false,
    },
  };

  setStartDate(date) {
    console.log(date);
    this.setState({
      startDate: date,
    });
  }
  setEndDate(date) {
    this.setState({
      endDate: date,
    });
  }

  handleInput = (input) => (event) => {
    this.setState({
      [input]: event.target.value,
    });
  };

  handleCheck = (day) => (event) => {
    this.setState({
      byweekday: {
        ...this.state.byweekday,
        [day]: !this.state.byweekday[day],
      },
    });
  };

  handleRule = (event) => {
    event.preventDefault();

    const days = Object.keys(this.state.byweekday);
    const daysToUse = days.filter((day) => {
      return this.state.byweekday[day];
    });
    const realDays = daysToUse.map((day) => {
      switch (day) {
        case 'SU':
          return RRule.SU;
        case 'MO':
          return RRule.MO;
        case 'TU':
          return RRule.TU;
        case 'WE':
          return RRule.WE;
        case 'TH':
          return RRule.TH;
        case 'FR':
          return RRule.FR;
        case 'SA':
          return RRule.SA;
      }
    });
    const rule = new RRule({
      freq: this.state.freq,
      interval: this.state.interval,
      byweekday: realDays,
      dtstart: this.state.startDate || new Date(),
      until: this.state.endDate || null,
    });

    const recurring = rule.toString();
    this.props.getRecurring(recurring);
    // this.props.dispatch({
    //   type: 'SET_RECURRING_RULE',
    //   payload: recurring,
    // });
  };

  render() {
    console.log(this.state.freq);
    return (
      <div>
        <div>
          <form onSubmit={this.handleRule}>
            <label htmlFor="freq">Frequency: </label>
            <select id="freq" onChange={this.handleInput('freq')}>
              <option value={RRule.YEARLY}>Yearly</option>
              <option value={RRule.MONTHLY}>Monthly</option>
              <option value={RRule.WEEKLY}>Weekly</option>
              <option value={RRule.DAILY}>Daily</option>
              <option value={RRule.HOURLY}>Hourly</option>
              <option value={RRule.MINUTELY}>Minutely</option>
              <option value={RRule.SECONDLY}>Secondly</option>
            </select>
            <br />
            <label htmlFor="interval">Interval: </label>
            <select id="interval" onChange={this.handleInput('interval')}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
            <br />
            {
              <div>
                <input
                  type="checkbox"
                  id="sun"
                  value={RRule.SU}
                  onChange={this.handleCheck('SU')}
                ></input>
                <label htmlFor="sun">Sunday</label>
                <br />

                <input
                  type="checkbox"
                  id="mon"
                  value={RRule.MO}
                  onClick={this.handleCheck('MO')}
                ></input>
                <label htmlFor="mon">Monday</label>
                <br />
                <input
                  type="checkbox"
                  id="tues"
                  value={RRule.TU}
                  onClick={this.handleCheck('TU')}
                ></input>
                <label htmlFor="tues">Tuesday</label>
                <br />
                <input
                  type="checkbox"
                  id="wed"
                  value={RRule.WE}
                  onClick={this.handleCheck('WE')}
                ></input>
                <label htmlFor="wed">Wednesday</label>
                <br />
                <input
                  type="checkbox"
                  id="thur"
                  value={RRule.TH}
                  onClick={this.handleCheck('TH')}
                ></input>
                <label htmlFor="thur">Thursday</label>
                <br />
                <input
                  type="checkbox"
                  id="fri"
                  value={RRule.FR}
                  onClick={this.handleCheck('FR')}
                ></input>
                <label htmlFor="fri">Friday</label>
                <br />
                <input
                  type="checkbox"
                  id="sat"
                  value={RRule.SA}
                  onClick={this.handleCheck('SA')}
                ></input>
                <label htmlFor="sat">Saturday</label>
              </div>
            }
            Start Date/Time:
            <br />
            <DatePicker
              className={styles.dateBtn}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              selected={this.state.startDate}
              onChange={(date) => this.setStartDate(date)}
            />
            <br />
            End Date/Time:
            <br />
            <DatePicker
              className={styles.dateBtn}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              // customInput={ExampleCustomInput}
              selected={this.state.endDate}
              onChange={(date) => this.setEndDate(date)}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RRuleSelector);
