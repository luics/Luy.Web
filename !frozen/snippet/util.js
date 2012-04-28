//循环队列
function CircleQueue(size){
    this.initQueue(size);
}

CircleQueue.prototype = {
    //初始化队列
    initQueue : function(size){
        this.size = size;
        this.list = new Array();
        this.capacity = size + 1;
        this.head = 0;
        this.tail = 0;
    },
    //压入队列
    enq : function(ele){
        if(typeof ele == "undefined" || ele == ""){
            return;
        }
        var pos = (this.tail + 1) % this.capacity;
        if(pos == this.head){//判断队列是否已满
            return;
        }else{
            this.list[this.tail] = ele;
            this.tail = pos;
        }
    },
    //从队列中取出头部数据
    deq : function(){
        if(this.tail == this.head){ //判断队列是否为空
            return;
        }else{
            var ele = this.list[this.head];
            this.head = (this.head + 1) % this.capacity;
            return ele;
        }
    },
    //查询队列中是否存在此元素，存在返回下标，不存在返回-1
    find : function(ele){
        var pos = this.head;
        while(pos != this.tail){
            if(this.list[pos] == ele){
                return pos;
            }else{
                pos = (pos + 1) % this.capacity;
            }
        }
        return -1;
    },
    //返回队列中的元素个数
    size : function(){
        return (this.tail - this.head + this.capacity) % this.capacity;
    },
    //清空队列
    clear : function(){
        this.head = 0;
        this.tail = 0;
    },
    //判断队列是否为空
    isEmpty : function(){
        if(this.head == this.tail){
            return true;
        }else{
            return false;
        }
    }
} 
