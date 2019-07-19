import React from "react";
import Calendar from './Calendar'

function App() {
  return (
    <div className="App">
      <Calendar row={7} column={7}  moveGrid={3} />
    </div>
  );
}
export default App;
