import Main from './Main'
class HttpRequest{
    /**
     * @param {*} obj.that 执行域
     * @param {*} obj.url 请求地址
     * @param {*} obj.data 请求数据
     * @param {*} obj.method 请求方式(暂时支持get和post)
     */
    $request(obj){
        let that=obj.that;
        let xhr = new Laya.HttpRequest();
        let url=Main.requestApi+obj.url;
        let dataObj=obj.data;
        let postData='';
        let method=obj.method?obj.method:'get';
        let dataObjArr = [];
        if(method=='get'){
            for (var key in dataObj) {
                if (dataObj.hasOwnProperty(key)) {
                    dataObjArr.push(key);
                    if (dataObjArr.length == 1) {
                        url = url + '?' + key + '=' + dataObj[key];
                    } else {
                        url = url + '&' + key + '=' + dataObj[key];
                    }
                }
            }
        }else if(method=='post'){
            for (var key in dataObj) {
                if (dataObj.hasOwnProperty(key)) {
                    dataObjArr.push(key);
                    if (dataObjArr.length == 1) {
                        postData = key + '=' + dataObj[key];
                    } else {
                        postData += '&' + key + '=' + dataObj[key];
                    }
                }
            }
        }
        xhr.http.timeout = 20000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, (res)=>{
            obj.success.call(that,res)
        });
        xhr.once(Laya.Event.ERROR, this, (err)=>{
            console.log('请求异常:',err)
            if(obj.fail)
            obj.fail.call(that,err)
        });
        xhr.on(Laya.Event.PROGRESS, this, (ess)=>{
            console.log(ess)
            if(obj.ess)
            obj.ess(ess)
        });
        xhr.send(url,postData, method, 'json');
    }
}
export default new HttpRequest();