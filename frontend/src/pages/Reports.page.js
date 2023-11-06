import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Table } from "antd";
import AxiosService from "../services";

export default function Reports() {
  const { range, reportType } = useParams();
  const columns = [
    {
        title: 'Intensity',
        dataIndex: 'intensity',
        key: 'intensity',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Sector',
        dataIndex: 'sector',
        key: 'sector',
      },
      {
        title: 'Link',
        key: 'url',
        render :(text,record)=>(
            <a href={record.url} target="_blank" rel="noopener noreferrer">
                View Details 
                </a>
        )
      },
      {
        title: 'Impact',
        dataIndex: 'impact',
        key: 'impact',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Likelihood',
        dataIndex: 'likelihood',
        key: 'likelihood',
      },
  ]

  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsData, setReportsData] = useState([]);
  const [pagination,setPagination] = useState( {
    pageSize: 10, // Number of items per page
    showSizeChanger: true, // Allow users to change the page size
    showQuickJumper: true, // Allow users to jump to a specific page
    total: reportsData.length, // Total number of items
    pageNumber :1
  })

  useEffect(() => {
    console.log(range, reportType)
    const reports = AxiosService("get", {range:range,reporttype: reportType, page:pagination['pageNumber']},'get-reports-in-range', setReportsLoading);
    reports.then((response) => {
      setReportsData(response.data.data);
    });
  }, []);
  return (
    <Table
    dataSource={reportsData}
    columns={columns}
    pagination={pagination}
  />
  )
}
