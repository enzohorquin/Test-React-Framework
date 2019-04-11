import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-datepicker/dist/react-datepicker.css';
import {Input} from './Input.js';
import {DateSelector} from './DateSelector.js';

export class Main extends Component {
  constructor(){
    super();
    var last_month = new Date();
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

  }
  handleSubmit = (event) =>{
    event.preventDefault();

    try{
      const link =  this.state.link.split('-', 2);
      console.log(link);
      const primera_parte = link[0].split('/',4);
      console.log(primera_parte);
      const id_producto = primera_parte[3]+link[1];
      console.log(id_producto);
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
  handleChangeStart = (event,{value}) => {
    console.log("ENTRO");
    console.log("VALOR"+value);
    console.log("evento"+event);

  this.setState({startDate:event});
  }
  handleChangeEnd = (event,{value}) => {

  this.setState({endDate:event});
}

buildUrl = (url, parameters) =>{
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}


   getResultados = (id) => {
     let url = `https://api.mercadolibre.com/items/`+`${id}`+`/visits/time_window`;

     let diff = this.state.endDate.getTime() - this.state.startDate.getTime();

     console.log(diff/(1000*60*60*24) );
     let parameters = {
       last: diff/(1000*60*60*24),
       unit: "day",
       ending:new Date (this.state.endDate).toISOString().slice(0, 10).replace('T', ' ')
     };

  fetch(this.buildUrl(url, parameters)).then(response =>{
    console.log(response);
    response.json()
  }).then(data => {this.setState({resultado:url})
                  console.log(data)})
  .catch(err =>{console.log(err)});


  console.log(this.buildUrl(url,parameters));
  }

  render(){
    return( <div >
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
                        <input  className="btn btn-primary" type="submit" disabled = {!this.noErrors()}value="Buscar Producto"/>
                     </div>

                    </form>
              </div>)
  }
}
export default Main;
