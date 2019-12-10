// import Main from './Main';
/**
* 该脚本为滑动选择
*/
// import Main from '../common/Main';
// import HTTP from '../common/HttpRequest';
export default class sliderSelect extends Laya.Script {
    constructor() {
        super();
        /** @prop {name:tip,tips:"预制体TIP",type:Prefab}*/
        /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
        let intType = 1000;
        /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
        let numType = 1000;
        /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
        let strType = "hello laya";
        /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
        let boolType = true;
        // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    }

    onEnable() {
        console.log('demo：', this)
        // this.i = 0;
        // let game_music=this.owner.game_music;
        // let switchBox=game_music.getChildByName("switchBox");
        // Main.$switch(switchBox,true,this,(res)=>{
        //     console.log(res)
        // })
        // this.listArr=[1,2,3,4];
        // this.list1=this.owner.tipList;
        // this.list1.vScrollBarSkin = "";
        // this.list1.array= this.listArr;
        // this.i=100000000000;
        // setInterval(()=>{
        //     listArr.push(i++);
        //     this.list1.array=listArr;
        //     this.list1.scrollTo(listArr.length-1);
        //     this.list1.renderHandler = new Laya.Handler(this, this.page1ListOnRender);
        // },2000)
        // this.list1.renderHandler = new Laya.Handler(this, this.page1ListOnRender);
        // this.owner.createBtn.on(Laya.Event.CLICK, this, this.demo)
        // let data = {
        //     uid: Main.userInfo.userId
        // }
        // HTTP.$request({
        //     that: this,
        //     url: '/M.User/GetInfo',
        //     data: data,
        //     success(res) {
        //         if (res.data.ret.type == 0) {
        //             console.log(res)
        //             // this.owner.myDemo.loadImage('res/img/poker/0.png')
        //         } else {
        //             Main.showDiaLog(res.data.ret.msg);
        //         }
        //     },
        //     fail() {
        //     }
        // })
    }


    demo() {
        // this.owner.Tipbox._children = [];
        // let tip = new Laya.Sprite();
        // let text = new Laya.Text();
        // text.text = '就哈哈哈哈阿'+this.i;
        // tip.addChild(text);
        // text.color = '#FFFFFF';
        // text.fontSize = 40;
        // text.width = 720;
        // text.height = 110;
        // text.align = 'center';
        // text.valign = 'middle';
        // tip.name=this.i;
        // tip.loadImage('res/img/common/tip.png', Laya.Handler.create(this, loadImgEnd));
        // function loadImgEnd() {
        //     this.TipBox.addChild(tip);
        // }
        // tip.width = 720;
        // tip.height = 110;
        let tip = Laya.Pool.getItemByCreateFun("tip", this.tip.create, this.tip);
        // tip.pos((Laya.stage.width-tip.width)/2,(Laya.stage.height-tip.height)/2)
        tip.name = 'tip' + this.i
        this.owner.TipBox.addChild(tip);
        // console.log(tip)
        // setTimeout(() => {
        //     Laya.Tween.to(tip, { y: -300 }, 600, null, Laya.Handler.create(this, this.tipMoveEnd, [tip]))
        // }, 100)
        console.log(this.owner.TipBox._children)
        // setTimeout(() => {
          
        // }, 300)
        let length = this.owner.TipBox._children.length;
        this.owner.TipBox._children.forEach((item, index) => {
            if (index < length - 1) {
                item.y = -200 - (120 * (length - index - 1));
                console.log(item.y)
            }
        });
        Laya.Tween.to(tip, { y: -200 }, 600, null, Laya.Handler.create(this, this.tipMoveEnd, [tip]))
    }
    tipMoveEnd(tipObj) {
        console.log('结束')
        // this.owner.Tipbox._children.forEach((item,index)=>{
        //     item.y=-300-(this.owner.Tipbox._children.length-(index+1))*120
        // })
        // tipObj.y=tipObj.y-110*(this.owner.Tipbox._children.length-1);
        // Laya.Tween.to(tipObj, { alpha: 0 }, 300, null, Laya.Handler.create(this, this.tipAlphaEnd, [tipObj]));
        // let length = this.owner.TipBox._children.length;
        // this.owner.TipBox._children.forEach((item, index) => {
        //     // if (index < length - 1) {

        //     //     console.log(item.y)
        //     // }
        //     item.y = -120 - (120 * (length - index - 1));
        // });
    }
    tipAlphaEnd(tipObj) {
        // tipObj.removeSelf();
    }

    page1ListOnRender(cell, index) {
        // console.log(cell)
        // let text=cell.getChildByName('bg').getChildByName("text");
        // text.text=cell.dataSource;
        // // if(index==this.list1.array.length-1){
        // //     cell.alpha=1;
        // //     cell.y=300;
        // //     Laya.Tween.to(cell,{y:index*90},400)
        // // }
        // cell.alpha=1;
        // cell.y=300;
        // Laya.Tween.to(cell,{y:index*90},400)
    }
}