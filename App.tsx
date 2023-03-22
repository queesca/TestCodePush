/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
// const options = {
//   updateDialog: true,
//   installMode: codePush.InstallMode.IMMEDIATE,
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
// };
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: [],
    };
  }
  codePushStatusDidChange(status: any) {
    let msg = '';
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        msg = 'Checking for updates.';
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        msg = 'Downloading package.';
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        msg = 'Installing update.';
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        msg = 'Up-to-date.';
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        msg = 'Update installed.';
        break;
    }

    console.log(msg);
  }
  codePushDownloadDidProgress(progress: {
    receivedBytes: string;
    totalBytes: string;
  }) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.',
    );
  }

  componentDidMount(): void {
    codePush.sync(
      {
        // updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      // ,
      () => this.codePushStatusDidChange,
      // () => this.codePushDownloadDidProgress,
    );
  }

  update() {
    // console.log('update')
    codePush.sync(
      {
        // updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      // ,
      () => this.codePushStatusDidChange,
      // () => this.codePushDownloadDidProgress,
    );
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.welcome}>Làm sao để sử dụng code push</Text>
          <Text style={styles.instructions}>Update version 1.6</Text>
          <Button title="Update" onPress={this.update} />
        </View>
        <Home update={this.update} />
      </>
    );
  }
}

const Home = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Từ bi vô điều kiện</Text>
      <Text style={styles.welcome}>Osho</Text>
      <Text style={styles.instructions}>Update version 2.0</Text>
      <Button title="Update" onPress={props.update} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  welcome: {},
  instructions: {},
});

export default codePush(App);
