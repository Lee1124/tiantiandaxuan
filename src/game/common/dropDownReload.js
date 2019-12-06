/**
 * 列表下拉刷新功能
 */
export default class dropDownReload extends Laya.Script {
    constructor() {
        super();
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        this.moveUpFn;//鼠标抬起回调
    }

    onEnable() {
        this.list = this.owner;
        // this.addShowNode();
        console.log(this.list)
        this.bindEvent();
    }
    onStart() {

    }

    addShowNode() {
        this.text = new Laya.Label();
        this.text.visible = false;
        this.text.text = '下拉刷新';
        this.text.color = '#935F13';
        this.text.fontSize = 40;
        this.text.width = 300;
        this.text.align = 'center';
        this.text.centerX = 0;
        this.text.top = 50;
        this.list.addChild(this.text);
    }

    bindEvent() {
        this.list.off(Laya.Event.MOUSE_UP);
        this.list.off(Laya.Event.MOUSE_MOVE);
        this.list.on(Laya.Event.MOUSE_MOVE, this, (e) => {
            if (e.target.scrollBar) {
                let mouseUpValue = e.target.scrollBar.value;
                // if (mouseUpValue <= -100 && mouseUpValue > -150) {
                //     // this.setTest(true, '下拉刷新');
                // } 
                // else if (mouseUpValue > -100) {
                //     this.text.visible = false;
                // } else if (mouseUpValue <= -150) {
                //     this.setTest(true, '释放立即刷新');
                // }
            }
        })
        this.list.on(Laya.Event.MOUSE_UP, this, (e) => {
            if (e.target.scrollBar) {
                let mouseUpValue = e.target.scrollBar.value;
                if (mouseUpValue < 0 && mouseUpValue <= -100) {
                    if (this.moveUpFn) {
                        // this.text.top = -100;
                        // this.setTest(true, '正在刷新...');
                        // e.target.top = 150;
                        this.moveUpFn.call(this.callThis, mouseUpValue);
                    }
                    // else {
                    //     this.setTest(false);
                    // }
                }
                //  else if (mouseUpValue > -150) {
                //     this.setTest(false);
                // }
            }
        })
    }
    setTest(show, text = '下拉刷新') {
        this.text.visible = show;
        this.text.text = text;
        if (!show)
            this.text.top = 50;
    }
    /**
     * 
     * @param {*} fn 回调函数
     */
    initCall(that, fn) {
        this.callThis = that;
        this.moveUpFn = fn;
    }
}