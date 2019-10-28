const paginationBev = Behavior({
    data:{
        dataArray:[],
        total: 0,
        noneResult: false
    },
    methods:{
        setMoreData(dataArray){
            const tempArray = this.data.dataArray.concat(dataArray);
            this.setData({
                dataArray: tempArray
            })
        },
        getCurrentStart(){
            return this.data.dataArray.length;
        },
        hasMore(){
            if(this.data.dataArray.length >= this.data.total){
                return false
            }else{
                return true
            }
        },
        setTotal(total){
            this.data.total = total;
            if(total == 0){
                this.setData({
                    noneResult: true
                })
            }
        },
        initialize(){
            this.setData({
                dataArray: [],
                noneResult: false
            })
            this.data.total = null;
        }
    }
})

export { paginationBev };