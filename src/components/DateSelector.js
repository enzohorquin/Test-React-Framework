import React from 'react';
import DatePicker from 'react-datepicker';

export class DateSelector extends React.Component{
      constructor(props){
        super(props);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
      }


      handleChangeStart = event =>{
        console.log(event);
        this.props.onChangeStart(event);
      }
      handleChangeEnd = event => {
        this.props.onChangeEnd(event);
      }
      render(){
        return(

          <div>
            <label className="text-dark">{this.props.label}</label>
            <div>
            <DatePicker
              selected={this.props.startDate}
              dateFormat="dd/MM/yyyy"
              maxDate={this.props.maxDate}
              selectsStart
              startDate={this.props.startDate}
              onChange = { this.handleChangeStart }
              timeFormat=""/>
              <div className="form-group mx-sm-3 mb-2">
              </div>
            <DatePicker
              selected={this.props.endDate}
              dateFormat="dd/MM/yyyy"
              maxDate={this.props.maxDate}
              selectsEnd
              endDate={this.props.endDate}
              onChange={this.handleChangeEnd}
              timeFormat=""
          />
          </div>

          </div>


        )
      }
}
export default DateSelector;
