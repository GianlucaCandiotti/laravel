import Laravel from 'utils/laravel';
import route from 'utils/route';
import vueLogo from './assets/vue-logo.png';
import styles from './styles.scssm';

export default {
  data() {
    return {
      isMenuActive: false,
    };
  },

  methods: {
    toggleMenu() {
      this.$data.isMenuActive = !this.$data.isMenuActive;
    },

    logout() {
      this.$refs.logoutForm.submit();
    },

    renderMenu() {
      const routes = [
        {
          link: 'Login',
          url: route('login'),
        },
        {
          link: 'Register',
          url: route('register'),
        },
      ];

      return (
        Laravel.isGuest
          ?
          (
            routes.map(r => (
              <a
                class={`
                  navbar-item
                  ${Laravel.currentUrl === r.url ? 'is-active' : ''}
                `}
                href={r.url}
              >
                {r.link}
              </a>
            ))
          )
          :
          (
            <div class="navbar-item has-dropdown is-hoverable">
              <div class="navbar-link">
                {Laravel.user.name}
              </div>

              <div class="navbar-dropdown ">
                <a class="navbar-item" onClick={this.logout}>
                  Logout
                </a>

                <form role="form" method="POST" action={route('logout')} ref="logoutForm">
                  <input type="hidden" name="_token" value={Laravel.csrfToken} />
                </form>
              </div>
            </div>
          )
      );
    },
  },

  render() {
    const {
      isMenuActive,
    } = this.$data;

    return (
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href={route()}>
              <img src={vueLogo} alt="Vue" />
              <span class={styles.title}>Laravue</span>
            </a>

            <div
              class={`
                navbar-burger
                burger
                ${isMenuActive ? 'is-active' : ''}
              `}
              data-target="navigation"
              on-click={this.toggleMenu}
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div
            id="navigation"
            class={`
              navbar-menu
              ${isMenuActive ? 'is-active' : ''}
            `}
          >

            <div class="navbar-end has-text-left">
              {this.renderMenu()}
            </div>
          </div>
        </div>
      </nav>
    );
  },
};
