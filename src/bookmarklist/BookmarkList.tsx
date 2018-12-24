import React, { useState, useEffect } from 'react';
import './BookmarkList.scss';
import { Modal } from '../modal/Modal';
import { Bookmark } from './bookmark/Bookmark';
import BookmarkModel from '../bookmark';
import selfLink from './bookmark-images/self-link_light.svg';
import selfLinkDark from './bookmark-images/self-link_dark.svg';
import externalLink from './bookmark-images/external-link_light.svg';
import externalLinkDark from './bookmark-images/external-link_dark.svg';

type ModalConfig = {
  showModal: boolean,
  bookmark: BookmarkModel
}

const BookmarkList = () => {
  const [modalConfig, setModalConfig] = useState({showModal: false, bookmark: new BookmarkModel(0)} as ModalConfig);
  const [bookmarks, setBookmarks] = useState<BookmarkModel[]>(() => {
    const strBookmarks = localStorage.getItem('bookmarks');
    return strBookmarks ? JSON.parse(strBookmarks) : Array.from(Array(8), (e, i) => new BookmarkModel(i));
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });

  const handleAddEdit = (bookmark: BookmarkModel) => {
      setModalConfig({showModal: true, bookmark });
  }
  const closeModal = (bookmark: BookmarkModel) => {
    setModalConfig({showModal: false, bookmark});
    const backIsDark = isDark(bookmark.backColor);
    bookmark.iconUrl = bookmark.isExternal ?
      (backIsDark ? externalLink : externalLinkDark) :
      (backIsDark ? selfLink : selfLinkDark);
    bookmarks[bookmark.key] = bookmark;
    setBookmarks(bookmarks);
  }
  const dismissModal = (bookmark: BookmarkModel) => {
    setModalConfig({showModal: false, bookmark });
  }
  const handleRemove = ( bookmarkKey: number) => {
    bookmarks[bookmarkKey].isEmpty = true;
    setBookmarks(bookmarks);
  }
  return (
    <>
      <div className="BookmarkList">
        {
          bookmarks.map((bookmark) =>
            <Bookmark
              key={bookmark.key}
              bookmark={bookmark}
              handleAddEdit={handleAddEdit}
              handleRemove={handleRemove}>
            </Bookmark>
          )
        }
      </div>
      { modalConfig.showModal ?
        <Modal
          onSave={closeModal}
          dismissModal={dismissModal}
          bookmark={modalConfig.bookmark}>
        </Modal> :
        null
      }
    </>
  )
};

export default BookmarkList;

function isDark(bgColor: string): boolean {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) < 186);
}