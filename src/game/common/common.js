class CommonSet{
    constructor() {}
    // 设置布局适配数据
    /**
     * 
     * @param setTarget 需要设置适配参数的对象
     */
    setLayoutValue(setTarget){
       
        setTarget.x=parseInt((setTarget.x/(1242/Laya.stage.width)).toFixed(0));//设置座位适配X
        setTarget.y=parseInt((setTarget.y/(2208/Laya.stage.height)).toFixed(0));//设置座位适配y

        // console.log(setTarget,{x:setTarget.x,y:setTarget.y})
    }
}

export default new CommonSet();
