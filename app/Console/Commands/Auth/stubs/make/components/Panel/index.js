import styles from './styles.scssm';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },

  render() {
    const {
      title,
    } = this.$props;

    return (
      <div class={`columns ${styles.root}`}>
        <div class="box column is-8 is-offset-2">
          {title && (
            <div class={styles.titleContainer}>
              <h1 class="title is-4">
                {title}
              </h1>
            </div>
          )}
          {this.$slots.default}
        </div>
      </div>
    );
  },
};
