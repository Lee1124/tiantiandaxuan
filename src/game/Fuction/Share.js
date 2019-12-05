/**
 * 该脚本为分享到微信好友或朋友圈的功能
 */
import Main from '../common/Main';
class Share {
    /**
     * me
     * @param {*} that 执行域(Me.js)
     */
    open(that) {
        this.TABUI = that.UI;
        this.TABUI.tabPagesDialogBox.visible = true;
        this.TABUI.share_dialog.show();
        this.bindEvent();
    }
    bindEvent() {
        this.TABUI.tabPagesDialogBox.on(Laya.Event.CLICK, this, this.clickMask);
    }
    clickMask() {
        this.close();
    }
    close() {
        if (this.TABUI) {
            this.TABUI.share_dialog.close();
            this.TABUI.tabPagesDialogBox.visible = false;
        }
    }
}
export default new Share();