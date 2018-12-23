import React, { useState } from 'react';
import { TextField } from '../components/form-components/TextField';
import { Checkbox } from '../components/form-components/Checkbox';
import { Button } from '../components/form-components/Button';
import Palette from '../components/palette/Palette';
import CustomColor from '../components/custom-color/CustomColor';

import './Modal.scss';
import BookmarkModel from '../bookmark';
type IPropsType = {
  onSave: any,
  dismissModal: any,
  bookmark: BookmarkModel
};

export const Modal = ({onSave, bookmark, dismissModal }: IPropsType ) => {
  const [value, setValue] =  useState(bookmark.value);
  const [url, setUrl] =  useState(bookmark.url);
  const [isExternal, setIsExternal] = useState(bookmark.isExternal);
  const [color, setColor] = useState(bookmark.backColor);

  const handleFormSubmit = () => {
    bookmark.isEmpty = false;
    bookmark.value = value;
    bookmark.url = url;
    bookmark.isExternal = isExternal;
    bookmark.backColor = color;
    onSave(bookmark);
  };

  return (
    <div className="Modal">
      <div className="modal-dialog zoomInUp animated">
        <h2 className="modal-title">Bookmark options:</h2>
        <div className="row">
          <div className="col-left">
            <Palette onSelectColor={color => setColor(color)} />
            <CustomColor color={color} onSelectColor={color => setColor(color)} />
          </div>
          <div className="col-right">
            <TextField id='name' value={value} onChange={(id, value) => setValue(value)} label="Name"/>
            <TextField id='url' value={url || ''} onChange={(id, url) => setUrl(url)} label="Url"/>
            <Checkbox checked={isExternal} onChange={(checked) => { setIsExternal(checked)} } />
            <Button value="Cancel" isPrimary={false} onClick={() => dismissModal()} />
            <Button value="Save" isPrimary={true} onClick={() => handleFormSubmit()} />
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={e => dismissModal()}></div>
    </div>
  )
};