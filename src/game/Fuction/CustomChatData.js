/**
 * 设置快捷聊天的资源数据
 */
class CustomChatData{
    init(data){
        let falseChatBox=data.getChildByName('fastChatBox');
        this.x=falseChatBox.x;
        this.y=falseChatBox.y;
        falseChatBox.skin='res/img/common/'+data._fastChatBoxSeatBgImg;
        if(data._fastChatBoxSeatBgImg.indexOf('qipao_left')!=-1){
            falseChatBox.sizeGrid='0,28,0,51';
        }else if(data._fastChatBoxSeatBgImg.indexOf('qipao_right')!=-1){
            falseChatBox.sizeGrid='0,57,0,27';
        }
        falseChatBox.x=this.x;
        falseChatBox.y=this.y;
    }

}
export default new CustomChatData();