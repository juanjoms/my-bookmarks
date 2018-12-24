import React, { useEffect } from 'react';
import { Header } from './title/Header';
import BookmarkList from './bookmarklist/BookmarkList';
import './App.scss';

console.log(React.version);
const $el = (selector: string) => document.querySelector(selector) as Element;
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
