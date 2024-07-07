import { Component } from 'react';
import './App.css';
import TopSection from './scripts/components/TopSection';
import BottomSection from './scripts/components/BottomSection';
import { SearchState } from './scripts/types/interfaces';
import ErrorBoundary from './scripts/components/ErrorBoundary';

class App extends Component<Record<string, never>, SearchState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleError = () => {
    throw new Error('Test Error! Test error!');
  };

  render() {
    return (
      <ErrorBoundary>
        <div className='app'>
          <TopSection onSearch={this.handleSearch} />
          <button onClick={this.handleError} className='btn'>
            Throw Error
          </button>
          <BottomSection key={this.state.searchTerm} searchTerm={this.state.searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
