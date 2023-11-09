function cal() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const from_unit = myform.from_unit.value;
  const to_unit = myform.to_unit.value;
  const from_value = myform.from_value.value;

  fetch("https://exchange-rates.abstractapi.com/v1/live/?api_key=169cb0d94d0b4c12bfb739a23db68225&target=" + to_unit + "&base=" + from_unit, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      const myObj = JSON.parse(result);
      const rate = myObj["exchange_rates"][to_unit];
      const final = from_value * rate;

      console.log(final)

      if (to_unit === "BTC") {
        document.getElementById('result').innerHTML = parseFloat(final).toFixed(20)
      }
      else if (to_unit === "ETH") {
        
        document.getElementById('result').innerHTML = parseFloat(final).toFixed(10);
      } else {
        document.getElementById('result').innerHTML = parseFloat(final).toFixed(2);
      }
      document.getElementById('result').innerHTML += `${to_unit}`;
      if (to_unit === "BTC") {
        document.getElementById('result').innerHTML += "(" + parseFloat(rate).toFixed(20) + ":1)";
      }
      else if(to_unit === "ETH"){ 
        document.getElementById('result').innerHTML += "(" + parseFloat(rate).toFixed(10) + ":1)"; 
      }else{
        document.getElementById('result').innerHTML += "(" + parseFloat(rate).toFixed(2) + ":1)";
      }
    }
    )
    .catch(error => console.log('error', error));
}