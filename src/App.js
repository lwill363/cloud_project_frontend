import './App.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';



const Header = () => {
  return (
    <div className="Header">
      <h1 className="large">Welcome to the Last Converter</h1>
      <p className="mute">This will be the last converter youll ever need. The conversions that
      can be made are tempature, speed, and weight (every one want to know what they weight in kg.).
      This product is grabbing from out openly avaible api, just contact the email below for more information.
      Happy converting!
    </p>
    </div>
  );
}

const Convert = ({ watch, register, required }) => {

  const watchType = watch("service_type", "speed")

  return (
    <>
      <select name="service_type" ref={register({ required })}>
        <option value="speed">Speed</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>
      <input type="number" name="measurement_value" ref={register({ required })}></input>
      {watchType === "speed" && <select name="from_measurement" ref={register({ required })}>
        <option value="mph">mph</option>
        <option value="kph">kph</option>
      </select>}
      {watchType === "speed" && <select name="to_measurement" ref={register({ required })}>
        <option value="kph">kph</option>
        <option value="mph">mph</option>
      </select>
      }
      {watchType === "weight" && <select name="from_measurement" ref={register({ required })}>
        <option value="lbs">lbs</option>
        <option value="kg">kg</option>
      </select>}
      {watchType === "weight" && <select name="to_measurement" ref={register({ required })}>
        <option value="kg">kg</option>
        <option value="lbs">lbs</option>
      </select>
      }
      {watchType === "temperature" && <select name="from_measurement" ref={register({ required })}>
        <option value="fahrenheit">fahrenheit</option>
        <option value="celsius">celsius</option>
      </select>}
      {watchType === "temperature" && <select name="to_measurement" ref={register({ required })}>
        <option value="celsius">celsius</option>
        <option value="fahrenheit">fahrenheit</option>
      </select>
      }
    </>
  );
}



const App = () => {

  const { register, watch, handleSubmit } = useForm();
  const [convert, setConvert] = useState([]);
  const onSubmit = data => {

    var newData = new FormData();
    newData.append("service_type", data.service_type)
    newData.append('from_measurement', data.from_measurement);
    newData.append('to_measurement', data.to_measurement);
    newData.append('measurement_value', data.measurement_value);

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:3533/convert',
      headers: {
        'x-api-key': 'bdkdbd-dbdkdkbd-kssz',
        'Content-Type': 'application/json',
      },
      data: newData
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setConvert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  return (
    <div className="App">
      <Header />
      <div className="ConvertSection">
        <div className="userInput">
          <p>Enter your Conversion, Ex. Choose Speed 5 mph return 8.04672 kph </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Convert watch={watch} register={register} required />
            <input type="submit" value="Convert"></input>
          </form>
        </div>
        <div className="apiOutput">
          {convert}
        </div>
      </div>
    </div>
  );
}


export default App;
