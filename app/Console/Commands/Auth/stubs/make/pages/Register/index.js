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
            <Panel title="Register">
              <div>
                <form role="form" method="POST" action={route('register')}>
                  <input type="hidden" name="_token" value={Laravel.csrfToken} />

                  <div class="field has-text-left">
                    <label
                      for="email"
                      class="label"
                    >
                      Name
                    </label>
                    <div class="control">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        value={oldInputs.name ? oldInputs.name : ''}
                        class={`
                          input
                          ${errors.name ? 'is-danger' : ''}
                        `}
                        placeholder="John Smith"
                        required
                        autofocus
                      />
                    </div>
                    {errors.name && (
                      <p class="help is-danger">{errors.name}</p>
                    )}
                  </div>

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
                        class="input"
                        placeholder="******"
                        required
                      />
                    </div>
                  </div>

                  <div class="field has-text-left">
                    <div class="control">
                      <button class="button is-primary">Register</button>
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
