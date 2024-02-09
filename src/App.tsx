import { ChangeEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [list, setList] = useState<[string, number][]>([]);
  const [itemInput, setItemInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [display, setDisplay] = useState(<></>);
  const [updateDisplay, setUpdateDisplay] = useState(true);
  const [meetingDisplay, setMeetingDisplay] = useState([<></>]);
  const [startToggle, setStartToggle] = useState(false);
  const [listToggle, setListToggle] = useState(true);

  useEffect(() => {
    setDisplay(
      <div>
        {list.map((item, key) => (
          <div className="row" key={key}>
            <div className="col-8 pt-1 pb-0 m-0">
              <p className="m-0" style={{ fontSize: "15px" }}>
                {item[0]}
              </p>
              <p className="m-0" style={{ fontSize: "10px" }}>
                {" Duration: " + item[1] + " seconds"}
              </p>
            </div>
            <div className="col-4">
              <button
                className="btn btn-sm btn-outline-secondary p-1 mt-1"
                onClick={() => {
                  removeItem(key);
                }}
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [updateDisplay, list]);

  useEffect(() => {
    if (listToggle === true) {
      setStartToggle(false);
    } else {
      setStartToggle(true);
    }
  }, [listToggle]);

  function addItem() {
    if (itemInput !== "" && durationInput !== "") {
      setList([...list, [itemInput, Number(durationInput)]]);
      setItemInput("");
      setDurationInput("");
      setListToggle(true);
    }
  }

  function removeItem(key: number) {
    const updatedList = [...list];
    updatedList.splice(key, 1);
    setList(updatedList);
    setUpdateDisplay(!updateDisplay);
  }

  function startMeeting() {
    if (listToggle === true) {
      const meetingItems = list.map((item, key) => (
        <div className="pt-1 pb-0 m-0" key={key}>
          <p className="m-0" style={{ fontSize: "15px" }}>
            {item[0]}
          </p>
          <p className="m-0" style={{ fontSize: "10px" }}>
            {" Duration: " + item[1] + " seconds"}
          </p>
          (countdown progress bar here)
        </div>
      ));
      setMeetingDisplay(meetingItems);
      setListToggle(!listToggle);
    } else {
      setMeetingDisplay([<></>]);
      setListToggle(!listToggle);
    }
  }

  function handleItemInput(e: ChangeEvent<HTMLInputElement>) {
    setItemInput(e.target.value);
  }

  function handleDurationInput(e: ChangeEvent<HTMLInputElement>) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setDurationInput(e.target.value);
    }
  }

  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container bg-dark bg-gradient rounded text-white">
          <h1 className="display-4">Meeting App</h1>
          <p className="lead">It makes meetings end ontime.</p>
        </div>
      </div>
      {listToggle ? (
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
      ) : null}
      <div className=" p-2 m-2">{listToggle ? display : null}</div>
      <div className="p-2 m-2">
        <button
          className="btn btn-outline-secondary start-button mb-2"
          onClick={startMeeting}
        >
          {startToggle ? "End Meeting" : "Start Meeting"}
        </button>
        {meetingDisplay}
      </div>
    </div>
  );
}

export default App;

{
  /*

*/
}
