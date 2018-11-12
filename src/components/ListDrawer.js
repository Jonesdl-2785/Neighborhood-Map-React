import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";



class ListDrawer extends Component {
  state = {
    open: false,
    search: ""
  };
  //material-ui.com/demos/drawers/#temporary-drawer
  //https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/drawers/TemporaryDrawer.js
    styles = ({
      list: {
        width: "300",
        height: "100vh",
        padding: "0px 15px 0px",
        background: "#F0DE92",
        // backgroundColor: theme.palette.background.paper,
      },
      fullList: {
        width: 'auto',
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
    });

  toggleDrawer = (side, open) => () => {
     this.setState({
       [side]: open,
     });
   };

  updateSearch = (newSearch) => {
    this.setState({ search: newSearch });
    this.props.filterLocations(newSearch);
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
              aria-labelledby="Search for a location"
              role="search"
              onChange={event => this.updateSearch(event.target.value)}
              value={this.state.search} />
            <ul style={this.styles.noBullets} tabIndex="1">
              {this.props.locations &&
                this.props.locations.map((location, i) => {
                  return (
                    <li style={this.styles.listItem} key={i} tabIndex="2" >
                      <button tabIndex="0"
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
