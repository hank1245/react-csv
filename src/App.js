import "./App.css";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useEffect, useState } from "react";

const ExcelDownload = ({ data }) => {
  return (
    <button>
      <CSVLink data={data} filename="users.csv" target="_blank">
        Export Excel
      </CSVLink>
    </button>
  );
};

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://cs-tool-api.seedn.info/table/slaveDevice?page=1&limit=10"
      );
      setData([...response.data.result]);
    };
    getData();
  }, []);
  return (
    <div>
      <ExcelDownload data={data} />
    </div>
  );
}

export default App;
