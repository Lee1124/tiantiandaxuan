import Main from '../../common/Main';

/**
 * 该脚本继承登录页面的场景，为了方便获取UI组件等...
 */
export default class RoomEndUI extends Laya.Scene{
    constructor(){
        super();
    }
    onAwake(){
      
    }
    onOpened(options){
        Main.$LOG('房间结束界面所收到的值:',options);
        this._openedData=options;
        this.visible=options.show?options.show:false;
    }
}