//app/App.tsx

import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Layout from "@/app/_layout";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);

// {
//   "cli": {
//     "version": ">= 12.4.1",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "android": {
//         "buildType": "apk"
//       },
//       "distribution": "internal",
//       "channel":"preview"
//     },
//     "production": {
//       "autoIncrement": true
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }
