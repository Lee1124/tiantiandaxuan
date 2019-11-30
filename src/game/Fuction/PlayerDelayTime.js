/**
 * 该脚本为玩家延时操作
 */
// import GameControl from '../GameCenter/GameControl';
import Main from '../common/Main'
class PlayerDelayTime {
    /**
     * 注册事件
     * @param {*} that 执行域 
     * @param {*} data 数据
     */
    init(type, that, data) {
        this.delayType = type;
        this.GameControl = that;
        this.GameControl.owner.delayTimeBtn.visible = true;
        this.GameControl.owner.delayTimeBtn.getChildByName("value").text = data.delayedScore;
        this.GameControl.owner.delayTimeBtn.on(Laya.Event.CLICK, this, this.onClickDelayTime);
    }
    offEvent(that) {
        Main.$LOG('玩家延时操作offEvent:',that)
        if(that.owner.delayTimeBtn){
            that.owner.delayTimeBtn.visible = false;
            that.owner.delayTimeBtn.off(Laya.Event.CLICK, this, this.onClickDelayTime);
        }
    }
    onClickDelayTime(that) {
        let that2 = this;
        this.GameControl.onSend({
            name: 'M.Games.CX.C2G_TimeDelay',
            data: {
                roomId: this.GameControl.roomId,
            },
            success(res) {
                Main.$LOG('延时操作：', res)
                that2.dealWithRes(that2.GameControl, res);
            }
        })
    }
    dealWithRes(that, data) {
        if (data.ret.type == 0) {
            that.owner.showTips(data.ret.msg);
            let delayLoseScore = that.owner.delayTimeBtn.getChildByName("value");
            delayLoseScore.text = data.delayedNum == data.delayedNumMax ? 'MAX' : data.delayedScore;
            if (this.delayType == that.delayType.action) {
                that._playerArray.forEach(item_player => {
                    if (data.userId == item_player.owner.userId) {
                        item_player.showPlayerCountDown(data);
                    }
                })
            } else if (this.delayType == that.delayType.sub) {
                that.assignPokerCountDown(true, data);
            }
        } else {
            that.owner.showTips('你已达到延时最大次数!');
        }
    }
}
export default new PlayerDelayTime();