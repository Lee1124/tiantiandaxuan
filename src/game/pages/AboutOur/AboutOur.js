export default class AboutOur extends Laya.Script {

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
        this.myHeight=0;
    }
    
    onEnable() {
        this.setPageData();
    }

    setPageData() {
        let list=this.owner.textList;
        list.array=[
            {height:50,text:'天天打旋 - 朋友间的乐趣'},
            {height:150,text:'我们致力于建立一个打旋的兴趣社区，让爱好扯旋的粉丝在天天打旋中切磋牌局，提高技术。'},
            {height:100,text:'业内首创的朋友棋牌模式，快速局模式，得到众多扯旋爱好者的首肯。'},
            {height:100,text:'天天打旋成为一个公平，值得信任的平台感到自豪。我们的洗牌算法，以及随机数生成器(RNG)通过了业内最严格的独立认证机构Gaming Laboratories  International(GLI)的测试，符合扑克游戏对于随机性的要求。'},
            {height:100,text:'对于一个棋牌运动，公平性是最关键的，随机数生成器决定了洗牌，发牌的顺序，天天打旋经过GLI认证的随机数生成器保证了发排顺序是足够随机的，并且不会受到其他条件的影响，Pokermaster Pty Ltd致力于天天打旋全球社区建立和运营，公平正直，一直是公司核心价值观的首位。“天天打旋”位于国际数据中心面向亚太地区，在各个区域同时建立有接入中心，保证各个区域玩家的游戏速度和隐私保护。'},
            {height:100,text:'此致敬礼！'},
        ];
        list.vScrollBarSkin="";
        list.renderHandler=new Laya.Handler(this,this.listRender)
    }
    listRender(cell,index){
        console.log(cell)
        setTimeout(()=>{
            let $height=cell.getChildByName("text")._children[0]._textHeight;
            console.log(this.myHeight)
            // cell.y=this.myHeight;
            cell.height=$height;
            let textLabel=cell.getChildByName("text");
            textLabel.text=cell.dataSource.text;
        })
      
    }
}