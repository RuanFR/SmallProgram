import { BookModel } from '../../models/book';
import { LikeModel } from '../../models/like';

const likeModel = new LikeModel();

const bookModel = new BookModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: null,
        likeStatus: false,
        likeCount: 0,
        posting:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.showLoading();
        const bid = options.bid
        const detail = bookModel.getDetail(bid);
        const comments = bookModel.getComments(bid);
        const likeStatus = bookModel.getLikeStatus(bid)
        Promise.all([detail,comments,likeStatus])
            .then((res)=>{
                this.setData({
                    book: res[0],
                    comments: res[1].comments,
                    likeStatus: res[2].like_status,
                    likeCount: res[2].fav_nums
                })
                wx.hideLoading();
            })
        
    },
    onLike(event){
        const like_or_cancel = event.detail.behavior;
        likeModel.like(like_or_cancel, this.data.book.id, 400);
    },
    onFakePost(){
        this.setData({
            posting: true
        })
    },
    onCancel(){
        this.setData({
            posting: false
        })
    },
    onPost(event){
        const { book, comments} = this.data;
        const comment = event.detail.text || event.detail.value;
        if(!comment) return;

        if(comment.length > 12){
            wx.showToast({
                title: '短评最多输入12个字',
                icon: 'none'
            })
            return
        }

        bookModel.postComment(book.id, comment)
            .then((res)=>{
                wx.showToast({
                    title: '+1',
                    icon: 'none'
                })
                comments.unshift({
                    content:comment,
                    nums:1
                })
                this.setData({
                    comments,
                    posting:false
                })

            })
    },
    maskCancel(){
        this.setData({
            posting: false
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
})