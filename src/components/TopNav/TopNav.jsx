import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./TopNav.css";

const getGroup = () => {

  if(localStorage.getItem("group")){
    return localStorage.getItem("group");
  }else{
    return "status";
  }
}

const getOrder = () => {
  if(localStorage.getItem("order")){
    return localStorage.getItem("order");
  }else{
    return "priority";
  }
}
const TopNav = ({ setSelectedData, apiData }) => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());

  const handleGroupValue = (e, valueBool) => {
    if(valueBool){
      setGroupValue(e.target.value);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("group", e.target.value);
    }else{
      setOrderValue(e.target.value);
    setDisplayOnClick(!displayOnClick);
    localStorage.setItem("order", e.target.value);
    setSelectedData([]);
    }
  }

  useEffect(() => {

    const allTickets = apiData.tickets
    const isUserOnline = (userId) => {
      return apiData.users.find(user => user.id === userId).available;
    }
    const createSelectedData = () => {
      try {
        const selectedData = {};

        if (groupValue === "priority") {
          allTickets.forEach(ticket => {
            const priority = ticket.priority;
            if (!selectedData[priority]) {
              selectedData[priority] = [];
            }
            ticket["isOnline"] = isUserOnline(ticket.userId);
            selectedData[priority].push(ticket);
          });
        } else if (groupValue === "status") {
          allTickets.forEach(ticket => {
            const status = ticket.status;
            if (!selectedData[status]) {
              selectedData[status] = [];
            }
            ticket["isOnline"] = isUserOnline(ticket.userId);
            selectedData[status].push(ticket);
          });
        } else {
          allTickets.forEach(ticket => {
            const user = apiData.users.find((user) => user.id === ticket.userId)?.name;
            if (!selectedData[user]) {
              selectedData[user] = [];
            }
            ticket["isOnline"] = isUserOnline(ticket.userId);
            selectedData[user].push(ticket);
          });
        }

        if (orderValue === "title") {
          for (const elem in selectedData) {
            selectedData[elem].sort((a, b) => a.title.localeCompare(b.title));
          }
        }

        if (orderValue === "priority") {
          for (const elem in selectedData) {
            selectedData[elem].sort((a, b) => b.priority - a.priority);
          }
        }
        setSelectedData(selectedData)

      } catch (error) {
      }
    }

    createSelectedData();
  }, [groupValue, orderValue, setSelectedData, apiData]);
 
  
  return (
    <div className="top-header" style={{paddingLeft : "10px"}}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          {" "}
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <>
            <div className="dropOnClick flex-gap-10 p-10">
              <div className="selectGroup flex-sb">
                <span>Grouping</span>
                <select value={groupValue} onChange={(e) => handleGroupValue(e, true)} className="selectStyle" name="group" id="group">
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="selectGroup flex-sb">
                <span>Ordering</span>
                <select value={orderValue} onChange={(e) => handleGroupValue(e, false)} className="selectStyle" name="order" id="order">
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
