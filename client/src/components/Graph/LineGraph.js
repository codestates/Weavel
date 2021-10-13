import React, { useState, Component } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { dummy } from "./data";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Container>
              {this.props.bar ? (
                <Chart
                  options={this.props.tem.options}
                  series={this.props.tem.series}
                  type="bar"
                  width="600"
                  
                />
              ) : (
                <Chart
                  options={this.props.tem.options}
                  series={this.props.tem.series}
                  type="line"
                  width="500"
                />
              )}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
