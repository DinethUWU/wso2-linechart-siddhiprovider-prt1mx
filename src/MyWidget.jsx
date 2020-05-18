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

import React from "react";
import VizG from "react-vizgrammar";
//  This import will be replaced after the build process to load @wso2-dashboard/widget
import Widget from "../mocking/Widget";

/**
 * This class holds all the data relevant to the widget you can manipulate the code
 * and see the view real time using the preview area. If you need full screen view you
 * can use https://wso2-multibarchart.stackblitz.io
 * All the things included in here will also be there in the widget after the build process
 */

const CHART_CONFIGS = {
  x_axis: "continent",
  y_axis: "lifeExpectancy"
};
export class MyWidget extends Widget {
  state = {
    values: {},
    metadata: {},
    DataSet: []
  };

  /**
   * Obtain the Channel Manager via the Widget and passing the data to the relevant Widget in the golden layout.
   */
  componentDidMount() {
    const { id, widgetID } = this.props;
    super.getWidgetConfiguration(widgetID).then(message => {
      console.log("object :", message.data.configs.providerConfig);
      super
        .getWidgetChannelManager()
        .subscribeWidget(
          id,
          this.formatDataToVizGrammar,
          message.data.configs.providerConfig
        );
    });

    // Registering glContainer resizing event on dashboard portal
    this.props.glContainer.on("resize", () => this.forceUpdate());
  }

  /**
   * Formatting data loaded using the Siddhi Data Provider to fit the Vizgrammar chart
   * @param {JSON} stats
   */
  formatDataToVizGrammar = stats => {
    if (stats.metadata != undefined) {
      const metaName_arr = [];
      const metaType_arr = [];
      stats.metadata.names.map(el => {
        metaName_arr.push(el);
      });
      stats.metadata.types.map(el => {
        metaType_arr.push(el.toLowerCase());
      });
      const metaVals = { ...this.state.metadata };
      metaVals.names = metaName_arr;
      metaVals.types = metaType_arr;

      this.setState({
        metadata: metaVals,
        DataSet: stats.data
      });
    }
  };

  /**
   * Rendering the bar chart according to the configuration file
   * to view more about Viz-Grammar configurations please visit https://wso2.github.io/react-vizgrammar
   * @returns {JSX}
   */
  render() {
    const { metadata, DataSet } = this.state;
    const { glContainer, muiTheme } = this.props;
    const { x_axis, y_axis } = CHART_CONFIGS;
    return (
      <VizG
        config={{
          x: x_axis,
          charts: [
            {
              type: "line",
              y: y_axis,
              fill: "#00C853"
            }
          ],
          axisTickLength: 6,
          interactiveLegend: true,
          legend: true,
          legendOrientation: "bottom",
          animate: true
        }}
        metadata={metadata}
        data={DataSet}
        theme={muiTheme.name}
        height={glContainer.height}
        width={glContainer.width}
      />
    );
  }
}

// Verifying that the dashboard availability to register the widget in the portal
if (global.dashboard) {
  /**
   * @param widgetID - widgetID mentioned in the widgetConf.json
   * @param className - Current className
   */
  global.dashboard.registerWidget("linechart-siddhiprovider", MyWidget);
}
