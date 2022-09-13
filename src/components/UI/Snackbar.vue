<template>
  <v-snackbar
    top
    centered
    :color="color"
    :value="visible"
    :timeout="4000"
  >
    <div id="snack-message-text">{{ text }}</div>
  </v-snackbar>
</template>

<script>
export default {
  watch: {
    visible() {
      if (this.visible == true) {
        setTimeout(() => {
          this.$store.dispatch('setSnackbar', {
            visible: false,
            text: '',
            color: '',
          });
        }, 4000);
      }
    },
  },
  computed: {
    snackbar() {
      if (this.$store.getters.snackbar) {
        return this.$store.getters.snackbar;
      }
      return {
        visible: false,
        text: '',
        color: '',
      };
    },
    visible() {
      return this.snackbar.visible ?? false;
    },
    color() {
      return this.snackbar.color ?? '';
    },
    text() {
      return this.snackbar.text ?? '';
    },
  },
};
</script>>
