/**
 * 列表下拉刷新功能
 */
import Main from '../common/Main';
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

        //滚动条
        this.listScrollBarSlider = null;
    }
    onEnable() {
        this.list = this.owner;
        Main.$LOG('下拉列表：', this.list)
        this.bindEvent();
        this.addShowNode();
        this.getSmallLoading();
    }

    getSmallLoading(type = Main.loadingType.four) {
        Laya.loader.load("res/atlas/images/common.atlas", Laya.Handler.create(this, onMyLoaded));
        function onMyLoaded() {
            this.smallLoading = new Laya.Animation();
            this.smallLoading.visible = false;
            this.smallLoading.loadAnimation("animation/loading/" + type + ".ani");
            this.smallLoading.pos(30, 28);
            this.iconBox.addChild(this.smallLoading);
        }
    }

    addShowNode() {
        this.iconBox = new Laya.Image();
        this.iconBox.size(60, 60);
        this.iconBox.centerY = 0;
        this.p = new Laya.Panel();
        this.p.visible = false;
        this.p.size(360, 60);
        this.p.top = 0;
        this.p.centerX = 0;
        this.p.zOrder = -1;
        this.text = new Laya.Label();
        this.text.text = '';
        this.text.color = '#935F13';
        this.text.fontSize = 40;
        this.text.width = 270;
        this.text.top = 0;
        this.text.bottom = 0;
        this.text.valign = 'middle';
        this.text.align = 'center';
        this.text.centerX = 0;
        this.p.addChild(this.text);
        this.p.addChild(this.iconBox);
        this.list.addChild(this.p);
    }

    /**
     * 改变图标
     * @param {*} type 类型(0:无图片,1：为静态图标 2：为动画)
     * @param {*} iconUrl 地址
     */
    changeIcon(type = 1, iconUrl = 'res/img/common/icon2.png') {
        this.smallLoading.visible = false;
        this.smallLoading.stop();
        this.iconBox.loadImage('');
        if (type == 1) {
            this.iconBox.loadImage(iconUrl);
        } else if (type == 2) {
            this.iconBox.loadImage('');
            this.smallLoading.visible = true;
            this.smallLoading.play();
        }
    }

    /**监听滚动条的位置 */
    bindChangeEvent() {
        this.list.scrollBar.changeHandler = new Laya.Handler(this, (val) => {
            this.p.visible = val <= -40 ? true : false;
            // console.log(val)
        })
    }

    bindEvent() {
        // this.list.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this.list.off(Laya.Event.MOUSE_MOVE);
        this.list.off(Laya.Event.MOUSE_UP);
        this.list.off(Laya.Event.MOUSE_OUT);
        this.list.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.list.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        // this.list.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }

    // onMouseDown() {
    //     Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
    //     Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
    //     Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    // }

    onMouseMove() {
       if(this.list.array.length>0){
        let val = this.list.scrollBar.value;
        if (val <= 0 && val >= -100) {
            this.p.height = -parseInt(val);
        }
        if (val < -100) {
            this.p.height = 100;
        }
        this.p.visible = val <= -40 ? true : false;
        if (val > -100) {
            this.changeIcon();
            this.setTest('下拉刷新');
        } else if (val <= -100) {
            this.changeIcon(1, 'res/img/common/icon1.png');
            this.setTest('释放立即刷新');
        }
       }else{
        this.setTest('');
       }
    }

    onMouseUp() {
        if(this.list.array.length>0){
            let mouseUpValue = this.list.scrollBar.value;
            if (mouseUpValue < 0 && mouseUpValue <= -100) {
                this.listScrollBarSlider.min = -100;
                // console.log(this.listScrollBarSlider.min)
                if (this.moveUpFn) {
                    this.setTest('正在刷新...');
                    this.changeIcon(2);
                    this.moveUpFn.call(this.callThis, mouseUpValue, (res) => {
                        this.setTest(res);
                        this.changeIcon(0);
                        setTimeout(() => {
                            this.p.visible = false;
                        }, 500)
                    });
                }
            }
        }
    }

    // bindEvent() {
    //     this.list.off(Laya.Event.MOUSE_UP);
    //     this.list.off(Laya.Event.MOUSE_MOVE);
    //     this.list.on(Laya.Event.MOUSE_MOVE, this, (e) => {
    //         if (e.target.scrollBar) {
    //             let val = e.target.scrollBar.value;
    //             if (val <= 0 && val >= -100) {
    //                 this.p.height = -parseInt(val);
    //             }
    //             if(val<-100){
    //                 this.p.height = 100;
    //             }
    //             this.p.visible = val <= -40 ? true : false;
    //             if (val > -100) {
    //                 this.changeIcon();
    //                 this.setTest('下拉刷新');
    //             } else if (val <= -100) {
    //                 this.changeIcon(1, 'res/img/common/icon1.png');
    //                 this.setTest('释放立即刷新');
    //             }
    //         }
    //     })
    //     this.list.on(Laya.Event.MOUSE_UP, this, (e) => {
    //         if (e.target.scrollBar) {
    //             let mouseUpValue = e.target.scrollBar.value;
    //             if (mouseUpValue < 0 && mouseUpValue <= -100) {
    //                 this.listScrollBarSlider.min = -100;
    //                 if (this.moveUpFn) {
    //                     this.setTest('正在刷新...');
    //                     this.changeIcon(2);
    //                     this.moveUpFn.call(this.callThis, mouseUpValue, (res) => {
    //                         this.setTest(res);
    //                         this.changeIcon(0);
    //                         setTimeout(() => {
    //                             this.p.visible = false;
    //                         }, 500)
    //                     });
    //                 }
    //             }
    //         }
    //     })
    // }
    setTest(text = '下拉刷新') {
        this.text.text = text;
    }
    /**
     * 
     * @param {*} fn 回调函数
     */
    initCall(that, fn) {
        this.listScrollBarSlider = this.list.scrollBar.slider;
        this.bindChangeEvent();
        this.callThis = that;
        this.moveUpFn = fn;
    }
}