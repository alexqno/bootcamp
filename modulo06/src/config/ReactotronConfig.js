import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.13.38' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
