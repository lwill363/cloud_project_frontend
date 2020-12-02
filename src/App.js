import './App.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';


const Header = () => {
  return (
    <div className="text-center flex-this">
      <h1 className="large">Welcome to the Last Converter</h1>
      <p className="text-muted w-50">This will be the last converter youll ever need. The conversions that
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

      <div class="form-group row">

        <select className="form-control" name="service_type" ref={register({ required })}>
          <option value="speed">Speed</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>

      </div>
      <div class="form-group row">
        <input className="form-control" type="number" step="0.01" name="measurement_value" placeholder="Ex. 15.32" ref={register({ required })}></input>
      </div>

      <div class="form-group row">
        {watchType === "speed" && <select className="form-control col mr-1" name="from_measurement" ref={register({ required })}>
          <option value="mph">mph</option>
          <option value="kph">kph</option>
        </select>}
        {watchType === "speed" && <select className="form-control col ml-1" name="to_measurement" ref={register({ required })}>
          <option value="kph">kph</option>
          <option value="mph">mph</option>
        </select>
        }



        {watchType === "weight" && <select className="form-control col mr-1" name="from_measurement" ref={register({ required })}>
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
        </select>}
        {watchType === "weight" && <select className="form-control col ml-1" name="to_measurement" ref={register({ required })}>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
        }

        {watchType === "temperature" && <select className="form-control col mr-1" name="from_measurement" ref={register({ required })}>
          <option value="fahrenheit">fahrenheit</option>
          <option value="celsius">celsius</option>
        </select>}
        {watchType === "temperature" && <select className="form-control col ml-1" name="to_measurement" ref={register({ required })}>
          <option value="celsius">celsius</option>
          <option value="fahrenheit">fahrenheit</option>
        </select>
        }
      </div>
    </>
  );
}

const AllConversions = p => {

  return (
    <>
      <div className="card" style={{ width: 720 }}>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </>
  );
}


const App = () => {

  const { register, watch, handleSubmit } = useForm();
  const [convert, setConvert] = useState(0);
  const [convertName, setConvertName] = useState('');
  const [convertTo, setConvertTo] = useState('');
  const [convertFrom, setConvertFrom] = useState('');
  const [convertValue, setConvertValue] = useState(0);
  const [passConversions, setPassConversions] = useState([]);


  const onSubmit = (data, e) => {


    e.preventDefault();

    setConvertName(data.service_type)
    setConvertTo(data.to_measurement)
    setConvertFrom(data.from_measurement)
    setConvertValue(data.measurement_value)

    var newData = new FormData();
    newData.append("service_type", data.service_type)
    newData.append('from_measurement', data.from_measurement);
    newData.append('to_measurement', data.to_measurement);
    newData.append('measurement_value', data.measurement_value);

    var convert = {
      method: 'post',
      url: 'http://127.0.0.1:3533/convert',
      headers: {
        'x-api-key': 'bdkdbd-dbdkdkbd-kssz',
        'Content-Type': 'application/json',
      },
      data: newData
    };

    var getConvert = {
      method: 'get',
      url: 'http://127.0.0.1:3533/conversions',
      headers: {
        'x-api-key': 'bdkdbd-dbdkdkbd-kssz',
        'Content-Type': 'application/json',
      },
      data: newData
    };

    axios(convert)
      .then(function (response) {
        if (response.data.kph) {
          setConvert(response.data.kph);
        } else if (response.data.mph) {
          setConvert(response.data.mph);
        } else if (response.data.lbs) {
          setConvert(response.data.lbs);
        } else if (response.data.kg) {
          setConvert(response.data.kg);
        } else if (response.data.fahrenheit) {
          setConvert(response.data.fahrenheit);
        } else {
          setConvert(response.data.celsius);
        }
      })
      .catch(function (error) {
        console.log(error);
      });


    axios(getConvert)
      .then(function (response) {
        console.log(response.data.conversions);
        setPassConversions(response.data.conversions.map((pass, i) => {
          return (
            <AllConversions pass={pass} i={i} />
          )
        }));
      })
      .catch(function (error) {
        console.log(error);
      });

  };



  return (
    <div className="App container">

      <Header />

      <div className="ConvertSection">
        <div className="col">
          <p>Enter your Conversion, Ex. Choose Speed 5 mph return 8.04672 kph </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Convert watch={watch} register={register} required />
            <input className="btn btn-primary" type="submit" value="Convert"></input>
          </form>
        </div>

        {convert !== 0 && <div className="card mt-4 col move-center" style={{ width: 280 }}>
          <div className="card-body">
            <h5 className="card-title">Converted your {convertName}</h5>
            <h6 className="card-subtitle mb-2">
              From: {convertValue} {convertFrom}
            </h6>
            <h6 className="card-subtitle mb-2">
              To: {(Math.round(convert * 100) / 100).toFixed(2)} {convertTo}
            </h6>

          </div>
        </div>
        }
      </div>
      <div>
        {passConversions}
      </div>

    </div>
  );
}


export default App;
