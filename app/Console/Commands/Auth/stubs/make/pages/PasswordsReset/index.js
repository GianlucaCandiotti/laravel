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
            <Panel title="Reset Password">
              <div>
                <form role="form" method="POST" action={route('password/reset')}>
                  <input type="hidden" name="_token" value={Laravel.csrfToken} />

                  <input type="hidden" name="token" value={Laravel.token} />

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
                        placeholder="Enter your registered email"
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
                    <label
                      for="password-confirm"
                      class="label"
                    >
                      Confirm Password
                    </label>
                    <div class="control">
                      <input
                        id="password-confirm"
                        name="password_confirmation"
                        type="password"
                        class={`
                          input
                          ${errors.password_confirmation ? 'is-danger' : ''}
                        `}
                        placeholder="******"
                        required
                      />
                    </div>
                    {errors.password_confirmation && (
                      <p class="help is-danger">{errors.password_confirmation}</p>
                    )}
                  </div>

                  <div class="field has-text-left">
                    <div class="control">
                      <button class="button is-primary">Reset Password</button>
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
