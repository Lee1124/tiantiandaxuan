/**
 * 设置IP
 */
import Main from '../common/Main';
import myDiaLog from '../Fuction/OpenDiaLog';
class SetIP{
    init(thisJS){
        this.num=0;
       
        this.logo=thisJS.owner.getChildByName('logo');
        this.logo.on(Laya.Event.CLICK,this,()=>{
            this.num++;
            if(this.num%4==0){
                let myDiaLogJS = Laya.stage.getChildByName('dialogView').getComponent(myDiaLog);
                let dialogBg2 = myDiaLogJS.dialog.getChildByName('dialogBg2');
                this.listCt=dialogBg2.getChildByName('selectIPList');
                this.listCt.vScrollBarSkin = "";//运用滚动
                this.listCt.visible = true;
                let websoketApiIP=Main.websoketApi.split(':')[0];
                this.listCt.array = Main.IPArr;
                this.listCt.array.forEach(item=>{
                    item.isSelect=item.ip==websoketApiIP?true:false;
                })
                this.listCt.renderHandler = new Laya.Handler(this, this.listCtOnRender);
                this.listCt.mouseHandler = new Laya.Handler(this, this.clicklistCtRow);
                myDiaLogJS.open(this, true, 0.3, true, null,2);
            }
        })
    }

    listCtOnRender(cell){
        let IPBOX=cell.getChildByName('IP');
        IPBOX.text=cell.dataSource.ip;
        IPBOX.bgColor=cell.dataSource.isSelect?'#7CC9F7':'';
    }

    clicklistCtRow(Event){
        if (Event.type == 'click') {
            this.clearAllSelect();
            let IPBOX = Event.target.getChildByName('IP');
            IPBOX.bgColor='#7CC9F7';
            Main.websoketApi=Event.target.dataSource.ip+':8082';
            Main.requestApi='http://'+Event.target.dataSource.ip+':8081';
            Main.$LOG( '选择的IP:',Main.websoketApi, Main.requestApi);
        }
    }

    clearAllSelect() {
        this.listCt.cells.forEach(item => {
            let $IPBOX = item.getChildByName("IP");
            $IPBOX.bgColor = null;
        });
    }
}
export default new SetIP();