/**
 * 该脚本为站位带入积分或补充钵钵功能
 */
import GameControl from '../GameCenter/GameControl'
import Main from '../common/Main';
import HTTP from '../common/HttpRequest'
class MakeBOBO {
    open(isSeatAt=true) {
        this.MeSeatArr = GameControl.instance._playerArray.filter(item => item.owner.isMe);
        if(this.MeSeatArr.length>0){
            this.getPlayerUsableScore((res) => {
                this.setBOBO();
            });
            this.common(true);
        }else{
            Main.showTip('您当前为观战模式,无法添加钵钵!');
        }
        if(isSeatAt){
            this.bindEvent(true);
        }else{
            this.bindEvent(false);
        }
    }
    bindEvent(isQuest){
        GameControl.instance.owner.bobo_close.on(Laya.Event.CLICK, this, this.close,[isQuest]);//蒙板
        GameControl.instance.owner._mask.on(Laya.Event.CLICK, this, this.close,[isQuest]);//蒙板
    }
    common(show) {
        let showObj = GameControl.instance.owner.makeUp_bobo;
        let maskAlpha = 0;
        let y = show ? Laya.stage.height / 2 : -showObj.height;
        GameControl.instance.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    
    /**
     * 关闭带入弹框
     * @param {*} isRequest 是否请求
     */
    close(isRequest = false) {
        let showObj = GameControl.instance.owner.makeUp_bobo;
        if (showObj.visible) {
            this.common(false);
            if (isRequest)
                GameControl.instance.playerSeatUpSend();
        }
    }

    /**
    * 请求获取玩家的可用积分等信息
    * @param fn 获取结束的回调函数
    */
    getPlayerUsableScore(fn) {
        let that = this;
        HTTP.$request({
            that: this,
            url: '/M.User/GetInfo',
            data: {
                uid: GameControl.instance.userId
            },
            success(res) {
                if (res.data.ret.type == 0) {
                    that._usableScore = res.data.score;
                    let data = { score: res.data.score };
                    fn.call(that, data);
                } else {
                    Main.showTip(res.data.ret.msg);
                }
            },
            fail() {
            }
        })
    }

    /**
    * 设置钵钵带入中的滑动选择事件，已经值的初始化
    */
    setBOBO() {
        let that = GameControl.instance;
        that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu;
        that.owner.bobo_ID.text = that.userId;
        that.owner.bobo_fuwufei.text = that.owner.bobo_daiRuScore.text * (1 / 10);
        that.owner.bobo_trueScore.text = this._usableScore;
        let showObj = that.owner.makeUp_bobo;
        let boboSliderView = showObj.getChildByName("sliderView");
        let slider_btn = boboSliderView.getChildByName("slider_btn");
        let SCALE = boboSliderView.width / 5;
        Main.$slider(boboSliderView, slider_btn, that, (res) => {
            if (res >= 0 && res < SCALE * 1) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 1;
            } else if (res >= SCALE * 1 && res < SCALE * 2) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 2;
            } else if (res >= SCALE * 2 && res < SCALE * 3) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 3;
            } else if (res >= SCALE * 3 && res < SCALE * 4) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 4;
            } else if (res >= SCALE * 4 && res < SCALE * 5) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 5;
            } else if (res == SCALE * 5) {
                that.owner.bobo_daiRuScore.text = that._gameRoomeNews.dairu * 6;
            }
            that.owner.bobo_fuwufei.text = that.owner.bobo_daiRuScore.text * (1 / 10);
        });
    }
}
export default new MakeBOBO();