import { useState, useEffect } from "react";
import { Input, Select, DatePicker, Spin } from "antd";
import AxiosService from "../services";
import HistogramChart from "../components/Histogram.component";

import BarChart from "../components/BarChart.component";
import { Option } from "antd/es/mentions";
const DashboardPage = () => {
  const options = [
    { value: 1, label: "1" },
    { value: 23, label: "23" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 25, label: "23" },
  ];
  const [filterData, setFilterData] = useState({});
  const [countryChartData, setCountryChartData] = useState([]);
  const [topicChartData, setTopicChartData] = useState([]);
  const [regionChartData, setRegionChartData] = useState([]);

  const [queryparams, setQueryParams] = useState({
    source: [],
    sector: [],
    country: [],
    topic: [],
    city: [],
    region: [],
    pestle: [],
    date: [],
  });
  useEffect(() => {
    getData();
  }, [queryparams]);

  const [data, setdata] = useState({});
  const [filterloading, setFiltersLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const getData = () => {
    console.log(queryparams);
    const fetchd = AxiosService("get", queryparams, "get-reports", setLoading);
    fetchd.then((response) => {
      console.log(response.data.data);
      const counts = {};
      const updatedData = []
      const regioncounts = {};
      const regionupdatedData =[]
      response.data.data.map((item) => {
        const fieldValue = item.country;

        if (!counts[fieldValue]) {
          counts[fieldValue] = 1;
          const previousEntry = updatedData.find(entry => entry.country === fieldValue);
          if (previousEntry) {
            previousEntry.countrycount = counts[fieldValue];
          }
        }  else {
            counts[fieldValue] = 1;
            updatedData.push({ country: fieldValue, countrycount: counts[fieldValue] });
          }
        
      
      });
      setCountryChartData(updatedData)
      response.data.data.map((item) => {
        const fieldValue = item.region;

        if (!regioncounts[fieldValue]) {
            regioncounts[fieldValue] = 1;
          const previousEntry = regionupdatedData.find(entry => entry.region === fieldValue);
          if (previousEntry) {
            previousEntry.regioncount = regioncounts[fieldValue];
          }
        }  else {
            regioncounts[fieldValue] = 1;
            regionupdatedData.push({ region: fieldValue, regioncount: counts[fieldValue] });
          }
        
      
      });
      setRegionChartData(regionupdatedData);
      setdata(response.data.data);
    });
  };
  useEffect(() => {
    const fetchfilters = AxiosService(
      "get",
      filterData,
      "get-filters-data",
      setFiltersLoading
    );
    fetchfilters.then((response) => {
      console.log(response.data);
      setFilterData(response.data);
    });
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) setLoading(false);
  }, [data]);

  return (
    <>
      {filterloading ? (
        <div style={{width:'100%',height:'100vh',  } } className='d-flex'><Spin size='large' style={{margin:'auto'}}></Spin></div>
        
      ) : (
        <div>
        <div className=" d-flex  flex-column p-3 mx-3 font-weight-bold">
          <div className=" d-flex  row mb-3 ">
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select source</label>
              {/* <p className="mb-0">select source</p> */}
              <Select
                className="form-control floating select-container "
                mode="tags"
                bordered={false}
                placeholder="select source"
                allowClear={true}
                value={queryparams.source ? queryparams.source : []}
                // autoFocus={true}
                maxTagCount={1}
                maxTagTextLength={10}
                onChange={(event) => {
                  console.log(event);
                  setQueryParams((queryparams) => {
                    return { ...queryparams, source: event };
                  });
                }}
                // options={filterData?.sources}
              >
                {console.log(filterData)}
                {filterData?.sources.map((source) => (
                  <Option key={source} value={source}>
                    {" "}
                    {source}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select sector </label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select sector "
                allowClear={true}
                // autoFocus={true}
                maxTagCount={1}
                maxTagTextLength={10}
                value={queryparams.sector ? queryparams.sector : []}
                onChange={(event) => {
                  setQueryParams({ ...queryparams, sector: event });
                }}
                // options={filterData?.sectors}
              >
                {filterData?.sectors.map((sector) => (
                  <Option key={sector} value={sector}>
                    {sector}{" "}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select topic </label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select topic"
                allowClear={true}
                // autoFocus={true}
                maxTagCount={1}
                value={queryparams.topic ? queryparams.topic : []}
                maxTagTextLength={10}
                onChange={(event) => {
                  setQueryParams({ ...queryparams, topic: event });
                }}
                // options={filterData?.topics}
              >
                {filterData?.topics.map((topic) => (
                  <Option key={topic} value={topic}>
                    {topic}{" "}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select country </label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select country "
                allowClear={true}
                value={queryparams.country ? queryparams.country : []}
                // autoFocus={true}
                maxTagCount={1}
                maxTagTextLength={10}
                onChange={(event) => {
                  setQueryParams({ ...queryparams, country: event });
                }}
                // options={filterData?.countires}
              >
                {console.log(filterData)}
                {filterData?.countires.map((country) => (
                  <Option key={country} value={country}>
                    {country}{" "}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select city </label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select city"
                allowClear={true}
                value={queryparams.city ? queryparams.city : []}
                // autoFocus={true}
                maxTagCount={1}
                maxTagTextLength={10}
                onChange={(event) => {
                  setQueryParams({ ...queryparams, city: event });
                }}
              >
                {filterData?.countires.map((country) => (
                  <Option key={country} value={country}>
                    {country}{" "}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-4 col-md-3">
              <label className="mb-0">select region </label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select region"
                allowClear={true}
                value={queryparams.region ? queryparams.region : []}
                // autoFocus={true}
                maxTagCount={1}
                maxTagTextLength={10}
                onChange={(event) => {
                  setQueryParams({ ...queryparams, region: event });
                }}
                // options={filterData?.regions}
              >
                {filterData?.regions.map((region) => (
                  <Option key={region} value={region}>
                    {" "}
                    {region}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-sm-4 col-md-3">
              <label className="mb-0"> select pestle</label>
              <Select
                className="form-control floating "
                mode="tags"
                bordered={false}
                placeholder="select pestle"
                allowClear={true}
                // autoFocus={true}
                maxTagCount={1}
                value={queryparams.pestle ? queryparams.pestle : []}
                maxTagTextLength={10}
                onChange={(event) => {
                  console.log(queryparams);
                  setQueryParams({ ...queryparams, pestle: event });
                }}
                // options={filterData?.pestle}
              >
                {filterData?.pastle.map((item) => (
                  <Option key={item} value={item}>
                    {item}{" "}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="clo-md-3 clo-sm-4">
              <label>select date</label>
              <DatePicker
                size="large"
                bordered={false}
                className="form-control"
              />
            </div>
            <div className=" row mb-0">
              <button
                className="btn btn-outline-danger align-item-center my-4 px-4 mx-4"
                style={{ height: "45%" }}
                onClick={() => {
                  setQueryParams({
                    source: [],
                    sector: [],
                    country: [],
                    topic: [],
                    city: [],
                    region: [],
                    pestle: [],
                    date: [],
                  });
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="row">
            <div className="col-md-3">
                
              {console.log(loading)}
              <BarChart data={data} field="intensity" binSize={15} chartName='Intensity Chart'/>
            </div>
            <div className="col-md-3">
              <BarChart data={data} field="likelihood" binSize={5} chartName='Likelihood Chart' />
            </div>
            <div className="col-md-3">
              <BarChart data={data} field="impact" binSize={5}  chartName='Impact Chart'/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              {console.log(countryChartData)}
              <HistogramChart Data={countryChartData} field="country" Frequency='countrycount' chartName='Country Chart'/>
            </div>
            <div className="col-md-3">
            <HistogramChart Data={regionChartData} field="region" Frequency='regioncount' chartName='Region Chart'/>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        </div>
      )}
      
    </>
  );
};
export default DashboardPage;
