import React from "react";
import Calendar from './Calendar'

function App() {
  return (
    <div className="App">
      <Calendar row={2} column={7}  moveGrid={1} />
    </div>
  );
}
export default App;
