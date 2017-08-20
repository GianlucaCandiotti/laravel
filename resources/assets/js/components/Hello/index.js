import styles from './styles.scssm';

const Hello = {
  data() {
    return {
      title: 'Laravue',
    };
  },

  render() {
    const {
      title,
    } = this.$data;

    return (
      <div class={`${styles.content} anim-fade-down`}>
        <h1 class={styles.title}>
          {title}
        </h1>

        <div class={styles.links}>
          <a class={styles.link} href="https://laravel.com/docs">Laravel Documentation</a>
          <a class={styles.link} href="https://vuejs.org/guide">Vue Documentation</a>
          <a class={styles.link} href="https://laracasts.com">Laracasts</a>
          <a class={styles.link} href="https://laravel-news.com">News</a>
          <a class={styles.link} href="https://forge.laravel.com">Forge</a>
          <a class={styles.link} href="https://github.com/GianlucaCandiotti/laravue">GitHub</a>
        </div>
      </div>
    );
  },
};

export default Hello;
