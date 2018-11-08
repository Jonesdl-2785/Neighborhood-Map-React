import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";

class VenueDrawer extends Component {
  state = {
    open: false,
    query: ""
  };

  styles = {
    list: {
      width: "250px"
    },
    fullList: {
      width: "auto"
    },
    noBullets: {
      listStyleType: "none",
      padding: 0
    },
    listLink: {
      background: "transparent",
      border: "none",
      color: "black"
    },
    filterEntry: {
      border: "1px solid gray",
      padding: "3px",
      margin: "30px 0px 10px",
      width: "100%"
    }
  };

  // toggleDrawer = (side, open) => () => {
  //   this.setState({
  //     [side]: open,
  //   });
  // };

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.filterVenues(newQuery);
  };

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
              value={this.state.query}
            />
            <ul style={this.styles.noBullets}>
              {this.props.vanues &&
                this.props.venues.map((venue, i) => {
                  return (
                    <li style={this.styles.ListItem} key={i}>
                      <button
                        style={this.styles.listLink}
                        key={i}
                        onClick={event => this.props.clickListItem(i)}
                      >
                        {venue.name}
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
export default VenueDrawer;
