import { Component } from 'react';
import './App.css';
import TopSection from './scripts/components/TopSection';
import BottomSection from './scripts/components/BottomSection';
import { SearchState } from './scripts/types/interfaces';

class App extends Component<Record<string, never>, SearchState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  }


  render() {
    return (
      <div className='app'>
        <TopSection onSearch={this.handleSearch}/>
        <BottomSection />
      </div>
    );
  }
}

export default App;
