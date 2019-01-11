export default class BookmarkModel {
  constructor(index: number) {
    this.key = index;
  }
  key: number = 0;
  isEmpty: boolean = true;
  value: string = '';
  url?: string = 'https://';
  isExternal?: boolean = true;
  backColor: string = '#00BCD4';
};