/**
 * 自定义聊天功能(类似于：‘快点呀，我等得花儿都谢了’)
 */
import Main from '../common/Main';
import GameControl from '../GameCenter/GameControl';
class CustomChat {//CustomChat_dialog
    /** 打开*/
    open() {
        this.MeSeatArr = GameControl.instance._playerArray.filter(item => item.owner.isMe);
        if (this.MeSeatArr.length > 0) {
            this.common(true);
            this.bindEvent(true);
            this.initPage();
        } else {
            Main.showTip('旁观者不能发送快捷语音!');
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
    common(show) {
        let showObj = GameControl.instance.owner.CustomChat_dialog;
        let maskAlpha = 0;
        let y = show ? Laya.stage.height - showObj.height : Laya.stage.height;
        GameControl.instance.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    /**关闭 */
    close() {
        this.bindEvent(false);
        this.common(false);
    }

    /**初始化列表 */
    initPage() {
        let list = GameControl.instance.owner.CustomChat_dialog.getChildByName('customList');
        list.array = Main.chatVoice;
        list.vScrollBarSkin = '';
        list.visible = true;
        list.renderHandler = new Laya.Handler(this, this.listRender);
        list.mouseHandler = new Laya.Handler(this, this.clickListRow)
    }
    /**渲染列表数据 */
    listRender(cell) {
        let test = cell.getChildByName('test_bg').getChildByName('test');
        test.text = cell.dataSource.text;
    }
    /**列表点击 */
    clickListRow(Event, index) {
        if (Event.type == 'click') {
            this.close();
            let ID = Event.target.dataSource.id;
            let content = Event.target.dataSource.text;
            GameControl.instance.onSend({
                name: 'M.Games.CX.C2G_GameChat',
                data: {
                    chat: {
                        "recipient": -1,
                        "sender": GameControl.instance.userId,
                        "content": content,
                        "msgType": 1,
                        "msgId": ID,
                    },
                    roomId: parseInt(GameControl.instance.roomId),
                    chatType: 0,
                },
                success(res) {
                    GameControl.instance.dealSoketMessage('发送快捷语音：', res);
                }
            })
        }
    }

    /**显示位置的快捷语音 */
    openSeatChatView(that, data) {
        let fastChatBox = that.owner.getChildByName('fastChatBox');
        let test = fastChatBox.getChildByName('text');
        fastChatBox.visible = true;
        test.text = data.content;
        let $volume = Main.chatVoiceOpenState ? 1 : 0;
        that.soundUrl = Main.chatVoice[data.msgId].voice + new Date().getTime();
        let nowTime = new Date().getTime();
        that['chatVoice' + nowTime] = Laya.SoundManager.playSound(Main.chatVoice[data.msgId].voice, 1, Laya.Handler.create(this, () => {
            if (that['chatVoice' + nowTime].soundUrl == that.soundUrl) {
                fastChatBox.visible = false;
                test.text = '';
            }
        }));
        if(that['chatVoice' + nowTime]){
            // Main.$LOG('声音对象：',that['chatVoice' + nowTime],'chatVoice' + nowTime,nowTime);
            that['chatVoice' + nowTime].soundUrl = Main.chatVoice[data.msgId].voice + nowTime;
            that['chatVoice' + nowTime].volume = $volume;
        }else{
            fastChatBox.visible = false;
            test.text = '';
        }
    }
}
export default new CustomChat();