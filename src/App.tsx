import React, { useEffect } from 'react';
import { Header } from './title/Header';
import BookmarkList from './bookmarklist/BookmarkList';
import './App.scss';

const App = () => {
  const appTitle = 'My Bookmarks';
  const appDesc = 'Most daily used links';

  return (
    <div className="App">
      <Header title={appTitle} desc={appDesc}></Header>
      <BookmarkList></BookmarkList>
    </div>
  )
};

export default App;
