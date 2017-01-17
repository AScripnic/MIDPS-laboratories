import moduleName from '../name';
import { ThreadPreviewModel } from '../models/ThreadPreviewModel';

class BoardController{
  constructor($state) {
    this.state = $state;
    this.boards = ['n', 'e', 'v', 's'];
    this.threadsPreview = [
      new ThreadPreviewModel({
        previewImageLink: 'http://www.cheeseandburger.com/images/html5/home-burger.png',
        imageLink: 'http://www.drodd.com/images15/burger15.png',
        author: 'Anonymous',
        id: '8473659',
        timestamp: new Date,
        replies: 12,
        imagesTotal: 1,
        imageName: 'the mcchicken, for me.jpg',
        lastReplies: [
          {
            author: 'Anonymous',
            id: '8473659',
            timestamp: new Date,
            message: 'a small reply'
          },
          {
            previewImageLink: 'http://www.cheeseandburger.com/images/html5/home-burger.png',
            imageLink: 'http://www.drodd.com/images15/burger15.png',
            author: 'Anonymous',
            id: '8473659',
            timestamp: new Date,
            imageName: 'sample image.jpg'
          }
        ],
        message:
          `
            Daily cook off.
            
            Your main ingredient is....
            
            A pound of skinless chicken breast.
            
            You have 3 hours and a fully stocked fridge and pantry.
            
            Your challenge... Make dinner that isn't tendies
            
            
            Go!
          `
      }),
      new ThreadPreviewModel({
        previewImageLink: 'https://lh3.googleusercontent.com/i-vHb3CryeDkJrTydwmJFJ1M1HrFtjAGIDC5xI7wI7bkOqV_iV0Zpr6jtm-9Lmv6n1pgkMBhJHSb2Ef1XMxLEQ=s400',
        imageLink: 'http://bestburgerinsf.com/wp-content/themes/burger2014/images/best-burger-in-sf.png',
        author: 'Anonymous',
        id: '8473660',
        timestamp: new Date,
        replies: 32,
        imagesTotal: 2,
        imageName: 'shepherds.jpg',
        lastReplies: [
          {
            author: 'Anonymous',
            id: '8473659',
            timestamp: new Date,
            message: 'a small reply 2'
          },
          {
            previewImageLink: 'http://www.cheeseandburger.com/images/html5/home-burger.png',
            imageLink: 'http://www.drodd.com/images15/burger15.png',
            author: 'Anonymous',
            id: '8473659',
            timestamp: new Date,
            imageName: 'sample image.jpg',
            message: 'I like this post'
          }
        ],
        message: `Shepherd's pie. Done.`
      })
    ];
  }

  /**
   * Return if a slash should be shown in header
   * @param {Number} index
   * @returns {Boolean}
   */
  showSlash(index) {
    return index != this.boards.length - 1;
  }

  /**
   * Change board
   * @param {String} boardId
   */
  changeBoard(boardId) {
    this.state.go('board', {boardId});
  }
}

angular.module(moduleName)
  .controller('boardController', ['$state', (...args) => {
    return new BoardController(...args);
  }]);