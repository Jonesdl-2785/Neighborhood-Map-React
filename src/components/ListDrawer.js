import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";

class ListDrawer extends Component {
  state = {
    open: false,
    query: ""
  };

  styles = {
    list: {
      width: "250px",
      padding: "0px 15px 0px",
      height: "100%",
      background: "#F0DE92",
      color: "#fff"
    },
    fullList: {
      width: "auto"
    },
    noBullets: {
      listStyleType: "none",
      padding: "0px"
    },
    listLink: {
      background: "transparent",
      border: "none",
      color: "fff"
    },
    filterEntry: {
      border: "1px solid #ccc",
      padding: "3px",
      margin: "30px 0px 10px",
      width: "100%"
    },
    listItem: {
       marginBottom: "15px",
       color: "fff"
    },
  };

  // toggleDrawer = (side, open) => () => {
  //   this.setState({
  //     [side]: open,
  //   });
  // };

  updateQuery = (newQuery) => {
    this.setState({ query: newQuery });
    this.props.filterLocations(newQuery);
  }

  render = () => {
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
          <div style={this.styles.list}>
            <input
              style={this.styles.filterEntry}
              type="text"
              placeholder="Search"
              name="filter"
              onChange={event => this.updateQuery(event.target.value)}
              value={this.state.query} />
            <ul style={this.styles.noBullets}>
              {this.props.locations &&
                this.props.locations.map((location, i) => {
                  return (
                    <li style={this.styles.listItem} key={i}>
                      <button
                          style={this.styles.listLink} key={i}
                          onClick={event => this.props.clickListItem(i)}>{location.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Drawer>
      </div>
    );
  };
}

export default ListDrawer;
