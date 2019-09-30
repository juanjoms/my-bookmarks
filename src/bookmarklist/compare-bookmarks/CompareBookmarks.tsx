import React from 'react';
import BookmarkModel from '../../bookmark';
import './CompareBookmark.scss';
import { Button } from '../../components/form-components/Button';

type CompareProps = {
  cloudBookmarks: BookmarkModel[],
	localBookmarks: BookmarkModel[],
	useLocal: () => void,
	useCloud: () => void
}
export const CompareBookmarks = ({cloudBookmarks, localBookmarks, useLocal, useCloud}: CompareProps) => {
	return (
    <div className="CompareBookmarks">
			<div className="col">
				<h3 className="sub-heading">Cloud Bookmarks</h3>
				{cloudBookmarks.map(bookmark => <CompareItem key={bookmark.key} bookmark={bookmark}></CompareItem>)}
				<Button value="Use Cloud" isPrimary={true} onClick={useCloud} />
			</div>
			<div className="col">
				<h3 className="sub-heading">Local Bookmarks</h3>
				{localBookmarks.map(bookmark => <CompareItem key={bookmark.key} bookmark={bookmark}></CompareItem>)}
				<Button value="Use Local" isPrimary={true} onClick={useLocal} />
			</div>
    </div>
  )
}

const CompareItem = ({bookmark}: {bookmark: BookmarkModel}) => (
	<div className="CompareItem">
		{
			bookmark.isEmpty?
				<div className="compare-content empty"></div> :
				<div className="compare-content" style={{backgroundColor: bookmark.backColor }}>
					<div className="item-value"> {bookmark.value} </div>
					<div className="item-url"> {bookmark.url} </div>
				</div>
		}


	</div>
)