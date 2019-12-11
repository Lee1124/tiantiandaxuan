/**
 * 自定义聊天功能(类似于：‘快点呀，我等得花儿都谢了’)
 */
import Main from '../common/Main';
import GameControl from '../GameCenter/GameControl';
import MyClickSelect from '../Fuction/MyClickSelect';
class CustomChat {
    constructor() {
        //选择的文字或表情
        this.selectIndex = 0;
        //弹框节点
        this.chatDialog = null;
        //文字语音聊天的节点
        this.voiceChatView = null;
        //表情语音聊天的节点
        this.expressionChatView = null;
    }
    getView() {
        this.chatDialog = GameControl.instance.owner.chat_dialog;
        this.voiceChatView = this.chatDialog.getChildByName("voiceChatView");
        this.expressionChatView = this.chatDialog.getChildByName("expressionChatView");
    }
    /** 打开*/
    open() {
        this.MeSeatArr = GameControl.instance._playerArray.filter(item => item.owner.isMe);
        if (this.MeSeatArr.length > 0) {
            this.getView();
            this.common(true);
            this.bindEvent(true);
            this.initSelect();
            this.initSelectJS();
            this.initVoiceChatView();
            this.initExpressionChatView();
        } else {
            Main.showTip('旁观者不能聊天!');
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
        let showObj = this.chatDialog;
        let maskAlpha = 0;
        let y = show ? Laya.stage.height - showObj.height : Laya.stage.height;
        GameControl.instance.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
    }
    /**关闭 */
    close() {
        this.bindEvent(false);
        this.common(false);
    }

    /**初始化选择按钮处列表 */
    initSelect() {
        let selectList = this.chatDialog.getChildByName('selectView').getChildByName('selectList');
        selectList.array = [
            { icon: 'res/img/common/chat_icon1.png', value: 0 },
            { icon: 'res/img/common/chat_icon2.png', value: 1 }
        ];
        selectList.renderHandler = new Laya.Handler(this, this.selectListRender);
    }
    /**渲染选择按钮处列表 */
    selectListRender(cell) {
        let no = cell.getChildByName('listRow').getChildByName('select').getChildByName('no');
        no.loadImage(cell.dataSource.icon);
    }

    /**初始化脚本 */
    initSelectJS() {
        this.selectedShowView();
        let selectView = this.chatDialog.getChildByName("selectView");
        let $MyClickSelect = selectView.getComponent(MyClickSelect);
        $MyClickSelect.MySelect(this, this.selectIndex, (res) => {
            this.selectIndex = res;
            this.selectedShowView();
        })
    }

    /**选择 */
    selectedShowView() {
        this.voiceChatView.visible = this.selectIndex == 0 ? true : false;
        this.expressionChatView.visible = this.selectIndex == 1 ? true : false;
    }

    /**===初始化快捷语音列表=== */
    initVoiceChatView() {
        let voiceList = this.voiceChatView.getChildByName('voiceList');
        voiceList.array = Main.chatVoice;
        voiceList.vScrollBarSkin = '';
        voiceList.visible = true;
        voiceList.renderHandler = new Laya.Handler(this, this.voiceListRender);
        voiceList.mouseHandler = new Laya.Handler(this, this.clickListRow)
    }
    /**渲染列表数据 */
    voiceListRender(cell, index) {
        if (index == Main.chatVoice.length - 1) {
            if (cell.getChildByName('line'))
                cell.getChildByName('line').removeSelf();
        }
        let test = cell.getChildByName('text');
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
        if (that['chatVoice' + nowTime]) {
            // Main.$LOG('声音对象：',that['chatVoice' + nowTime],'chatVoice' + nowTime,nowTime);
            that['chatVoice' + nowTime].soundUrl = Main.chatVoice[data.msgId].voice + nowTime;
            that['chatVoice' + nowTime].volume = $volume;
        } else {
            fastChatBox.visible = false;
            test.text = '';
        }
    }

    /**初始化表情聊天内容 */
    initExpressionChatView() {
        let expressionList = this.expressionChatView.getChildByName('expressionList');
        expressionList.array = Main.expressionChat;
        expressionList.vScrollBarSkin = '';
        expressionList.visible = true;
        expressionList.renderHandler = new Laya.Handler(this, this.expressionListRender);
        expressionList.mouseHandler = new Laya.Handler(this, this.clickExpressionList)
    }

    expressionListRender(cell) {
        let iconBox = cell.getChildByName('icon');
        iconBox.loadImage(cell.dataSource.icon);
    }

    clickExpressionList(Event) {
        let that = this;
        if (Event.type == 'click') {
            this.close();
            let ID = Event.target.dataSource.id;
            GameControl.instance.onSend({
                name: 'M.Games.CX.C2G_GameChat',
                data: {
                    chat: {
                        "recipient": -1,
                        "sender": GameControl.instance.userId,
                        "content": String(ID),
                        "msgType": 2,
                        "msgId": 1,
                    },
                    roomId: parseInt(GameControl.instance.roomId),
                    chatType: 0,
                },
                success(res) {
                    GameControl.instance.dealSoketMessage('发送表情：', res);
                }
            })
        }
    }
}
export default new CustomChat();