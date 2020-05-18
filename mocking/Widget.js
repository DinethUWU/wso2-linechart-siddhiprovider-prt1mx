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

import { Component } from 'react';
import ChannelManager from './ChannelManager';
import widgetConf from '../resources/widgetConf.json';

/**
 * Working As a Mocking component instead of WSO2/Dashboard-Widget.
 * This part would be not included in the widget and it will load
 * from the Dashboard portal base widget.Subscribing and publishing
 * methods were included here if the widget Configuration file includes
 *  a pubsub type the methods will support
 */
export default class Widget extends Component {
  /**
   * Calling the Channel Manager
   * @returns {} ChannelManager
   */
  getWidgetChannelManager() {
    return ChannelManager;
  }

  /**
   * Publishing an event from the widget to the Golden Layout
   * @param {JSON} message
   */
  publish(message) {
    const { eventStack, updateEventStack } = this.props.simulation;
    eventStack.push({ ...message });
    updateEventStack(eventStack);
  }

  /**
   * Subscribing for events from a simulation model
   * @param {Function} callBackFunction
   */
  subscribe(callBackFunction) {
    // Registering the callback function globally
    global.callBackFunction = callBackFunction;
  }

  /**
   * Sending the json object mentioned in the widgetConf.json
   * @returns {Promise}
   */
  getWidgetConfiguration() {
    return new Promise((resolve, reject) => {
      resolve({ data: widgetConf });
    });
  }
}
