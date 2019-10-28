import { ClassicModel } from '../../models/classic';
import { LikeModel } from '../../models/like';

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({
    data: {
        classic: null,
        latest:true,
        first:false,
        likeCount:0,
        likeStatus:false
    },
    onLoad(options) {
        classicModel.getLatest((res) => {
            // console.log(res);
            this.setData({
                classic:res,
                likeCount:res.fav_nums,
                likeStatus:res.like_status
            })
            // latestClassic   currentClassic
        });
    },
    onLike(event) {
        let { id, type } = this.data.classic;
        let behavior = event.detail.behavior;
        likeModel.like(behavior,id,type);
    },

    onNext(event){
        this._updateClassic('next');
    },

    onPrevious(event){
        this._updateClassic('previous');
    },    

    _updateClassic(nextOrPrevious){
        let index = this.data.classic.index;
        classicModel.getClassic(index, nextOrPrevious,(res)=>{
            this._getLikeStatus(res.id, res.type);
            this.setData({
                classic:res,
                latest:classicModel.isLatest(res.index),
                first:classicModel.isFirst(res.index)
            })
        })
    },
    _getLikeStatus(artID, category){
        likeModel.getClassicLikeStatus(artID, category,
            (res)=>{
                this.setData({
                    likeCount:res.fav_nums,
                    likeStatus:res.like_status
                })
            })
    }
})