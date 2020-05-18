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

//  Code related to copying the widget can be found here
const readline = require('readline');
const chalk = require('chalk');
const CFonts = require('cfonts');
const fs = require('fs-extra');
const widgetConf = require('./resources/widgetConf.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const WIDGETS_LOCATION = `/wso2/dashboard/deployment/web-ui-apps/portal/extensions/widgets/${
  widgetConf.id
}`;
const BUILT_DIRECTORY = `./${widgetConf.id}`;
const WIDGET_FOLDER = '/wso2/dashboard/deployment/web-ui-apps/portal/extensions/widgets';

// Producing Stream Processor Text
CFonts.say('STREAM PROCESSOR', {
  font: 'block', // define the font face
  align: 'center', // define text alignment
  colors: ['system'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
});

/**
 * You can use this method to raise the questions to get directory of SP Home
 */
function fileCopy() {
  rl.question(
    chalk.bold.blue('Enter Location of <SP HOME> directory : '),
    (location) => {
      fs.exists(location + WIDGET_FOLDER, (exist) => {
        if (exist) {
          fs.copy(BUILT_DIRECTORY, location + WIDGETS_LOCATION)
            .then(() => {
              console.log(
                chalk.bold.green('\nCOPPIED SUCCESSFULLY !!! \n\n\tFROM\t:'),
                chalk.bold.yellow(WIDGETS_LOCATION),
                chalk.bold.green('\n\tTO\t:'),
                chalk.bold.yellow(location + WIDGETS_LOCATION, '\n'),
              );

              rl.close();
            })
            .catch((error) => {
              console.log(chalk.bold.green('Copy failure !!!!', error));
            });
        } else {
          chalk.bold.blue('Enter Location of <SP HOME> directory : ');
          rl.question(
            chalk.bold.red(
              `Location : ${location} is not a valid destination if you want to retry enter 'Y' : `,
            ),
            (userFeedback) => {
              if (['y', 'Y', 'Yes', 'YES'].includes(userFeedback)) {
                fileCopy();
              } else {
                rl.close();
              }
            },
          );
        }
      });
    },
  );
}

// Executing the filecopy method
fileCopy();
