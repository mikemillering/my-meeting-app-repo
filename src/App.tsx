import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [display, setDisplay] = useState(<></>);
  const [updateDisplay, setUpdateDisplay] = useState(true);
  const [meetingDisplay, setMeetingDisplay] = useState(<></>);
  const [displayToggle, setDisplayToggle] = useState(true);

  useEffect(() => {
    setDisplay(
      <div>
        {list.map((item, key) => (
          <div className="col" key={key}>
            <div className="card pt-1 pb-0 m-0">
              <p className="m-0" style={{ fontSize: "15px" }}>
                {item[0]}
              </p>
              <p className="m-0" style={{ fontSize: "10px" }}>
                {" Duration: " + item[1] + " seconds"}
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary p-1 mt-1"
              onClick={() => {
                removeItem(key);
              }}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    );
  }, [updateDisplay, list]);

  function addItem() {
    if (itemInput !== "" && durationInput !== "") {
      setList([...list, [itemInput, Number(durationInput)]]);
      setItemInput("");
      setDurationInput("");
      setDisplayToggle(true);
    }
  }

  function removeItem(key) {
    const updatedList = [...list];
    updatedList.splice(key, 1);
    setList(updatedList);
    setUpdateDisplay(!updateDisplay);
  }

  function startMeeting() {
    const meetingItems = list.map((item, key) => (
      <div className="card pt-1 pb-0 m-0" key={key}>
        <p className="m-0" style={{ fontSize: "15px" }}>
          {item[0]}
        </p>
        <p className="m-0" style={{ fontSize: "10px" }}>
          {" Duration: " + item[1] + " seconds"}
        </p>
      </div>
    ));
    setMeetingDisplay(meetingItems);
    setDisplayToggle(false);
  }

  function handleItemInput(e) {
    setItemInput(e.target.value);
  }

  function handleDurationInput(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setDurationInput(e.target.value);
    }
  }

  return (
    <>
      <div className="card p-2 m-2">
        <input
          className="form-control mb-1"
          type="text"
          value={itemInput}
          placeholder="Item"
          onChange={handleItemInput}
        />
        <input
          className="form-control mb-1"
          type="text"
          value={durationInput}
          placeholder="Duration"
          onChange={handleDurationInput}
        />
        <button className="btn btn-outline-secondary" onClick={addItem}>
          Add
        </button>
      </div>
      <div className="card p-2 m-2">{displayToggle ? display : null}</div>
      <div className="card p-2 m-2">
        <button className="btn btn-outline-secondary" onClick={startMeeting}>
          Start Meeting
        </button>
        {meetingDisplay}
      </div>
    </>
  );
}

export default App;
