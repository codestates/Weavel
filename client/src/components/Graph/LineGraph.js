import React, { Component } from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

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
      <Container>
        {this.props.POPbar ? (
          <ApexCharts
            options={this.props.graphOption[1].options}
            series={this.props.graphOption[1].series}
            type="bar"
            width="1000"
            height="300"
          />
        ) : this.props.REHbar ? (
          <ApexCharts
            options={this.props.graphOption[2].options}
            series={this.props.graphOption[2].series}
            type="bar"
            width="1000"
            height="300"
          />
        ) : this.props.TMPline ? (
          <ApexCharts
            options={this.props.graphOption[0].options}
            series={this.props.graphOption[0].series}
            type="line"
            width="1000"
            height="300"
          />
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default LineChart;
