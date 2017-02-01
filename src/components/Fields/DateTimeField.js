import React, { Component, PropTypes } from 'react'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import areIntlLocalesSupported from 'intl-locales-supported'

let DateTimeFormat                                            // Variable for setting datetime format for datepicker

if (areIntlLocalesSupported(['uk', 'uk-UA'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/uk')
  require('intl/locale-data/jsonp/uk-UA')
}

/**
 * Field for setting datetime value
 * Example of calling :
 * <DateTimeField
 *      timeDefaultValue={new Date(2016,10,10,10,10)}           // Default value for time
 *      dateDefaultValue={new Date(2016,10,10,10,10)}           // Default value for date
 *      datePickerStyle={dateStyle}                             // Style for date picker
 *      timePickerStyle={timeStyle}                             // Style for time picker
 *      onChange={(a,b) => this.outputInformation(a,b)}         // Function that return datetime object, string
 *      dateLabelText={dateLabelText}                           // Label text for datepicker
 *      timeLabelText={timeLabelText}                           // Label text for time picker
 * />
 */
class DateTimeField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      timeValue: null,                                          // Time value of current object
      dateValue: null,                                          // Date value of current object
      timeDateValue: null                                       // TimeDate value of current object
    }
  };

  /**
   * Default properties of class
   *
   * @type {{previewBlockClassName: *, apiURL: (module.exports.isRequired|Function|*)}}
   */
  static propTypes = {
    datePickerStyle: PropTypes.object,                          // Style for datepicker
    timePickerStyle: PropTypes.object,                          // Style for timepicker
    dateDefaultValue: PropTypes.object,                         // Initial value for date
    timeDefaultValue: PropTypes.object,                         // Initial value for time
    dateLabelText: PropTypes.string,                            // Label text for date
    timeLabelText: PropTypes.string,                            // Label text for time
    dateTimeDefaultValue: PropTypes.object,                     //
    onChange: PropTypes.func                                    // Function to return props back to parent
  };

  /**
   * Set default value of props
   *
   * @type {{generateName: boolean}}
   */
  static defaultProps = {
    dateDefaultValue: new Date(),                               // Default value for date
    timeDefaultValue: new Date()                                // Default value for time
  };

  /**
   * Making string from date object (needed to be able to insert to DB)
   *
   * @param dateTime - date object
   * @returns {*|string}
   */
  dateTimeString (dateTime) {
    let currentTime = new Date(dateTime)
    currentTime.setHours(currentTime.getHours() + currentTime.getTimezoneOffset() / -60)
    let dateString = currentTime.toISOString()
    dateString = dateString.replace('T', ' ')
    dateString = dateString.substring(0, dateString.indexOf('.'))
    return dateString
  }

  /**
   * Setting new object with date from datepicker and time from timepicker
   * Return this object back to parent
   *
   * @param data - object that datepicker or timepicker returns
   * @param fieldType - check what field type give us 'data' (datepicker or timepicker)
   */
  changingDateTimeValue (data, fieldType) {
    var year, month, day, hours, minutes, seconds, timeDate, timeDateString
    if (fieldType === 'time') {
      year = this.state.dateValue.getFullYear()
      month = this.state.dateValue.getMonth()
      day = this.state.dateValue.getDate()
      hours = data.getHours()
      minutes = data.getMinutes()
      seconds = data.getSeconds()
    } else {
      year = data.getFullYear()
      month = data.getMonth()
      day = data.getDate()
      hours = this.state.timeValue.getHours()
      minutes = this.state.timeValue.getMinutes()
      seconds = this.state.timeValue.getSeconds()
    }
    timeDate = new Date(year, month, day, hours, minutes, seconds)
    if (fieldType === 'time') {
      this.setState({timeValue: timeDate})
    } else {
      this.setState({dateValue: timeDate})
    }
    timeDateString = this.dateTimeString(timeDate)
    /**
     * Returning props back to parent.
     * Return 'timeDate' - object, 'timeDateString' - string for inserting to DB
     */
    this.props.onChange(timeDate, timeDateString)
  }

  /**
   * Setting initial states for datetimepicker
   */
  componentWillMount () {
    this.setState({timeValue: this.props.timeDefaultValue})             // Setting initial value for time
    this.setState({dateValue: this.props.dateDefaultValue})             // Setting initial value for date
  }

  /**
   * Setting initial value for datetime (before something was changed)
   */
  componentDidMount () {
    this.changingDateTimeValue(this.props.timeDefaultValue, 'time')
    this.changingDateTimeValue(this.props.dateDefaultValue, 'date')
  }

  /**
   * Render image uplaoder
   */
  render () {
    return (
      <div>
        <DatePicker
          onChange={(argument, date) => this.changingDateTimeValue(date, 'date')}
          defaultDate={this.props.dateDefaultValue}
          style={this.props.datePickerStyle}
          floatingLabelText={this.props.dateLabelText}
          locale='uk-UA'
          DateTimeFormat={DateTimeFormat}
          okLabel='ОК'
          cancelLabel='Вийти'
        />
        <TimePicker
          onChange={(argument, time) => this.changingDateTimeValue(time, 'time')}
          defaultTime={this.props.timeDefaultValue}
          style={this.props.timePickerStyle}
          floatingLabelText={this.props.timeLabelText}
          okLabel='ОК'
          cancelLabel='Вийти'
        />
      </div>
    )
  }
}

export default DateTimeField
