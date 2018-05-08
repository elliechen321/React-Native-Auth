import React, { Component } from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  AppRegistry,
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Thumbnail,
  View,
  Image,
  Form,
  Item,
  Label,
  Input
} from "native-base";

import { Auth } from 'aws-amplify'
import { connect } from 'react-redux'

import { authenticate, confirmUserLogin } from '../actions'

class SignIn extends Component<{}> {
  state = {
    username: '',
    password: '',
    accessCode: ''
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signIn(){
    const {username, password} = this.state
    this.props.dispatchAuthenticate(username, password)
  }

  confirm() {
    const { authCode } = this.state
    this.props.dispatchConfirmUserLogin(authCode)
  }

  render() {
    const {fontsLoaded} = this.state
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
      showSignInConfirmationModal
    }} = this.props
    
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input type = 'username' onChangeText={this.onChangeText}
              value={this.state.username}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input type='password' onChangeText={this.onChangeText} value={this.state.password} secureTextEntry/>
            </Item>
          </Form>
         <Button
            full
            rounded
            primary
            style={{ marginTop: 30 }}
            title="Sign In"
            isLoading={isAuthenticating}
            onPress={this.signIn.bind(this)}
          >
            <Text>Log In</Text>
          </Button>
          {
          showSignInConfirmationModal && (
            <Modal>
              <View style={styles.modal}>
                <Input
                  placeholder="Authorization Code"
                  type='authCode'
                  keyboardType='numeric'
                  onChangeText={this.onChangeText}
                  value={this.state.authCode}
                  keyboardType='numeric'
                />
                <Button
                  title='Confirm'
                  onPress={this.confirm.bind(this)}
                  isLoading={isAuthenticating}
                />
              </View>
            </Modal>
          )
        }
          <Button
            full
            rounded
            dark
            style={{ marginTop: 30 }}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          >
            <Text>Sign Up</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  dispatchAuthenticate: (username, password) => authenticate(username, password)
}

const mapStateToProps = state => ({
  auth: state.auth
})

//export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    //fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    //fontFamily: fonts.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    //fontFamily: fonts.light
  }
});