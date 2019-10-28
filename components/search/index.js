import { KeywordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';
import { paginationBev } from '../behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more:{
            type:String,
            observer:'loadMore'
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,   //锁
        loadingCenter: false,
    },
    attached(){
        keywordModel.getHot()
            .then((res)=>{
                this.setData({
                    hotWords: res.hot
                })
            })
        this.setData({
            historyWords:keywordModel.getHistory()
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        loadMore(){
            const { q, loading} = this.data;
            if(!q){
                return
            }
            if(loading) return

            if(this.hasMore()){
                this._locked();
                bookModel.search(this.getCurrentStart(), q).then((res)=>{
                    this.setMoreData(res.books);
                    this.setTotal(res.total);
                    this._unLocked();
                },()=>{
                    this._unLocked();
                })
            }
        },
        onCancel(){
            this.triggerEvent('cancel');
            this.initialize();
        },
        onConfirm(event){
            this._showLoadingCenter();
            this.setData({ searching: true})

            const q = event.detail.value || event.detail.text;
            this.setData({
                q
            })
            bookModel.search(0, q).then((res)=>{
                this.setMoreData(res.books);
                this.setTotal(res.total);
                this.setData({
                    q
                })
                keywordModel.addToHistory(q);
                this._hideLoadingCenter();
            })
        },
        _locked(){
            this.setData({loading:true})
        },
        _unLocked(){
            this.setData({loading:false})
        },
        _showLoadingCenter(){
            this.setData({loadingCenter: true})
        },
        _hideLoadingCenter(){
            this.setData({loadingCenter: false})
        },
        // 输入框叉按钮
        onDelete(){
            this.setData({ 
                searching: false,
                q:'',
            })
            this.initialize();
        }
    }
})
