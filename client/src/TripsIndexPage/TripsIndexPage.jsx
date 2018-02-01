import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions.js';
import { TripBadge } from '../_components';
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table, Dropdown, Popup, Form, TextArea, Input, Modal
} from 'semantic-ui-react'

class TripsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      start_date: '',
      end_date: '',
      submittedLocation: '',
      submittedStart_date: '',
      submittedEnd_date: '',
    };
    // Bind any functions here.
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e, { name, value }){
    this.setState({ [name]: value })
  }

  handleSubmit(e){
    e.preventDefault();
    const { location, start_date, end_date } = this.state
    const { dispatch } = this.props;
    const tripInfo = {
      location: location, start_date: start_date, end_date: end_date
    };
    dispatch(userActions.createNewTrip(tripInfo))
    this.setState({ submittedLocation: location, submittedStart_date: start_date, submittedEnd_date: end_date })
  }

  componentDidMount(){
    const { user } = this.props;
    this.props.dispatch(userActions.getAllTrips(user));
  }



  render() {
    const { user, trips } = this.props;
    const { location, start_date, end_date, submittedLocation, submittedStart_date, submittedEnd_date } = this.state;
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='./client/src/assets/img/FriendTripLogo.jpg'
                style={{ marginRight: '1.5em' }}
              />
              FriendTrip
            </Menu.Item>
            <Menu.Item as='a' position='right'><Icon name='user' /> Profile</Menu.Item>
            <Menu.Item as='a'><Icon name='send' />Invite Friends</Menu.Item>
          </Container>
        </Menu>
        <Grid container columns={3} style={{ marginTop: '7em' }} stackable>
          {
            trips.map(trip => {
              return (
                <Grid.Column key={trip.id}>
                  <TripBadge key={trip.id} trip={trip}/>
                </Grid.Column>
              )
            })
          }
        </Grid>
          <Modal trigger={<Button icon='add' className="primary-btn-fab"/>}>
            <Modal.Header>Create a Trip</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field id='form-input-control-first-name' control={Input} name='location' label='Location' placeholder='Location' value={location} onChange={this.handleChange} required/>
                <Form.Field id='form-input-control-start-date' control={Input} name='start_date' label='Start Date' placeholder='2018-07-12' value={start_date} onChange={this.handleChange} required/>
                <Form.Field id='form-input-control-end-date' control={Input} name='end_date' label='End Date' placeholder='2018-07-22' value={end_date} onChange={this.handleChange} required/>
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>
            </Modal.Content>
          </Modal>
          {/*<Popup
            trigger={<Button icon='add' className="primary-btn-fab"/>}
            content={
              <Form action={`http://localhost:3000/api/users/${user.id}/trips`}>
                <Form.Field id='form-input-control-first-name' control={Input} name='location' label='Location' placeholder='Location' />
                <Form.Field id='form-input-control-first-name' control={Input} name='month' label='Month' placeholder='Month' />
                <Form.Field id='form-button-control-public' control={Button} content='Create'/>
              </Form>}
          />*/}
      </div>
    );
  }
}

function mapStateToProps(state){
  const { user } = state.authentication;
  const { trips } = state.users;
  return {
    user,
    trips
  };
}

const connectedTripsPage = connect(mapStateToProps)(TripsPage);
export { connectedTripsPage as TripsPage };