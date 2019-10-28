import { BookModel } from '../../models/book';
import { ClassicModel } from '../../models/classic';

const classicModel = new ClassicModel();

const bookModel = new BookModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        bookCount: 0,
        classics: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userAuthorized();
        this.getMyBookCount();
        this.getMyFavor();
    },
    getMyBookCount(){
        bookModel.getMyBookCount()
            .then((res)=>{
                this.setData({
                    bookCount: res.count
                })
            })
    },
    getMyFavor(){
        classicModel.getMyFavor((res)=>{
            this.setData({
                classics: res
            })
        })
    },
    getUserInfo(e){
        console.log(e.detail.userInfo.avatarUrl);
    },
    userAuthorized(){
        wx.getSetting({
            success:(data)=>{
                if(data.authSetting['scope.userInfo']){

                }
            }
        });
    },
    onGetUserInfo(event){
        const userInfo = event.detail.userInfo;
        if(userInfo){
            this.setData({
                userInfo,
                authorized:true
            })
        }
    },
    onJumpToAbout(){
        wx.navigateTo({
            url:'/pages/about/about'
        })
    },
    onStydy(){
        wx.navigateTo({
            url:'/pages/course/course'
        })
    }
})