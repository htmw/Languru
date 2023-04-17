import { SafeAreaView, StyleSheet } from 'react-native';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import Navigation from './src/navigation';

Amplify.configure(config);

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

// const signUpConfig = {
//   header: "My Customizedsername",
//       required: true,
//       displayOrder: 3,
//       type: "string",
//     },
//     {
//       label: "Password",
//       key: "password",
//       required: true,
//       displayOrder: 4,
//       type: "password",
//     },
//   ],
// };

// const customTheme = {
//   ...AmplifyTheme,
//   button: {
//     ...AmplifyTheme.button,
//     backgroundColor: 'blue',
//     borderRadius: 10,
//   }
// }

// export default withAuthenticator(App, {signUpConfig, theme: customTheme}); Sign Up",
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: "Full name",
//       key: "name",
//       required: true,
//       displayOrder: 1,
//       type: "string",
//     },
//     {
//       label: "Email",
//       key: "email",
//       required: true,
//       displayOrder: 2,
//       type: "string",
//     },
//     {
//       label: "Username",
//       key: "preferred_u

export default App;