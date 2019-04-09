import React, { useState, useEffect } from 'react';
import './BookmarkList.scss';
//import { Modal } from '../modal/Modal_';
import { Modal } from '../components/modal/Modal';
import { Bookmark } from './bookmark/Bookmark';
import BookmarkModel from '../bookmark';
import { dummyBookmarks } from './dummyBookmarks';
import {SyncCloud, CloudDown} from '../icons/Icons';
import { EmailForm } from './email-form/EmailForm';
import { EditBookmark } from './edit-bookmark/EditBookmark';
import { firebaseApp } from '../firebase/firebase';

type ModalConfig = {
  showModal: boolean,
  bookmark: BookmarkModel,
  unEditBookmark: BookmarkModel  
}
type BookmarkEdit = {
  showEditModal: boolean
  original: BookmarkModel,
  edited: BookmarkModel
}
type Email = string | null;

const initBookmarks = (): BookmarkModel[] => {
  const strBookmarks = localStorage.getItem('bookmarks');
  const defaultBookmarks: BookmarkModel[] = strBookmarks ? JSON.parse(strBookmarks) : dummyBookmarks;
  defaultBookmarks.forEach((bookmark, index) => {
    defaultBookmarks[index] = bookmark.isEmpty ? new BookmarkModel(index): bookmark;
  })
  return defaultBookmarks;
};

const BookmarkList = () => {
  const [bookmarkEdit, setBookmarkEdit] = useState({} as BookmarkEdit)
  //const [modalConfig, setModalConfig] = useState({showModal: false, bookmark: new BookmarkModel(0), unEditBookmark: new BookmarkModel(0)} as ModalConfig);
  const [bookmarks, setBookmarks] = useState(initBookmarks);
  const [email, setEmail] = useState(null as Email);
  const [emailModal, showEmailModal] = useState(false);  
  let unEditedBookmark: BookmarkModel;
  
  useEffect(() => {
    console.log('Saving bookmarks');
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  });

  const handleAddEdit = (bookmark: BookmarkModel) => {
    const original = bookmark;
    const edited = {...bookmark}
    setBookmarkEdit({showEditModal: true, original, edited});    
  }
  /*
  const closeModal = (bookmark: BookmarkModel) => {
    setModalConfig({showModal: false, bookmark, unEditBookmark: unEditedBookmark});
    bookmarks[bookmark.key] = bookmark;
    setBookmarks(bookmarks);
  }
  */
  const dismissModal = () => {
    console.log(bookmarkEdit);    
  }

  const handleRemove = ( bookmarkKey: number) => {
    bookmarks[bookmarkKey].isEmpty = true;
    setBookmarks(bookmarks);
  }
  const syncData = () => {
    if (email === null) {
      showEmailModal(true);      
    } else {
      alert(email);
    }    
  }

  const updateBookmarks = (bookmark: BookmarkModel) => {
    bookmarks[bookmark.key] = bookmark;
    setBookmarks(bookmarks);
    console.log('bookmarks updated ', bookmarks);
  }
  const cancelEditBookmark = () => {
    setBookmarkEdit({...bookmarkEdit, showEditModal: false});
    bookmarks[bookmarkEdit.original.key] = bookmarkEdit.original;
    setBookmarks(bookmarks);
    console.log(bookmarkEdit);
    dismissModal();
  }
  return (
    <>      
      <button className="sync" onClick={syncData}>
        <CloudDown className="sync-icon" />
      </button>      
      <div className={'BookmarkList'}>
        {
          bookmarks.map((bookmark) =>
            <Bookmark
              key={bookmark.key}
              bookmark={bookmark}
              handleAddEdit={handleAddEdit}
              handleRemove={handleRemove}
            />
          )
        }
      </div>
      { bookmarkEdit.showEditModal ?
        <Modal onDismiss={cancelEditBookmark}>
          <EditBookmark bookmark={bookmarkEdit.edited} setBookmark={(bookmark) => updateBookmarks(bookmark)} onCancel={cancelEditBookmark}/>          
        </Modal>:
        null
      }
      { emailModal ?
        <Modal onDismiss={() => showEmailModal(false)} >
          <EmailForm email={email || ''} onEmailChange={(email: string) => setEmail(email)} onSubmit={() => alert(email) } />
        </Modal> : null
      }
    </>
  )
};

export default BookmarkList;