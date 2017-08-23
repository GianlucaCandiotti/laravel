import Laravel from 'utils/laravel';
import route from 'utils/route';
import NavBar from 'components/NavBar';
import Panel from 'components/Panel';
import Notification from 'components/Notification';

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
            {Laravel.status && (
              <Notification type="success">
                {Laravel.status}
              </Notification>
            )}

            <Panel title="Reset Password">
              <div>
                <form role="form" method="POST" action={route('password/email')}>
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
                    <div class="control">
                      <button class="button is-primary">Send Password Reset Link</button>
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
