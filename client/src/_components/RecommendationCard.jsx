import React, { Component } from 'react';
import {userActions} from '../_actions/user.actions.js';
import {Button,
        Comment,
        Form,
        Card,
        Image
      } from 'semantic-ui-react';

function renderButton (activities, recommendation, callback) {
  for (let i of activities) {
    if (i.description === recommendation) {
      return (<Button disabled>Saved</Button>)
    }
  }
  return (<Button onClick={callback} basic color='green'>Save to Activities</Button>)
}

export class RecommendationCard extends Component {
  constructor(props) {
    super(props);
    this.addRecommendation = this.addRecommendation.bind(this);
  }

  addRecommendation(activity) {
    // console.log('clicked::::', activity);
    const tripid = this.props.tripid;
    // console.log('tripid::::', tripid);
    const {dispatch, user} = this.props;
    const activityInfo = {
      tripId: tripid,
      description: activity
    };
    dispatch(userActions.createNewActivity(user, activityInfo))
    dispatch(userActions.sendActivity(activityInfo));
  }

  render() {
    const info = this.props.info;
    const activities = this.props.activities;
    console.log(activities);
    return(
      <Card>
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${info.photos[0].photo_reference}&key=AIzaSyAiNKWqw1War5KlsaCnkyig2Niafvi4zXg`}/>
          <Card.Header>
            {info.name}
          </Card.Header>
          <Card.Description>
            Address: {info.formatted_address}
          </Card.Description>
          <Card.Content extra>
            <div className='ui two buttons'>
              {/* <Button onClick={() => this.addRecommendation(info.name)}basic color='green'>Save to Activities</Button> */
              renderButton(activities, info.name, () => this.addRecommendation(info.name))}
            </div>
          </Card.Content>
      </Card>
    )
  }
}
