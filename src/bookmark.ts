export default class BookmarkModel {
  key: number = 0;
  isEmpty: boolean = true;
  value: string = '';
  url?: string;
  iconUrl?: string;
  isExternal?: boolean;
  backColor: string = '#000000';
};