import BookmarkModel from '../../bookmark';
type RemoteManagerProps = {
	local: BookmarkModel[];
	remote: BookmarkModel[];
}
export const RemoteManager = ({local, remote}: RemoteManagerProps) => {
	return (
		<div className="RemoteManager">
			<div className="col6">
				Local Bookmarks

			</div>
			<div className="col6">
				Remote Bookmarks
			</div>

			<div className="upploaded">
				Bookmarks uploaded!
			</div>
		</div>

	);
}