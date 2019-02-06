import React, { useState, useEffect } from 'react';
import './BookmarkList.scss';
import { Modal } from '../modal/Modal';
import { Bookmark } from './bookmark/Bookmark';
import BookmarkModel from '../bookmark';
import { dummyBookmarks } from './dummyBookmarks';

type ModalConfig = {
  showModal: boolean,
  bookmark: BookmarkModel
}

const initBookmarks = (): BookmarkModel[] => {
  const strBookmarks = localStorage.getItem('bookmarks');
  const defaultBookmarks: BookmarkModel[] = strBookmarks ? JSON.parse(strBookmarks) : dummyBookmarks;
  defaultBookmarks.forEach((bookmark, index) => {
    defaultBookmarks[index] = bookmark.isEmpty ? new BookmarkModel(index): bookmark;
  })
  return defaultBookmarks;
};

const BookmarkList = () => {
  const [modalConfig, setModalConfig] = useState({showModal: false, bookmark: new BookmarkModel(0)} as ModalConfig);
  const [bookmarks, setBookmarks] = useState(initBookmarks);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });

  const handleAddEdit = (bookmark: BookmarkModel) => {
    setModalConfig({showModal: true, bookmark });
  }
  const closeModal = (bookmark: BookmarkModel) => {
    setModalConfig({showModal: false, bookmark});
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
      <div className={`BookmarkList ${modalConfig.showModal ? 'blurred': ''}`}>
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