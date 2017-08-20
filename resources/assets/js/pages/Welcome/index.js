import Laravel from 'utils/laravel';
import Hello from 'components/Hello';
import styles from './styles.scssm';

export default {
  render() {
    return (
      <div class={`${styles.root}`}>
        <div class={styles.contentWrapper}>
          {Laravel.routeHasLogin && (
            <div class={styles.authLinks}>
              <a class={styles.link} href={`${Laravel.baseUrl}/login`}>Login</a>
              <a class={styles.link} href={`${Laravel.baseUrl}/register`}>Register</a>
            </div>
          )}

          <Hello />
        </div>
      </div>
    );
  },
};
