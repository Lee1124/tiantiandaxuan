/**
 * 该脚本为表情聊天功能
 */
import GameControl from '../GameCenter/GameControl';
import Main from '../common/Main'
class ExpressionChat {
    /**
     * 打开发表情的弹框
     * @param {*} that 执行域
     */
    open(that) {
        this.GameUI = that;
        this.GameControl = GameControl.instance;
        this.MeSeatArr = this.GameControl._playerArray.filter(item => item.owner.isMe);
        if (this.MeSeatArr.length > 0) {
            this.init();
            this.common(true);
            this.bindEvent(true);
        } else {
            Main.showTip('旁观者不能发送表情!');
        }
    }
    common(show) {
        let showObj = this.GameUI.Expression_dialog;
        let maskAlpha = 0;
        let y = show ? Laya.stage.height - showObj.height : Laya.stage.height;
        this.GameControl.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    /**
     * 关闭发表情的弹框
     */
    close(that) {
        if (this.GameUI && this.GameControl) {
            this.common(false);
            this.bindEvent(false);
        }
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
    /**
    * 初始化表情的弹框中的内容
    */
    init() {
        let list = this.GameUI.Expression_dialog.getChildByName("e_list");
        list.visible = true;
        list.vScrollBarSkin = "";//运用滚动
        list.array = [
            { id: 0, icon: 'res/img/Expression/0_0.png' },
            { id: 1, icon: 'res/img/Expression/1_0.png' },
            { id: 2, icon: 'res/img/Expression/2_0.png' },
            { id: 3, icon: 'res/img/Expression/3_0.png' },
            { id: 4, icon: 'res/img/Expression/4_0.png' },
            { id: 5, icon: 'res/img/Expression/5_0.png' },
            { id: 6, icon: 'res/img/Expression/6_0.png' },
            { id: 7, icon: 'res/img/Expression/7_0.png' },
            { id: 8, icon: 'res/img/Expression/8_0.png' },
            { id: 9, icon: 'res/img/Expression/9_0.png' },
            { id: 10, icon: 'res/img/Expression/10_0.png' },
            { id: 11, icon: 'res/img/Expression/11_0.png' },
            { id: 12, icon: 'res/img/Expression/12_0.png' },
            { id: 13, icon: 'res/img/Expression/13_0.png' },
            { id: 14, icon: 'res/img/Expression/14_0.png' }
        ];
        list.renderHandler = new Laya.Handler(this, this.listRenderHandler);
        list.mouseHandler = new Laya.Handler(this, this.oneMouseHandler);
    }

    listRenderHandler(cell) {
        let iconBox = cell.getChildByName("icon");
        iconBox.skin = cell.dataSource.icon;
    }

    oneMouseHandler(Event) {
        //this.MeSeatArr
        let that = this;
        if (Event.type == 'click') {
            this.close();
            let ID = Event.target.dataSource.id;
            this.GameControl.onSend({
                name: 'M.Games.CX.C2G_GameChat',
                data: {
                    chat: {
                        "recipient": -1,
                        "sender": this.GameControl.userId,
                        "content": String(ID),
                        "msgType": 2,
                        "msgId": 1,
                    },
                    roomId: parseInt(this.GameControl.roomId),
                    chatType: 0,
                },
                success(res) {
                    that.GameControl.dealSoketMessage('发送表情：', res);
                }
            })
        }
    }
}
export default new ExpressionChat();