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

import {
  Card,
  CardHeader,
  CardContent,
  MuiThemeProvider,
  createMuiTheme,
  IconButton,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import Resizable from "re-resizable";
import TabIcon from "@material-ui/icons/Tab";
import PublisherMock from "./PublisherMock.jsx";
import LightBulbFillIcon from "./assets/LightBulbFill";
import LightBulbOutlineIcon from "./assets/LightBulbOutline";
import SubscriberMock from "./SubscriberMock.jsx";
import widgetConf from "../../resources/widgetConf.json";

const style = {
  resizableBox: {
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleOptionsTray: {
    float: "right",
    display: "inline",
    fontSize: "1rem"
  },
  cardContent: {
    padding: "0",
    backgroundColor: "#1a262e",
    height: "100%",
    border: "1px solid black"
  },
  optionsMenuIcon: {
    position: "absolute",
    right: "20px",
    bottom: "20px",
    color: "#ffffff"
  },
  titleName: {
    fontSize: "0.8rem",
    float: "left",
    paddingLeft: "0.5rem"
  }
};
const Theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 0
      }
    },
    MuiCardHeader: {
      root: {
        border: "1px solid black",
        height: "4%",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingRight: "0px",
        minHeight: "30px"
      },
      title: {
        fontSize: "0.5rem",
        color: "#ffffff"
      }
    },
    MuiTabs: {
      root: {
        backgroundColor: "#2d3436",
        minHeight: "0.8rem !important",
        height: "1.5rem"
      },
      flexContainer: {
        minHeight: "0.8rem !important",
        height: "1.5rem"
      }
    },

    MuiExpansionPanelSummary: {
      root: {
        minHeight: "0.8rem !important",
        height: "1.5rem"
      },
      content: {
        minHeight: "0.8rem",
        padding: "0px",
        margin: "0px"
      },
      expandIcon: {
        color: "#ffffff"
      },
      expanded: {
        minHeight: "0.8rem!important",
        margin: "0px !important"
      }
    },
    MuiButton: {
      sizeSmall: {
        fontSize: "0.5rem"
      }
    },
    MuiTab: {
      root: {
        minHeight: "0.8rem !important",
        height: "1.5rem",
        backgroundColor: "#b2bec3"
      },
      selected: {
        backgroundColor: "#dfe6e9"
      },
      labelContainer: {
        fontSize: "0.6rem"
      }
    },
    MuiGrid: {
      item: {
        marginBottom: "5px"
      }
    }
  }
});
/**
 * Frame component which is implemented to give the Dashboard Experience for a widget
 * This Frame is re-sizable Horizontally and vertically
 */
class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalView: false,
      hoverButtonColor: "#ffffff",
      buttonBaseColor: "#ffffff",
      theme: "dark",

      glContainer: { width: "100%", height: "100%", on: () => { } },
      eventStack: [],
      shouldPreviewMockSubscriber: widgetConf.configs.pubsub.types.includes(
        "publisher"
      ),
      shouldPreviewMockPublisher: widgetConf.configs.pubsub.types.includes(
        "subscriber"
      )
    };
    /** Listening to window resizing event to change the width and the height of the widget */
    window.addEventListener("resize", () => {
      this.setState({
        glContainer: {
          width: this.cardContent.clientWidth,
          height: this.cardContent.clientHeight
        }
      });
    });
  }

  /**
   *Clear the local storage which may contain the event stack of previous loading
   */
  componentWillMount() {
    window.localStorage.clear();
  }

  /**
   * Updating the dimensions to give the container specifications for the children components
   */
  componentDidMount() {
    this.setState({
      glContainer: {
        width: this.cardContent.clientWidth,
        height: this.cardContent.clientHeight
      }
    });
  }

  /**
   * Change the basic themes of the widget(DARK/LIGHT)
   * @param {String} theme representing the current theme applied
   */
  changeTheme = () => {
    this.state.theme === "light"
      ? this.setState({
        theme: "dark",
        exportButtonColor: "white",
        hoverButtonColor: "white",
        buttonBaseColor: "white"
      })
      : this.setState({
        theme: "light",
        exportButtonColor: "black",
        hoverButtonColor: "black",
        buttonBaseColor: "black"
      });
  };

  /**
   * Save the current eventStack for after use and to be accessed globally
   * @param {Object} subscriberMockValueStack : current event Stack
   */
  saveEventStackForCache = subscriberMockValueStack => {
    const savedStack = window.localStorage.getItem("subscriberMockValueStack");
    if (savedStack !== undefined) {
      window.localStorage.clear();
    }
    window.localStorage.setItem(
      "subscriberMockValueStack",
      JSON.stringify(subscriberMockValueStack)
    );
  };

  /**
   * Update the EventStack to register an event published
   * @param {Object} eventStack : existing eventStack
   */
  updateEventStack = eventStack => {
    this.saveEventStackForCache(eventStack);
    this.setState({ eventStack });
  };

  /**
   * Render the Frame Component
   * @returns JSX ComponentS
   */
  render() {
    const {
      eventStack,
      glContainer,
      theme,
      shouldPreviewMockSubscriber,
      shouldPreviewMockPublisher
    } = this.state;
    //Mapping additional props required to the props.children
    const childrenWithProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        glContainer,
        muiTheme: {
          name: this.state.theme
        },
        simulation: {
          updateEventStack: this.updateEventStack,
          eventStack
        },
        id: "Dummy ID",
        name: widgetConf.id,
        providerConfig: widgetConf.configs.providerConfig
      });
    });
    let maxHeight = "100%";
    if (shouldPreviewMockPublisher || shouldPreviewMockSubscriber) {
      if (shouldPreviewMockSubscriber && shouldPreviewMockPublisher) {
        maxHeight = "90%";
      } else {
        maxHeight = "95.5%";
      }
    }
    return (
      <MuiThemeProvider theme={Theme}>
        {shouldPreviewMockPublisher && (
          <PublisherMock eventStack={eventStack} />
        )}
        <Resizable
          ref={c => {
            this.resizable = c;
          }}
          onResizeStop={(e, direction, ref, d) => {
            this.setState({
              glContainer: {
                width: this.cardContent.clientWidth,
                height: this.cardContent.clientHeight
              }
            });
          }}
          style={style.resizableBox}
          defaultSize={{
            height: "100%",
            width: "100%"
          }}
          maxWidth={"100%"}
          maxHeight={maxHeight}
        >
          <Card style={{ height: "100%" }}>
            <CardHeader
              title={
                <div style={style.cardHeader}>
                  <Typography
                    style={
                      this.state.theme === "dark"
                        ? {
                          color: "white",
                          ...style.titleName
                        }
                        : {
                          color: "black",
                          ...style.titleName
                        }
                    }
                  >
                    {widgetConf.name}
                  </Typography>
                  <div style={style.titleOptionsTray}>
                    <IconButton
                      style={{ padding: "0" }}
                      onClick={() => {
                        this.changeTheme();
                      }}
                    >
                      {theme === "dark" ? (
                        <LightBulbFillIcon />
                      ) : (
                          <LightBulbOutlineIcon />
                        )}
                    </IconButton>
                    <IconButton
                      style={{
                        color: this.state.hoverButtonColor
                      }}
                      onMouseEnter={() =>
                        this.setState({ hoverButtonColor: "#ee6c09" })
                      }
                      onMouseLeave={() =>
                        this.setState({
                          hoverButtonColor: this.state.buttonBaseColor
                        })
                      }
                      onClick={() => {
                        this.resizable.updateSize({
                          width: "100%",
                          height: "100%"
                        });
                        // To update the dimenstions size afterwards the resizable component update
                        window.setTimeout(() => {
                          this.setState({
                            glContainer: {
                              width: this.cardContent.clientWidth,
                              height: this.cardContent.clientHeight
                            }
                          });
                        }, 0);
                      }}
                    >
                      <TabIcon />
                    </IconButton>
                  </div>
                </div>
              }
              style={
                this.state.theme === "dark"
                  ? {
                    backgroundColor: "#192830",
                    padding: "0",
                    minHeight: "1rem !important",
                    height: "1.5rem"
                  }
                  : { backgroundColor: "#ffffff", padding: "0" }
              }
            />
            <div
              ref={content => {
                this.cardContent = content;
              }}
              style={{
                height: "96%"
              }}
            >
              <CardContent
                style={
                  this.state.theme === "dark"
                    ? {
                      ...style.cardContent,
                      backgroundColor: "#1e3541"
                    }
                    : {
                      ...style.cardContent,
                      backgroundColor: "#ffffff"
                    }
                }
              >
                {childrenWithProp}
              </CardContent>
            </div>
          </Card>
        </Resizable>
        {shouldPreviewMockSubscriber && (
          <SubscriberMock eventStack={eventStack} />
        )}
      </MuiThemeProvider>
    );
  }
}

export default Frame;
