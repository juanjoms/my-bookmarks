import React, { useState } from 'react';
import './Bookmark.scss';
import BookmarkModel from '../../bookmark';
import { IconPlus, EditIcon, RemoveIcon, SelfLink, ExternalLink } from '../../icons/Icons';

type BookmarkProps = {
  handleRemove: (bookmarkKey: number) => void;
  bookmark: BookmarkModel;
  handleAddEdit: (bookmark: BookmarkModel) => void;
}
export const Bookmark = ({bookmark, handleAddEdit, handleRemove}: BookmarkProps) => {
  const [displayCTAS, setDisplayCTAS] = useState(false);
  const iconClass = isDark(bookmark.backColor) ? 'light-icon' : 'dark-icon';
  return bookmark.isEmpty?
    <button className="Bookmark empty" onClick={() => handleAddEdit(bookmark)}>
      <IconPlus className="add-icon"></IconPlus>
    </button> :
    <div className="Bookmark filled" style={{backgroundColor: bookmark.backColor}}>
      <a href={bookmark.url} target={bookmark.isExternal ? '_blank' : '_self'} rel="noopener noreferrer"
        onFocus={() => setDisplayCTAS(true)}>
        {bookmark.value && <span className="overlay"> {bookmark.value} </span> }
        {
          bookmark.isExternal ?
            <ExternalLink className={`watermark-icon ${iconClass}`} /> :
            <SelfLink className={`watermark-icon ${iconClass}`} />
        }
      </a>
      <div className="ctas" style={displayCTAS ? {display: 'block'}: {}}>
        <button className="cta-button" onClick={() => handleAddEdit(bookmark)}>
          <EditIcon className="edit-icon"></EditIcon>
        </button>
        <button className="cta-button" onClick={() => handleRemove(bookmark.key)}>
          <RemoveIcon className="edit-icon"></RemoveIcon>
        </button>
      </div>
    </div>
}

const isDark = (bgColor: string): boolean => {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return ((r * 0.299) + (g * 0.587) + (b * 0.114)) < 186;
}