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

import React from 'react';
import {
  Typography,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Construct the preview of the existing eventStack
 * @param {Object} eventStack
 * @returns {JSX} elmenent
 */
const SubscriberMock = ({ eventStack }) => (
  <ExpansionPanel style={{ marginTop: '0.5rem', backgroundColor: '#697b8e' }}>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      style={{ backgroundColor: '#697b8e' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography style={{ fontSize: '0.5rem', color: '#ffffff' }}>
          SUBSCRIBER MOCKING TOOL : VALUE STACK
        </Typography>
        <Typography style={{ color: 'white' }}>
          {eventStack ? eventStack.length : 0}
        </Typography>
      </div>
    </ExpansionPanelSummary>
    {eventStack && (
      <ExpansionPanelDetails
        style={{
          display: 'block',
          padding: '0px',
          margin: '0px',
        }}
      >
        {eventStack
          .map((event, index) => (
            <Paper
              style={{
                padding: '0.5rem',
                borderBottom: '1px solid white',
              }}
              key={index}
            >
              <Typography
                variant="body1"
                style={{ color: 'black', fontSize: '0.7rem' }}
              >
                {JSON.stringify(event)}
              </Typography>
            </Paper>
          ))
          .reverse()}
      </ExpansionPanelDetails>
    )}
  </ExpansionPanel>
);

SubscriberMock.defaultProps = {
  eventStack: [],
};

SubscriberMock.propTypes = {
  eventStack: PropTypes.arrayOf(PropTypes.object),
};

export default SubscriberMock;
