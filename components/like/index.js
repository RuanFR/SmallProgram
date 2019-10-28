

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like:{
            type:Boolean
        },
        count:{
            type:Number
        },
        readOnly:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc:'../images/like.png',
        noSrc:'../images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(event){
            if(this.properties.readOnly){
                return
            }
            //自定义事件
            let like = this.properties.like;
            let count = this.properties.count;
            
            count = like ? --count:++count;
            this.setData({
                count:count,
                like:!like
            });

            //激活
            let behavior = this.properties.like ? 'like' : 'cancel';
            this.triggerEvent('like',{
                behavior
            },{})
        }
    }
})
