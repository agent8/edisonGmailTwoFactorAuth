import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './screens/twoFactorOnboarding/Home';
import TwoFactorSetupIntro from './screens/twoFactorOnboarding/TwoFactorSetupIntro';
import TwoFactorSetupWebView from './screens/twoFactorOnboarding/TwoFactorSetupWebView';
import TwoFactorSetupEnd from './screens/twoFactorOnboarding/TwoFactorSetupEnd';
import AppSpecificPasswordWebView from './screens/twoFactorOnboarding/AppSpecificPasswordWebView';
import AppSpecificPasswordEnd from './screens/twoFactorOnboarding/AppSpecificPasswordEnd';
import {Theme} from './styles/common';
const TwoFactorNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    TwoFactorSetupIntro: { screen: TwoFactorSetupIntro },
    TwoFactorSetupWebView: { screen: TwoFactorSetupWebView },
    TwoFactorSetupEnd: { screen: TwoFactorSetupEnd },
    AppSpecificPasswordWebView: { screen: AppSpecificPasswordWebView },
    AppSpecificPasswordEnd: { screen: AppSpecificPasswordEnd },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    cardStyle: {
      backgroundColor: Theme.primaryBackground,
    },
  }
);

//this screen gets launched with an array of obj
//this screen need to manage state of each emailAddress
export default class TwoFactorOnboarding extends React.PureComponent {
  constructor(props) {
    super(props);

    //shuhao can we launch this screen with a prop for emailAddress and app name
    let emailAddress = 'jeffpearsall@gmail.com';
    let appName = 'Kantar';
    this.state = {
      appName:appName,
      account: {email:emailAddress}
    };
  }

  updateEmailAddress = async (account, password) => {
    //shuhao Send stuff out of library {email,password};
    console.log(account+' '+password)
    //sendAppSpecificPassword(account.email, password);
  };

  close = () => {
    const { closeHandler } = this.props;
    closeHandler && closeHandler();
  };

  dismiss = () => {
    const { dismissHandler } = this.props;
    dismissHandler && dismissHandler();
  };

  render() {
    const { account } = this.state;
    if (!account) return null; // if accounts don't exist, show nothing

    // the accounts object and fucntions to update accounts and exit
    const screenProps = {
      account,
      appName:this.state.appName,
      library:true,
      updateEmailAddress: this.updateEmailAddress,
      close: this.close,
      dismiss: this.dismiss,
    };

    return (
      <View style={{ height: '100%', width: '100%' }}>
        <TwoFactorNavigator screenProps={screenProps} />
      </View>
    );
  }
}
