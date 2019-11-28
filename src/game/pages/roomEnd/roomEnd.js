import Main from '../../common/Main';
import GameControl from '../../GameCenter/GameControl';
export default class roomEnd extends Laya.Script {
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
        
    }
    onStart(){
        Main.$LOG('房间结束脚本：',this.owner._openedData);
        if(this.owner._openedData.show){
            this.owner.zOrder=10;
            this.setPageData(this.owner._openedData.data);
            this.setPageListData(this.owner._openedData.data);
            this.closeSoket();
            this.registerEvent();
        }
    }

    onDisable() {
    }

    /**
     * 设置页面数据
     * @param {*} data 数据
     */
    setPageData(data){
        this.owner.e_name.text=data.nick;
        this.owner.e_userId.text='['+data.userId+']';
        this.owner.e_timeLong.text = Main.secondToDate(data.roomTime);
        Main.$LoadImage(this.owner.e_head,data.head);
        this.owner.e_ct2_name.text=data.nick;
        this.owner.e_ct2_ID.text=data.userId;
        this.owner.e_score.text=data.self_sf;
        this.owner.e_ct3_tb1.text=data.self_shoushu;
        this.owner.e_ct3_tb2.text=data.all_shoushu;
        this.owner.e_ct3_tb3.text=data.all_dairu;
    }

    setPageListData(data){
        let list=this.owner.end_list;
        list.visible=true;
        list.array=data.participant;
        list.vScrollBarSkin = "";
        list.renderHandler = new Laya.Handler(this, this.pageListOnRender);
    }

    pageListOnRender(cell){
        let name=cell.getChildByName("c1");
        let dairu=cell.getChildByName("c2");
        let score=cell.getChildByName("c3");
        name.text=cell.dataSource.nick;
        dairu.text=cell.dataSource.dairu;
        score.text=cell.dataSource.sf;
    }

    registerEvent(){
        
        this.owner.end_close.on(Laya.Event.CLICK,this,this.onClickClose)
    }

    closeSoket(){
        GameControl.instance.onClose();
    }

    onClickClose(){
        Main.$openScene('tabPage.scene', true, {page:this.owner._openedData.page})
    }
}