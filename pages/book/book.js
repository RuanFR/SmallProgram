import { BookModel } from '../../models/book';

const bookModel  = new BookModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books:[],
        searching: false,
        more: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookModel.getHotList().then((res)=>{
            this.setData({
                books:res
            })
        })



        /**
         * 正确promise的用法
         */
        // bookModel.getHotList().then((res)=>{
        //     console.log(res,'------');
        //     return bookModel.getMyBookCount();
        // })
        // .then((res)=>{
        //     console.log(res);
        //     return bookModel.getMyBookCount();
        // })
        // .then((res)=>{
        //     console.log(res);
        // })


        /**
         * 不需要像回调函数一样用promise
         */
        // const hotList = bookModel.getHotList();
        // hotList.then((res)=>{
        //         console.log(res)
        //         bookModel.getMyBookCount().then((count)=>{
        //             console.log(count);
        //             bookModel.getMyBookCount().then((test)=>{
        //                 console.log(test);
        //             })
        //         })
        //     }
        // );


        /**
         * promise讲解
         */
        // const promise = new Promise((resolve, reject)=>{
        //     //pending  fulfilled  rejected
        //     //进行中    已成功       已失败  调用上面两个方法之后就凝固了不能在改变
        //     wx.getSystemInfo({
        //         success(res){
        //             resolve(res);
        //         },
        //         fail(err){
        //             reject(err);
        //         }
        //     })
        // })

        // promise.then((res)=>{
        //     console.log('res',res);
        // },(err)=>{
        //     console.log('err',err);
        // })
    },
    onSearching(){
        this.setData({
            searching:true
        })
    },
    onCancel(){
        this.setData({
            searching:false
        })
    },
    onReachBottom(){
        this.setData({
            more: !this.data.more
        })
    },
})