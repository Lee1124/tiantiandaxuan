import Main from './Main';
 /**
 * 该脚本为滑动选择
 */
export default class sliderSelect extends Laya.Script {
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
    }

    onEnable() {
        console.log('demo：', this)
        this.i=0;
        this.owner.startBtn.on(Laya.Event.CLICK, this, this.demo);//游戏开始事件
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
    }

    demo(){
        // this.owner.Tipbox._children = [];
        this.i++;
        let tip = new Laya.Sprite();
        let text = new Laya.Text();
        text.text = '就哈哈哈哈阿'+this.i;
        tip.addChild(text);
        text.color = '#FFFFFF';
        text.fontSize = 40;
        text.width = 720;
        text.height = 110;
        text.align = 'center';
        text.valign = 'middle';
        tip.name=this.i;
        tip.loadImage('res/img/tip.png', Laya.Handler.create(this, loadImgEnd));
        function loadImgEnd() {
            this.owner.Tipbox.addChild(tip);
        }
        tip.width = 720;
        tip.height = 110;
        setTimeout(() => {
            Laya.Tween.to(tip, { y: -200 }, 600, null, Laya.Handler.create(this, this.tipMoveEnd, [tip]))
        }, 100)
    }
    tipMoveEnd(tipObj) {
        console.log(this.owner.Tipbox._children)
        this.owner.Tipbox._children.forEach((item,index)=>{
            item.y=-300-(this.owner.Tipbox._children.length-(index+1))*120
        })
        // tipObj.y=tipObj.y-110*(this.owner.Tipbox._children.length-1);
        // Laya.Tween.to(tipObj, { alpha: 0 }, 300, null, Laya.Handler.create(this, this.tipAlphaEnd, [tipObj]));
    }
    tipAlphaEnd(tipObj) {
        tipObj.removeSelf();
    }

    page1ListOnRender(cell,index){
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