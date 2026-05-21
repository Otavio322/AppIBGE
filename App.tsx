import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EstadosScreen from './screens/EstadosScreen';
import MunicipiosScreen from './screens/MunicipiosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Estados" component={EstadosScreen} />
        <Stack.Screen name="Municipios" component={MunicipiosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}