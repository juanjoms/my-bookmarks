import React, { useState, useEffect } from 'react';
import './BookmarkList.scss';
import { Modal } from '../components/modal/Modal';
import { Bookmark } from './bookmark/Bookmark';
import BookmarkModel from '../bookmark';
import { dummyBookmarks } from './dummyBookmarks';
import { CloudDown} from '../icons/Icons';
import { EmailForm } from './email-form/EmailForm';
import { EditBookmark } from './edit-bookmark/EditBookmark';
import { CompareBookmarks } from './compare-bookmarks/CompareBookmarks';
import { useFirebase, queryBookmarks, saveBookmarks } from '../firebase/firebase';

type BookmarkEdit = {
  showEditModal: boolean
  original: BookmarkModel,
  edited: BookmarkModel
}
type CompareBookmarks = {
  showCompareModal: boolean,
  cloudBookmarks: BookmarkModel[],
  localBookmarks: BookmarkModel[],
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
  const [bookmarks, setBookmarks] = useState(initBookmarks)
  const [bookmarkEdit, setBookmarkEdit] = useState({} as BookmarkEdit)
  const [compare, setCompare] = useState({} as CompareBookmarks)
  const [email, setEmail] = useState(null as Email)
  const [emailModalVisible, setEmailModalVisible] = useState(false)

  useEffect(() => {
    saveInBrowser(bookmarks, email);
  }, [bookmarkEdit, emailModalVisible]);

  const saveInBrowser = (bookmarks: BookmarkModel[], email?: string | null) => {
    console.log('persisting...');
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    if (email) {
      localStorage.setItem('email', email);
    }
  }

  const handleAddEdit = (bookmark: BookmarkModel) => {
    const original = bookmark;
    const edited = {...bookmark}
    setBookmarkEdit({showEditModal: true, original, edited});
  }

  const handleRemove = ( bookmarkKey: number) => {
    bookmarks[bookmarkKey].isEmpty = true;
    setBookmarks(bookmarks);
  }

  const onEmailSaved = () => {
    setEmailModalVisible(false);
    syncData();
  }

  const syncData = () => {
    if (!email) {
      const localEmail = localStorage.getItem('email');
      setEmail(localEmail);
      setEmailModalVisible(true);
      return;
    }
    useFirebase((db) => {
      queryBookmarks(db, email).then((doc: any)=> {
        if (doc && doc.exists) {
          const cloudBookmarks = JSON.parse(doc.data().bookmarks);
          setCompare({showCompareModal: true, cloudBookmarks, localBookmarks: bookmarks})
        }
        else {
          saveBookmarks(db, email, JSON.stringify(bookmarks));
          console.log('bookmarks not previsouly saved');
        }
      })
    });

  }

  const updateBookmarks = (bookmark: BookmarkModel) => {
    bookmarks[bookmark.key] = bookmark;
    setBookmarks(bookmarks);
  }

  const cancelEditBookmark = () => {
    setBookmarkEdit({...bookmarkEdit, showEditModal: false});
    bookmarks[bookmarkEdit.original.key] = bookmarkEdit.original;
    setBookmarks(bookmarks);
  }

  const cancelCompareModal = () => {
    setCompare({...compare, showCompareModal: false})
  }

  const confirmEditBookmark = () => {
    setBookmarkEdit({...bookmarkEdit, showEditModal: false});
  }

  const useLocalBookmarks = () => {
    if (!email) return;
    useFirebase((db) => {
      saveBookmarks(db, email, JSON.stringify(bookmarks))
      setCompare({...compare, showCompareModal: false})
    })
  }

  const useCloudBookmarks = () => {
    setBookmarks(compare.cloudBookmarks)
    saveInBrowser(compare.cloudBookmarks)
    setCompare({...compare, showCompareModal: false})
  }

  return (
    <>
      <button className="sync dark-button" onClick={syncData}>
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
        <Modal onClose={cancelEditBookmark}>
          <EditBookmark
            bookmark={bookmarkEdit.edited}
            setBookmark={(bookmark) => updateBookmarks(bookmark)}
            onCancel={cancelEditBookmark}
            onSave = {confirmEditBookmark}
          />
        </Modal>:
        null
      }
      { emailModalVisible ?
        <Modal onClose={() => setEmailModalVisible(false)} >
          <EmailForm email={email || ''} onEmailChange={(email: string) => setEmail(email)} onSubmit={() => onEmailSaved() } />
        </Modal> : null
      }
      { compare.showCompareModal ?
        <Modal onClose={cancelCompareModal}>
          <CompareBookmarks cloudBookmarks={compare.cloudBookmarks} localBookmarks={compare.localBookmarks} useLocal={useLocalBookmarks} useCloud={useCloudBookmarks} />
        </Modal> :
        null
      }
    </>
  )
};

export default BookmarkList;