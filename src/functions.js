
//With this function, the URL is generated to call ML API
export const buildUrl = (url, parameters) =>{
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //
    url = url + "?" + qs;
  }
  return url;
}

//Obtain Dates from array
export const getDates = (array) =>{
  let result = array.map(x => {
    return new Date(x.date).toISOString().slice(0, 10).replace('T', ' ')
  })
  return result;
}

//Obtain product visits from array
export const getVisits = (array) => {
  let result = array.map(x =>{
    return x.total});
    return result;
  };
