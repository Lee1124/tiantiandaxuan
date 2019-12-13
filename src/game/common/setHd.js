/**
 * 该脚本为了动态设置头部的高度
 */
import Main from '../common/Main';
export default class setHd extends Laya.Script {
    constructor() {
        super();
    }
    onEnable() {
        this.owner.zOrder=20;
        if (Main.phoneNews.deviceNews == 'Android') {
            let hdStartHeight = this.owner.height;
            let titleBox = this.owner.getChildByName('titleBox');
            this.owner.height = hdStartHeight + Main.phoneNews.statusHeight;
            titleBox.top = titleBox.top + Main.phoneNews.statusHeight;
        }
    }
}