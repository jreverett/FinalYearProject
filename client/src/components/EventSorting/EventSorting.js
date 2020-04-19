import React, { Component } from 'react';
import { Button, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ConditionalWrapper } from '../../components';
import { userService } from '../../services';
import { haversineDistance } from '../../utilities';
import '../../common.css';
import './EventSorting.css';

class EventSorting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allowDistance: false,
    };
  }

  componentDidMount() {
    this.setState({
      allowDistance: userService.loggedInUserValue?.address,
    });
  }

  renderTooltip() {
    return (
      <Tooltip id="dropdown-tooltip">
        An account with an address is required to use this function
      </Tooltip>
    );
  }

  sortBy = (criteria) => {
    let events = this.props.events.data;
    const updateEvents = this.props.updateEvents;

    if (!events) return;

    switch (criteria) {
      case 'reccomended':
        // TODO - based on mix of other criteria
        break;
      case 'popularity':
        return updateEvents({
          data: events.sort(
            (a, b) => b.subscribers.length - a.subscribers.length
          ),
        });
      case 'distance-close-far':
        var distanceAsc = this.getEventDistances().sort((a, b) => a[1] - b[1]);
        distanceAsc = distanceAsc.map((d) => d[0]);
        return updateEvents({ data: distanceAsc });
      case 'distance-far-close':
        var distanceDesc = this.getEventDistances().sort((a, b) => b[1] - a[1]);
        distanceDesc = distanceDesc.map((d) => d[0]);
        return updateEvents({ data: distanceDesc });
      case 'cost-low-high':
        return updateEvents({ data: events.sort((a, b) => a.cost - b.cost) });
      case 'cost-high-low':
        return updateEvents({ data: events.sort((a, b) => b.cost - a.cost) });
      case 'date-earliest-latest':
        return updateEvents({
          data: events.sort(
            (a, b) => Date.parse(a.start) - Date.parse(b.start)
          ),
        });
      case 'date-latest-earliest':
        return updateEvents({
          data: events.sort(
            (a, b) => Date.parse(b.start) - Date.parse(a.start)
          ),
        });
      default:
        return;
    }
  };

  getEventDistances() {
    const userAddress = this.props.loggedInUser.address;
    var distances = [];
    this.props.events.data.forEach((event) => {
      distances.push([event, haversineDistance(userAddress, event.address)]);
    });

    return distances;
  }

  render() {
    const allowDistance = this.state.allowDistance;
    return (
      <div className="sorting-container">
        {/* RECCOMENDED */}
        <Button
          className="button-sorting-selector"
          onClick={() => this.sortBy('reccomended')}
        >
          Reccomended
        </Button>

        {/* POPULARITY */}
        <Button
          className="button-sorting-selector"
          onClick={() => this.sortBy('popularity')}
        >
          Most Popular
        </Button>

        {/* DISTANCE */}
        <ConditionalWrapper
          condition={!allowDistance}
          wrapper={(children) => (
            <OverlayTrigger placement="right" overlay={this.renderTooltip()}>
              {children}
            </OverlayTrigger>
          )}
        >
          <div
            id="sorting-distance-tooltip"
            className={allowDistance ? '' : ' disabled'}
          >
            <Dropdown onClick={() => this.sortBy('distance')}>
              <Dropdown.Toggle
                className="dropdown-sorting-selector"
                variant="info"
                disabled={!allowDistance}
              >
                Distance
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.sortBy('distance-close-far')}
                >
                  Closest First
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.sortBy('distance-far-close')}
                >
                  Farthest First
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ConditionalWrapper>

        {/* COST */}
        <Dropdown>
          <Dropdown.Toggle className="dropdown-sorting-selector" variant="info">
            Cost
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.sortBy('cost-low-high')}>
              Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.sortBy('cost-high-low')}>
              High to Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* START DATE */}
        <Dropdown>
          <Dropdown.Toggle className="dropdown-sorting-selector" variant="info">
            Date
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.sortBy('date-earliest-latest')}>
              Soonest First
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.sortBy('date-latest-earliest')}>
              Latest First
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default EventSorting;
