import { Font } from 'expo';

async function loadCustomFonts() {
  await Font.loadAsync({
    'Futura': require('../../../assets/fonts/Futura.ttf'),
  });
}