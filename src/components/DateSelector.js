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

          let yesterday = new Date(this.props.endDate);
          yesterday.setDate(this.props.endDate.getDate()-1);

        return(

          <div>
            <label className="text-dark">{this.props.label}</label>
            <div>
            <DatePicker
              selected={this.props.startDate}
              dateFormat="dd/MM/yyyy"
              maxDate={yesterday}
              selectsStart
              startDate={this.props.startDate}
              onChange = { this.handleChangeStart }
              timeFormat=""/>
              <div className="form-group mx-sm-3 mb-2">
              </div>
            <DatePicker
              selected={this.props.endDate}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
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
