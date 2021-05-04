import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import "./covid.css";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";

export default function Covid() {
  const [a, setA] = useState();
  const [c, setC] = useState();
  const [r, setR] = useState();
  const [d, setD] = useState();
  const [arr, setArr] = useState();
  const [country, setCountry] = useState("");
  const [obj, setObj] = useState({});
  const [rows,setRows] = useState([]);

  const selectCountry = (val) => {
    setCountry(val);
    let ob = arr.find((o) => o.state === val);
    setObj(ob);
  };



  useEffect(() => {
    axios.get("https://api.covid19india.org/data.json").then((res) => {
      setA(res.data.statewise[0].active);
      setC(res.data.statewise[0].confirmed);
      setR(res.data.statewise[0].recovered);
      setD(res.data.statewise[0].deaths);
      setArr(res.data.cases_time_series);
    });
    axios.get("https://api.covid19india.org/data.json").then((res) => {
      setArr(res.data.statewise);
      var dd ="";
      res.data.cases_time_series.map((x)=>{
        dd=x.dateymd;
        var p = new Date();
        p.setFullYear(Number(dd.substring(0,4)),Number(dd.substring(5,7))-1,Number(dd.substring(8,10)));
        rows.push([p,Number(x.totalconfirmed)]);
      })

    });

    
  }, []);
  

  const columns = [
    {
      type:'date',
      label:"Date"
    },
    {
      type: "number",
      label: "Total Confirmed Caeses"
    },
  ];
  

  return (
    <div className="covid">
      <div className="covid_title">
        <h2>Coivd-19 India</h2>
      </div>

      <div className="total_india">
        <div className="confirmed">
          <h3>Confirmed</h3>
          <div className="c_cases">
            {obj !== undefined ? <div>{c}</div> : <div></div>}
          </div>
        </div>
        <div className="active">
          <h3>Active</h3>
          <div className="a_cases">
            {a !== undefined ? <div>{a}</div> : <div></div>}
          </div>
        </div>
        <div className="recovered">
          <h3>Recovered</h3>
          <div className="r_cases">
            {r !== undefined ? <div>{r}</div> : <div></div>}
          </div>
        </div>
        <div className="deceased">
          <h3>Deceased</h3>
          <div className="d_cases">
            {d !== undefined ? <div>{d}</div> : <div></div>}
          </div>
        </div>
      </div>

      <div className="graphs">
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
       
        rows={rows}
          columns={columns}
        options={{
         title:"Total Confirmed Cases Timeline in India",
         titleTextStyle:{
          color:'#3366CC',
          fontSize:16,
          bold:true,
         },
          hAxis: {
          gridlines: {
            color: 'transparent'
        }},
        // legendTextStyle: { color: 'red' },
          vAxis: { minValue: 0,
            gridlines: {
              color: 'transparent'
          } },
          chartArea: { width: "80%", height: "80%"},
          backgroundColor: {
            fill: '#151D33',
          },
          height:400,
          width:800
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
      </div>

      <div>
        <CountryDropdown
          className="drop_down"
          value={country}
          onChange={(val) => selectCountry(val)}
        />
      </div>

      <div className="country">
        <h2>{country}</h2>
      </div>

      <div className="total_india">
        <div className="confirmed">
          <h3>Confirmed</h3>
          <div className="c_cases">
            {obj !== undefined ? <div>{obj.confirmed}</div> : <div></div>}
          </div>
        </div>
        <div className="active">
          <h3>Active</h3>
          <div className="a_cases">
            {obj !== undefined ? <div>{obj.active}</div> : <div></div>}
          </div>
        </div>
        <div className="recovered">
          <h3>Recovered</h3>
          <div className="r_cases">
            {obj !== undefined ? <div>{obj.recovered}</div> : <div></div>}
          </div>
        </div>
        <div className="deceased">
          <h3>Deceased</h3>
          <div className="d_cases">
            {obj !== undefined ? <div>{obj.deaths}</div> : <div></div>}
          </div>
        </div>
      </div>

      
    </div>
  );
}
