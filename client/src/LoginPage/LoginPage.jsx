import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../_actions';
import Webcam from 'react-webcam';
import {
  Form,
  Container,
  Input,
  Field,
  Segment,
  Button,
  Icon,
  Dimmer,
  Loader,
  Image,
  Grid,
  Message,
  Header
} from 'semantic-ui-react'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
      username: '',
      password: '',
      submitted: false,
      face: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    this.faceReg = this.faceReg.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    console.log(name);
    this.setState({[name]: value});
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {username, password} = this.state;
    const {dispatch} = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }
  setRef(webcam) {
    this.webcam = webcam;
  }
  capture() {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    this.setState({submitted: true});
    const {dispatch} = this.props;
    dispatch(userActions.face(imageSrc));
  }

  faceReg() {
    this.setState({face: true});
  }

  render() {
    const {loggingIn} = this.props;
    const {username, password, submitted} = this.state;
    (loggingIn)
      ? console.log("logging")
      : console.log("not log")

    const loginForm = (<Container className='login-main'>
      <Button animated="animated" onClick={this.faceReg}>
        <Button.Content visible="visible">Face Login</Button.Content>
        <Button.Content hidden="hidden">
          <Icon name='right arrow'/>
        </Button.Content>
      </Button>
      <Form className="large loginForm" onSubmit={this.handleSubmit}>
        <Segment className='stacked'>
          <div className='field'>
            <Input icon="user" name='username' iconPosition='left' placeholder='Account number' onChange={this.handleChange}/> {submitted && !username && <div className="help-block">Username is required</div>}
          </div>
          <div className='field'>
            <Input icon="certificate" name='password' iconPosition='left' placeholder='Password' onChange={this.handleChange}/> {submitted && !password && <div className="help-block">Password is required</div>}
          </div>
          <div className='field'>
            <Button animated="animated">
              <Button.Content visible="visible">Log In</Button.Content>
              <Button.Content hidden="hidden">
                <Icon name='right arrow'/>
              </Button.Content>
            </Button>
            <Button className="ui facebook button">
              <i className="facebook icon"></i>
              Facebook
            </Button>
            <Button className="ui google plus button">
              <i className="google plus icon"></i>
              Google Plus
            </Button>
          </div>
        </Segment>
      </Form>
    </Container>)

    const LoginForm = (
      <Container fluid className='login-main'>
      <Grid className='login-container' textAlign='center' style={{
          height: '100%'
        }} verticalAlign='middle'>
        <Grid.Column style={{
            maxWidth: 450
          }}>
          <Segment inverted color='blue' textAlign='center'>
            <Image src='/logo.png'/> {' '}Log-in to your account
          </Segment>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment  stacked="stacked">


              <Form.Input name='username' fluid="fluid" icon='user' iconPosition='left' placeholder='Account Number' onChange={this.handleChange}/> {submitted && !username && <div className="help-block">Username is required</div>}
              <Form.Input name='password' onChange={this.handleChange} fluid="fluid" icon='lock' iconPosition='left' placeholder='Password' type='password'/> {submitted && !password && <div className="help-block">Password is required</div>}
              <Button animated="animated">
                <Button.Content visible="visible">Log In</Button.Content>
                <Button.Content hidden="hidden">
                  <Icon name='right arrow'/>
                </Button.Content>
              </Button>


              <Button animated="animated" onClick={this.faceReg}>
                <Button.Content visible="visible">Face Login</Button.Content>
                <Button.Content hidden="hidden">
                  <Icon name='right arrow'/>
                </Button.Content>
              </Button>
              <Button className="ui facebook button">
                <i className="facebook icon"></i>
                Facebook
              </Button>
            </Segment>
          </Form>

            <Message color='blue'>
              New to us?
              <a href='#'>   Sign Up</a>
            </Message>


        </Grid.Column>
      </Grid>
    </Container>)

    const loginFace = (<Container className='login-main'>
      <Container className='camera center aligned'>
        <Container>
          <Webcam audio={false} height={500} ref={this.setRef} width={400} screenshotFormat="image/jpeg"/>
        </Container>
        <Button animated="animated" onClick={this.capture}>
          <Button.Content visible="visible">Log In</Button.Content>
          <Button.Content hidden="hidden">
            <Icon name='right arrow'/>
          </Button.Content>
        </Button>
      </Container>
    </Container>)

    const loader = (<div>
      <Segment>
        <Dimmer active="active">
          <Loader indeterminate="indeterminate">Preparing Files</Loader>
        </Dimmer>
        //
        <Image src='/assets/images/wireframe/short-paragraph.png'/>
      </Segment>

    </div>)
    return (
      (this.state.face)
      ? loginFace
      : LoginForm);
  }
}

function mapStateToProps(state) {
  const {loggingIn} = state.authentication;
  return {loggingIn};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {
  connectedLoginPage as LoginPage
};
