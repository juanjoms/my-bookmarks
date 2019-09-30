import React from 'react';
import { Palette } from '../../components/palette/Palette';
import { CustomColor } from '../../components/custom-color/CustomColor';
import BookmarkModel from '../../bookmark';
import {TextField} from '../../components/form-components/TextField';
import {Checkbox} from '../../components/form-components/Checkbox';
import {Button} from '../../components/form-components/Button';
import './EditBookmark.scss';

type EditBookmarkProps = {
	bookmark: BookmarkModel
	setBookmark: (bookmark: BookmarkModel) => void;
	onSave: () => void;
	onCancel: () => void;
}
export const EditBookmark = ({bookmark, setBookmark, onCancel, onSave}: EditBookmarkProps) => {
	const setColor = (color: string) => {
		bookmark.isEmpty = false;
		bookmark.backColor = color;
		setBookmark(bookmark);
	};
	const setValue = (value: string) => {
		bookmark.isEmpty = false;
		bookmark.value = value;
		setBookmark(bookmark);
	}
	const setUrl = (url: string) =>{
		bookmark.isEmpty = false;
		bookmark.url = url;
		setBookmark(bookmark);
	};
	const setIsExternal = (checked: boolean) => {
		bookmark.isExternal = checked;
		setBookmark(bookmark);
	}

  return (
		<div className="EditBookmark">
			<h3 className="sub-heading">Bookmark options:</h3>
			<div className="row">
				<div className="col">
					<Palette onSelectColor={color => setColor(color)} />
					<CustomColor color={bookmark.backColor} onSelectColor={color => setColor(color)} />
				</div>
				<div className="col">
					<TextField id='name' value={bookmark.value} onChange={setValue} label="Name"/>
					<TextField id='url' value={bookmark.url} onChange={(url) => setUrl(url)} label="Url"/>
					<Checkbox checked={bookmark.isExternal} onChange={(checked) => { setIsExternal(checked)} } />
					<Button value="Cancel" isPrimary={false} onClick={() => onCancel()} />
					<Button value="Save" isPrimary={true} onClick={() => onSave() } />
				</div>
			</div>
		</div>
  )
}

