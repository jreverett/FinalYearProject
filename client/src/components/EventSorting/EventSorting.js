import React, { Component } from 'react';
import { Button, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ConditionalWrapper } from '../../components';
import { haversineDistance } from '../../utilities';
import '../../common.css';
import './EventSorting.css';

class EventSorting extends Component {
  renderTooltip() {
    return (
      <Tooltip id="dropdown-tooltip">
        {'An account with an address is required to use this function'}
      </Tooltip>
    );
  }

  sortBy = (criteria) => {
    let events = this.props.events.data;
    const updateEvents = this.props.updateEvents;

    if (!events) return;

    switch (criteria) {
      case 'recomended':
        if (!this.props.loggedInUser?.address?.location) return;

        // distance (close-far) -> popularity (high-low) -> cost (low-high)
        var recomended = this.getEventDistances(true).sort(
          (a, b) =>
            b[0].subscribers.length - a[0].subscribers.length ||
            a[1] - b[1] ||
            a[0].cost - b[0].cost
        );
        recomended = recomended.map((d) => d[0]);

        return updateEvents({ data: recomended });
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

  getEventDistances(toNearest20km) {
    const userLocation = this.props.loggedInUser.address.location;
    var distances = [];
    this.props.events.data.forEach((event) => {
      const eventLocation = event.address.location;

      if (toNearest20km) {
        distances.push([
          event,
          Math.ceil(
            haversineDistance(
              userLocation.lat,
              userLocation.lng,
              eventLocation.lat,
              eventLocation.lng
            ) / 20
          ) * 20,
        ]);
      } else {
        distances.push([
          event,
          haversineDistance(
            userLocation.lat,
            userLocation.lng,
            eventLocation.lat,
            eventLocation.lng
          ),
        ]);
      }
    });

    return distances;
  }

  render() {
    const { loggedInUser } = this.props;
    const allowDistance = loggedInUser?.address ? true : false;
    return (
      <div className="sorting-container">
        {/* RECOMENDED */}
        <ConditionalWrapper
          condition={!allowDistance}
          wrapper={(children) => (
            <OverlayTrigger placement="right" overlay={this.renderTooltip()}>
              {children}
            </OverlayTrigger>
          )}
        >
          <Button
            className={`button-sorting-selector ${
              allowDistance ? '' : 'disabled'
            }`}
            onClick={() => this.sortBy('recomended')}
          >
            Recomended
          </Button>
        </ConditionalWrapper>

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
