export interface DictStructure {
  header: {
    searchPost: string;
    signIn: string;
    signOut: string;
    signInToKeyBlog: string;
    signInWithGoogle: string;
    signInWithTwitter: string;
    close: string;
  };
  overview: {
    homepage: string;
    blog: string;
    cannotFoundSearch: string;
  };
  category: string;
  post: {
    like: string;
    likes: string;
    comment: string;
    postOn: string;
    lastUpdatedOn: string;
    copyLink: string;
    shareToTwitter: string;
    linkCopied: string;
    postNotFound: string;
  };
  comment: {
    commentTitle: string;
    noComment: string;
    letComment: string;
    login: string;
    loginSuccessful: string;
    writeComment: string;
    pasteImageTip: string;
    commentPlaceholder: string;
    respond: string;
    pleaseEnterComment: string;
    edit: string;
    delete: string;
    editComment: string;
    update: string;
    cancel: string;
    failAddComment: string;
    failUpdateComment: string;
    caution: string;
    areYouSureDeleteComment: string;
    close: string;
    edited: string;
  };
  notification: {
    notificationTitle: string;
    noNotification: string;
    clearAllNotification: string;
    commented: string;
    ed: string;
    onPost: string;
    on: string;
    like: string;
    yourPost: string;
    yourComment: string;
  };
}