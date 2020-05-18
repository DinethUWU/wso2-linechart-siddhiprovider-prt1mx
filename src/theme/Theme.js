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

import { createMuiTheme } from '@material-ui/core/styles';
/**
 * Add Material UI theme configurations related to the widget.
 * Currently dashboard supports two themes DARK and LIGHT
 */
export const dark = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        background: '#1a262e',
        color: '#ffffff',
      },
    },

    MuiCardHeader: {
      title: {
        color: '#fe5200',
      },
      subheader: {
        color: '#BDBDBD',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#ffffff',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#fe5200',
        '&$checked': {
          color: '#fe5200',
        },
      },
      checked: {},
    },
  },
});

export const light = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        background: 'ffffff',
        color: '#ffffff',
      },
    },
    MuiCardContent: {
      root: {
        color: 'ffffff',
        borderTopStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fe5200',
      },
    },
    MuiCardHeader: {
      title: {
        color: '#fe5200',
      },
      subheader: {
        color: '#BDBDBD',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#ffffff',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#fe5200',
      },
    },
  },
});
