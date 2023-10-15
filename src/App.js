import React, { useEffect, useState } from 'react'
import './App.css';
// import { useDispatch, useSelector} from 'react-redux'
// import Card from './components/Card/Card';
import TopNav from './components/TopNav/TopNav';
import DashView from './components/DashBoard/DashView';
// import { fetchAllData } from './Actions/DataAction';
// import Loading from './components/Loading/Loading';

const App = () => {
  const URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
  const [apiData, setApiData] = useState({}); 
  const [selectedData, setSelectedData] = useState([]);
   
  useEffect(() => {
  fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data)
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return  (
    <div style={{paddingTop : "10px"}} >
      <TopNav setSelectedData={setSelectedData} apiData={apiData}/>
      {/* <hr style={{marginTop : "10px"}} /> */}
      <DashView selectedData={selectedData}/>
    </div>
  );
}

export default App