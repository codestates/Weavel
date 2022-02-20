import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
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
      <Container>
        {this.props.POPbar ? (
          <ApexCharts
            options={this.props.graphOption[1].options}
            series={this.props.graphOption[1].series}
            type="bar"
            width={this.props.chartSize}
            height="auto"
          />
        ) : this.props.REHbar ? (
          <ApexCharts
            options={this.props.graphOption[2].options}
            series={this.props.graphOption[2].series}
            type="bar"
            width={this.props.chartSize}
            height="auto"
          />
        ) : this.props.TMPline ? (
          <ApexCharts
            type="line"
            series={this.props.series}
            options={this.props.graphOption[0].options}
            width={this.props.chartSize}
            height="auto"
          />
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default LineChart;
