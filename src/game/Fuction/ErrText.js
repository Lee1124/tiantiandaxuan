//异常文本打印
import Main from '../common/Main'
class ErrText{
    ERR(that,tip,msg){
        let value=msg;
        if(typeof msg == 'object'){
            value=JSON.stringify(msg)
        }
        this.list=that.owner.ceshi_log_list;
        this.list.vScrollBarSkin = "";//运用滚动
        Main.errList.push({tip:tip,value:value});
        this.list.array=Main.errList;
        this.list.renderHandler = new Laya.Handler(this, this.listtOnRender);
    }
    listtOnRender(cell){
        let value=cell.getChildByName("value");
        let tip=cell.getChildByName("tip");
        tip.text=cell.dataSource.tip;
        value.text=cell.dataSource.value;
    }
}
export default new ErrText();