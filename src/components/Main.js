import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-datepicker/dist/react-datepicker.css';
import {Input} from './Input.js';
import {DateSelector} from './DateSelector.js';
import {buildUrl,getDates,getVisits} from '../functions.js'
import {Line} from 'react-chartjs-2';

export class Main extends Component {
  constructor(){
    super();
    let last_month = new Date();
    last_month.setMonth(last_month.getMonth()-1);
    this.state = {link:'',
                  startDate:last_month,
                  endDate:new Date(),
                  resultado:[]
                };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.generateData = this.generateData.bind(this);
    this.noErrors = this.noErrors.bind(this);

  }
  handleSubmit = (event) =>{
    event.preventDefault();
    const CERO = 0;
    const UNO = 1;
    const DOS = 2;
    const TRES = 3;
    const CUATRO = 4;

    try{
      const link =  this.state.link.split('-', DOS);
      const primera_parte = link[CERO].split('/',CUATRO);
      const id_producto = primera_parte[TRES]+link[UNO];
      this.getResultados(id_producto)
    }
    catch(err){
      console.log(err);
    }

  }
  handleChange = (event) =>{
    this.setState({
        [event.target.id]: event.target.value
      })
  }
  noErrors = _ => {

    return this.state.link !== '';
}
  handleChangeStart = (event) => {


  this.setState({startDate:event});
  }
  handleChangeEnd = (event) => {

  this.setState({endDate:event});
}

   getResultados = (id) => {

     const THOUSAND= 1000;
     const SIXTY=60;
     const TWENTYFOUR= 24;
     let url = `https://api.mercadolibre.com/items/`+`${id}`+`/visits/time_window`;
     let dif = this.state.endDate.getTime() - this.state.startDate.getTime(); //The difference between the days is calculated.
     let parameters = {
       last: Math.floor(dif/(THOUSAND*SIXTY*SIXTY*TWENTYFOUR)),
       unit: "day",
       ending:new Date (this.state.endDate).toISOString().slice(0, 10).replace('T', ' ')
     };
     //
     console.log(parameters.last)
     //Calling ML API
  fetch(buildUrl(url, parameters), {
    method: 'GET',
    headers: {
    Accept: 'application/json',
  },
    },).then(response =>{

          return response.json()
      }).then(data => {
          this.setState({resultado:data.results})})
        .catch(err =>{
          console.log(err);

        });
  }

  //Generating Data for Chart
  // If statement to handle wrong link input.
  generateData = ( ) => {
    let data;
    let label =[];
    let visits = [];
    if(this.state.resultado !== undefined ){
      label = getDates(this.state.resultado);
      visits = getVisits(this.state.resultado);
  }
  data = {
    labels: label,
    datasets: [
      {
        label: 'ML visits per day',
        data: visits,
        fill: false,
        borderColor: 'green'
      }
    ]
  }
  return data;

  }
  render(){

    //Generating Data for Chart
    // If statement to handle wrong link input.
    let data = this.generateData;


    return(
                  <form className="form-horizontal" onSubmit={this.handleSubmit} onChange={this.handleChange}>

                  <div className="form-group mx-sm-3 mb-2">
                        <label className="text-dark"> Ingrese Link </label>
                        <Input id={'link'} name ={'link'}  placeholder={'Link de Producto ML '}/>
                  </div>
                  <div className="form-group mx-sm-3 mb-2">
                        <DateSelector  label="Seleccione fecha a filtrar: "
                        onChangeStart={this.handleChangeStart}
                        onChangeEnd={this.handleChangeEnd}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        maxDate={null}
                        selectDate={true}
                   />
                   </div>
                     <div className="form-group mx-sm-3 mb-2">
                        <input  className="btn btn-primary" type="submit" disabled = {!this.noErrors}value="Buscar Producto"/>
                     </div>
                     <div className= "form-group mx-sm-3 mb-2">
                      <Line data={data}/>
                    </div>

                    </form>
              )
  }
}
export default Main;
