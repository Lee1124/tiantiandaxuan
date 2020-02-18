
/**
 * 打开弹框脚本
 */
export default class OpenDiaLog extends Laya.Script {
    onStart() {
        Laya.stage.addChild(this.owner);
        this.allowClickMaskClose = false;
        this.dialog = this.owner.getChildByName('dialog1');
        this.dialog.close();
        this.diaLogMask = this.owner.getChildByName('diaLogMask');
        this.diaLogMask.on(Laya.Event.CLICK, this, () => {
            if (this.allowClickMaskClose) {
                this.close();
            }
        })
    }
    /**
     * 打开弹框
     * @param {*} JSthis 执行域
     * @param {*} allowClickMaskClose 是否允许点击空白处关闭弹框
     * @param {*} maskAlpha 遮罩的透明度
     * @param {*} isShowCloseBtn 是否显示关闭按钮
     * @param {*} closeFn 关闭回调
     */
    open(JSthis, allowClickMaskClose = false, maskAlpha = 0.2, isShowCloseBtn = true, closeFn, ctType = 1) {
        this.closeCallBack = closeFn;
        this.JSthis = JSthis;
        this.owner.visible = true;
        this.allowClickMaskClose = allowClickMaskClose;
        this.diaLogMask.alpha = maskAlpha;
        this.dialog._children.forEach(item => {
            item.visible = false;
        })
        this.dialog.open();
        let dialogBg = this.dialog.getChildByName('dialogBg' + ctType);
        dialogBg.visible = true;
        this.closeBtn = dialogBg.getChildByName('close');
        this.closeBtn.visible = isShowCloseBtn;
        this.closeBtn.on(Laya.Event.CLICK, this, () => {
            if (this.closeBtn.visible) {
                this.close();
            }
        })
    }
    /**g关闭弹框 */
    close() {
        this.dialog.close();
        this.owner.visible = false;
        if (this.closeCallBack)
            this.closeCallBack.call(this.JSthis);
        this.closeBtn.off(Laya.Event.CLICK);
    }
}