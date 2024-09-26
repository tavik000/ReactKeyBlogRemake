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
  };
  category: string;
  post: {
    like: string;
    likes: string;
    comment: string;
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
  };
  notification: {
    notificationTitle: string;
    noNotification: string;
    clearAllNotification: string;
    commented: string;
    onPost: string;
    like: string;
    yourPost: string;
    yourComment: string;
  };
}