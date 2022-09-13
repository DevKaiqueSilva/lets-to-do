import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const colors = {
  color1: '#002B5B',
  color2: '#2B4865',
  color3: '#256D85',
  color4: '#8FE3CF',
};

export default new Vuetify({
  theme: {
    themes: {
      light: colors,
      dark: colors,
    },
    options: { customProperties: true },
  },
});
