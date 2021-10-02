import React from "react";
import Map from "./components/Map";
import Chart from "./components/Chart";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { data: state.data };
};

function App(store) {
  return (
    <div>
      <div className="App">
        <Map store={store} />
      </div>
      <div>
        <Chart store={store} />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
