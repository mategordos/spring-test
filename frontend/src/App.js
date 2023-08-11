import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class App extends Component {
  state = {
    bloggers: []
  };

  async componentDidMount() {
    const response = await fetch('/bloggers');
    const body = await response.json();
    this.setState({bloggers: body});
  }

  render() {
    const {bloggers} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Bloggers</h2>
              {bloggers.map(blogger =>
                  <div key={blogger.id}>
                    {blogger.userName} ({blogger.email})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
