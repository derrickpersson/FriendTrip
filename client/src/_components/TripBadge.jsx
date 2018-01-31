import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';


export class TripBadge extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const trip = this.props;
    return (
      <Card>
        <Image src='https://static.pexels.com/photos/109630/pexels-photo-109630.jpeg' />
        <Card.Content>
          <Card.Header>
            {trip.location}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              March, 2018
            </span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            2 Other Friends on this Trip
          </a>
        </Card.Content>
      </Card>
    );
  }
}