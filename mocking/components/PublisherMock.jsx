/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  Tabs,
  Tab,
  Typography,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  FormControl
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Assignment from "@material-ui/icons/Assignment";
import Code from "@material-ui/icons/Code";
import DateTimePicker from "react-datetime-picker";
import SubscriberMock from "./SubscriberMock";

import JSONInput from "react-json-editor-ajrm";
import moment from "moment";

export class PublisherMock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriberModel: "date-range-picker",
      startDate: 1514745000000,
      endDate: 1546281000000,
      simulationEventCount: 0,
      granularity: "month",
      theme: "dark",
      rawDatePickerJSON: {
        from:1514745000000,
        to:1546281000000,
        granularity:"month"
      },
      rawJSON: {
        key1: "value1",
        key2: {
          subKey1: "subValue1",
          subKey2: "subValue2"
        }
      },
      datepickerView: "design",
      tabIndex: 0
    };
  }

  /**
   * Render the subscriber Configurations including publisher simulation
   * @param {JSON} eventStack - Current Event Stack
   * @returns {JSX}
   */
  renderSubscriberConfigs = eventStack => {
    const { subscriberModel } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            paddingBottom: "1rem"
          }}
        >
          <Button
            variant={
              subscriberModel === "date-range-picker" ? "contained" : "outlined"
            }
            size="small"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={() =>
              this.setState({
                subscriberModel: "date-range-picker"
              })
            }
          >
            Date Range Picker
          </Button>
          |
          <Button
            variant={
              subscriberModel === "raw-value-publisher"
                ? "contained"
                : "outlined"
            }
            size="small"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() =>
              this.setState({
                subscriberModel: "raw-value-publisher"
              })
            }
          >
            Raw Value Publisher
          </Button>
        </div>
        {subscriberModel === "date-range-picker"
          ? this.renderDateRangePicker(eventStack)
          : this.renderRawValuePublisher(eventStack)}
        <SubscriberMock eventStack={eventStack} />
      </div>
    );
  };

  /**
   * Rendering Date picker view which will include the from and to date pickers and granularity selector
   * @param {JSON} eventStack - stack that contains the event
   * @returns {JSX }
   */
  renderDatePickerDesignView = eventStack => {
    const { startDate, endDate, granularity } = this.state;
    return (
      <div>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid container>
              <Grid item lg={2} xs={3}>
                <span>From : </span>
              </Grid>
              <Grid item lg={10} xs={9}>
                <DateTimePicker
                  onChange={date => {
                    this.setState({
                      startDate: date.getTime()
                    });
                  }}
                  value={new Date(startDate)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid container>
              <Grid item lg={2} xs={3}>
                <span>To : </span>
              </Grid>
              <Grid item lg={10} xs={9}>
                <DateTimePicker
                  onChange={date => {
                    this.setState({
                      endDate: date.getTime()
                    });
                  }}
                  value={new Date(endDate)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid container>
              <Grid item xs={6}>
                <FormControl>
                  <Select
                    value={granularity}
                    onChange={event => {
                      this.setState({
                        granularity: event.target.value
                      });
                    }}
                  >
                    <MenuItem value={"second"}>second</MenuItem>
                    <MenuItem value={"minute"}>minute</MenuItem>
                    <MenuItem value={"hour"}>hour</MenuItem>
                    <MenuItem value={"day"}>day</MenuItem>
                    <MenuItem value={"month"}>month</MenuItem>
                    <MenuItem value={"year"}>year</MenuItem>
                  </Select>
                  <FormHelperText>Granularity</FormHelperText>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  size={"small"}
                  color={"primary"}
                  onClick={() =>
                    this.handleValuePublish(
                      {
                        from: moment(startDate).format("x"),
                        to: moment(endDate).format("x"),
                        granularity
                      },
                      eventStack
                    )
                  }
                  style={{
                    backgroundColor: "#333333",
                    color: "white",
                    float: "right"
                  }}
                >
                  Publish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              this.setState({ datepickerView: "JSON" });
            }}
          >
            <Code /> JSON View
          </Button>
        </div>
      </div>
    );
  };

  /**
   * Render JSON view component for the Design view
   */
  renderDatePickerJSONView = (defaultJSON, eventStack) => {
    const { rawDatePickerJSON, startDate, endDate, granularity } = this.state;
    return (
      <div>
        <JSONInput
          id="a_unique_id"
          placeholder={defaultJSON}
          height={"25%"}
          width={"100%"}
          theme={"light_mitsuketa_tribute"}
          style={{ body: { fontSize: "0.6rem" } }}
          onChange={rawDatePickerJSON => this.setState({ rawDatePickerJSON:rawDatePickerJSON.jsObject })}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "0.5rem"
          }}
        >
          <Button
            size={"small"}
            onClick={() =>
              this.handleValuePublish(
                rawDatePickerJSON || {
                  from: startDate,
                  to: endDate,
                  granularity
                },
                eventStack
              )
            }
            style={{
              backgroundColor: "#333333",
              color: "white",
              padding: "5px"
            }}
          >
            Publish
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size={"small"}
            onClick={() => {
              const { from, to, granularity } = rawDatePickerJSON;
              this.setState({
                datepickerView: "design",
                startDate: from,
                endDate: to,
                granularity
              });
            }}
          >
            <Assignment /> Design View
          </Button>
        </div>
      </div>
    );
  };
  /**
   * Render the Raw value publishing component
   */
  renderRawValuePublisher = eventStack => {
    const { rawJSON } = this.state;
    return (
      <div style={{ boarder: "1px solid black" }}>
        <JSONInput
          id="a_unique_id"
          placeholder={rawJSON}
          height={"100%"}
          width={"100%"}
          theme={"light_mitsuketa_tribute"}
          style={{ body: { fontSize: "0.8rem" } }}
          onChange={rawJSON => this.setState({ rawJSON: rawJSON.jsObject })}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "0.5rem",
            paddingRight: "0.5rem"
          }}
        >
          <Button
            size={"small"}
            color={"primary"}
            onClick={() => this.handleValuePublish(rawJSON, eventStack)}
            style={{
              backgroundColor: "#333333",
              color: "white"
            }}
          >
            Publish
          </Button>
        </div>
      </div>
    );
  };

  /**
   * Render the custom publisher component
   * @param {JSON} eventStack
   * @returns {JSX}
   */
  renderDateRangePicker = eventStack => {
    const { startDate, endDate, granularity, datepickerView } = this.state;
    return (
      <div style={{ border: "1px solid black", padding: "0.5rem" }}>
        {datepickerView === "design"
          ? this.renderDatePickerDesignView(eventStack)
          : this.renderDatePickerJSONView(
              {
                from: startDate,
                to: endDate,
                granularity
              },
              eventStack
            )}
      </div>
    );
  };

  /**
   * Handle Custom date event publishing
   * @param {JSON} eventStack - Current Event Stack
   * Updates the eventStack
   */

  handleValuePublish = JSONObject => {
    localStorage.setItem('JSONObject', JSON.stringify(JSONObject));
    global.callBackFunction(JSONObject);
  };

  /**
   * Rendering the Settings Panel Component
   * @returns {JSX}
   */
  render() {
    const { eventStack } = this.props;
    const { tabIndex } = this.state;

    return (
      <div style={{ marginBottom: "0.5rem" }}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            style={{
              backgroundColor: "#697b8e",
              margin: 0,
              padding: 0
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                color: "#ffffff",
                fontSize: "0.5rem",
                fontWeight: "bold",
                paddingLeft: "0.5rem"
              }}
            >
              PUBLISHER MOCKING TOOL
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{
              border: "1px solid #2d3436",
              margin: "0px",
              padding: "0px",
              display: "block"
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={(value, event) => {
                this.setState({ tabIndex: event });
              }}
              fullWidth
            >
              <Tab label="Date range Picker" />
              <Tab label="Raw Value Publisher" />
            </Tabs>

            {tabIndex === 0 && this.renderDateRangePicker(eventStack)}
            {tabIndex === 1 && this.renderRawValuePublisher(eventStack)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default PublisherMock;
