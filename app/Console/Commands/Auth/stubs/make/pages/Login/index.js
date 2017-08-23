import Laravel from 'utils/laravel';
import route from 'utils/route';
import NavBar from 'components/NavBar';
import Panel from 'components/Panel';

export default {
  render() {
    const {
      errors,
      oldInputs,
    } = Laravel;

    return (
      <div>
        <NavBar />
        <section class="section">
          <div class="container">
            <Panel title="Login">
              <div>
                <form role="form" method="POST" action={route('login')}>
                  <input type="hidden" name="_token" value={Laravel.csrfToken} />

                  <div class="field has-text-left">
                    <label
                      for="email"
                      class="label"
                    >
                      E-Mail Address
                    </label>
                    <div class="control">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={oldInputs.email ? oldInputs.email : ''}
                        class={`
                          input
                          ${errors.email ? 'is-danger' : ''}
                        `}
                        placeholder="john.smith@domain.com"
                        required
                        autofocus
                      />
                    </div>
                    {errors.email && (
                      <p class="help is-danger">{errors.email}</p>
                    )}
                  </div>

                  <div class="field has-text-left">
                    <label
                      for="password"
                      class="label"
                    >
                      Password
                    </label>
                    <div class="control">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        class={`
                          input
                          ${errors.password ? 'is-danger' : ''}
                        `}
                        placeholder="******"
                        required
                      />
                    </div>
                    {errors.password && (
                      <p class="help is-danger">{errors.password}</p>
                    )}
                  </div>

                  <div class="field has-text-left">
                    <div class="control">
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={oldInputs.remember}
                        />
                        <span> Remember Me</span>
                      </label>
                    </div>
                  </div>

                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-primary">Login</button>
                    </div>
                    <div class="control">
                      <a class="button is-link" href={route('password/reset')}>
                        Forgot your Password?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </Panel>
          </div>
        </section>
      </div>
    );
  },
};
