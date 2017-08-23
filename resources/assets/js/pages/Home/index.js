import NavBar from 'components/NavBar';
import Panel from 'components/Panel';
import Notification from 'components/Notification';

export default {
  render() {
    return (
      <div>
        <NavBar />
        <section class="section">
          {Laravel.status && (
            <Notification type="success">
              {Laravel.status}
            </Notification>
          )}

          <div class="container">
            <Panel title="Dashboard">
              <div>
                You are logged in!
              </div>
            </Panel>
          </div>
        </section>
      </div>
    );
  },
};
