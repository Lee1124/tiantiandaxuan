/**
 * 该脚本为了获取玩家个人信息
 */
import GameControl from '../GameCenter/GameControl';
import HTTP from '../common/HttpRequest'
import Main from '../common/Main'
class PlayerNews {
    /**
     * 获取个人信息
     * @param {*} isShow 是否显示
     * @param {*} data 需要的数据
     */
    open(data) {
        // let that = GameControl.instance;
        this.getPageNews(data);
        this.common(true);
        this.bindEvent(true);
    }
    common(isShow) {
        this.showObj = GameControl.instance.owner.PlayerNews_dialog;
        let maskAlpha = 0;
        let y = isShow ? (Laya.stage.height - this.showObj.height) / 2 : -this.showObj.height;
        GameControl.instance.openDiaLogCommon(isShow, this.showObj, maskAlpha, 'y', y);
    }
    close() {
        this.common(false);
        this.bindEvent(false);
    }
    /**
    * 绑定事件或移除事件
    * @param {*} isBind 是否绑定事件
    */
    bindEvent(isBind) {
        let mask = GameControl.instance.owner._mask;
        if (isBind)
            mask.on(Laya.Event.CLICK, this, this.close);
        else
            mask.off(Laya.Event.CLICK);
    }

    getPageNews(data) {
        HTTP.$request({
            that: this,
            url: '/M.Games.CX/GetSeatUserInfo',
            data: {
                uid: Main.userInfo.userId,
                tuid: data.userId,
                roomid: GameControl.instance.roomId
            },
            success(res) {
                Main.$LOG('获取的玩家个人信息', res)
                if (res.data.ret.type == 0) {
                    this.setPage(res.data);
                } else {
                    Main.showTip(res.data.ret.msg);
                }
            },
            fail() {
            }
        })
    }
    setPage(data) {
        let head = this.showObj.getChildByName("news_head_box").getChildByName("headBg").getChildByName("head");
        let name = this.showObj.getChildByName("news_box").getChildByName("news_name");
        let sex_0 = name.getChildByName("news_sex").getChildByName("sex0");
        let sex_1 = name.getChildByName("news_sex").getChildByName("sex1");
        let ID = this.showObj.getChildByName("news_box").getChildByName("news_ID").getChildByName("news_ID_value");
        let alljs = this.showObj.getChildByName("news_alljs").getChildByName("news_alljs_value");
        let fanpairate = this.showObj.getChildByName("news_fanpairate").getChildByName("news_fanpairate_value");
        let allss = this.showObj.getChildByName("news_allss").getChildByName("news_allss_value");
        let fanpaiwinrate = this.showObj.getChildByName("news_fanpaiwinrate").getChildByName("news_fanpaiwinrate_value");
        let winss = this.showObj.getChildByName("news_winss").getChildByName("news_winss_value");
        let allwinrate = this.showObj.getChildByName("news_allwinrate").getChildByName("news_allwinrate_value");
        let headUrl = 'res/img/head/' + data.head + '.png';
        Main.$LoadImage(head, headUrl, Main.defaultImg.one, 'skin');
        name.text = data.name;
        name.getChildByName("news_sex").left = name.textWidth;
        sex_0.visible = data.sex == 0 ? true : false;
        sex_1.visible = data.sex == 1 ? true : false;
        ID.text = data.userId;
        alljs.text = data.totalJs;
        let totalSs_fm = data.totalSs > 0 ? data.totalSs : 1;
        fanpairate.text = parseInt((data.fpSs / totalSs_fm) * 100) + '%';
        allss.text = data.totalSs;
        let fanpaiss_fm = data.fpSs > 0 ? data.fpSs : 1;
        fanpaiwinrate.text = parseInt((data.fpWinSs / fanpaiss_fm) * 100) + '%';
        winss.text = data.winSs;
        allwinrate.text = parseInt(data.winSs / totalSs_fm) * 100 + '%';
    }
}
export default new PlayerNews();
