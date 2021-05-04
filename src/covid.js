import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import "./covid.css";

import {
  CountryDropdown,
} from "react-indian-state-region-selector";

export default function Covid() {
  const [a, setA] = useState();
  const [c, setC] = useState();
  const [r, setR] = useState();
  const [d, setD] = useState();
  const [arr, setArr] = useState();
  const [country, setCountry] = useState("");
  const [obj, setObj] = useState({});
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  // const rows=[],rows2=[],rows3=[];

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
      var dd = "";
      res.data.cases_time_series.map((x) => {
        dd = x.dateymd;
        var p = new Date();
        p.setFullYear(
          Number(dd.substring(0, 4)),
          Number(dd.substring(5, 7)) - 1,
          Number(dd.substring(8, 10))
        );
        rows.push([p, Number(x.dailyconfirmed)]);
        rows2.push([
          p,
          Number(x.totalconfirmed) -
            Number(x.totalrecovered) -
            Number(x.totaldeceased),
        ]);
        rows3.push([p, Number(x.dailyrecovered)]);
        
    });
      // console.log(rows2);
    });
  },[]);

  const columns = [
    {
      type: "date",
      label: "Date",
    },
    {
      type: "number",
      label: "Caeses",
    },
  ];

  return (
    <div className="covid">
      <div className="covid_title">Coivd-19 India</div>

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

      <div className="covid_trends">Covid Trends</div>
      <div className="graphs">
        {/* confirmed */}
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          rows={rows}
          columns={columns}
          options={{
            title: "Confirmed ",
            titleTextStyle: {
              color: "#AE0C33",
              fontSize: 16,
              bold: true,
            },
            hAxis: {
              gridlines: {
                color: "transparent",
              },
            },

            vAxis: {
              minValue: 0,
              gridlines: {
                color: "transparent",
              },
            },
            chartArea: { width: "80%", height: "80%" },
            backgroundColor: {
              fill: "#331427",
            },
            colors: ["#FF073A"],
            height: 400,
            width: 800,
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      </div>

      <div className="graphs">
        {/* Active */}
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          rows={rows2}
          columns={columns}
          options={{
            title: "Active ",
            titleTextStyle: {
              color: "#3366CC",
              fontSize: 16,
              bold: true,
            },
            hAxis: {
              gridlines: {
                color: "transparent",
              },
            },

            vAxis: {
              minValue: 0,
              gridlines: {
                color: "transparent",
              },
            },
            colors: ["#007BFF"],
            chartArea: { width: "80%", height: "80%" },
            backgroundColor: {
              fill: "#151D33",
            },
            height: 400,
            width: 800,
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      </div>

      <div className="graphs">
        {/* recovered */}
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          rows={rows3}
          columns={columns}
          options={{
            title: "Recovered ",
            colors: ["#28A745"],
            titleTextStyle: {
              color: "#28A644",
              fontSize: 16,
              bold: true,
            },
            hAxis: {
              gridlines: {
                color: "transparent",
              },
            },

            vAxis: {
              minValue: 0,
              gridlines: {
                color: "transparent",
              },
            },
            chartArea: { width: "80%", height: "80%" },
            backgroundColor: {
              fill: "#182829",
            },
            height: 400,
            width: 800,
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      </div>

      {/* //////////////////////////////////////////////////////////////////////////////// */}
      <div className="state">Statewise Information</div>
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

      {/* <Home/> */}
    </div>
  );
}
