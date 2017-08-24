export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },

  data() {
    return {
      display: true,
    };
  },

  render() {
    return (
      this.$data.display && (
        <div class={`notification is-${this.$props.type}`}>
          <button class="delete" on-click={() => { this.$data.display = false; }}></button>
          {this.$slots.default}
        </div>
      )
    );
  },
};
