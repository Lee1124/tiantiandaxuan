(function () {
    'use strict';

    class CommonSet{
        constructor() {}
        // 设置布局适配数据
        /**
         * 
         * @param setTarget 需要设置适配参数的对象
         */
        setLayoutValue(setTarget){
           
            setTarget.x=parseInt((setTarget.x/(1242/Laya.stage.width)).toFixed(0));//设置座位适配X
            setTarget.y=parseInt((setTarget.y/(2208/Laya.stage.height)).toFixed(0));//设置座位适配y

            // console.log(setTarget,{x:setTarget.x,y:setTarget.y})
        }
    }

    var CommonSet$1 = new CommonSet();

    class CountPoint{
        constructor() {}
        /**
         * 特殊牌型的表
         */
        specialTable(){
            let arr = [{
                name: '丁皇',
                type1: 1,
                type2: 3,
                point1: 1,
                point2: 1
            },
            {
                name: '天牌',
                type1: 1,
                type2: 1,
                point1: 10,
                point2: 10
            },
            {
                name: '地牌',
                type1: 1,
                type2: 1,
                point1: 0,
                point2: 0
            },
            {
                name: '人牌',
                type1: 1,
                type2: 1,
                point1: 6,
                point2: 6
            },
            {
                name: '和牌',
                type1: 1,
                type2: 1,
                point1: 2,
                point2: 2
            },
            {
                name: '梅十',
                type1: 2,
                type2: 2,
                point1: 8,
                point2: 8
            },
            {
                name: '板凳',
                type1: 2,
                type2: 2,
                point1: 2,
                point2: 2
            },
            {
                name: '长三',
                type1: 2,
                type2: 2,
                point1: 4,
                point2: 4
            },
            {
                name: '虎头',
                type1: 2,
                type2: 2,
                point1: 9,
                point2: 9
            },
            {
                name: '苕十',
                type1: 1,
                type2: 1,
                point1: 8,
                point2: 8
            },
            {
                name: '猫猫',
                type1: 1,
                type2: 1,
                point1: 4,
                point2: 4
            },
            {
                name: '膏药',
                type1: 1,
                type2: 1,
                point1: 5,
                point2: 5
            },
            {
                name: '豹子',
                type1: 2,
                type2: 2,
                point1: 3,
                point2: 3
            },
            {
                name: '豹子',
                type1: 2,
                type2: 2,
                point1: 5,
                point2: 5
            },
            {
                name: '豹子',
                type1: 2,
                type2: 2,
                point1: 6,
                point2: 6
            },
            {
                name: '豹子',
                type1: 2,
                type2: 2,
                point1: 7,
                point2: 7
            },
            {
                name: '天王',
                type1: 1,
                type2: 2,
                point1: 10,
                point2: 7
            },
            {
                name: '地王',
                type1: 1,
                type2: 2,
                point1: 0,
                point2: 7
            },
            {
                name: '天杠',
                type1: 1,
                type2: 2,
                point1: 10,
                point2: 6
            },
            {
                name: '地杠',
                type1: 1,
                type2: 2,
                point1: 0,
                point2: 6
            },
            {
                name: '天关九',
                type1: 1,
                type2: 2,
                point1: 10,
                point2: 5
            },
            {
                name: '地关九',
                type1: 1,
                type2: 2,
                point1: 0,
                point2: 5
            },
            {
                name: '灯笼九',
                type1: 1,
                type2: 2,
                point1: 6,
                point2: 9
            },
            {
                name: '和五九',
                type1: 1,
                type2: 2,
                point1: 2,
                point2: 3
            },
            {
                name: '丁长九',
                type1: 1,
                type2: 2,
                point1: 1,
                point2: 4
            },
            {
                name: '梅十九',
                type1: 2,
                type2: 2,
                point1: 8,
                point2: 7
            },
            {
                name: '丁猫九',
                type1: 1,
                type2: 1,
                point1: 1,
                point2: 3
            },
            {
                name: '乌龙九',
                type1: 2,
                type2: 2,
                point1: 9,
                point2: 6
            },
            {
                name: '苕十九',
                type1: 1,
                type2: 2,
                point1: 8,
                point2: 7
            }
        ];
        return arr;
        }

        /**
         * 三花牌的表
         */ 
    	sanHuaTable() {
    		let arr = [{
    				name: '三花特牌',
    				type1: 2,
    				type2: 1,
    				type3: 2,
    				point1: 8,
    				point2: 8,
    				point3: 9
    			},
    			{
    				name: '三花特牌',
    				type1: 2,
    				type2: 1,
    				type3: 3,
    				point1: 4,
    				point2: 4,
    				point3: 1
    			}
    		];
    		return arr;
        }
        
        /* 查找特殊牌(不包括三花牌) */
    	searchCombination(poker1, poker2) {
    		/* 红桃 h --- 0
    		   黑桃 s --- 1
    		   梅花 c --- 2
    		   方块 d --- 3 */
    		let ptype1 = parseInt(poker1 / 13);
    		let ptype2 = parseInt(poker2 / 13);
    		let point1 = poker1 % 13;
    		let point2 = poker2 % 13;

    		/* 1代表红色  2代表黑色 3代表大王*/
    		if (ptype1 == 4) {
    			ptype1 = 3;
    		} else if (ptype1 == 0 || ptype1 == 3) {
    			ptype1 = 1;
    		} else {
    			ptype1 = 2;
    		}
    		if (ptype2 == 4) {
    			ptype2 = 3;
    		} else if (ptype2 == 1 || ptype2 == 2) {
    			ptype2 = 2;
    		} else {
    			ptype2 = 1;
    		}

    		let newArr = this.specialTable();
    		// console.log(ptype1, ptype2)
    		// console.log(point1, point2)
    		let name = '';
    		newArr.forEach(item => {
    			if ((ptype1 == item.type1 && ptype2 == item.type2 && point1 == item.point1 && point2 == item.point2) ||
    				(ptype1 == item.type2 && ptype2 == item.type1 && point1 == item.point2 && point2 == item.point1)) {
    				// console.log(item.name)
    				name = item.name;
    			}
    		});
    		return name;
        }
        
        /* 查找特殊三花牌 */
    	searchSanHua(poker1, poker2, poker3) {
    		let ptype1 = parseInt(poker1 / 13);
    		let ptype2 = parseInt(poker2 / 13);
    		let ptype3 = parseInt(poker3 / 13);
    		let point1 = poker1 % 13;
    		let point2 = poker2 % 13;
    		let point3 = poker3 % 13;

    		/* 1代表红色  2代表黑色 3代表大王*/
    		if (ptype1 == 4) {
    			ptype1 = 3;
    		} else if (ptype1 == 0 || ptype1 == 3) {
    			ptype1 = 1;
    		} else {
    			ptype1 = 2;
    		}
    		if (ptype2 == 4) {
    			ptype2 = 3;
    		} else if (ptype2 == 1 || ptype2 == 2) {
    			ptype2 = 2;
    		} else {
    			ptype2 = 1;
    		}
    		if (ptype3 == 4) {
    			ptype3 = 3;
    		} else if (ptype3 == 1 || ptype3 == 2) {
    			ptype3 = 2;
    		} else {
    			ptype3 = 1;
    		}
    		let newArr = this.sanHuaTable();
    		// console.log(ptype1, ptype2, ptype3)
    		// console.log(point1, point2, point3)
    		let name = null;
    		newArr.forEach(item => {
    			if ((ptype1 == item.type1 && ptype2 == item.type2 && ptype3 == item.type3 && point1 == item.point1 && point2 ==
    					item.point2 && point3 == item.point3) ||
    				(ptype1 == item.type1 && ptype2 == item.type3 && ptype3 == item.type2 && point1 == item.point1 && point2 == item
    					.point3 && point3 == item.point2) ||
    				(ptype1 == item.type2 && ptype2 == item.type1 && ptype3 == item.type3 && point1 == item.point2 && point2 == item
    					.point1 && point3 == item.point3) ||
    				(ptype1 == item.type2 && ptype2 == item.type3 && ptype3 == item.type1 && point1 == item.point2 && point2 == item
    					.point3 && point3 == item.point1) ||
    				(ptype1 == item.type3 && ptype3 == item.type2 && ptype2 == item.type1 && point1 == item.point3 && point3 == item
    					.point2 && point2 == item.point1) ||
    				(ptype1 == item.type3 && ptype2 == item.type2 && ptype3 == item.type1 && point1 == item.point3 && point2 == item
    					.point2 && point3 == item.point1)) {
    				// console.log(item.name)
    				name = item.name;
    			}
    		});
    		return name;
        }
        
        /** 
         * 特殊牌和点数
        */
    	countPoint(poker1, poker2) {
    		let name = this.searchCombination(poker1, poker2);
    		let point1;
    		if (parseInt(poker1 / 13) == 4) {
    			point1 = 6;
    		} else
    			point1 = (poker1 % 13 + 2);
    		let point2;
    		if (parseInt(poker2 / 13) == 4) {
    			point2 = 6;
    		} else
    			point2 = (poker2 % 13 + 2);
    		let point = (point1 + point2) % 10;
    		if (name == '') {
    			name = point + '点';
    		}
    		return name;
    	}
    	/**
         * 三花牌
         * @param {*} poker1 
         * @param {*} poker2 
         * @param {*} poker3 
         */
    	sanHuaPoker(poker1, poker2, poker3) {
    		let name = this.searchSanHua(poker1, poker2,poker3);
    		return name;
    	}
    }

    var CountPoint$1 = new CountPoint();

    class NetClient extends Laya.Script{
    	constructor(url){
    		super();
    		this.connectUrl = url;  //链接地址
    		this.valid = false;
    		this.connecting = false;
    		this.socketOpen = false;
    		this.socketMsgQueue = [];
    		this.debug = false;
    		this.intervalId = 0;
    		this.RpcId = 100;
    		this.RpcIdMap = new Map();

    		this.url = "ws://localhost:8989";
    		//用于读取消息缓存数据
    		this.byte = new Laya.Byte();
    		//这里我们采用小端
    		this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
    		this.socket = new Laya.Socket();
    		//这里我们采用小端
    		this.socket.endian = Laya.Byte.LITTLE_ENDIAN;

    		//建立连接
    		this.socket.on(Laya.Event.OPEN, this, this.openHandler);
    		this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
    		this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
    		this.socket.on(Laya.Event.ERROR, this, this.errorHandler);

    		//socket开始连接事件
    		this.onStartConnect=function(){console.log("开始连接");};
    		//socket结束连接事件（不管成功还是失败都会进入)
    		this.onEndConnect=function(ret){console.log("结束连接 ",ret);};

    		//链接成功事件,此处可用来初始化数据
    		this.onConnectSucc=function(){ console.log("链接成功");};
    		//接收消息封装,请外部自己实现
    		this.onMessage=function(data){
    			console.log("收到消息(请自己实现消息处理)："+data);
    		};
    	}

    	//正确建立连接
    	openHandler(event){
    		this.onEndConnect(true);
    		this.connecting = false;
    		this.socketOpen = true;
    		console.log('WebSocket连接已打开！');
    		this.onConnectSucc();
    		
    		for (var i = 0; i < this.socketMsgQueue.length; i++) {
    			this.sendBinary(this.socketMsgQueue[i]);
    		}
    		this.socketMsgQueue = [];		
    	}
     
    	//关闭事件
    	closeHandler(e){
    		this.onEndConnect(false);
    		this.connecting = false;
    		this.socketOpen = false;
    		console.log('WebSocket 已关闭！', e);
    		this.socket.close();		
    	}

    	//连接出错
    	errorHandler(e){
    		this.onEndConnect(false);
    		this.connecting = false;
    		this.socketOpen = false;
    		console.log('WebSocket连接打开失败，请检查！' + e);
    		this.socket.close();
    	}
     
    	Log(msg){
    		if(this.debug)
    			console.log(msg);
    	}
    	//重连
    	reconnect(){
    		console.log("开始重连");
    		this.open();
    	}

    	getSocket() {
    		if(!this.socketOpen && !this.connecting&&this.valid) { 
    			this.socket.close();
    			this.onStartConnect();
    			this.connecting = true;
    			this.socketOpen = false;

    			console.log("开始连接:",this.connectUrl);
    			this.socket.connectByUrl(this.connectUrl);
    	 
    			return null;
    		}

    		return this.socketOpen ? this.socket : null;
    	}
    	open(){
    		this.close();
    		
    		this.valid = true;
    		this.getSocket();
    		this.intervalId = setInterval(()=>{
    			//心跳
    			this.sendHeart();
    		},5000);
    	}
    	//发送心跳消息
    	sendHeart()
    	{
    		var _socket = this.getSocket();
    		if(_socket!=null)
    		{
    			this.byte.clear();
    			this.byte.writeInt32(0);
    			this.socket.send(this.byte.buffer);
    		}
    	}
    	close() {
    		this.valid = false;
    		this.socket.close();
    		clearInterval(this.intervalId);	
    		
    		console.log("关闭连接：" + this.connectUrl);
    	}
    	
    	stringSource(s) {
    		var i = 0;
    		return function () {
    			return i < s.length ? s.charCodeAt(i++) : null;
    		};
    	}
    	
    	send(msg){
    		if(!this.valid) {
    			console.log("请先调用 open() 开启网络");
    			return;
    		}
    		
    		if(this.debug)
    			console.log("发送消息: " , msg);
    		
    		if( msg.callback != null)
    		{
    			msg.data.RpcId = ++this.RpcId;
    			this.RpcIdMap.set(msg.data.RpcId,msg.callback);
    			// console.log("注册RPC回调 ["+msg.data.RpcId+"][" +msg.name +"]" +msg.callback);
    		}	

    		this.byte.clear();
    		this.byte.pos = 4;
    		//1. 写协议名字（自动写入2字节头长度）
    		this.byte.writeUTFString(msg.name);
    		//2. 写协议内容（自动写入2字节头长度）
    		this.byte.writeUTFString(JSON.stringify(msg.data));

    		//0. 写协议总长度
    		var len = this.byte.pos;
    		this.byte.pos = 0;
    		this.byte.writeInt32(len);

    		// 发送二进制消息
    		this.sendBinary(this.byte.buffer);
    		// 清空数据,下次使用
    		this.byte.clear();
    	}
     	
    	//发送消息：协议名字,协议内容
    	sendBinary(binaryMsg){
    		var _socket = this.getSocket();
    		if(_socket==null){
    			this.socketMsgQueue.push(binaryMsg);
    			return;
    		}
    		
    		this.socket.send(binaryMsg);
    	}

    	receiveHandler(_msg){
    		this.byte.clear();
    		this.byte.writeArrayBuffer(_msg);
    		this.byte.pos = 0;

    		let msgLen = this.byte.getInt32();
    		let protocolNameLen = this.byte.getUint8();
     
    		var tmpByte = new Laya.Byte();
    		tmpByte.endian = Laya.Byte.LITTLE_ENDIAN;
    		let name;
    		let msg;

    		//协议名字
    		{
    			this.byte.pos = 4;
    			name = this.byte.readUTFString();
    		}

    		//协议内容
    		{
    			let json = this.byte.readUTFString();
    			msg = JSON.parse(json);
    		}

    		if(this.debug)
    			console.log("收到消息: " , msg);

    		if(msg.RpcId > 100 && this.RpcIdMap.has(msg.RpcId))
    		{
    			let call = this.RpcIdMap.get(msg.RpcId);
    			if(call!=null)
    				call(name,msg);
    			this.RpcIdMap.delete(msg.RpcId);
    			
    			return;
    		}
    		else
    			this.onMessage(name,msg);
    	}
    }

    class Main {
        constructor() {
            Main.instance = this;
            this.websoketApi = '192.168.0.125:8082';
            this.requestApi = 'http://192.168.0.125:8081';
            // this.websoketApi = '132.232.34.32:8082';
            // this.requestApi = 'http://132.232.34.32:8081';
            this.phoneNews = {
                statusHeight: 0,//手机系统栏的高度
                deviceNews: '',//系统名称：Android / iOS
            };
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.$LOG('Main.js获取用户信息：', this.userInfo);
            this.sign = {
                signOut: 1,
                register: 2,
                changePwd: 3,
                shop: 4
            };
            this.pages = {
                page1: 'NoticePage',
                page2: 'CreateGamePage',
                page3: 'HallPage',
                page4: 'DataPage',
                page5: 'MePage'
            };
            this.gameView = {
                desk_bg1: 'res/img/gameView/desk_bg1.png',
                desk_bg2: 'res/img/gameView/desk_bg2.png'
            };
            this.loadScene = ['cheXuanGame_8.scene', 'register.scene', 'shishizhanji.scene', 'paijuhuigu.scene', 'paijutishi.scene', 'paijutishi.scene', 'tabPage.scene'];
            this.allowGameHallSetInterval = false;
            this.allowRequesList = true;
            this.allowHideLoad = false;
            this.defaultImg = {
                one: 'res/img/defaultHead.png'
            };

            this.animations = {
                qiao: 'qiao',
                win: 'win'
            };

            this._speed = {
                page: 120
            };
            this.loadSceneResourcesArr = [];
            this.openSceneViewArr = [];
            this.loadAniArr1 = [];
            this.loadAniArr2 = [];
            this.loadShowArr = [];
            this.loadShowArr2 = [];
            this.debug = true;
        }

        $LOG(...data) {
            if (this.debug)
                console.log(...data);
        }



        /**
        * 获取状态栏高度入口
        */
        getStatusHeight(obj) {
            if (window.plus) {
                this.plusReady();
                this.getDeviceInfo();
            } else {
                document.addEventListener('plusready', this.plusReady, false);
                document.addEventListener('getDeviceInfo', this.getDeviceInfo, false);
            }
        }
        /**
         * 获取状态栏高度值
         */
        plusReady() {
            // 获取系统状态栏样式
            var lh = plus.navigator.getStatusbarHeight();
            this.phoneNews.statusHeight = lh * plus.screen.scale;
        }

        getDeviceInfo() {
            this.phoneNews.deviceNews = plus.os.name;
        }

        /**
         * 根据状态栏设置元素的top值
         * @param nodeArr 节点对象 数组
         */
        setNodeTop(nodeArr) {
            nodeArr.forEach(node => {
                node.top = node.top + this.phoneNews.statusHeight;
                console.log(node.top);
            });
        }

        /**
         * 获取当前时间戳(以S为单位)
         */
        getTimeChuo() {
            return Math.round(new Date() / 1000)
        }

        /**
         * 获取地址栏信息(eg:id)
         */
        GetUrlString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }

        /**
         * 弹框
         * @param {string} text 提示内容
         * @param {Number} type 类型(注意：1--一个确定按钮,2--确定按钮和取消按钮)
         * @param {Array} node 需要显示或隐藏的节点
         * @param {Function} comfirmFn 确认回调
         * @param {Function} cancelFn 取消回调
         * @param {String} textColor 文本颜色
         * @param {bool} showNode 在弹框隐藏时，是否隐藏节点
         */
        showDialog(text = '内容为空', type = 1, node = [], comfirmFn = Function, cancelFn = Function, textColor = '#935F13', showNode = true) {
            
            let myMask=Laya.stage.getChildByName("dialogMask");
            console.log('ji=====',myMask);
            if(myMask){
                myMask.removeSelf();
            }
            let Mask = new Laya.Sprite();
            Mask.name='dialogMask';
            Mask.zOrder = 4;
            Mask.pos(0, 0);
            Mask.size(Laya.stage.width, Laya.stage.height);
            let diaLog = new Laya.Dialog();
            diaLog.zOrder = 5;
            let dialogBg = new Laya.Image();
            let dialogContent = new Laya.Text();
            dialogContent.fontSize = 60;
            if (textColor) {
                dialogContent.color = textColor;
            } else {
                dialogContent.color = '#935F13';
            }
            dialogContent.size(1132, 180);
            dialogContent.align = 'center';
            dialogContent.valign = 'middle';
            dialogContent.y = 250;
            dialogContent.text = text;
            if (type == 1) {
                let btn_one = new Laya.Image();
                btn_one.size(609, 163);
                dialogBg.addChild(btn_one);
                btn_one.loadImage('res/img/diglog/btn_one.png', Laya.Handler.create(this, () => {
                    btn_one.pos((1132 - btn_one.width) / 2, 764 - btn_one.height - 60);
                    btn_one.on(Laya.Event.CLICK, this, () => {
                        if (comfirmFn)
                            comfirmFn('点击了确定按钮');
                        closeDiaLog();
                        Mask.removeSelf();
                    });
                }));
            } else if (type == 2) {
                let btn_cancel = new Laya.Image();
                let btn_comfirm = new Laya.Image();
                btn_cancel.size(460, 163);
                btn_comfirm.size(460, 163);
                dialogBg.addChild(btn_cancel);
                dialogBg.addChild(btn_comfirm);
                btn_cancel.loadImage('res/img/diglog/btn_cancel.png', Laya.Handler.create(this, () => {
                    btn_cancel.pos(72, 764 - btn_cancel.height - 60);
                    btn_cancel.on(Laya.Event.CLICK, this, () => {
                        if (cancelFn)
                            cancelFn('点击了取消按钮');
                        closeDiaLog();
                        Mask.removeSelf();
                    });
                }));
                btn_comfirm.loadImage('res/img/diglog/btn_comfirm.png', Laya.Handler.create(this, () => {
                    btn_comfirm.pos(600, 764 - btn_comfirm.height - 60);
                    btn_comfirm.on(Laya.Event.CLICK, this, () => {
                        if (comfirmFn)
                            comfirmFn('点击了确定按钮');
                        closeDiaLog();
                        Mask.removeSelf();
                    });
                }));
            }
            dialogBg.loadImage('res/img/diglog/bg.png', Laya.Handler.create(this, () => {
                dialogBg.addChild(dialogContent);
            }));
            dialogBg.pos(0, 0);
            diaLog.size(1132, 764);
            diaLog.addChild(dialogBg);
            diaLog.show();
            Laya.stage.addChild(Mask);
            Mask.on(Laya.Event.CLICK, this, () => {
                if (cancelFn)
                    cancelFn('点击了取消按钮');
                closeDiaLog();
                Mask.removeSelf();
            });
            if (node)
                node.forEach(item => {
                    item.style.display = 'none';
                });

            function closeDiaLog() {
                diaLog.close();
                if (node) {
                    if (showNode)
                        node.forEach(item => {
                            item.style.display = 'block';
                        });
                }
            }
        }

        setText(node, size, color) {
            node.fontSize = size;
            node.color = color;
            return node;
        }

        /**
        * 创建加载图标到stage
        */
        createLoading() {
            Laya.loader.load("res/atlas/images/common.atlas", Laya.Handler.create(this, onMyLoaded));
            function onMyLoaded() {
                let loadingMask = new Laya.Image();
                loadingMask.visible = false;
                loadingMask.left = 0;
                loadingMask.top = 0;
                loadingMask.bottom = 0;
                loadingMask.right = 0;
                loadingMask.zOrder = 10;
                loadingMask.name = 'loadingMask';
                loadingMask.on(Laya.Event.CLICK, this, () => { });
                let animationBox = new Laya.Sprite();
                let animationText = new Laya.Label();
                animationText.name = 'loadingText';
                animationText.width = 300;
                animationText.centerX = 0;
                animationText.align = 'center';
                animationText.zOrder = 2;
                animationText.bottom = '-150';
                let aniText = this.setText(animationText, 60, '#000000');
                animationBox.addChild(aniText);
                animationBox.name = 'loadingBox';
                animationBox.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                let ani = new Laya.Animation();
                ani.name = 'loadingAni';
                ani.loadAnimation("animation/Loading.ani");
                animationBox.addChild(ani);
                loadingMask.addChild(animationBox);
                Laya.stage.addChild(loadingMask);
                //播放Animation动画
                this.loadAniArr1.push('LOADING');
                this.loadAniArr2.forEach(item => {
                    if (item.key == 'LOADING') {
                        loadingMask.visible = item.show;
                        animationText.text = '';
                        if (item.show) {
                            animationText.text = item.text;
                            ani.play();
                        } else {
                            ani.stop();
                        }
                    }
                });
            }
        }

        /**
         * 显示或隐藏加载图标
         * @param isShow 是否显示
         */
        showLoading(isShow = true, msg = '') {
            this.loadAniArr1.forEach(item => {
                if (item == 'LOADING') {
                    let loadingMask = Laya.stage.getChildByName('loadingMask');
                    let loadingBox = loadingMask.getChildByName('loadingBox');
                    let loadingAni = loadingBox.getChildByName('loadingAni');
                    let loadingText = loadingBox.getChildByName('loadingText');
                    loadingText.text = '';
                    loadingMask.visible = isShow;
                    if (isShow) {
                        loadingText.text = msg;
                        loadingAni.play();
                    } else {
                        loadingAni.stop();
                    }
                    return;
                }
            });
            this.loadAniArr2 = [{ key: 'LOADING', show: isShow, text: msg }];
        }

        /**
         * 加载图片资源,判断加载失败则显示默认图片(默认图片分多种，根据需要)
         * @param {*} node 加载图片的节点
         * @param {*} url 加载图片资源地址
         * @param {*} type 默认的图片类型 
         * @param {*} type2 加载图片方式  skin 和 loadImage两种方式 
         */
        $LoadImage(node, url = '', type = this.defaultImg.one, type2 = 'loadImage') {
            if (url.indexOf('.png') != -1 || url.indexOf('.jpg') != -1 || url.indexOf('.jpeg') != -1) {
                Laya.loader.load(url, Laya.Handler.create(this, (res) => {
                    if (res) {
                        if (type2 == 'loadImage') {
                            node.loadImage(url);
                        } else if (type2 == 'skin') {
                            node.skin = url;
                        }
                    } else {
                        if (type2 == 'loadImage') {
                            node.loadImage(type);
                        } else if (type2 == 'skin') {
                            node.skin = type;
                        }
                    }
                }));
            } else {
                if (type2 == 'loadImage') {
                    node.loadImage(type);
                } else if (type2 == 'skin') {
                    node.skin = type;
                }
            }
        }

        /**
         * 滑动选择
         * @param slider_box_node 需要将内容添加到该盒子里面的节点
         * @param slider_btn_node 滑动按钮资源节点
         * @param that 执行域
         * @param fn 回调函数
         */
        $slider(slider_box_node, slider_btn_node, that, fn) {
            slider_btn_node.x = 0;
            slider_btn_node.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [slider_box_node, slider_btn_node, that, fn]);
        }
        /**
         * 接上
         */
        onMouseDown(slider_box_node, slider_btn_node, that, fn) {
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove, [slider_box_node, slider_btn_node, that, fn]);
            slider_btn_node.x = slider_btn_node.x;
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }
        /**
        * 移动事件
        */
        onMouseMove(slider_box_node, slider_btn_node, that, fn) {
            slider_btn_node.x = Math.max(Math.min(slider_box_node.mouseX, slider_box_node.width), 0);
            if (fn)
                fn.call(that, slider_btn_node.x);
        }

        onMouseUp() {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }

        /**
         * switch开关
         * @param {*} switchBox 装两个按钮的盒子
         * @param {*} isSelected 是否开启
         * @param {*} that 执行域
         * @param {*} fn 回调函数，返回是否开启
         */
        $switch(switchBox, isSelected, that, fn) {
            let isSelect = isSelected == 1 ? true : false;
            let switch0 = switchBox.getChildByName("switch0");
            let switch1 = switchBox.getChildByName("switch1");
            switch0.visible = isSelect ? false : true;
            switch1.visible = isSelect ? true : false;
            switchBox.on(Laya.Event.CLICK, this, () => {
                switch0.visible = switch1.visible;
                switch1.visible = !switch0.visible;
                if (switch1.visible && fn)
                    fn.call(that, true);
                else if (switch0.visible && fn) {
                    fn.call(that, false);
                }
            });
        }

        /**
         *  预加载的资源 
         */
        beforeLoadScene() {
            Laya.loader.load([this.gameView.desk_bg1, this.gameView.desk_bg2]);
            this.loadScene.forEach(item => {
                Laya.Scene.load(item, Laya.Handler.create(this, this.openView));
            });
        }

        /**
         * 加载资源回调
         * @param {*} res 加载资源结束回调参数
         */
        openView(res) {
            this.$LOG('预加载的资源：', res);
            this.loadSceneResourcesArr.push(res.url);
            this.openSceneViewArr.forEach((item, index) => {
                if (item.url.indexOf(res.url) != -1) {
                    console.log('Main中正在打开==================0000');
                    Laya.Scene.open(res.url, item.closeOther, item.data, Laya.Handler.create(this, item.fn), () => {
                        console.log('Main中正在打开==================1');
                    });
                    this.openSceneViewArr.splice(index, 1);
                    return;
                }
            });
        }

        /**
         * 打开场景
         * @param url 场景地址
         * @param closeOther 是否关闭
         * @param data 参数
         * @param fn 打开回调函数
         * @param fn2 正在打开回调函数
         */
        $openScene(url, closeOther = true, data = null, fn, fn2) {
            this.loadSceneResourcesArr.forEach(item => {
                if (item.indexOf(url) != -1) {
                    Laya.Scene.open(url, closeOther, data, Laya.Handler.create(this, fn), Laya.Handler.create(this, () => {
                        console.log('Main中正在打开==================2');
                    }));
                    return;
                }
            });
            this.openSceneViewArr = [{ url: url, closeOther: closeOther, data: data, fn: fn, fn2: fn2 }];
        }

        /**
         * 将秒转化为时分秒
         */
        secondToDate(result) {
            var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            return result = h + ":" + m + ":" + s;
        }




        /**
     * 格式化时间
     * @timeVal new Date 格式的时间
     * @typeStr 分割符号 例：'/'  '.'  '-'
     */
        getFormatTime(timeVal) {
            if (timeVal != null) {
                let date = new Date(timeVal);
                let nowY = date.getFullYear();
                let nowM = date.getMonth() + 1;
                let nowD = date.getDate();
                let hour = date.getHours();
                let minutes = date.getMinutes();
                let result = {
                    nowY: nowY,
                    month: (nowM < 10 ? "0" + nowM : nowM),
                    day: (nowD < 10 ? "0" + nowD : nowD),
                    hour: (hour < 10 ? "0" + hour : hour),
                    minutes: (minutes < 10 ? "0" + minutes : minutes),
                    timeStr: nowY + '-' + nowM + '-' + nowD
                };
                return result;
            } else {
                return null;
            }
        }
    }
    var Main$1 = new Main();

    let resPleyList=[];
     class MyCenter {
        constructor() { 
            // super(); 
            // /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
            // let intType = 1000;
            // /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
            // let numType = 1000;
            // /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
            // let strType = "hello laya";
            // /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
            // let boolType = true;
            // // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            
        }
        
        onEnable() {
            
        }

        onDisable() {
        }

        req(obj){ 
            resPleyList=[];
            resPleyList.push(obj);
        }           
        send(key, data) {
            resPleyList.forEach(obj => {
                if (key == obj.key)
                     obj.callback(data);
            });
        }

        loadGameView(data){
           
        }
    }

    var MyCenter$1 = new MyCenter();

    class HttpRequest{
        $request(obj){
            let that=obj.that;
            let xhr = new Laya.HttpRequest();
            let url=Main$1.requestApi+obj.url;
            let dataObj=obj.data;
            let postData='';
            let method=obj.method?obj.method:'get';
            let dataObjArr = [];
            if(method=='get'){
                for (var key in dataObj) {
                    if (dataObj.hasOwnProperty(key)) {
                        dataObjArr.push(key);
                        if (dataObjArr.length == 1) {
                            url = url + '?' + key + '=' + dataObj[key];
                        } else {
                            url = url + '&' + key + '=' + dataObj[key];
                        }
                    }
                }
            }else if(method=='post'){
                for (var key in dataObj) {
                    if (dataObj.hasOwnProperty(key)) {
                        dataObjArr.push(key);
                        if (dataObjArr.length == 1) {
                            postData = key + '=' + dataObj[key];
                        } else {
                            postData += '&' + key + '=' + dataObj[key];
                        }
                    }
                }
            }
            xhr.http.timeout = 20000;//设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, (res)=>{
                obj.success.call(that,res);
            });
            xhr.once(Laya.Event.ERROR, this, (err)=>{
                console.log('请求异常:',err);
                if(obj.fail)
                obj.fail.call(that,err);
            });
            xhr.on(Laya.Event.PROGRESS, this, (ess)=>{
                console.log(ess);
                if(obj.ess)
                obj.ess(ess);
            });
            xhr.send(url,postData, method, 'json');
        }
    }
    var HTTP = new HttpRequest();

    /**
     * 该脚本为房间初始化数据所用
     */

    class GameRoomInit {
        init(that) {
            let GameUI = that.owner;
            GameUI.mang_cm_pool.zOrder = 2;
            GameUI.pi_cm_pool.zOrder = 2;
            GameUI._playerSeatXYArray = [];//玩家初始的位置坐标
            GameUI._xiaZhuSeatXYArray = [];//保存下注分数处初始的位置坐标
            GameUI._tipsSeatXYArray = [];//保存提示初始的位置坐标
            GameUI._pokerBoxSeat = [];//保存玩家显示牌的位置坐标
            GameUI._showCMFaceToPlayerXY = [];//玩家显示筹码相对位置中心的坐标
            GameUI._mangDiChiFaceToPlayerXYArray = [];//芒底池玩家相对位置中心的坐标
            GameUI._piDiChiFaceToPlayerXYArray = [];//芒底池玩家相对位置中心的坐标
            GameUI._subPokerBoxSeat = [];//保存玩家分牌后显示的位置坐标
        }

        keepValue(that, data) {
            // console.log('进来1',data.INDEX)
            let playerSeat = data.owner;
            let GameUI = that.owner;
            playerSeat.mePokerX_2 = [];
            playerSeat.mePokerX_3 = [];
            playerSeat.mePokerX_4 = [];
            // playerSeat.poker12 = [11, 11];
            // playerSeat.poker34 = [11, 11];
            playerSeat.sub1 = [];
            playerSeat.sub2 = [];
            playerSeat.sub1Point = '1点';
            playerSeat.sub2Point = '2点';
            playerSeat.index = data.INDEX;
            playerSeat.seatId = data.INDEX;
            playerSeat.userId = '';
            playerSeat.isMe = false;
            playerSeat.showXiaZhuScore = false;
            playerSeat.xiaZhuScore = 0;

            GameUI._playerSeatXYArray.push({ index: that.INDEX, x: playerSeat.x, y: playerSeat.y });//保存初始的位置坐标
            GameUI._xiaZhuSeatXYArray.push({ index: that.INDEX, x: playerSeat.getChildByName("xiaZhuScore").x, y: playerSeat.getChildByName("xiaZhuScore").y });//保存初始下注的位置坐标
            GameUI._tipsSeatXYArray.push({ index: that.INDEX, x: playerSeat.getChildByName("tipsBox").x, y: playerSeat.getChildByName("tipsBox").y });//保存初始提示的位置坐标
            GameUI._pokerBoxSeat.push({ index: that.INDEX, x: playerSeat.getChildByName("show_poker_box").x, y: playerSeat.getChildByName("show_poker_box").y });
            GameUI._subPokerBoxSeat.push({ x: playerSeat.getChildByName("sub_poker_box").x, y: playerSeat.getChildByName("sub_poker_box").y });

            {//玩家显示筹码相对位置中心的坐标
                let parent_xiaZhuScoreObj = playerSeat.getChildByName("xiaZhuScore");
                let son_showCmObj = playerSeat.getChildByName("xiaZhuScore").getChildByName("cm_show_seat");
                let start_seat = playerSeat.getChildByName("create_cm_seat");//开始位置
                let x = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).x;// 获取相对坐标(找某节点中的节点相对玩家的坐标x)
                let y = this.getCoordinate(start_seat, parent_xiaZhuScoreObj, son_showCmObj).y;// 获取相对坐标(找某节点中的节点相对玩家的坐标y)
                GameUI._showCMFaceToPlayerXY.push({ x: x, y: y });
                playerSeat._showCMFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                    x: x,
                    y: y
                };
            }

            {//芒/皮底池相对于玩家位置中心的坐标

                let moveCMSeat = playerSeat.getChildByName("create_cm_seat").getChildByName("move_cm");
                let mang_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y));
                // console.log(mang_xy.x, mang_xy.y, GameUI.mang_cm_pool.x, GameUI.mang_cm_pool.y)
                let pi_xy = moveCMSeat.globalToLocal(new Laya.Point(GameUI.pi_cm_pool.x, GameUI.pi_cm_pool.y));
                GameUI._mangDiChiFaceToPlayerXYArray.push({ x: mang_xy.x + 50, y: mang_xy.y });
                GameUI._piDiChiFaceToPlayerXYArray.push({ x: pi_xy.x + 100, y: pi_xy.y });
                playerSeat._mangDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                    x: mang_xy.x + 50,
                    y: mang_xy.y
                };
                playerSeat._piDiChiFaceToPlayerXY = {//玩家显示筹码相对位置中心的坐标
                    x: pi_xy.x + 100,
                    y: pi_xy.y
                };
            }
            {//丢牌的位置
                playerSeat._diuPokerSeatXY = {//玩家显示筹码相对位置中心的坐标
                    x: playerSeat.getChildByName("deal_cards_seat34").x,
                    y: playerSeat.getChildByName("deal_cards_seat34").y
                };
            }
        }

        /**
       * 获取相对坐标(找某节点中的节点相对玩家的坐标)
       */
        getCoordinate(start, parent, son) {
            let x1 = son.x - parent.width / 2;//儿子相对父亲的坐标
            let y1 = son.y - parent.height / 2;
            let x2 = parent.x - start.x;//父亲相对起点的坐标
            let y2 = parent.y - start.y;
            return {
                x: x1 + x2,
                y: y1 + y2
            }
        }
    }

    var GameRoomInit$1 = new GameRoomInit();

    /**
     * 该脚本为玩家延时操作
     */
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
            Main$1.$LOG('该脚本为玩家延时操作offEvent:',that);
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
                    Main$1.$LOG('延时操作：', res);
                    that2.dealWithRes(that2.GameControl, res);
                }
            });
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
                    });
                } else if (this.delayType == that.delayType.sub) {
                    that.assignPokerCountDown(true, data);
                }
            } else {
                that.owner.showTips('你已达到延时最大次数!');
            }
        }
    }
    var PlayerDelayTime$1 = new PlayerDelayTime();

    const
        Sprite = Laya.Sprite,
        Event = Laya.Event;
    class MySlider extends Laya.Script {
        constructor() {
            super();
            // Main.$LOG("this.width:" + this.width + "-" + this.autoSize);

        }
        onEnable()  {
            this.InitAttribute();
            this.InitEvent();
        }

        /**
         * 初始化属性
         */
        InitAttribute()  {
            //显示的滑动对象节点
            this.slider = this.owner;
            //滑动背景
            this.sliderBg = this.slider.getChildByName("da_sliderBg");
            this.sliderHeight = this.sliderBg.getChildByName("da_sliderHeight");
            //最大值
            this.maxVal = this.sliderBg.getChildByName("da_maxNum").getChildByName("value");
            //当前滑动刻度
            this.handler = this.sliderBg.getChildByName("da_handler");
            //刻度文字显示
            this.texNum = this.handler.getChildByName("da_texNum");
            //激活滑动按钮
            // this.btnClick = this.owner.getChildByName("da_btnClick");
            //默认隐藏滑动节点
            this.slider.visible = false;
            // this.owner.visible = false;
            //设置滑动初始位置
            this.beginPosition = this.handler.y;
            //设置滑动结束为止
            this.endPosition = this.handler.y - this.sliderHeight.height;
            Main$1.$LOG(this.beginPosition, this.endPosition, this.sliderBg.height);

            this.Init();
        }
        /**
         * 初始化事件信息
         */
        InitEvent()  {
            // this.btnClick.on(Event.MOUSE_DOWN, this, this.SliderMouseDown);
        }

        /**
         * slider按下
         * @param startVal 开始数字
         * @param endVal 结束数字
         * @param {function} dragAction 变化回调
         * @param {function} endAction 结束回调
         */
        SliderMouseDown(startVal, endVal, dragAction, endAction) {
            //测试代码（*****************）
            this.Show(startVal, endVal, dragAction, endAction);
            //测试代码（*****************）

            //注册事件
            Laya.stage.on(Event.MOUSE_MOVE, this, this.SliderMouseMove);
            Laya.stage.on(Event.MOUSE_UP, this, this.SliderMouseUp);
            // Laya.stage.on(Event.MOUSE_OUT, this, this.SliderMouseOut);


            //初始位置
            this.SliderVal(0);
            this.handler.y = this.beginPosition;
            this.maxVal.text = endVal;
        }
        /**
         * 测试1
         * @param {*} progress 
         * @param {*} max 
         */
        test1(progress, max)  {
            Main$1.$LOG("进度：" + progress + "-" + max);
        }
        testEnd(sVal)  {
            Main$1.$LOG("抬起:" + sVal);
        }

        /**
         * 显示进度条
         * @param {*} startVal 
         * @param {*} endVal 
         * @param {*} dragAction 
         * @param {*} endAction 
         */
        Show(startVal, endVal, dragAction, endAction)  {
            this.sShow = true;
            this.sCalibration = 0;
            this.sStartVal = startVal;
            this.sEndVal = endVal;
            this.sEndAction = endAction;
            this.sDragAction = dragAction;
            this.sCurDragVal = 0;
            this.slider.visible = true;
        }

        /**
         * 删除滑动事件
         */
        RemoveSliderEvent()  {
            Laya.stage.off(Event.MOUSE_MOVE, this, this.SliderMouseMove);
            Laya.stage.off(Event.MOUSE_UP, this, this.SliderMouseUp);
            // Laya.stage.off(Event.MOUSE_OUT, this, this.SliderMouseOut);
        }
        /**
         * 抬起事件处理
        */
        SliderMouseUp(e) {
            //删除滑动事件
            this.RemoveSliderEvent();
            //结束回调
            if (this.sEndAction != null)  {
                this.sEndAction(this.sCurDragVal);
            }
            //初始化
            this.Init();
        }
        /**
         * 移到事件处理
         */
        SliderMouseMove(e) {
            let point = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
            let localPoint = this.sliderBg.globalToLocal(point);
            //Main.$LOG('localPoint:',localPoint,point,this.owner)
            this.handler.y = Math.min(Math.max(localPoint.y, this.endPosition), this.beginPosition);

            //Main.$LOG("SliderMouseMove:"+  point.x+':'+point.y +"-" + localPoint.y +"-" + this.beginPosition + "-"+ this.handler.y);
            this.SliderVal((this.beginPosition - this.handler.y) / (this.beginPosition - this.endPosition));
        }
        //初始化
        Init()  {
            this.slider.visible = false;
            this.sShow = false;
            this.sCalibration = 0;
            this.sStartVal = 0;
            this.sEndVal = 0;
            this.sCurDragVal = 0;
        }
        /**
         * 滑动
         * @param {*} sVal 
         */
        SliderVal(sVal)  {
            if (!this.sShow)  {
                RemoveSliderEvent();
                return;
            }
            this.texNum.text = this.CalculationCalibration(this.sStartVal, this.sEndVal, sVal, this.sDragAction);
        }

        /**
         * 计算刻度
         */
        CalculationCalibration(startVal, endVal, sVal, dragAction) {
            //每个范围的递增值（）
            let scope = [2, 5, 100];
            //范围开始下标
            let scopeIndex = startVal.toString().length - 1;
            //单位值范围 每次乘以10（0-10，10-100等。。每次计算当前作用域中的刻度次数）
            let unitVal = Math.pow(10, scopeIndex + 1);
            //范围值
            let scopeVal = scope.length > scopeIndex ? scope[scopeIndex] : scope[scope.length - 1] * Math.pow(10 * scopeIndex - scope.length);
            //刻度值
            let calibrationVal = [];
            //刻度次数
            let calibrationNum = 1;
            calibrationVal.push(0);
            let curVal = startVal;
            calibrationVal.push(curVal);

            let remainder = curVal % scopeVal;
            if (remainder > 0)  {
                curVal = scopeVal - remainder + curVal;
                calibrationVal.push(curVal);
                ++calibrationNum;
            }
            //上一次的单位值大小
            let LastUnitVal = startVal + scopeVal - remainder;

            Main$1.$LOG(endVal + "-" + unitVal + "-" + scopeVal);
            //
            while (endVal >= unitVal) {
                //TODO:将每个刻度的值添加到表中
                let curNum = parseInt((unitVal - LastUnitVal) / scopeVal);
                let nIndex = 0;
                while (nIndex < curNum)  {
                    curVal += scopeVal;
                    calibrationVal.push(curVal);
                    ++nIndex;
                }
                //累计刻度次数
                calibrationNum += curNum;
                //Main.$LOG("curNum:"+curNum + "-"+calibrationNum);
                //记录上一次单位值
                LastUnitVal = unitVal;
                //累计-每次单位x10
                unitVal = unitVal * 10;

                if (scope.length > ++scopeIndex) {
                    //不确定范围值配置
                    scopeVal = scope[scopeIndex];
                }
                else {
                    //范围配置中不存在 原来的基础值x10
                    scopeVal = scopeVal * 10;
                    Main$1.$LOG(scopeVal);
                }
            }

            let lCurNum = (parseInt((endVal - LastUnitVal) / scopeVal));
            //计算剩余值能有多少刻度(当前刻度是从0开始)
            calibrationNum += lCurNum;
            //TODO:添加刻度值-将每个刻度的值添加到表中
            let lIndex = 0;
            while (lIndex < lCurNum) {
                curVal += scopeVal;
                calibrationVal.push(curVal);
                ++lIndex;
            }
            //添加最后一次数值
            if (endVal % scopeVal > 0) {
                ++calibrationNum;
                calibrationVal.push(endVal);
            }
            //当前刻度
            let curCalibration = parseInt(sVal * calibrationNum);
            //Main.$LOG("endVal"+ endVal + "-" + sVal  + "-" + LastUnitVal + "-"+ scopeVal+ "-" + lCurNum + "-" + calibrationNum);

            //Main.$LOG("总刻度次数：" + calibrationNum + ",当前刻度：" + curCalibration + "，值：" + calibrationVal.length);
            let curCVal = calibrationVal[curCalibration];
            //回调-返回当前刻度的数值
            if (this.sDragAction != null && this.sCurDragVal != curCVal)  {
                // Main.$LOG("=============sDragAction");
                this.sDragAction(calibrationVal[curCalibration], curCalibration == calibrationNum - 1);
            }
            // Main.$LOG("=====calibrationVal:" +curCVal +"-" + this.sCurDragVal);
            this.sCurDragVal = curCVal;
            return this.sCurDragVal;
        }
        /**
         * 超出触发范围
         */
        SliderMouseOut()  {
            //删除滑动事件
            this.RemoveSliderEvent();
            //结束回调
            if (this.sEndAction != null)  {
                this.sEndAction(this.sCurDragVal);
            }
            //初始化
            this.Init();
        }

    }

    /**
     * 游戏控制脚本
     *  */
    class GameControl extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            //定义音量
            this._music = {
                moveShow: 'res/sounds/chips_to_table.wav',
                moveMangOrPi: 'res/sounds/chips_to_pot.wav',
                dealCards: 'res/sounds/movecard.mp3',
                fanCards: 'res/sounds/card_turning.wav',
                handle: 'res/sounds/handle.wav',
                diu: 'res/sounds/diu.wav',
                sub: 'res/sounds/sub.wav',
                subTimeOut: 'res/sounds/timeout.wav',
                subEnd: 'res/sounds/pcheck.wav',
                xiu: 'res/sounds/pcheck.wav',
                YouWin: 'res/sounds/YouWin.wav',
                daSlider: 'res/sounds/slider.wav',
                daSliderTop: 'res/sounds/slider_top.wav',
            };

            //定义芒和皮敞常量
            this._betType = {
                mang: 1,
                pi: 2,
            };

            this.autoHandle = {
                left: 1,
                right: 2
            };

            //定义移动筹码位置常量
            this._moveCMSeat = {
                one: 1,
                show: 2,
                mang: 3,
                pi: 4
            };

            // 绑定牌数据
            this._bindPokerData = {
                poker12: 1,
                poker3: 2,
                poker4: 3,
                poker34: 4
            };

            // 绑定玩家分数类型
            this._changeScoreType = {
                seat: 1,
                xiaZhu: 2
            };

            // 筹码移动速度
            this._speed = {
                changeSeatSpeed: 180,
                moveCM: 300,
                delayCard: 100,
                moveCard: 200,
                fanCard: 100,
                xiuFan: 200,
                diu: 500,
                diuRotation: 300,
                handle: 120
            };

            this.delayType = {
                action: 1,
                sub: 2
            };

            this._allowSeatUp = true;
        }

        beackRoom(roomId) {
            let roomid = roomId ? roomId : this.roomId;
            this.onSend({
                name: 'M.Room.C2R_DissolveRoom',
                data: {
                    roomid: roomid,
                },
                success(res) {
                    console.log('解散房间：', res);
                }
            });
        }

        $LOG(...data1) {
            if (Main$1.debug)
                console.log(...data1);
        }
        onAwake() {
            GameControl.instance = this;
        }
        onStart() {
            Main$1.$LOG('游戏控制中心:', this, this.owner._openedData);
            this._subCountDownVal = this.owner.subCountDown.getChildByName("timeText").getChildByName('timeVal');
            this._subCountDownLineTop = this.owner.subCountDown.getChildByName("lineBox")._children[0].getChildByName("line_top");
            {
                this._subView1 = this.owner.me_sub_pokerBox.getChildByName("poker1Box").getChildByName("poker");
                this._subView2 = this.owner.me_sub_pokerBox.getChildByName("poker2Box").getChildByName("poker");
                this._subPoint1Text = this.owner.me_sub_pokerBox.getChildByName("point1Text");
                this._subPoint2Text = this.owner.me_sub_pokerBox.getChildByName("point2Text");
                this._confrimSubBtn0 = this.owner.confrimSubBtn0;
                this._confrimSubBtn1 = this.owner.confrimSubBtn1;
            }
            this.setGameParamInit();
        }
        /**
         * 初始化游戏参数
         */
        setGameParamInit() {
            this.userId = Main$1.userInfo.userId;
            this.key = Main$1.userInfo.key;
            this.roomPwd = this.owner._openedData.roomPws;
            this.roomId = '';
            this.netClient = new NetClient("ws://" + Main$1.websoketApi);
            this.onConnect();
        }

        onEnable() {
            let num = 0;
            let that = this;
            this.openDiaLogSpeed = 200;
            this._playerArray = [];
            this._plyerIndexArray = [];
            that._seatXY = [];
            this.$LOG('控制中心:', this);
            GameRoomInit$1.init(that);
            MyCenter$1.req({
                key: "seat",
                callback(res) {
                    res.INDEX = num++;
                    that._playerArray.push(res);
                    that._plyerIndexArray.push(res.INDEX);
                    setTimeout(() => {
                        GameRoomInit$1.keepValue(that, res);
                    });
                }
            });
        }

        /**
         * 执行调整位置的动画函数
         * @param index 所属索引
         * @param speed 移动位置的速度
         */
        changeSeatXY(index, speed) {
            let arr = [];
            let deskViewUserSeatArr = this.owner.deskView._children.filter(item => item.name.indexOf('empty-seat') != -1);
            for (let i = 0; i < deskViewUserSeatArr.length; i++) {
                arr.push(i);
            }
            let concatArr = arr.splice(index, deskViewUserSeatArr.length).concat(arr.splice(0, index + 1));
            for (let i = 0; i < concatArr.length; i++) {
                {
                    this._playerArray[concatArr[i]].owner.isMe = false;
                    this._playerArray[index].owner.isMe = true;
                }
                Laya.Tween.to(this._playerArray[concatArr[i]].owner, { x: this.owner._playerSeatXYArray[i].x, y: this.owner._playerSeatXYArray[i].y }, speed, null, Laya.Handler.create(this, () => {
                }));//切换位置
                Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("xiaZhuScore"), { x: this.owner._xiaZhuSeatXYArray[i].x, y: this.owner._xiaZhuSeatXYArray[i].y }, speed, null);//切换下注分处的位置
                Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("tipsBox"), { x: this.owner._tipsSeatXYArray[i].x, y: this.owner._tipsSeatXYArray[i].y }, speed, null);//切换下注分处的位置
                {
                    this._playerArray[concatArr[i]].owner.getChildByName("show_poker_box").x = this.owner._pokerBoxSeat[i].x;
                    this._playerArray[concatArr[i]].owner.getChildByName("show_poker_box").y = this.owner._pokerBoxSeat[i].y;
                }
                {//保证玩家筹码的位置正确
                    let create_cm_seat_children = this._playerArray[concatArr[i]].owner.getChildByName("create_cm_seat")._children;
                    create_cm_seat_children.forEach(item => {
                        Laya.Tween.to(item, { x: this.owner._showCMFaceToPlayerXY[i].x, y: this.owner._showCMFaceToPlayerXY[i].y }, speed);
                    });
                }

                {//保证玩家分牌显示的位置正确
                    Laya.Tween.to(this._playerArray[concatArr[i]].owner.getChildByName("sub_poker_box"), { x: this.owner._subPokerBoxSeat[i].x, y: this.owner._subPokerBoxSeat[i].y }, speed, null);
                }

                {//刷新玩家显示筹码/与芒奖池/与皮奖池的坐标
                    this._playerArray[concatArr[i]].owner._showCMFaceToPlayerXY.x = this.owner._showCMFaceToPlayerXY[i].x;
                    this._playerArray[concatArr[i]].owner._showCMFaceToPlayerXY.y = this.owner._showCMFaceToPlayerXY[i].y;
                    this._playerArray[concatArr[i]].owner._mangDiChiFaceToPlayerXY.x = this.owner._mangDiChiFaceToPlayerXYArray[i].x;
                    this._playerArray[concatArr[i]].owner._mangDiChiFaceToPlayerXY.y = this.owner._mangDiChiFaceToPlayerXYArray[i].y;
                    this._playerArray[concatArr[i]].owner._piDiChiFaceToPlayerXY.x = this.owner._piDiChiFaceToPlayerXYArray[i].x;
                    this._playerArray[concatArr[i]].owner._piDiChiFaceToPlayerXY.y = this.owner._piDiChiFaceToPlayerXYArray[i].y;
                }
            }
        }
        /**
         * soket打开
         */
        onConnect() {
            let that = this;
            this.netClient.open();
            this.onSend({
                name: 'M.User.C2G_Connect',
                data: {
                    uid: that.userId,
                    key: that.key,
                    devid: "ime231231231234",
                    ip: "60.255.161.15"
                },
                success(resMsg) {
                    Main$1.$LOG('初始化---[Rpc回调]:', resMsg);
                    if (resMsg._t == "G2C_Connect") {
                        if (resMsg.ret.type == 0)
                            this.onSend({
                                name: 'M.Room.C2R_IntoRoom',
                                data: {
                                    roomPws: that.roomPwd
                                },
                                success(res) {
                                    that.dealSoketMessage('初始化---C2R_IntoRoom进入房间', res);
                                }
                            });
                    }
                }
            });
            /* 接受消息 */
            this.netClient.onMessage = function (name, resMsg) {
                that.dealSoketMessage('onMessage公共消息：', resMsg); //进入处理函数
            };

            // //socket开始连接事件
            // this.onStartConnect=function(){console.log("开始连接");}
            // //socket结束连接事件（不管成功还是失败都会进入)
            // this.onEndConnect=function(ret){console.log("结束连接 ",ret);}

            this.netClient.onStartConnect = function (res) {
                Main$1.$LOG('soket重新连接开始');
                that.owner.ceShiText.text = 'soket重新连接开始';
                Main$1.showLoading(true, '连接中');
            };
            this.netClient.onEndConnect = function (res) {
                Main$1.$LOG('soket重新连接结束', this);
                that.owner.ceShiText.text = 'soket重新连接结束';
                Main$1.showLoading(false);
            };
        }
        /**
         * soket发送消息
         */
        onSend(obj) {
            let that = this;
            let name = obj.name;
            let data = obj.data;
            this.netClient.send({
                name: name,
                data: data,
                callback: function (name, msg) {
                    obj.success.call(that, msg);
                }
            });
            Main$1.$LOG('soket发送消息:', obj);
        }

        /**
        * soket关闭
        */
        onClose() {
            this.netClient.close();
        }

        /**
         * 获取游戏房间信息
         */
        getGameNews(data) {
            this._gameRoomeNews = data.option;
            this.setRoomData(data);
        }

        /**
         * 设置房间数据
         * @param {*} data 房间数据
         */
        setRoomData(data) {
            this.owner.start_game_btn.visible = !data.start && parseInt(data.administration) === parseInt(this.userId) ? true : false;
            this.owner.rule_roomPws.text = data.roomPws;
            this.owner.rule_roomName.text = data.roomName;
            this.owner.rule_pi.text = '皮：' + data.option.dizhu;
            this.owner.rule_ruleText2_9.text = data.option.dy29 ? '2/9地王' : '';
            if (data.option.xmzm && data.option.yxqm) {
                this.owner.rule_ruleText.text = '休芒/揍芒/圈芒 ×' + data.option.mangrate;
            } else if (data.option.xmzm && !data.option.yxqm) {
                this.owner.rule_ruleText.text = '休芒/揍芒 ×' + data.option.mangrate;
            } else if (!data.option.xmzm && data.option.yxqm) {
                this.owner.rule_ruleText.text = '圈芒 ×' + data.option.mangrate;
            } else if (!data.option.xmzm && !data.option.yxqm) {
                this.owner.rule_ruleText.text = '';
            }
        }

        /**
         * 处理websoket收到的消息
         */
        dealSoketMessage(sign, resData) {
            Main$1.$LOG(sign, resData);
            if (resData._t == 'GenalResult') {
                this.errOpenLoginView(resData);
            }
            if (resData._t == 'R2C_IntoRoom') {
                if (resData.ret.type == 0) {
                    this.requestRoomUpdateData(resData);
                } else {
                    this.owner.showTips(resData.ret.msg);
                    this.leaveRoomOpenView();
                }
            }
            // 进入房间数据(即刷新数据)
            if (resData._t == 'R2C_UpdateRoom') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        if (item._t == "CXIntoRoom") {
                            this.getGameNews(item);//获取游戏信息
                            this.updateRoomData(item, resData);
                        } else if (item._t == "UpdateRoomData") {
                            this.updateCurData(item, resData);//更新当前数据
                        }
                    });
                } else {
                    this.owner.showTips(resData.ret.msg);
                }
            }

            if (resData._t == "R2C_AddDairu") {
                resData.param.json.forEach(item => {
                    if (item._t == "CXAddBobo") {
                        this.playerAddDairu(item);
                    }
                });
            }

            if (resData._t == 'R2C_SeatAt') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        if (item._t == "CXSeatAt") {
                            this.playerSeatAt(item);
                        } else if (item._t == "CXSitDown") {
                            this.playerSeatDown(item);
                        }
                    });
                } else {
                    this.owner.showTips(resData.ret.msg);
                }
            } else if (resData._t == 'R2C_SeatUp') {
                if (resData.ret.type == 0) {
                    this.playerSeatUp(resData);
                } else {
                    this.owner.showTips(resData.ret.msg);
                }
            } else if (resData._t == 'R2C_SitDown') {
                if (resData.ret.type == 0) {
                    resData.param.json.forEach(item => {
                        this.playerSeatDown(item);
                    });
                } else {
                    this.owner.showTips(resData.ret.msg);
                }
            } else if (resData._t == "R2C_LeaveRoom") {
                if (resData.ret.type == 4) {
                    this.owner.showTips(resData.ret.msg);
                } else {
                    this.leaveRoomDeal(resData);
                }
            } else if (resData._t == "CXRoomEnd") {
                this.roomEnd(resData);
            }

            if (resData._t == "G2C_TimeDelay") {
                PlayerDelayTime$1.dealWithRes(this, resData);
            } else if (resData._t == "G2C_StartNewRound") {
                this.startNewRound(resData);
            } else if (resData._t == "G2C_BetPiAndMango") {
                this.betPiAndMango(resData);
            } else if (resData._t == "G2C_Deal") {
                if (resData.type == 0) {//首牌(第1、2张)
                    this._startAction = null;
                    this.playerBindPoker12Val(resData);
                } else if (resData.type == 1) {//第3张
                    this._startAction = null;
                    this.playerBindPoker3Or4Val(resData, 3);
                } else if (resData.type == 2) {//第4张
                    this._startAction = null;
                    this.playerBindPoker3Or4Val(resData, 4);
                } else if (resData.type == 3) {//第4张
                    this._startAction = null;
                    this._allowStartAction = true;
                    this.playerBindPoker34Val(resData);
                }
            } else if (resData._t == "G2C_StartAction") {
                this._startAction = resData;
                if (resData.ret.type == 0) {
                    this.startAction();
                } else if (resData.ret.type == 6) {
                    this.sanhuaAction(resData);
                }
            } else if (resData._t == "G2C_PlayerAction") {
                this.playerAction(resData);
            } else if (resData._t == "G2C_PlayerActionEnd") {
                this.playerActionEnd(resData);
            } else if (resData._t == "G2C_StartAssignPoker") {//分牌
                this.assignPokerCountDown(true, resData);
                this.startAssignPoker(true, false, resData);
            } else if (resData._t == "G2C_AssignPoker") {//分牌
                if (resData.ret.type == 0) {
                    this.assignPokerReturn(resData);
                } else {
                    this.owner.showTips(resData.ret.msg);
                }
            } else if (resData._t == "G2C_WinUp") {
                this.playerWinUp(resData);
            } else if (resData._t == "G2C_RecyclingMang") {
                this.recyclingMang(resData);
            } else if (resData._t == "G2C_RoundEnd") {
                this.roundEnd(resData);
            }
        }

        /**
         * 未按流程登陆或重复登录就返回登录页面
         */
        errOpenLoginView(data) {
            Main$1.showDialog(data.Message, 1, null, () => {
                Laya.Scene.open('login.scene', true, Main$1.sign.signOut, Laya.Handler.create(this, () => {
                    this.destroy();
                }));
            });
        }

        /**
         * 进入房间连接成功后进行数据请求
         */
        requestRoomUpdateData(data) {
            this.roomId = data.roomId;
            this.onSend({
                name: 'M.Room.C2R_UpdateRoom',
                data: {
                    roomId: this.roomId
                },
                success(upDateRes) {
                    this.dealSoketMessage('进入房间收到的消息：', upDateRes); //进入处理函数
                }
            });
        }

        /**
         *房间结束
         */
        roomEnd(data) {
            Laya.Scene.open('paiJuEndView.scene', false, { show: true, data: data, page: this.owner._openedData.page });
        }

        /**
         * 加载关于座位上的数据
         * @param {} roomSeatArr 需要更新的数据
         */
        updateRoomData(data, allData) {
            this._totalMango = data.mang;//芒果底池总分
            this._totalPi = data.dichi;//皮底池总分
            if (data.mang) {
                this.showDiChiMang(true);
            }
            if (data.dichi > 0) {
                this.showDiChiPi(true);
            }
            /* =====更新座位上的数据===== */
            this._dealNumber = 0;
            let meArr = data.roomSeat.filter(item => item._id == this.userId);
            if (meArr.length > 0) {
                this.newIndexConcatArr = this._plyerIndexArray.splice(meArr[0].seat_idx, this._plyerIndexArray.length).concat(this._plyerIndexArray.splice(0, meArr[0].seat_idx + 1));

                this._playerArray.forEach((item, index) => {
                    item.owner.seatId = this.newIndexConcatArr[index];
                });
            } else {
                this.newIndexConcatArr = this._plyerIndexArray;
            }
            data.roomSeat.forEach(item_seatData => {
                item_seatData.seatidx = item_seatData.seat_idx;
                item_seatData.userId = item_seatData._id;
                if (item_seatData.seatAtTime > 0 && item_seatData.score == 0) {
                    this.playerSeatAt(item_seatData);
                } else if (item_seatData.seatAtTime == 0) {
                    this.playerSeatDown(item_seatData);
                }
                // ====更新牌数据
                this._playerArray.forEach((item_player, item_index) => {
                    if (item_seatData.userId == item_player.owner.userId) {
                        if (item_seatData.xiazhu > 0) {

                            item_player.showOrHidePlayerXiaZhuView(true);
                            item_player.changePlayerScore(item_seatData.score, this._changeScoreType.seat);
                            item_player.changePlayerScore(item_seatData.xiazhu, this._changeScoreType.xiaZhu);
                        }
                        if (item_seatData.xiazhu > 0 && !item_seatData.isAction) {// 初始下注状态
                            item_player.changeShowCM(this, 2, true, null);
                        } else if (item_seatData.xiazhu > 0 && item_seatData.isAction) {// 下注状态
                            item_player.changeShowCM(this, 3, true, null);
                        }
                        if (item_seatData.action == 3)
                            item_player.changeShowCM(this, 0, true, null);

                        if (item_seatData.assignPoker) {//已分牌
                            item_player.showActionTip(true, 6);
                            this._showSubView = false;
                            this.startAssignPoker(false);
                            let returnData1 = [item_seatData.pokers[0], item_seatData.pokers[1]];
                            let returnData2 = [item_seatData.pokers[2], item_seatData.pokers[3]];
                            let point1 = CountPoint$1.countPoint(item_seatData.pokers[0], item_seatData.pokers[1]);
                            let point2 = CountPoint$1.countPoint(item_seatData.pokers[2], item_seatData.pokers[3]);
                            item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                        } else {
                            let cur = allData.param.json.filter(item => item._t == "UpdateRoomData");
                            let curIsSubPoker = [];
                            if (cur.length != 0)
                                curIsSubPoker = cur[0].curData.filter(item => item._t == "G2C_StartAssignPoker");
                            if (item_seatData.action != 0 && item_seatData.action != -1 && curIsSubPoker.length == 0) {
                                item_player.showActionTip(true, item_seatData.action);
                                this._allowXiuPoker = true;
                            } else {
                                this._allowXiuPoker = false;
                            }

                            //重置牌数据
                            item_seatData.pokers.forEach((item_val, item_val_index) => {
                                item_player.dealPoker(this, item_val_index + 1, data.roomSeat.length, item_val, item_index, true);
                            });
                        }
                    }
                });
                // ====/更新牌数据
            });
            /* =====/更新座位上的数据===== */
        }

        /**
         * 更新当前数据
         * @param {*} data 数据
         */
        updateCurData(data, allData) {
            data.curData.forEach(item => {
                if (item._t == "G2C_StartAction") {
                    this._startAction = item;
                    this._allowStartAction = true;
                    this.startAction();
                } else if (item._t == "G2C_StartAssignPoker") {
                    this.assignPokerCountDown(true, item);
                    let curRoomSeat = allData.param.json.filter(item => item._t == "CXIntoRoom")[0].roomSeat.filter(item2 => item2.assignPoker);
                    curRoomSeat.forEach(item => {
                        if (item.userId === this.userId) {
                            this.startAssignPoker(true, true, item);
                        }
                    });
                }
            });
        }

        /**
         * ========================测试==============
         *  */
        ceShi() {
            // if(clickIndex==1){
            //     this._playerArray.forEach(item=>{
            //         item.showPlayerXiuView(true,[1,10]);
            //      })
            //      return
            //     this._allowXiuPoker=true;
            //     this._playerArray[0].owner.isMe=true;
            //     let arr=[2,1,0]
            //     arr.forEach((item0,index)=>{
            //         this._playerArray.forEach((item_player,item_index)=>{
            //             if(item0==item_player.owner.index){
            //                 item_player.dealPoker(this,1,3,index,false,this.demo5)
            //             }
            //          })
            //     })
            // }
            console.log('测试进了');
            // this.meAnimationZT(true, Main.animations.win)
            // if (clickIndex == 1) {
            //     this.meAnimationZT(true,Main.animations.win)
            // } else {
            //     this.meAnimationZT(false,Main.animations.win)
            // }
            // if (clickIndex == 1) {
            //     this.assignPokerCountDown(true, { startTime: (new Date().getTime() / 1000), endTime: (new Date().getTime() / 1000) + 20 });
            // }
            let data = {
                delayedNum: 0,
                delayedNumMax: 4,
                delayedScore: 10,
                endTime: 1574818785,
                maxXiazu: 5,
                opts: [3, 4, 1],
                ret: { type: 0, msg: "成功" },
                score: 235,
                startTime: 1574818768,
                uid: 1021354,
                xiazu: 5
            };
            this.setMeHandleBtnZT(true, data);
        }

        /**
         * 开始游戏
         */
        clickStartGame() {
            this.onSend({
                name: 'M.Room.C2R_StartGame',
                data: {
                    roomid: this.roomId
                },
                success(res) {
                    if (res.ret.type == 0) {
                        this.owner.start_game_btn.visible = false;
                    } else {
                        this.owner.showTips(res.ret.msg);
                    }
                }
            });
        }

        /**
         * 去除敲动画
         */
        clearQiaoAni() {
            this._playerArray.forEach(item_player => {
                item_player.playerSeatAddGif(false, Main$1.animations.qiao);//去除敲动画
            });
        }

        /**
         * 设置一些初始参数
         */
        setMoreStartVal() {
            this._allowXiuPoker = true;
            this._allowStartAction = false;
            this.autoHandleType = null;
            {
                this._allowAssignPoker = false;
            }
        }

        /**
         * 游戏刚开始设置庄以及分数等信息
         */
        startNewRound(data) {
            this.roundEnd();
            this.setMoreStartVal();
            this.clearQiaoAni();
            let showBankerUser = data.seats.filter(item => item.seat_idx == data.zidx);
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == showBankerUser[0]._id) {
                    item_player.showBanker(true);
                } else {
                    item_player.showBanker(false);
                }
            });
        }

        /**
         * 开始游戏的下注步骤
         */
        betPiAndMango(data) {
            this._totalMango = data.totalMango;//芒果底池总分
            this._totalPi = data.totalPi;//皮底池总分
            this._joinPlyerArray = data.betUserInfo;
            data.betUserInfo.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        item_player.changePlayerScore(item_data.score, this._changeScoreType.seat);
                        item_player.changeShowCM(this, 1, true, data.betUserInfo.length, item_index, this.showPlayerScoreAndCMEnd);
                        item_player.bindPlayerXiaZhuScoreVal(item_data, this._betType.mang);
                    }
                });
            });
        }

        /**
        * (2)玩家处显示筹码结束，接下来就开始创建皮筹码并移动到显示筹码处
        *  */
        showPlayerScoreAndCMEnd() {
            this._winUpINDEX = 0;
            this._joinPlyerArray.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        item_player.showMoveCM(this, 1, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, this._joinPlyerArray.length, this.startShortMoveEnd);
                    }
                });
            });
        }


        // 开局筹码短距离移动结束回调
        startShortMoveEnd() {
            this._winUpINDEX = 0;
            setTimeout(() => {
                this._joinPlyerArray.forEach((item_data, item_index) => {
                    this._playerArray.forEach(item_player => {
                        if (item_data.userId == item_player.owner.userId) {
                            item_player.showOrHidePlayerXiaZhuView(false);
                            item_player.showMoveCM(this, 1, true, this._moveCMSeat.show, this._moveCMSeat.mang, this._music.moveMangOrPi, this._joinPlyerArray.length, this.moveToMangEnd);
                        }
                    });
                });
            }, 300);
        }

        // 接上
        moveToMangEnd() {
            this.showDiChiMang(true);
            setTimeout(() => {
                this._joinPlyerArray.forEach((item_data, item_index) => {
                    this._playerArray.forEach(item_player => {
                        if (item_data.userId == item_player.owner.userId) {
                            item_player.changeShowCM(this, 2, true, this._joinPlyerArray.length, item_index, this.showPlayerScoreAndCMEnd2);
                            item_player.bindPlayerXiaZhuScoreVal(item_data, this._betType.pi);
                        }
                    });
                });
            }, 400);
        }

        // 接上
        showPlayerScoreAndCMEnd2() {
            this._winUpINDEX = 0;
            this._joinPlyerArray.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        item_player.showMoveCM(this, 2, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, this._joinPlyerArray.length, this.startShortMoveEnd2);
                    }
                });
            });
        }

        // 接上
        startShortMoveEnd2() {
            this.showDiChiPi(true);
            setTimeout(() => {
                this.startDealPoker1And2();
            }, 300);
        }

        /**
         * 为玩家绑定第1,2张牌牌数据
         */
        playerBindPoker12Val(data) {
            this._dealPoker12Array = data.players;
        }

        /**
         * 为玩家绑定第3张牌牌数据
         */
        playerBindPoker3Or4Val(data, num) {
            this._allowStartAction = false;
            this._dealNumber = 0;
            let count = data.players.length;
            data.players.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.userId == item_data.uid) {
                        let pokerName = item_data.poker[0];
                        item_player.dealPoker(this, num, count, pokerName, item_index, false, this.dealPokerEnd);
                    }
                });
            });
        }

        /**
         * 为玩家绑定第3,4张牌牌数据
         * @param {*} data 牌等数据
         */
        playerBindPoker34Val(data) {
            let count = data.players.length;
            for (let i = 3; i <= 4; i++) {
                this._dealNumber = 0;
                data.players.forEach((item_data, item_index) => {
                    this._playerArray.forEach(item_player => {
                        if (item_player.owner.userId == item_data.uid) {
                            let num = i;//代表第几张牌(1,2,3,4)
                            let index = item_index + ((num - 3) * count);
                            let pokerName = num == 3 ? item_data.poker[0] : item_data.poker[1];
                            item_player.dealPoker(this, num, count, pokerName, index, false, null);
                        }
                    });
                });
            }
        }


        /**
        * 显示芒果底池
        * @param {bool} isShow 是否显示底池芒
        */
        showDiChiMang(isShow) {
            let dichimang = this.owner.mang_cm_pool;
            dichimang.visible = isShow;
            if (isShow)
                this.bindDiChiMangVal();
        }

        /**
         * 芒果底池绑定值
         */
        bindDiChiMangVal(data) {
            let dichimangVal = this.owner.mang_cm_pool.getChildByName("dichimangVal");
            dichimangVal.text = data ? data : this._totalMango;
        }

        /**
        * 显示皮底池
        * @param {bool} isShow 是否显示皮底池
        */
        showDiChiPi(isShow) {
            let dichimang = this.owner.pi_cm_pool;
            dichimang.visible = isShow;
            if (isShow)
                this.bindDiChiPiVal();
        }

        /**
         * 皮底池绑定值
         */
        bindDiChiPiVal(data) {
            let dichipiVal = this.owner.pi_cm_pool.getChildByName("dichipiVal");
            dichipiVal.text = data ? data : this._totalPi;
        }

        /**
         * 操作游戏按钮显示
         */
        startAction() {
            if (this._allowStartAction) {
                if (this._startAction) {
                    this._playerArray.forEach(item_player => {
                        if (this._startAction.uid != this.userId) {
                            this.setPlayerAutoHandleZT(true, item_player);
                        } else {
                            this.setPlayerAutoHandleZT(false, item_player);
                        }
                        if (item_player.owner.userId == this._startAction.uid) {
                            item_player.showActionTip(false);//隐藏提示
                            item_player.showPlayerCountDown(this._startAction, true);//开始倒计时
                            console.log('自动操作状态======', this.autoHandleType);
                            this.setMeCurHandleZT(this._startAction, item_player);
                        }
                    });
                }
            }
        }

        /**
         * 设置自己当前操作状态
         */
        setMeCurHandleZT(data, item_player) {
            if (item_player.owner.isMe) {
                if (this.autoHandleType) {
                    let haveXiuArr = data.opts.filter(item => item == 4);
                    if ((haveXiuArr.length > 0 && this.autoHandleType == this.autoHandle.right) || haveXiuArr.length > 0 && this.autoHandleType == this.autoHandle.left) {
                        this.onClickRightBtn(4, 0);
                    } else if (haveXiuArr.length == 0 && this.autoHandleType == this.autoHandle.right) {
                        this.setMeHandleBtnZT(true, data);
                    } else if (haveXiuArr.length == 0 && this.autoHandleType == this.autoHandle.left) {
                        this.onClickLeftBtn(3);
                    }
                } else {
                    this.setMeHandleBtnZT(true, data);
                }
            }
        }

        /**
         * 三花特牌
         */
        sanhuaAction(data) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == data.uid) {
                    item_player.diuPoker();//执行丢牌的效果
                }
            });
        }

        /**
         * 设置玩家自动操作状态
         * @param isShow 是否显示
         * @param item_player 玩家对象
         */
        setPlayerAutoHandleZT(isShow, item_player) {
            if (!isShow)
                this.owner.autoHandleBtnBox.visible = isShow;
            if (item_player) {
                let $visible = this.owner.autoHandleBtnBox.visible;
                let $actionType = item_player.owner.actionType;
                let $curXiaZhuScore = parseInt(item_player.owner.curXiaZhuScore);
                let $isMe = item_player.owner.isMe;
                // Main.$LOG('设置玩家自动操作状态:', item_player.owner.isMe,isShow, item_player.owner.actionType, item_player.owner.curXiaZhuScore)
                if ($isMe && !$visible && isShow && $actionType != 3 && $curXiaZhuScore > 0) {
                    this._autoBtnArr = [];
                    this.owner.autoHandleBtnBox.visible = isShow;
                    let leftBtn = this.owner.auto_handle_left;
                    let rightBtn = this.owner.auto_handle_right;
                    let leftBtn_btn_0 = leftBtn.getChildByName("auto_0");
                    let leftBtn_btn_1 = leftBtn.getChildByName("auto_1");
                    let rightBtn_btn_0 = rightBtn.getChildByName("auto_0");
                    let rightBtn_btn_1 = rightBtn.getChildByName("auto_1");
                    this.meHandleBtnCommonSet(leftBtn, { x: -280, y: 0 });
                    this.meHandleBtnCommonSet(rightBtn, { x: 280, y: 0 });
                    this.loadAutoHandleImgEnd(leftBtn, leftBtn_btn_0, leftBtn_btn_1);
                    this.loadAutoHandleImgEnd(rightBtn, rightBtn_btn_0, rightBtn_btn_1);
                    this.autoHandleType = null;
                    console.log('设置自己的自动操作状态:', this.autoHandleType);
                    leftBtn.on(Laya.Event.CLICK, this, this.onClickAutoLeftBtn, [leftBtn_btn_0, leftBtn_btn_1, rightBtn_btn_0, rightBtn_btn_1]);
                    rightBtn.on(Laya.Event.CLICK, this, this.onClickAutoRightBtn, [leftBtn_btn_0, leftBtn_btn_1, rightBtn_btn_0, rightBtn_btn_1]);
                }
            }
        }

        onClickAutoLeftBtn(left_0, left_1, right_0, right_1) {
            left_0.visible = !left_0.visible;
            left_1.visible = !left_1.visible;
            right_0.visible = true;
            right_1.visible = false;
            this.autoHandleType = left_1.visible ? this.autoHandle.left : null;
        }

        onClickAutoRightBtn(left_0, left_1, right_0, right_1) {
            right_0.visible = !right_0.visible;
            right_1.visible = !right_1.visible;
            left_0.visible = true;
            left_1.visible = false;
            this.autoHandleType = right_1.visible ? this.autoHandle.right : null;
        }

        loadAutoHandleImgEnd(btnObj, btn_0, btn_1) {
            btn_0.visible = true;
            btn_1.visible = false;
            this._autoBtnArr.push(btnObj);
            if (this._autoBtnArr.length == 2) {
                this._autoBtnArr.forEach(item => {
                    Laya.Tween.to(item, { x: item.moveXY.x, y: item.moveXY.y, alpha: 1 }, this._speed.handle, Laya.Ease.backInOut, Laya.Handler.create(this, this.moveAutoHandleEnd));
                });
            }
        }

        moveAutoHandleEnd() {

        }

        /**
         * 自己操作按钮设置的公共方法
         */
        meHandleBtnCommonSet(btn, XY) {
            let _btn = btn;
            _btn.alpha = 0;
            _btn.pos(0, 0);
            _btn.moveXY = XY;
        }


        /**
         * 关于自己的操作按钮的一些状态设置
         * @param isShow 是否显示
         * @param data 请求的参数
         */
        setMeHandleBtnZT(isShow = true, data) {
            console.log('进来操作状态');
            this.owner.handleBtnBox.visible = isShow;
            if (isShow) {
                PlayerDelayTime$1.init(this.delayType.action, this, data);
                this._btnArr = [];
                this._btnMoveNum = 0;
                let leftBtn = this.owner.handle_left;
                let rightBtn = this.owner.handle_right;
                let topBtn = this.owner.handle_top;
                this.meHandleBtnCommonSet(leftBtn, { x: -280, y: 0 });
                this.meHandleBtnCommonSet(rightBtn, { x: 280, y: 0 });
                this.meHandleBtnCommonSet(topBtn, { x: 0, y: -180 });
                {//左边--3丢
                    this.loadHandleImgEnd(leftBtn, data);
                    leftBtn.on(Laya.Event.CLICK, this, this.onClickLeftBtn, [3]);
                }
                {//右边--2跟,4休
                    let dataOption = data.opts.filter(item => item == 2 || item == 4);
                    if (dataOption.length == 1) {
                        rightBtn.getChildByName('gen_btn').getChildByName('value').text = '';
                        rightBtn._children.forEach(item_btn => {
                            item_btn.visible = false;
                        });
                        if (dataOption[0] == 2) {
                            rightBtn.getChildByName('gen_btn').visible = true;
                        } else if (dataOption[0] == 4) {
                            rightBtn.getChildByName('xiu_btn').visible = true;
                        }
                        this.loadHandleImgEnd(rightBtn, data);
                        let genScore;
                        if ((data.xiazu + data.score) >= data.maxXiazu) {
                            genScore = dataOption[0] == 2 ? data.maxXiazu : 0;
                        } else {
                            genScore = dataOption[0] == 2 ? (data.xiazu + data.score) : 0;
                        }
                        rightBtn.on(Laya.Event.CLICK, this, this.onClickRightBtn, [dataOption[0], genScore]);
                        if (dataOption[0] == 2) {
                            rightBtn.getChildByName('gen_btn').getChildByName('value').text = data.maxXiazu - data.xiazu;
                        }
                    }
                }
                {//上边--1大,5敲,6NO大
                    let dataOption = data.opts.filter(item => item == 1 || item == 5 || item == 6);
                    if (dataOption.length == 1) {
                        topBtn._children.forEach(item_btn => {
                            item_btn.visible = false;
                        });
                        if (dataOption[0] == 1) {
                            topBtn.getChildByName('da_btn').visible = true;
                        } else if (dataOption[0] == 5) {
                            topBtn.getChildByName('qiao_btn').visible = true;
                        } else if (dataOption[0] == 6) {
                            topBtn.getChildByName('NOda_btn').visible = true;
                        }
                        this.loadHandleImgEnd(topBtn, data);
                        if (dataOption[0] == 1 || dataOption[0] == 5) {
                            let qiaoScore = dataOption[0] == 5 ? data.score : null;
                            topBtn.getChildByName('qiao_btn').getChildByName('value').text = '';
                            if (dataOption[0] == 5) {
                                topBtn.getChildByName('qiao_btn').getChildByName('value').text = qiaoScore;
                            }
                            if (dataOption[0] == 1) {
                                topBtn.on(Laya.Event.MOUSE_DOWN, this, this.onClickTopBtn, [dataOption[0], data]);
                            }
                            topBtn.on(Laya.Event.CLICK, this, this.onClickTopBtn, [dataOption[0], qiaoScore]);

                        }
                    }
                }
            } else {
                this.showFastBtnAndBindVal(false);
                PlayerDelayTime$1.offEvent(this);
            }
        }

        //接上
        loadHandleImgEnd(btnObj, data) {
            this._btnArr.push(btnObj);
            if (this._btnArr.length == 3) {
                this._btnArr.forEach(item => {
                    Laya.Tween.to(item, { x: item.moveXY.x, y: item.moveXY.y, alpha: 1 }, this._speed.handle, Laya.Ease.backInOut, Laya.Handler.create(this, this.moveHandleEnd, [data]));
                });
            }
        }

        moveHandleEnd(data) {
            this._btnMoveNum++;
            if (this._btnMoveNum == 3) {
                this.showFastBtnAndBindVal(true, data);
                if (Main$1.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(this._music.handle, 1);
            }
        }

        /**
         * 为了自己操作完成后立即显示我能看到的操作结果
         */
        showMeHandleTip(act) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.isMe) {
                    item_player.showActionTip(true, act);//显示提示
                }
            });
        }

        // 接上
        onClickLeftBtn(type) {
            this.showMeHandleTip(type);
            this.setMeHandleBtnZT(false, null);//改变操作状态
            if (type == 3)
                this.onSend({
                    name: 'M.Games.CX.C2G_PlayerAction',
                    data: {
                        roomId: this.roomId,
                        score: 0, //丢  分数为0
                        act: type //3代表丢
                    },
                    success(res) {
                        this.dealSoketMessage('操作按钮的点击事件--丢：', res);
                    }
                });

        }
        // 接上
        onClickRightBtn(type, genScore) {
            this.showMeHandleTip(type);
            this.setMeHandleBtnZT(false, null);//改变操作状态
            this.onSend({
                name: 'M.Games.CX.C2G_PlayerAction',
                data: {
                    roomId: this.roomId,
                    score: genScore,
                    act: type //跟或休 
                },
                success(res) {
                    this.dealSoketMessage('操作按钮的点击事件--跟或休：', res);
                }
            });
        }
        // 接上(敲)
        onClickTopBtn(type, data) {
            let that = this;
            if (type == 5) {
                this.showMeHandleTip(type);
                this.setMeHandleBtnZT(false, null);//改变操作状态
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.isMe)
                        item_player.playerSeatAddGif(true, Main$1.animations.qiao, false);
                });
                this.daSendSoket(data, type);
            } else if (type == 1) {
                let MySliderJS = this.owner.da_slider.getComponent(MySlider);
                MySliderJS.SliderMouseDown(data.maxXiazu * 2, data.score, (val1) => {
                    Main$1.$LOG('变化值的时候回调：', val1);
                    that.daSliderChangeDeal(val1, data);
                }, (val2) => {
                    Main$1.$LOG('结束的的时候回调：', val2);
                    if (val2 != 0) {
                        that.showMeHandleTip(type);
                        that.setMeHandleBtnZT(false, null);//改变操作状态
                        that.daSendSoket(val2 + data.xiazu, type);
                    }
                });
            }
        }

        daSendSoket(data, type) {
            this.onSend({
                name: 'M.Games.CX.C2G_PlayerAction',
                data: {
                    roomId: this.roomId,
                    score: data,
                    act: type //跟或休 
                },
                success(res) {
                    this.dealSoketMessage('操作按钮的点击事件--跟或休：', res);
                }
            });
        }

        /**
         * 大--拖动的时候变化的回调
         */
        daSliderChangeDeal(val, data) {
            if (Main$1.gameSetVal.gameMusic == 1)
                if (val < data.score)
                    Laya.SoundManager.playSound(this._music.daSlider, 1);
                else {
                    Laya.SoundManager.playSound(this._music.daSliderTop, 1);
                }

        }

        /**
         * 隐藏全部快捷按钮
         */
        hideOrShowFastBtn(btnObj, type) {
            btnObj.getChildByName("btn1").visible = type == 1 ? true : false;
            btnObj.getChildByName("btn0").visible = type == 0 ? true : false;
        }

        /**
         * 显示快捷操作按钮并绑定相应的值
         */
        showFastBtnAndBindVal(isShow, data) {
            this.owner.fastXiaZhuBtnBox.visible = isShow;
            if (isShow) {
                let btn1 = this.owner.fastXiaZhuBtnBox.getChildByName("btn1");
                let btn2 = this.owner.fastXiaZhuBtnBox.getChildByName("btn2");
                let btn3 = this.owner.fastXiaZhuBtnBox.getChildByName("btn3");
                let text1 = btn1.getChildByName('value');
                let text2 = btn2.getChildByName('value');
                let text3 = btn3.getChildByName('value');
                let gameDiZhu = this._gameRoomeNews.dizhu;
                if (gameDiZhu == data.maxXiazu) {
                    text1.text = parseInt(this._totalPi / 2);
                    text1.alpha = 0.5;
                    text2.text = parseInt(text1.text * 2);
                    text2.alpha = 1;
                    text3.text = parseInt(text1.text * 4);
                    text3.alpha = 1;
                    this.hideOrShowFastBtn(btn1, 0);
                    this.hideOrShowFastBtn(btn2, 1);
                    this.hideOrShowFastBtn(btn3, 1);
                    this._allowFast1 = false;
                    this._allowFast2 = true;
                    this._allowFast3 = true;
                    btn2.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text2.text, '_allowFast2']);
                    btn3.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text3.text, '_allowFast3']);
                } else {
                    text1.text = parseInt(data.maxXiazu * 2);
                    text2.text = text1.text * 2;
                    text3.text = text1.text * 4;
                    if (text1.text > data.score) {
                        this._allowFast1 = false;
                        text1.alpha = 0.5;
                        this.hideOrShowFastBtn(btn1, 0);
                    } else {
                        text1.alpha = 1;
                        this._allowFast1 = true;
                        this.hideOrShowFastBtn(btn1, 1);
                        btn1.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text1.text, '_allowFast1']);
                    }
                    if (text2.text > data.score) {
                        this._allowFast2 = false;
                        text2.alpha = 0.5;
                        this.hideOrShowFastBtn(btn2, 0);
                    } else {
                        text2.alpha = 1;
                        this._allowFast2 = true;
                        this.hideOrShowFastBtn(btn2, 1);
                        btn2.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text2.text, '_allowFast2']);
                    }
                    if (text3.text > data.score) {
                        text3.alpha = 0.5;
                        this._allowFast3 = false;
                        this.hideOrShowFastBtn(btn3, 0);
                    } else {
                        text3.alpha = 1;
                        this._allowFast3 = true;
                        this.hideOrShowFastBtn(btn3, 1);
                        btn3.on(Laya.Event.CLICK, this, this.onClickFastBtn, [text3.text, '_allowFast3']);
                    }
                }
            }
        }

        //接上(快捷下注)
        onClickFastBtn(score, type) {
            Main$1.$LOG('点击快捷键状态：', this[type]);
            if (this[type]) {
                this.onSend({
                    name: 'M.Games.CX.C2G_PlayerAction',
                    data: {
                        roomId: this.roomId,
                        score: score,
                        act: 1 //下注 大
                    },
                    success(res) {
                        this.dealSoketMessage('快捷按钮的点击事件:', res);
                    }
                });
            }
        }

        /**
         * 玩家操作
         */
        playerAction(data) {
            if (data.ret == null || data.ret.type == 0) {
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.userId == data.uid) {
                        this.prePlayerAciton = data.act;
                        item_player.showActionTip(true, data.act);//显示提示
                        item_player.showPlayerCountDown(null, false);//去除倒计时
                        if (item_player.owner.isMe) {
                            this.setMeHandleBtnZT(false, null);//改变操作状态
                        }
                        switch (data.act) {
                            case 3://丢牌
                                item_player.diuPoker();//执行丢牌的效果
                                item_player.changeShowCM(this, 0, true, 1, 0);//改变筹码的图片
                                break;
                            case 1://大
                                this._winUpINDEX = 0;
                                item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                                item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd);
                                function xiaZhuMoveCMEnd() {
                                    item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                    this.bindDiChiPiVal(data.dichi);
                                    item_player.changeShowCM(this, 3, true, 1, 0);
                                }
                                break;
                            case 2://跟
                                this._winUpINDEX = 0;
                                item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                                item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd2);
                                function xiaZhuMoveCMEnd2() {
                                    item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                    this.bindDiChiPiVal(data.dichi);
                                    item_player.changeShowCM(this, 3, true, 1, 0);
                                }
                                break;
                            case 4://休
                                if (Main$1.gameSetVal.gameMusic == 1)
                                    Laya.SoundManager.playSound(this._music.xiu, 1);
                                break;
                            case 5://敲
                                this._winUpINDEX = 0;
                                item_player.playerSeatAddGif(true, Main$1.animations.qiao, false);
                                item_player.changePlayerScore(data.playerScore, this._changeScoreType.seat);
                                item_player.showMoveCM(this, 3, true, this._moveCMSeat.one, this._moveCMSeat.show, this._music.moveShow, 1, xiaZhuMoveCMEnd3);
                                function xiaZhuMoveCMEnd3() {
                                    item_player.changePlayerScore(data.score, this._changeScoreType.xiaZhu);
                                    this.bindDiChiPiVal(data.dichi);
                                    item_player.changeShowCM(this, 3, true, 1, 0);
                                }
                                break;
                        }
                    }
                });
            } else {
                this.owner.showTips(data.ret.msg);
            }
        }

        /**
         * 本轮游戏结束
         */
        playerActionEnd(data) {
            this._winUpINDEX = 0;
            this.reloadPlayerMoreZT();
            data.endActionInfo.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data.userId == item_player.owner.userId) {
                        if (item_player.owner.actionType != 3) {//不是丢
                            item_player.changeShowCM(this, 2, true, data.endActionInfo.length, item_index);
                            let cmTyppe = item_data.curXiazhu > 0 ? 3 : 2;
                            item_player.showMoveCM(this, cmTyppe, true, this._moveCMSeat.show, this._moveCMSeat.pi, this._music.moveMangOrPi, data.endActionInfo.length);
                        }
                    }
                });
            });
        }


        /**
         * 恢复玩家部分状态
         */
        reloadPlayerMoreZT() {
            this.setPlayerAutoHandleZT(false, null);
            this.setMeHandleBtnZT(false, null);//改变操作状态
            this._playerArray.forEach(item_player => {
                item_player.showPlayerCountDown(null, false);//去除倒计时
                if (item_player.owner.actionType != 3) {//不是丢
                    item_player.showActionTip(false);//隐藏提示
                }
            });
            this.autoHandleType = null;
        }

        /**
         * 开始分牌
         * @param data 
         * @param isShow 是否显示 
         * @param isUpdate 是否是刷新状态 
         * @param data 参与分牌的数据 
         */
        startAssignPoker(isShow = true, isUpdate = false, data) {
            if (isShow) {
                this.clearQiaoAni();
                this.reloadPlayerMoreZT();
                let meSubData = data.players.filter(item => item == this.userId);
                if (meSubData.length > 0) {
                    if (!isUpdate) {
                        if (Main$1.gameSetVal.gameMusic == 1)
                            Laya.SoundManager.playSound(GameControl.instance._music.sub, 1);
                    }
                    this.showAssignPokerView(isShow);
                }
                data.players.forEach(item => {
                    this._playerArray.forEach(item_player => {
                        if (item == item_player.owner.userId)
                            PlayerDelayTime$1.init(this.delayType.sub, this, data);
                        else {
                            PlayerDelayTime$1.offEvent(this);
                        }
                    });
                });
            } else {
                this.showAssignPokerView(isShow);
                PlayerDelayTime$1.offEvent(this);
            }
        }

        /**
         * 分牌结果
         */
        assignPokerReturn(data) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == data.userId) {
                    item_player.showActionTip(true, 6);
                    if (Main$1.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(this._music.subEnd, 1);
                    if (item_player.owner.isMe) {
                        this.startAssignPoker(false);
                        let returnData1 = [data.poker[0], data.poker[1]];
                        let returnData2 = [data.poker[2], data.poker[3]];
                        let point1 = CountPoint$1.countPoint(data.poker[0], data.poker[1]);
                        let point2 = CountPoint$1.countPoint(data.poker[2], data.poker[3]);
                        item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                    }
                }
            });
        }

        /**
         * 显示分牌容器
         * @param {bool} isShow 是否显示
         */
        showAssignPokerView(isShow) {
            this.owner.me_sub_pokerBox.visible = isShow;
            this._allowAssignPoker = isShow;
            this._confrimSubBtn0.visible = isShow;
            this._confrimSubBtn1.visible = !isShow;
            if (isShow) {
                this.setAssignPokerData();
            } else {
                this._subPoint1Text.text = '';
                this._subPoint2Text.text = '';
                this._subPokerResult = [];
                this._subView1.loadImage('');
                this._subView1.pokerName = '';
                this._subView2.loadImage('');
                this._subView2.pokerName = '';
            }
        }

        /**
        * 分牌倒计时
        * @param isShow 是否显示
        * @param data 显示时间所需的参数
        */
        assignPokerCountDown(isShow = true, data = {}) {
            this.allowTimeOutSound = isShow;
            this.owner.subCountDown.visible = isShow;
            if (isShow) {
                this.subAllTime = data.endTime - data.startTime - 1;//剩余时间
                let nowTime = (new Date().getTime() / 1000);
                this._subCountDownLineTop.x = -this._subCountDownLineTop.width * ((nowTime - data.startTime) / this.subAllTime);
                this._subCountDownVal.text = this.subAllTime + 's';
                Laya.timer.frameLoop(1, this, this.subCountDownLineMove, [data]);
            } else {
                Laya.timer.clear(this, this.subCountDownLineMove);
            }
        }

        subCountDownLineMove(data) {
            let nowTime = (new Date().getTime() / 1000);
            let lastTimeValue = this.subAllTime - parseInt((nowTime - data.startTime));
            this._subCountDownVal.text = lastTimeValue + 's';
            this._subCountDownLineTop.x = -this._subCountDownLineTop.width * ((nowTime - data.startTime) / this.subAllTime);
            if (lastTimeValue == 5) {
                if (Main$1.gameSetVal.gameMusic == 1 && this.allowTimeOutSound) {
                    this.allowTimeOutSound = false;
                    Laya.SoundManager.playSound(GameControl.instance._music.subTimeOut, 1);
                }
            }
            if (lastTimeValue <= 0) {
                Laya.timer.clear(this, this.subCountDownLineMove);
            }
        }


        //进行分牌之前的事件绑定及参数设置
        setAssignPokerData() {
            this._subView1.pokerName = '';
            this._subView2.pokerName = '';
            this._playerArray.forEach(me_item => {
                if (me_item.owner.isMe) {
                    me_item.showOrHidePlayerXiuSign(false);
                    me_item.showOrHidePlayerShowSign(false);
                    let pokerArr = me_item.owner.getChildByName('show_me_poker_box')._children;
                    pokerArr.forEach((mePokerObj, index) => {
                        mePokerObj.on(Laya.Event.CLICK, this, this.onClickPoker, [mePokerObj, pokerArr, me_item.owner]);//补充钵钵关闭按钮关闭
                    });
                }
            });
        }

        onClickPoker(mePokerObj, pokerArr, meItemObj) {
            if (this._allowAssignPoker) {
                let pokerArrScaleXIs0 = pokerArr.filter(item => item.scaleX == 0);
                // console.log(pokerArrScaleXIs0.length,this._subView1.pokerName,this._subView2.pokerName)
                if (pokerArrScaleXIs0.length == 0) {
                    this.changeSubViewContent(this._subView1, mePokerObj, pokerArr, meItemObj);
                } else if (pokerArrScaleXIs0.length == 1 && this._subView1.pokerName === '') {
                    this.changeSubViewContent(this._subView1, mePokerObj, pokerArr, meItemObj);
                } else if (pokerArrScaleXIs0.length == 1 && this._subView2.pokerName === '') {
                    this.changeSubViewContent(this._subView2, mePokerObj, pokerArr, meItemObj);
                }
                this.changeMePokerX(pokerArr, meItemObj);
            }
        }

        showPoint(pokerArr) {
            let pokerScaleXIs0 = pokerArr.filter(item => item.scaleX == 0);
            let pokerScaleXNo0 = pokerArr.filter(item => item.scaleX != 0);
            if (pokerScaleXIs0.length == 2 && pokerScaleXNo0.length == 2) {
                let point1 = CountPoint$1.countPoint(pokerScaleXIs0[0].pokerName, pokerScaleXIs0[1].pokerName);
                let point2 = CountPoint$1.countPoint(pokerScaleXNo0[0].pokerName, pokerScaleXNo0[1].pokerName);
                this._subPoint1Text.text = point1;
                this._subPoint2Text.text = point2;
                this._confrimSubBtn0.visible = false;
                this._confrimSubBtn1.visible = true;
                this._subPokerResult = [pokerScaleXIs0[0].pokerName, pokerScaleXIs0[1].pokerName, pokerScaleXNo0[0].pokerName, pokerScaleXNo0[1].pokerName];
                this.$LOG('分牌点击的数据：', pokerScaleXIs0, pokerScaleXNo0);
            } else {
                this._subPoint1Text.text = '';
                this._subPoint2Text.text = '';
                this._confrimSubBtn1.visible = false;
                this._confrimSubBtn0.visible = true;
            }
        }

        changeSubViewContent(subView, mePokerObj, pokerArr, meItemObj) {
            subView.loadImage('res/img/poker/' + mePokerObj.pokerName + '.png');
            subView.pokerName = mePokerObj.pokerName;
            mePokerObj.scaleX = 0;
            subView.allowCLICK = true;
            subView.on(Laya.Event.CLICK, this, this.onClickSubView, [subView, pokerArr, meItemObj]);
            this.showPoint(pokerArr);
        }

        onClickSubView(subView, pokerArr, meItemObj) {
            if (subView.allowCLICK) {
                pokerArr.forEach(poker_item => {
                    if (poker_item.pokerName == subView.pokerName) {
                        subView.loadImage('');
                        subView.pokerName = '';
                        poker_item.scaleX = 1.3;
                        this.changeMePokerX(pokerArr, meItemObj);
                        this.showPoint(pokerArr);
                    }
                });
            }
        }

        changeMePokerX(pokerArr, meItemObj) {
            let pokerArrScaleXNo0 = pokerArr.filter(item => item.scaleX != 0);
            if (pokerArrScaleXNo0.length == 3) {
                pokerArrScaleXNo0.forEach((item, index) => {
                    item.x = meItemObj.mePokerX_3[index].x;
                });
            } else if (pokerArrScaleXNo0.length == 2) {
                pokerArrScaleXNo0.forEach((item, index) => {
                    item.x = meItemObj.mePokerX_2[index].x;
                });
            } else if (pokerArrScaleXNo0.length == 4) {
                pokerArrScaleXNo0.forEach((item, index) => {
                    item.x = meItemObj.mePokerX_4[index].x;
                });
            }
        }

        /**
         * 确认分牌
         */
        confrimSubResult() {
            if (this._subPokerResult) {
                this._playerArray.forEach(item_player => {
                    if (item_player.owner.isMe) {
                        item_player.showActionTip(true, 6);
                        item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                    }
                });
                this.onSend({
                    name: 'M.Games.CX.C2G_AssignPoker',
                    data: {
                        roomId: this.roomId,
                        poker: this._subPokerResult
                    },
                    success(res) {
                        this.dealSoketMessage('收到分牌结果:', res);
                    }
                });
            }
        }

        /**
         * 玩家输赢收金币效果
         */
        playerWinUp(data) {
            this._winUpINDEX = 0;
            let joinNum = data.players.filter(item => item.losewin >= 0);
            this.reloadPlayerMoreZT();
            data.players.forEach((item_data, item_index) => {
                this._playerArray.forEach(item_player => {
                    if (item_data._id == item_player.owner.userId) {
                        if (item_data.assignPoker.length != 0) {
                            this.startAssignPoker(false);
                            this.assignPokerCountDown(false);
                            item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                            let returnData1 = [item_data.assignPoker[0], item_data.assignPoker[1]];
                            let returnData2 = [item_data.assignPoker[2], item_data.assignPoker[3]];
                            let point1 = CountPoint$1.countPoint(item_data.assignPoker[0], item_data.assignPoker[1]);
                            let point2 = CountPoint$1.countPoint(item_data.assignPoker[2], item_data.assignPoker[3]);
                            item_player.showPlayerSubResult(true, { sub1: { data: returnData1, point: point1 }, sub2: { data: returnData2, point: point2 } });
                        }
                        if (item_data.showPoker.length > 0) {
                            item_player.showPlayerXiuView(true, item_data.showPoker);
                        }
                        setTimeout(() => {
                            item_player.showActionTip(false, null);
                            item_player.showOrHidePlayerXiaZhuView(false);
                            item_player.showMoveCM(this, 2, true, this._moveCMSeat.show, this._moveCMSeat.pi, this._music.moveMangOrPi, joinNum.length, this.gameEndMoveCMEnd, [data.players]);
                        }, 400);
                    }
                });
            });

        }

        gameEndMoveCMEnd(data) {
            Main$1.$LOG('移动结束', data);
            this._winUpINDEX = 0;
            let playerLoselg0 = data[0].filter(item => item.losewin >= 0);
            setTimeout(() => {
                data[0].forEach(item_data => {
                    this._playerArray.forEach(item_player => {
                        if (item_data._id == item_player.owner.userId) {
                            this.showDiChiPi(false);
                            if (item_data.losewin >= 0) {
                                item_player.showMoveCM(this, 2, true, this._moveCMSeat.pi, this._moveCMSeat.one, this._music.moveMangOrPi, playerLoselg0.length, getMonenyEnd);
                                function getMonenyEnd() {
                                    Main$1.$LOG('玩家受到金币：', item_data.score);
                                    // item_player.changePlayerScore(item_data.score, this._changeScoreType.seat);
                                    this.updatePlayerMoreData(data[0]);
                                }
                            }
                            if (item_data.mang > 0) {
                                let lastMang = this._totalMango - item_data.mang;
                                if (lastMang <= 0) {
                                    this.showDiChiMang(false);
                                }
                                Main$1.$LOG('进来芒:', lastMang);
                                this.bindDiChiMangVal(lastMang);
                            }
                        }
                    });
                });
            }, 1000);
        }

        /**
         * 更新玩家的分数
         */
        updatePlayerMoreData(data) {
            data.forEach(item_data => {
                this._playerArray.forEach(item_player => {
                    if (item_data._id == item_player.owner.userId) {
                        item_player.changePlayerScore(item_data.score, this._changeScoreType.seat);
                    }
                    if (item_data._id == item_player.owner.userId && item_data.losewin > 0 && item_data._id != this.userId) {
                        item_player.playerSeatAddRotationGif(true);
                    }
                    if (item_data._id == item_player.owner.userId && item_data.losewin > 0) {
                        item_player.showPlayerLastWinScore(true, '+' + item_data.losewin);
                    }
                });
                if (item_data._id == this.userId && item_data.losewin > 0) {
                    this.meAnimationZT(true, Main$1.animations.win, this._music.YouWin);
                }
            });
        }

        //玩家离开回收芒效果
        recyclingMang(data) {
            this._winUpINDEX = 0;
            let num = 0;
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == data.userId) {
                    Main$1.$LOG('进来回收=======================0');
                    item_player.showMoveCM(this, 1, true, this._moveCMSeat.mang, this._moveCMSeat.one, this._music.moveMangOrPi, 1);
                    this.showDiChiMang(false);
                } else {
                    num++;
                    if (num == this._playerArray.length)
                        this.showDiChiMang(false);
                }
            });
        }

        /**
         * 游戏结束，马上开始下一轮
         */
        roundEnd() {
            this._playerArray.forEach(item_player => {
                item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                item_player.showPlayerSubResult(false, null);
                item_player.showActionTip(false);
                item_player.showPlayerSubResult(false);
                item_player.showOrHidePlayerXiaZhuView(false);
                item_player.showOrHidePlayerXiuSign(false);
                item_player.showPlayerXiuView(false);
                item_player.playerSeatAddRotationGif(false);
                item_player.showPlayerLastWinScore(false);
            });
            this.meAnimationZT(false, Main$1.animations.win);
        }

        /**
         * 占座处理
         * @param data 数据
         * @param isUpdate 是否是刷新状态
         */
        playerSeatAt(data, isUpdate) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.seatId == data.seatidx) {
                    this.keepMeSeatIndex(data, data.seatidx);
                    item_player.playerSeatDownOrSeatAtCommon(true, data);
                    item_player.playerSeatAtSetContent(data);
                }
            });
        }

        // 坐下处理
        playerSeatDown(data, isUpdate) {
            this._playerArray.forEach(item_player => {
                if (item_player.owner.seatId == data.seatidx) {
                    this.keepMeSeatIndex(data, data.seatidx);
                    item_player.playerSeatDownOrSeatAtCommon(false, data);
                    item_player.playerSeatDownSetContent(data);
                }
            });
        }

        /**
         * 保存站位或坐下的位置index
         * @param {*} data 
         */
        keepMeSeatIndex(data, val) {
            if (data.userId == this.userId)
                this._seatIndex = val;//带入的时候需要用
        }

        //玩家起立处理
        playerSeatUp(data) {
            Main$1.$LOG('玩家起立：', data);
            data.userId = data.userid;
            this._playerArray.forEach(item_player => {
                if (item_player.owner.userId == data.userid) {
                    this.keepMeSeatIndex(data, null);
                    item_player.playerSeatUpSetContent(data);
                    item_player.showBanker(false);
                    item_player.showActionTip(false, null);
                    item_player.showOrHidePlayerXiaZhuView(false);
                    if (data.userid == this.userId) {
                        this.showMakeUpBoBo(false);
                        item_player.reloadPlayerPokerZT(false, [1, 2, 3, 4]);
                    }
                }
            });
        }

        /**
         * 获取玩家信息
         */
        getPlayerNews() {
            console.log('激励理论绿');
        }


        /**
         * 打开实时战绩或牌局回顾
         */
        openSceneView(url) {
            if (this.roomId && Main$1.userInfo.userId)
                Main$1.$openScene(url, false, {
                    userId: Main$1.userInfo.userId,
                    roomId: this.roomId
                });
        }

        /**
         * 打开菜单选项
         */
        openMenuList(show) {
            this._allowSeatUp = false;
            let showObj = this.owner.menu;
            let maskAlpha = 0.2;
            let y = show ? 0 + Main$1.phoneNews.statusHeight : -this.owner.menu.height;
            this.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
        }

        /**
         * 游戏中菜单点击补充钵钵
         */
        playerAddBOBOSend(index) {
            this._allowSeatUp = false;
            if (this._seatIndex == null) {
                this._allowSeatUp = true;
                this.owner.showTips('您当前为观战模式,无法添加钵钵!');
            } else {
                this.getPlayerUsableScore((res) => {
                    this.showMakeUpBoBo(true);
                });
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
                    uid: this.userId
                },
                success(res) {
                    if (res.data.ret.type == 0) {
                        this._usableScore = res.data.score;
                        let data = { score: res.data.score };
                        fn.call(that, data);
                    } else {
                        this.owner.showTips(res.data.ret.msg);
                    }
                },
                fail() {
                    this._allowSeatUp = true;
                    this.owner.showTips('网络异常');
                }
            });
        }

        /**
         * 补充钵钵(占座带入)
         */
        showMakeUpBoBo(show, type) {
            let showObj = this.owner.makeUp_bobo;
            if (showObj.visible && type == 'hand') {//手动关闭
                if (this._allowSeatUp)
                    this.playerSeatUpSend();
            }
            if (show)
                this.getPlayerUsableScore((res) => {
                    this.setBOBO();
                });
            let maskAlpha = 0;
            let y = show ? Laya.stage.height / 2 : -this.owner.makeUp_bobo.height;
            this.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
        }

        // 确认带入钵钵
        makeUpBoBoConfirmDaiRu() {
            let daiRuScore = this.owner.bobo_daiRuScore.text;
            if (this._allowSeatUp) {
                this.onSend({
                    name: 'M.Room.C2R_SitDown',
                    data: {
                        roomid: this.roomId,
                        idx: this._seatIndex,
                        score: daiRuScore
                    },
                    success(res) {
                        this.dealSoketMessage('补充钵钵确认带入', res);
                    }
                });
            } else {
                this.onSend({
                    name: 'M.Room.C2R_AddDairu',
                    data: {
                        roomid: this.roomId,
                        idx: this._seatIndex,
                        score: daiRuScore
                    },
                    success(res) {
                        this.dealSoketMessage('补充钵钵：', res);
                    }
                });
            }
        }

        /**
         * 补充钵钵后处理
         */
        playerAddDairu(data) {
            this._playerArray.forEach(item_player => {
                if (data.userId == item_player.owner.userId) {
                    item_player.setAddDaiRuScore(data);
                    if (data.userId == this.userId)
                        this.showMakeUpBoBo(false);
                }
            });
        }

        /**
         * 补充钵钵(占座)的时候获取玩家信息
         */
        playerNews(data) {
            this._usableScore = data.score;//可用积分
        }

        /**
         * 设置钵钵带入中的滑动选择事件，已经值的初始化
         */
        setBOBO() {

            this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu;
            this.owner.bobo_ID.text = this.userId;
            this.owner.bobo_fuwufei.text = this.owner.bobo_daiRuScore.text * (1 / 10);
            this.owner.bobo_trueScore.text = this._usableScore;
            let showObj = this.owner.makeUp_bobo;
            let boboSliderView = showObj.getChildByName("sliderView");
            let slider_btn = boboSliderView.getChildByName("slider_btn");
            let SCALE = boboSliderView.width / 5;
            Main$1.$slider(boboSliderView, slider_btn, this, (res) => {
                if (res >= 0 && res < SCALE * 1) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 1;
                } else if (res >= SCALE * 1 && res < SCALE * 2) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 2;
                } else if (res >= SCALE * 2 && res < SCALE * 3) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 3;
                } else if (res >= SCALE * 3 && res < SCALE * 4) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 4;
                } else if (res >= SCALE * 4 && res < SCALE * 5) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 5;
                } else if (res == SCALE * 5) {
                    this.owner.bobo_daiRuScore.text = this._gameRoomeNews.dairu * 6;
                }
                this.owner.bobo_fuwufei.text = this.owner.bobo_daiRuScore.text * (1 / 10);
            });
        }



        // 起立请求
        playerSeatUpSend() {
            this.onSend({
                name: 'M.Room.C2R_SeatUp',
                data: {
                    roomid: this.roomId
                },
                success(resData) {
                    Main$1.$LOG('起立请求', resData);
                    if (resData.ret.type == 0) {
                        this.playerSeatUp(resData);
                    } else {
                        this.owner.showTips(resData.ret.msg);
                    }
                }
            });
        }

        //离开房间
        playerLeaveRoomSend() {
            this.onSend({
                name: 'M.Room.C2R_LeaveRoom',
                data: {
                    roomid: this.roomId
                },
                success(res) {
                    this.dealSoketMessage('离开房间：', res);
                }
            });
        }

        /**
         * 离开房间处理
         */
        leaveRoomDeal(data) {
            if (data.userid == this.userId) {
                this.onClose();
                this.leaveRoomOpenView();
            } else {
                this.playerSeatUp(data);
            }
        }

        /**
         * 离开房间打开的界面
         */
        leaveRoomOpenView() {
            Main$1.$openScene('tabPage.scene', true, { page: this.owner._openedData.page });
        }

        /**
         * 打开弹窗公用方法
         */
        openDiaLogCommon(show, showObj, maskAlpha, XORY, XORYVal) {
            if (showObj.visible) {
                setTimeout(() => {
                    showObj.visible = show;
                }, this.openDiaLogSpeed);
            } else {
                showObj.visible = show;
            }
            this.owner._mask.alpha = maskAlpha;
            if (XORY == 'x') {
                Laya.Tween.to(showObj, { x: XORYVal }, this.openDiaLogSpeed);
            } else {
                Laya.Tween.to(showObj, { y: XORYVal }, this.openDiaLogSpeed);
            }
            this.owner._mask.visible = show;
        }

        /**
        * 开始发首牌(第1张牌)
        */
        startDealPoker1And2() {
            let count = this._dealPoker12Array.length;
            this._dealNumber = 0;
            for (let i = 1; i <= 2; i++) {
                this._dealPoker12Array.forEach((item_data, item_index) => {
                    this._playerArray.forEach(item_player => {
                        if (item_player.owner.userId == item_data.uid) {
                            let num = i;//代表第几张牌(1,2,3,4)
                            let index = item_index + ((num - 1) * count);
                            let pokerName = num == 1 ? item_data.poker[0] : item_data.poker[1];
                            item_player.dealPoker(this, num, count, pokerName, index, false, dealPokerEnd);
                            function dealPokerEnd() {
                                if (num == 2) {
                                    Main$1.$LOG('发首牌结束：', num);
                                    this.dealPokerEnd();
                                } else {
                                    this._dealNumber = 0;
                                }
                            }
                        }
                    });
                });
            }
        }

        // 发牌结束(接下来开始显示操作了)
        dealPokerEnd() {
            this._allowStartAction = true;
            // console.log('发牌结束(接下来开始显示操作了)',this._allowStartAction)
            if (this._allowStartAction) {
                this.startAction();//开始显示操作
            }
        }

        /**
         * 秀牌
         * @param {Object} pokerObj 牌对象
         * @param {bool} isShow 是否秀牌
         */
        xiuPoker(pokerObj, isShow) {
            this.onSend({
                name: 'M.Games.CX.C2G_ShowPoker',
                data: {
                    roomId: this.roomId,
                    poker: pokerObj.pokerName,
                    show: isShow
                },
                success(res) {
                    // this.dealSoketMessage('是否秀牌请求返回的结果：',res);
                    if (res.ret.type == 0) {
                        let showSign = pokerObj.getChildByName("xiuSign");
                        showSign.visible = res.show;
                    } else {
                        this.owner.showTips(res.ret.msg);
                    }
                }
            });
        }

        /**
         * 自己的动画状态设置
         */
        meAnimationZT(isShow = true, aniType = Main$1.animations.win, music) {
            if (Main$1.gameSetVal.gameMusic == 1 && music)
                Laya.SoundManager.playSound(music, 1);
            let animationBox = this.owner.meAnimationBox;
            let thisAni = animationBox.getChildByName('meGIF' + aniType);
            if (thisAni) {
                thisAni.removeSelf();
            }
            if (isShow) {
                Laya.loader.load("res/atlas/images/GIF/" + aniType + ".atlas", Laya.Handler.create(this, onMyLoaded));
                function onMyLoaded() {
                    let ani = new Laya.Animation();
                    ani.name = 'meGIF' + aniType;
                    ani.pos(animationBox.pivotX, animationBox.pivotY);
                    ani.loadAnimation("animation/" + aniType + ".ani");
                    animationBox.visible = true;
                    animationBox.addChild(ani);
                    //播放Animation动画
                    ani.play();
                }
            }

        }
    }

    /**
     * 该脚本为了获取玩家个人信息
     */
    class PlayerNews {
        /**
         * 获取个人信息
         * @param {*} isShow 是否显示
         * @param {*} data 需要的数据
         */
        GetNews(isShow = true, data) {
            let that = GameControl.instance;
            if (isShow)
                this.getPageNews(that, data);
            that._allowSeatUp = false;
            this.showObj = that.owner.PlayerNews_dialog;
            let maskAlpha = 0;
            let y = isShow ? (Laya.stage.height - this.showObj.height) / 2 : -this.showObj.height;
            that.openDiaLogCommon(isShow, this.showObj, maskAlpha, 'y', y);
        }
        getPageNews(that, data) {
            HTTP.$request({
                that: this,
                url: '/M.Games.CX/GetSeatUserInfo',
                data: {
                    uid: data.userId,
                    roomid: that.roomId
                },
                success(res) {
                    Main$1.$LOG('获取的玩家个人信息', res);
                    if (res.data.ret.type == 0) {
                        this.setPage(that, res.data);
                    } else {
                        that.owner.showTips(res.data.ret.msg);
                    }
                },
                fail() {
                    that._allowSeatUp = true;
                    that.owner.showTips('网络异常');
                }
            });
        }
        setPage(that, data) {
            let head = this.showObj.getChildByName("news_head_box").getChildByName("news_head");
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
            Main$1.$LoadImage(head, data.head);
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
    var PlyerNews = new PlayerNews();

    /**
     * 该脚本为游戏设置功能
     */
    class GameSet {
        /**
         * 初始化设置
         * @param that 执行域
         */
        initGameSet(that) {
            this.GameUI = that;
            this.GameControl = GameControl.instance;
            this.gameSetRegisterEvent();
            this.setGameView();
            this.getGameSetVal();
        }
        setGameView() {
            let deskView = localStorage.getItem('deskView') ? localStorage.getItem('deskView') : 'desk_bg1';
            Main$1.$LoadImage(this.GameUI.deskView,Main$1.gameView[deskView],Main$1.gameView.desk_bg1,'skin');
            this.GameUI.gameSet_deskViewBox._children.forEach(item => {
                item.getChildByName("desk").getChildByName("selectSign").visible = false;
                if (item.name == deskView) {
                    item.getChildByName("desk").getChildByName("selectSign").visible = true;
                }
            });
        }
        /**
       * 游戏设置注册事件
       */
        gameSetRegisterEvent() {
            this.GameUI.gameSet_deskViewBox._children.forEach(item => {
                item.on(Laya.Event.CLICK, this, this.onClickThisDeskView, [item]);
            });
        }
        onClickThisDeskView(itemObj) {
            localStorage.setItem('deskView', itemObj.name);
            this.setGameView();
        }
        gameSet(show) {
            this.GameControl._allowSeatUp = false;
            let showObj = this.GameUI.gameSet_dialog;
            let maskAlpha = 0;
            let y = show ? (Laya.stage.height - showObj.height) / 2 : -showObj.height;
            this.GameControl.openDiaLogCommon(show, showObj, maskAlpha, 'y', y);
            this.setSwitch();
        }
        setSwitch() {
            this.getGameSetVal();
            let game_music_switchBox = this.GameUI.game_music_switchBox;
            let game_chat_switchBox = this.GameUI.game_chat_switchBox;
            // let game_pangguanChat_switchBox = this.GameUI.game_pangguanChat_switchBox;
            Main$1.$switch(game_music_switchBox, Main$1.gameSetVal.gameMusic, this, (res) => {
                let val = res ? 1 : 0;
                localStorage.setItem('gameMusic', val);
            });
            Main$1.$switch(game_chat_switchBox, Main$1.gameSetVal.chatVoice, this, (res) => {
                // console.log(res)
            });
            // Main.$switch(game_pangguanChat_switchBox, Main.gameSetVal.pangGuanchat, this, (res) => {
            //     // console.log(res)
            // })
        }
        getGameSetVal() {
            Main$1.gameSetVal = {
                gameMusic: localStorage.getItem("gameMusic") ? localStorage.getItem("gameMusic") : 1,
                chatVoice: localStorage.getItem("chatVoice") ? localStorage.getItem("chatVoice") : 1,
                pangGuanchat: localStorage.getItem("pangGuanchat") ? localStorage.getItem("pangGuanchat") : 1
            };
        }
    }
    var GameSet$1 = new GameSet();

    /**
    * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
    * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
    * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
    */
    class GameUI extends Laya.Scene {
        constructor() {
            super();
            /** @prop {name:CM,tips:"丢-筹码预制体",type:Prefab}*/
            //设置单例的引用方式，方便其他类引用
            GameUI.instance = this;
            //关闭多点触控，否则就无敌了
            // Laya.MouseManager.multiTouchEnabled = false;
            //加载场景文件
            // this.loadScene("cheXuanGame_8.scene");
        }
        
        onAwake(){
        }

        onOpened(data) {
            this.zOrder = 9;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this._openedData = data;
            Main$1.$LOG('打开游戏界面接受到的参数：', this._openedData);
            GameSet$1.initGameSet(this);
            this.setUISite();
        }

        /**
         * 设置UI的位置
         */
        setUISite(){
            this.TOPHandleBtnBox.top=Main$1.phoneNews.statusHeight;
        }

        /**
         * 显示提示框
         */
        showTips(msg = 'null') {
            this.tipsBox._children = [];
            let tip = new Laya.Sprite();
            let text = new Laya.Text();
            text.text = msg;
            tip.addChild(text);
            text.color = '#FFFFFF';
            text.fontSize = 40;
            text.width = 720;
            text.height = 110;
            text.align = 'center';
            text.valign = 'middle';
            tip.loadImage('res/img/tip.png', Laya.Handler.create(this, loadImgEnd));
            function loadImgEnd() {
                this.tipsBox.addChild(tip);
            }
            tip.width = 720;
            tip.height = 110;
            setTimeout(() => {
                Laya.Tween.to(tip, { y: -300 }, 600, null, Laya.Handler.create(this, this.tipMoveEnd, [tip]));
            }, 100);
        }
        tipMoveEnd(tipObj) {
            Laya.Tween.to(tipObj, { alpha: 0 }, 300, null, Laya.Handler.create(this, this.tipAlphaEnd, [tipObj]));
        }
        tipAlphaEnd(tipObj) {
            tipObj.removeSelf();
        }
        onAwake() {
            Main$1.$LOG('GameUI：', this);
        }
        onEnable() {
            this.loadMenuContent();
            // this.gameSetRegisterEvent();
            this._confirmDaiRuBtn = this.makeUp_bobo.getChildByName("confirmDaiRuBtn");
            this._control = this.getComponent(GameControl);
            this.start_game_btn.on(Laya.Event.CLICK, this, this.onClickStartBtn);//游戏开始事件
            this.confrimSubBtn1.on(Laya.Event.CLICK, this, this.onClickConfrimSubBtn1);//确认分牌事件
            this.ExpressionUI.on(Laya.Event.CLICK, this, this.onClickExpression);//表情
            this._mask.on(Laya.Event.CLICK, this, this.onClickMask);//蒙板
            this.menuBtnUI.on(Laya.Event.CLICK, this, this.onClickMenuBtn);//左上方菜单
            this.nowPaiJuUI.on(Laya.Event.CLICK, this, this.onClickNowPaiJuBtn);//实时战绩
            this.paiJuHuiGuBtnUI.on(Laya.Event.CLICK, this, this.onClickPaijuhuiguBtn);//牌局回顾
            this._confirmDaiRuBtn.on(Laya.Event.CLICK, this, this.onClickConfirmDaiRuBtn);//补充钵钵确认带入
            this.bobo_close.on(Laya.Event.CLICK, this, this.onClickMask);//补充钵钵关闭按钮关闭
            this.gameSet_close.on(Laya.Event.CLICK, this, this.onClickMask);//牌局设置关闭按钮关闭
            this.voiceBtnUI.on(Laya.Event.CLICK, this, this.onClickVoiceBtn);
            // this.delayTimeBtn.on(Laya.Event.CLICK, this, this.onClickDelayTime);
        }
        /**
         * 玩家延时
         */
        // onClickDelayTime(){
        //     // PlayerDelayTime.delayTime();
        // }
        /** 
         * 开始游戏
        */
        onClickStartBtn() {
            this._control.clickStartGame();
        }

        onClickVoiceBtn() {
            this._control.ceShi();
        }

        /**
         * 确认分牌
         */
        onClickConfrimSubBtn1() {
            this._control.confrimSubResult();
        }

        /**
         * 表情
         */
        onClickExpression(msg) {
            this.showTips('旁观者不能发表情!');
        }

        //补充钵钵(确认带入)    
        onClickConfirmDaiRuBtn() {
            this._control.makeUpBoBoConfirmDaiRu();

        }

        /**
         * 所有弹框的蒙板事件
         */
        onClickMask() {
            this._control.showMakeUpBoBo(false, 'hand');
            this._control.openMenuList(false);
            GameSet$1.gameSet(false);
            PlyerNews.GetNews(false);
            GameControl.instance._allowSeatUp = true;
        }

        onClickMenuBtn() {
            this._control.openMenuList(true);
        }

        //实时战绩    
        onClickNowPaiJuBtn() {
            this._control.openSceneView('shishizhanji.scene');
        }

        // 牌局回顾
        onClickPaijuhuiguBtn() {
            this._control.openSceneView('paijuhuigu.scene');
        }

        /**
         * 加载菜单内容
         */
        loadMenuContent() {
            let _menuList = this.menu.getChildByName('menuList');
            _menuList.array = [
                { id: 1, imgUrl: 'res/img/menu/menu_1.png' },
                { id: 2, imgUrl: 'res/img/menu/menu_2.png' },
                { id: 3, imgUrl: 'res/img/menu/menu_3.png' },
                { id: 4, imgUrl: 'res/img/menu/menu_4.png' },
                { id: 5, imgUrl: 'res/img/menu/menu_5.png' },
                { id: 6, imgUrl: 'res/img/menu/menu_6.png' },
                { id: 7, imgUrl: 'res/img/menu/menu_7.png' },
            ];
            // _menuList.vScrollBarSkin = "";//运用滚动
            _menuList.renderHandler = new Laya.Handler(this, this.menuOnRender);
            _menuList.mouseHandler = new Laya.Handler(this, this.menuOnClick);
        }
        /**
         * 为列表赋上相应的内容
         * @param {*} cell 返回的对象
         * @param {*} index 返回的索引
         */
        menuOnRender(cell, index) {
            // console.log(cell)
            let menuContent = cell.getChildByName("menu_row_node").getChildByName("listContent");
            menuContent.skin = cell.dataSource.imgUrl;
            if (cell.dataSource.id == 7) {
                let menuLine = cell.getChildByName("menu_row_node").getChildByName("line");
                menuLine.removeSelf();
            }
        }

        /**
        * 为列表的选项绑定事件
        * @param {*} Event 返回的对象
        * @param {*} index 返回的索引
        */
        menuOnClick(Event, index) {
            if (Event.type == 'click') {
                // console.log(Event.target)
                let ID = Event.target.dataSource.id;
                if (ID == 2) {
                    this._control.openMenuList(false);
                    // this._control.openPaiJuGuiZe(true);
                    Laya.Scene.open('paijutishi.scene', false,{show:true});
                } else if (ID == 1) {
                    this._control.openMenuList(false);
                    this._control.playerSeatUpSend();
                } else if (ID == 7) {
                    this._control.openMenuList(false);
                    this._control.playerLeaveRoomSend();
                } else if (ID == 4) {
                    this._control.openMenuList(false);
                    this._control.playerAddBOBOSend();
                } else if (ID == 3) {
                    this._control.openMenuList(false);
                    // this._control.gameSet(true);
                    GameSet$1.gameSet(true);
                } else if (ID == 6) {
                    this._control.openMenuList(false);
                    this._control.beackRoom();
                }else if (ID == 5) {
                    this._control.onClose();
                }
            }
        }
    }

    let _num3 = 0;
    class seat extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this._mask = new Laya.Sprite();
        }

        onEnable() {
            this.jionNum = 0;
            this._showSubBox = false;
            //设置单例的引用方式，方便其他类引用
            seat.instance = this;
            this._userId = '';
            this._isMe = false;
        }


        onDisable() {
        }

        onStart() {
            MyCenter$1.send("seat", this);
            this.owner.on(Laya.Event.CLICK, this, this.mouseHandler);
        }

        // 点击某个位置
        mouseHandler(e) {
            // 显示补充钵钵
            if (e.target.userId == '')
                GameControl.instance.onSend({
                    name: 'M.Room.C2R_SeatAt',
                    data: {
                        roomid: GameControl.instance.roomId,
                        idx: e.target.seatId
                    },
                    success(res) {
                        GameControl.instance.dealSoketMessage('占位：', res);
                        if (res.ret.type == 0) {
                            let click_seat_index = e.target.index;
                            GameControl.instance.changeSeatXY(click_seat_index, GameControl.instance._speed.changeSeatSpeed);
                        }
                    }
                });
        }

        /**
         * 玩家占座设置内容
         * @param {*} lastTime 剩余时间
         * @param {*} data 需要的参数
         */
        playerSeatAtSetContent(data) {
            let lastTime = data.seatAtTime - Main$1.getTimeChuo();//占座剩余时间
            if (lastTime > data.totalTime) {
                lastTime = data.totalTime;
            }
            let scoreBox = this.owner.getChildByName("score");
            scoreBox.visible = true;
            let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
            scoreVal.text = '等待' + lastTime + 's';
            if (this.owner.timeID)
                clearInterval(this.owner.timeID);
            this.owner.timeID = setInterval(() => {
                lastTime--;
                scoreVal.text = '等待' + lastTime + 's';
                if (lastTime == 0) {
                    clearInterval(this.owner.timeID);
                }
            }, 1000);
        }

        /**
         * 玩家坐下设置内容
         * @param {*} data 需要的参数
         */
        playerSeatDownSetContent(data) {
            this.playerSeatDownRegisterEvent();
            if (this.owner.timeID) {
                clearInterval(this.owner.timeID);
            }
            let scoreBox = this.owner.getChildByName("score");
            let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
            scoreBox.visible = true;
            scoreVal.text = data.score;
            this.owner.curXiaZhuScore = 0;
        }

        /**
         * 玩家坐下注册点击事件
         */
        playerSeatDownRegisterEvent(){
            this.owner.getChildByName("head-box").on(Laya.Event.CLICK,this,this.getPlayerNews);
        }
        /**
         * 玩家离开去除点击事件
         */
        playerSeatUpOffEvent(){
            this.owner.getChildByName("head-box").off(Laya.Event.CLICK,this,this.getPlayerNews);
        }
        /**
         * 获取玩家个人信息
         */
        getPlayerNews(){
            let data={
                userId:this.owner.userId
            };
            PlyerNews.GetNews(true,data);
        }

        /**
         * 占座或坐下公共设置
         * @param {*} isShow 剩余时间
         * @param {*} data 剩余时间
         */
        playerSeatDownOrSeatAtCommon(isShow, data, isUpdate) {
            let headBox = this.owner.getChildByName("head-box");
            let headImg = headBox.getChildByName("headImgBox");
            let name = this.owner.getChildByName("name");
            headBox.visible = true;
            Main$1.$LoadImage(headImg, data.head, Main$1.defaultImg.one, 'skin');
            this.owner.userId = data.userId;
            if (data.userId == GameControl.instance.userId) {
                name.text = '';
                // console.log('进来000')
                // if (isUpdate)
                //     GameControl.instance.changeSeatXY(this.owner.index, 0);//调整位置
                this.owner.isMe = true;
                GameControl.instance.showMakeUpBoBo(isShow);
            } else {
                name.text = data.name;
                this.owner.isMe = false;
            }
        }

        /**
         * 玩家起立设置内容
         * @param {*} data 需要参数
         */
        playerSeatUpSetContent(data) {
            this.playerSeatUpOffEvent();
            let headBox = this.owner.getChildByName("head-box");
            let headImg = headBox.getChildByName("headImgBox");
            let scoreBox = this.owner.getChildByName("score");
            let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
            let name = this.owner.getChildByName("name");
            headBox.visible = false;
            scoreBox.visible = false;
            headImg.skin = '';
            scoreVal.text = '';
            this.owner.userId = '';
            if (data.userid == GameControl.instance.userId) {
                this.owner.isMe = false;
            } else {
                name.text = '';
            }
        }

        /**
         * 补充钵钵后变更分数处理
         */
        setAddDaiRuScore(data) {
            let scoreBox = this.owner.getChildByName("score");
            let scoreVal = scoreBox._children[0].getChildByName("scoreVal");
            scoreVal.text = data.score;
        }


        /**如果坐下则开启自己显示牌的位置，如果未坐下则不开启自己显示牌的位置 */
        showOrHideMePokerSeat() {
            this.owner.getChildByName("show_poker_box").visible = this.owner.isMe ? false : true;
            let arr = this.owner.parent._children.filter(item => item.isMe);
            GameUI.instance.show_me_poker_box.visible = arr.length == 0 ? false : true;
        }

        /**
        * 显示某个玩家的操作倒计时
        * @param {number} data 数据
        * @param {Object} isShow 是否显示
        */
        showPlayerCountDown(data, isShow=true) {
            let countDownBox = this.owner.getChildByName("countDownBox");
            countDownBox.visible = isShow;
            if (isShow) {
                this._allTime = data.endTime - data.startTime-1;
                this._rotation = 360 * (((new Date().getTime()/1000 - data.startTime)) / this._allTime);
                this._timeOutFlag = true;
                this._showTimePlayerObj = this.owner;
                this._imgNode = countDownBox.getChildByName("countDown");
                this._imgNode.loadImage('res/img/progress1.png', Laya.Handler.create(this, this.loadImgEnd,[data]));
                this._countDownText = this.owner.getChildByName("countDownBox").getChildByName("timeText");
            } else {
                Laya.timer.clear(this, this.drawPie);
            }
        }

        // 接上
        loadImgEnd(data) {
            // let t1 = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.drawPie, [data]);
        }
        // 接上
        drawPie(data) {
            this._countDownText.text = this._allTime - parseInt(((new Date().getTime() / 1000 -  data.startTime))) + 's';
            if (this._allTime - parseInt(((new Date().getTime()/ 1000 - data.startTime) )) == 5 && this._showTimePlayerObj.isMe) {
                if (this._timeOutFlag) {
                    this._timeOutFlag = false;
                    if (Main$1.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(GameControl.instance._music.subTimeOut, 1);
                    this._imgNode.loadImage('res/img/progress2.png');
                }
            }
            this._rotation = 360 * (((new Date().getTime() / 1000 - data.startTime)) / this._allTime);
            if (this._rotation >= 360) {
                this._rotation = 360;
                Laya.timer.clear(this, this.drawPie);
            }
            this._mask.graphics.clear();
            this._mask.graphics.drawPie(83, 83, 83, this._rotation, 360, '#000000');
            this._imgNode.mask = this._mask;
        }


        /**
         * 修改玩家显示筹码
         * @param {*} that 指向调用的组件对象 
         * @param {*} cmType 
         * @param {*} show 
         * @param {} joinNum 参与的数量
         * @param {*} fn 
         */
        changeShowCM(that, cmType, show = true, joinNum, index, fn) {
            let xiaZhuScoreBox = this.owner.getChildByName("xiaZhuScore");
            xiaZhuScoreBox.visible = show;
            let cm_show_seat = xiaZhuScoreBox.getChildByName("cm_show_seat");
            cm_show_seat.loadImage('res/img/choumaBg' + cmType + '.png', Laya.Handler.create(this, end, [that, joinNum]));
            function end(that, joinNum) {
                // console.log('修改显示筹码：',index+1,joinNum)
                if (index + 1 == joinNum) {
                    if (fn)
                        fn.call(that);
                }
            }
        }


        /**
         * 显示或隐藏玩家秀牌的标志
         * @param isShow 是否显示
         */
        showOrHidePlayerXiuSign(isShow = true) {
            if (this.owner.isMe) {
                let MePokerBox = this.owner.getChildByName("show_me_poker_box");
                let poker1XiuSign = MePokerBox.getChildByName("poker1").getChildByName("xiuSign");
                let poker2XiuSign = MePokerBox.getChildByName("poker2").getChildByName("xiuSign");
                poker1XiuSign.visible = isShow;
                poker2XiuSign.visible = isShow;
            }
        }

        /**
        * 显示或隐藏自己玩家3,4张牌显示的黄色框的标志
        * @param isShow 是否显示
        */
        showOrHidePlayerShowSign(isShow = true) {
            if (this.owner.isMe) {
                let MePokerBox = this.owner.getChildByName("show_me_poker_box");
                let poker1ShowSign = MePokerBox.getChildByName("poker3").getChildByName("showSign");
                let poker2ShowSign = MePokerBox.getChildByName("poker4").getChildByName("showSign");
                poker1ShowSign.visible = isShow;
                poker2ShowSign.visible = isShow;
                if (!isShow)
                    GameControl.instance._allowXiuPoker = false;
            }
        }

        /**
         * 为玩家下注筹码显示处附上相应的下注分数
         * */
        bindPlayerXiaZhuScoreVal(data, type) {
            let xiaZhuScoreVal = this.owner.getChildByName("xiaZhuScore").getChildByName("scoreVal");
            xiaZhuScoreVal.text = type == GameControl.instance._betType.mang == type ? data.mango : data.pi;
            this.owner.curXiaZhuScore = xiaZhuScoreVal.text;
        }

        /**
         * 更新玩家的下注分数以及剩余的分数
         */
        changePlayerScore(data, type) {
            if (GameControl.instance._changeScoreType.seat == type) {
                let lastScore = this.owner.getChildByName("score").getChildByName("scoreVal");
                lastScore.text = data;
            } else if (GameControl.instance._changeScoreType.xiaZhu == type) {
                let xiaZhuScoreVal = this.owner.getChildByName("xiaZhuScore").getChildByName("scoreVal");
                xiaZhuScoreVal.text = data;
                this.owner.curXiaZhuScore = xiaZhuScoreVal.text;
            }
        }

        /**
          * 显示或隐藏玩家的下注显示处
          * @param {bool} show 是否显示
          */
        showOrHidePlayerXiaZhuView(show) {
            let xiaZhuScoreView = this.owner.getChildByName('xiaZhuScore');
            xiaZhuScoreView.visible = show;
        }



        /**
       * 为玩家第1,2张牌绑定数据
       * @param data 牌数据
       * @param type 类型 负责给哪张牌绑数据
       */
        // bindPlayerPokerData(that, data, type, fn, delay = 200) {
        //     if (GameControl.instance._bindPokerData.poker12 == type) {
        //         this.owner.poker12 = data;
        //     } else if (GameControl.instance._bindPokerData.poker3 == type) {
        //         this.owner.poker34[0] = data;
        //     } else if (GameControl.instance._bindPokerData.poker4 == type) {
        //         this.owner.poker34[1] = data;
        //     }
        //     setTimeout(() => {
        //         if (fn)
        //             fn.call(that)
        //     }, delay)
        // }

        /**
         * 显示移动筹码,并初始化位置
         * @param {*} that 指向调用的组件对象 
         * @param {*} cmType 筹码显示类型
         * @param {*} show 显示
         * @param {*} seatXY 初始化位置
         * @param {*} moveXY 移动位置
         * @param {*} music 播放音效
         * @param {} joinNum 参与的数量
         * @param {*} fn 回调函数
         */
        showMoveCM(that, cmType, show = true, seatXY, moveXY, music, joinNum, fn, param) {
            let move_cm = this.owner.getChildByName("create_cm_seat").getChildByName("move_cm");
            move_cm.visible = show;
            switch (seatXY) {
                case GameControl.instance._moveCMSeat.one:
                    move_cm.pos(0, 0);
                    break;
                case GameControl.instance._moveCMSeat.show:
                    move_cm.pos(this.owner._showCMFaceToPlayerXY.x, this.owner._showCMFaceToPlayerXY.y);
                    break;
                case GameControl.instance._moveCMSeat.mang:
                    move_cm.pos(this.owner._mangDiChiFaceToPlayerXY.x, this.owner._mangDiChiFaceToPlayerXY.y);
                    break;
                case GameControl.instance._moveCMSeat.pi:
                    move_cm.pos(this.owner._piDiChiFaceToPlayerXY.x, this.owner._piDiChiFaceToPlayerXY.y);
                    break;
            }
            move_cm.loadImage('res/img/choumaBg' + cmType + '.png', Laya.Handler.create(this, this.moveShowCM, [that, move_cm, moveXY, music, joinNum, fn, param]));
        }

        /**
       * 移动显示的移动筹码
       * @param {*} that 指向调用的组件对象 
       * @param {*} move_cm 筹码对象
       * @param {*} moveXY 移动位置
       * @param {*} joinNumfn 参与的数量
       * @param {*} fn 回调函数
       */
        moveShowCM(that, move_cm, moveXY, music, joinNum, fn, param) {
            let moveSpeed = GameControl.instance._speed.moveCM;
            switch (moveXY) {
                case GameControl.instance._moveCMSeat.one:
                    Laya.Tween.to(move_cm, { x: 0, y: 0 }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]));
                    break;
                case GameControl.instance._moveCMSeat.show:
                    Laya.Tween.to(move_cm, { x: this.owner._showCMFaceToPlayerXY.x, y: this.owner._showCMFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]));
                    break;
                case GameControl.instance._moveCMSeat.mang:
                    Laya.Tween.to(move_cm, { x: this.owner._mangDiChiFaceToPlayerXY.x, y: this.owner._mangDiChiFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]));
                    break;
                case GameControl.instance._moveCMSeat.pi:
                    Laya.Tween.to(move_cm, { x: this.owner._piDiChiFaceToPlayerXY.x, y: this.owner._piDiChiFaceToPlayerXY.y }, moveSpeed, null, Laya.Handler.create(this, moveEnd, [that, move_cm, fn]));
                    break;
            }
            function moveEnd(that, move_cm, fn) {
                move_cm.visible = false;
                GameControl.instance._winUpINDEX++;
                // console.log(GameControl.instance._winUpINDEX,joinNum,fn)
                if (GameControl.instance._winUpINDEX == joinNum) {
                    if (Main$1.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(music, 1);
                    if (fn) {
                        fn.call(that, param);
                    }
                }
            }
        }



        /**
         * 使玩家的牌的数据重置状态(隐藏)
         * @param isShow 是否显示
         * @param isMe 是否是自己
         * @param array 数组中代表牌编号需要改变状态
         */
        reloadPlayerPokerZT(isShow, array) {
            if (array.length == 4) {
                let mePokerBox = this.owner.getChildByName('show_me_poker_box');
                mePokerBox._children.forEach(item => {
                    item.visible = isShow;
                });
            }
            let arr1 = array.filter(item => item == 1 || item == 2);
            let arr2 = array.filter(item => item == 3 || item == 4);
            arr1.forEach(item => {
                let pokerBox = this.owner.getChildByName("deal_cards_seat");
                let poker = pokerBox.getChildByName('poker' + item);
                poker.visible = isShow;
            });
            arr2.forEach(item => {
                let pokerBox = this.owner.getChildByName("deal_cards_seat34");
                let poker = pokerBox.getChildByName('poker' + item);
                poker.visible = isShow;
            });
        }

        onclickPoker12Show(poker12Obj) {
            if (GameControl.instance._allowXiuPoker) {
                poker12Obj.isShow = !poker12Obj.isShow;
                GameControl.instance.xiuPoker(poker12Obj, poker12Obj.isShow);
            }
        }

        /**
         * 发牌
         * @param that 指向
         * @param num 代表第几张牌(从1开始)
         * @param count 参与人的总数
         * @param index 索引
         * @param fn 回调函数
         */
        dealPoker(that, num, count, playerPokerName, index, isUpdate, fn) {
            if (this.owner.isMe) {
                let mePokerBox = this.owner.getChildByName("show_me_poker_box");
                let mePoker = mePokerBox.getChildByName("poker" + num);
                mePoker.visible = true;
                mePoker.alpha = 0;
                mePoker.scaleX = 1;
                mePoker.scaleY = 1;
                mePoker.rotation = 180;
                mePoker.pokerName = playerPokerName;
                // console.log('自己的牌数据：',mePoker)
                let deal_me_cards_seat_xy = mePokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
                mePoker.pos(deal_me_cards_seat_xy.x, deal_me_cards_seat_xy.y);
                mePoker.loadImage('res/img/fightPokerBg.png', Laya.Handler.create(this, this.loadDealMePokerEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]));
                if (num <= 2) {
                    let pokerBox = this.owner.getChildByName("deal_cards_seat");
                    let poker = pokerBox.getChildByName("poker" + num);
                    pokerBox.x = this.owner._diuPokerSeatXY.x;
                    pokerBox.y = this.owner._diuPokerSeatXY.y;
                    pokerBox.rotation = 0;
                    poker.visible = true;
                    poker.alpha = 0;
                    poker.x = num == 1 ? 0 : 20;
                    poker.y = 0;
                    poker.rotation = num == 1 ? -10 : 10;
                    poker.scaleX = 0.5;
                    poker.scaleY = 0.5;
                    mePoker.isShow = false;
                    mePoker.getChildByName("xiuSign").visible = false;
                    mePoker.on(Laya.Event.CLICK, this, this.onclickPoker12Show, [mePoker]);
                } else {
                    mePoker.getChildByName("showSign").visible = false;
                }
            }
            if (!this.owner.isMe) {
                let pokerBox = this.owner.getChildByName("deal_cards_seat");
                {
                    pokerBox.rotation = 0;
                    pokerBox.x = this.owner._diuPokerSeatXY.x;
                    pokerBox.y = this.owner._diuPokerSeatXY.y;
                }
                if (num >= 3) {
                    pokerBox = this.owner.getChildByName("deal_cards_seat34");
                }
                let poker = pokerBox.getChildByName("poker" + num);
                let deal_cards_seat_xy = pokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
                poker.visible = true;
                poker.alpha = 0;
                poker.scaleX = 1;
                poker.scaleY = 1;
                poker.rotation = 180;
                poker.pos(deal_cards_seat_xy.x, deal_cards_seat_xy.y);
                poker.loadImage('res/img/fightPokerBg.png', Laya.Handler.create(this, this.loadDealPokerEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]));
            }
        }


        loadDealMePokerEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
            let delayTime = isUpdate ? 0 : index * (GameControl.instance._speed.moveCard / (parseInt(count / 2) < 1 ? 1 : parseInt(count / 2)));
            Main$1.$LOG('等待时间：', delayTime);
            let alpha = isUpdate ? 0 : 1;
            Laya.Tween.to(mePoker, { alpha: alpha }, 0, null, Laya.Handler.create(this, this.changeMePokerAlphaEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]), delayTime);
        }

        /**
         * 牌图片加载完成后就开始向自己的位置上移动
         */
        loadDealPokerEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
            let delayTime = isUpdate ? 0 : index * (GameControl.instance._speed.moveCard / (parseInt(count / 2) < 1 ? 1 : parseInt(count / 2)));
            Main$1.$LOG('等待时间：', delayTime);
            let alpha = isUpdate ? 0 : 1;
            Laya.Tween.to(poker, { alpha: alpha }, 0, null, Laya.Handler.create(this, this.changePokerAlphaEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]), delayTime);
        }

        changeMePokerAlphaEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
            let x = mePoker.width * 1.3 * num + mePoker.pivotX * 1.3;
            let y = mePoker.pivotY * 1.3;
            if (num <= 2) {
                this.owner.mePokerX_2.push({ x: x });
            }
            if (num == 3) {
                let poker1 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker1');
                let poker2 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker2');
                let x2 = mePoker.width * 1.3 * 1 + mePoker.pivotX * 1.3 - (poker1.width / 2) * 1.3;
                let x3 = mePoker.width * 1.3 * 2 + mePoker.pivotX * 1.3 - (poker2.width / 2) * 1.3;
                Laya.Tween.to(poker1, { x: x2 }, 100);
                Laya.Tween.to(poker2, { x: x3 }, 100);
                x = mePoker.width * 1.3 * num + mePoker.pivotX * 1.3 - (poker1.width / 2) * 1.3;
                this.owner.mePokerX_3 = [{ x: x2 }, { x: x3 }, { x: x }];
            } else if (num == 4) {
                let poker1 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker1');
                let poker2 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker2');
                let poker3 = this.owner.getChildByName('show_me_poker_box').getChildByName('poker3');
                let x2 = mePoker.width * 1.3 * 0 + mePoker.pivotX * 1.3;
                let x3 = mePoker.width * 1.3 * 1 + mePoker.pivotX * 1.3;
                let x4 = mePoker.width * 1.3 * 2 + mePoker.pivotX * 1.3;
                Laya.Tween.to(poker1, { x: x2 }, 100);
                Laya.Tween.to(poker2, { x: x3 }, 100);
                Laya.Tween.to(poker3, { x: x4 }, 100);
                x = mePoker.width * 1.3 * 3 + mePoker.pivotX * 1.3;
                this.owner.mePokerX_4 = [{ x: x2 }, { x: x3 }, { x: x4 }, { x: x }];
            }
            let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
            if (!isUpdate) {
                if (Main$1.gameSetVal.gameMusic == 1) {
                    GameControl.instance.$LOG('进来音效');
                    Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
                }
            }
            Laya.Tween.to(mePoker, { x: x, y: y, scaleX: 1.3, scaleY: 1.3, rotation: 0 }, speed, null, Laya.Handler.create(this, this.moveMeCardEnd, [that, mePoker, num, count, playerPokerName, index, isUpdate, fn]));
        }
        changePokerAlphaEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
            if (num <= 2) {//第一二张牌
                let x = num == 1 ? 0 : 20;
                let rotation = num == 1 ? -10 : 10;
                let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
                if (!isUpdate) {
                    if (Main$1.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
                }
                Laya.Tween.to(poker, { x: x, y: 0, scaleX: 0.5, scaleY: 0.5, rotation: rotation }, speed, null, Laya.Handler.create(this, this.moveCardEnd, [that, poker, count, index, isUpdate, fn]));
            } else {//第三四张牌
                let poker34Box = this.owner.getChildByName("show_poker_box").getChildByName("poker_box");
                let poker34SeatXY = poker34Box.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
                let pokerBox = this.owner.getChildByName("deal_cards_seat34");
                let deal_cards_seat_xy = pokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
                let x = (deal_cards_seat_xy.x - poker34SeatXY.x) + poker.pivotX * 0.9;
                let y = (deal_cards_seat_xy.y - poker34SeatXY.y) + poker.pivotY * 0.9;
                if (num == 4) {
                    x = x + (poker.width / 4);
                    let x2 = (deal_cards_seat_xy.x - poker34SeatXY.x) + poker.pivotX * 0.9 - (poker.width / 4);
                    let poker3 = this.owner.getChildByName("deal_cards_seat34").getChildByName('poker3');
                    Laya.Tween.to(poker3, { x: x2 }, 100);
                }
                let speed = isUpdate ? 0 : GameControl.instance._speed.moveCard;
                if (!isUpdate) {
                    if (Main$1.gameSetVal.gameMusic == 1)
                        Laya.SoundManager.playSound(GameControl.instance._music.dealCards, 1);
                }
                Laya.Tween.to(poker, { x: x, y: y, scaleX: 0.9, scaleY: 0.9, rotation: 0 }, speed, null, Laya.Handler.create(this, this.moveCard3Or4End, [that, poker, num, count, playerPokerName, index, isUpdate, fn]));
            }
        }

        moveMeCardEnd(that, mePoker, num, count, playerPokerName, index, isUpdate, fn) {
            GameControl.instance._dealNumber++;
            if (!isUpdate) {
                if (Main$1.gameSetVal.gameMusic == 1) {
                    GameControl.instance.$LOG('进来音效');
                    Laya.SoundManager.playSound(GameControl.instance._music.fanCards, 1);
                }
            }
            let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
            Laya.Tween.to(mePoker, { scaleX: 0 }, speed, null, Laya.Handler.create(this, this.fanCardMePokerEnd, [mePoker, num, playerPokerName, isUpdate]));
            // console.log(GameControl.instance._dealNumber,count)
            if (GameControl.instance._dealNumber == count) {
                if (fn)
                    fn.call(that);
            }
        }

        fanCardMePokerEnd(mePoker, num, playerPokerName, isUpdate) {
            if (num >= 3) {
                mePoker.getChildByName("showSign").visible = true;
            }
            mePoker.loadImage('res/img/poker/' + playerPokerName + '.png', Laya.Handler.create(this, this.changeMeFanPokerEnd, [mePoker, isUpdate]));
        }

        changeMeFanPokerEnd(mePoker, isUpdate) {
            let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
            Laya.Tween.to(mePoker, { scaleX: 1.3, alpha: 1 }, speed);
        }

        moveCardEnd(that, poker, count, index, isUpdate, fn) {
            GameControl.instance._dealNumber++;
            if (isUpdate && !this.owner.isMe) {
                Laya.Tween.to(poker, { alpha: 1 }, 0);
            }
            if (GameControl.instance._dealNumber == count) {
                if (fn)
                    fn.call(that);
            }
        }

        moveCard3Or4End(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
            GameControl.instance._dealNumber++;
            if (GameControl.instance._dealNumber == count) {
                if (fn)
                    fn.call(that);
            }
            let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
            if (!isUpdate) {
                if (Main$1.gameSetVal.gameMusic == 1)
                    Laya.SoundManager.playSound(GameControl.instance._music.fanCards, 1);
            }
            Laya.Tween.to(poker, { scaleX: 0 }, speed, null, Laya.Handler.create(this, this.fanCardPokerEnd, [that, poker, num, count, playerPokerName, index, isUpdate, fn]));
        }

        fanCardPokerEnd(that, poker, num, count, playerPokerName, index, isUpdate, fn) {
            poker.loadImage('res/img/poker/' + playerPokerName + '.png', Laya.Handler.create(this, this.changeFanPokerEnd, [that, poker, count, index, isUpdate, fn]));
        }

        changeFanPokerEnd(that, poker, count, index, isUpdate, fn) {
            let speed = isUpdate ? 0 : GameControl.instance._speed.fanCard;
            Laya.Tween.to(poker, { scaleX: 0.9, alpha: 1 }, speed);
        }


        /**
         * 玩家操作提示及效果显示
         * @param actionType 操作类型
         * @param isShow  是否显示
         */
        showActionTip(isShow, actionType) {
            let tipsBox = this.owner.getChildByName("tipsBox");
            tipsBox.visible = isShow;
            if (isShow) {
                tipsBox.loadImage('res/img/Action/Action' + actionType + '.png', Laya.Handler.create(this, this.loadTipEnd, [tipsBox]));
                this.owner.actionType = actionType;
            }else{
                this.owner.actionType = null;
            }
        }

        // 接上
        loadTipEnd(tipsBox) {
            let y = tipsBox.y;
            _num3 = 0;
            Laya.timer.frameLoop(2, this, this.TimeEnd, [y, tipsBox]);
        }
        // 接上
        TimeEnd(y, tipsBox) {
            _num3++;
            if (_num3 % 2 == 0) {
                Laya.Tween.to(tipsBox, { y: y + 20 }, 100);
            } else {
                Laya.Tween.to(tipsBox, { y: y }, 100);
            }
            if (_num3 >= 5) {
                Laya.timer.clear(this, this.TimeEnd);
            }
        }

        /**
         * 玩家丢牌后，玩家的状态改变
         */

        /**
         * 玩家丢牌
         * @param isShowPoker 是否显示丢的牌(主要区分自己)
         */
        diuPoker() {
            let diuPokerBox = this.owner.getChildByName('deal_cards_seat');
            if (this.owner.isMe) {
                diuPokerBox.getChildByName('poker1').alpha = 1;
                diuPokerBox.getChildByName('poker2').alpha = 1;
            }
            let diuSeatXY = diuPokerBox.globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2));
            let x = diuSeatXY.x + this.owner._diuPokerSeatXY.x;
            let y = diuSeatXY.y + this.owner._diuPokerSeatXY.y;
            Laya.Tween.to(diuPokerBox, { rotation: 360 }, GameControl.instance._speed.diuRotation);
            Laya.Tween.to(diuPokerBox, { x: x, y: y }, GameControl.instance._speed.diu, null, Laya.Handler.create(this, this.diuMoveEnd, [diuPokerBox]));
        }

        //接上
        diuMoveEnd(diuPokerBox) {
            if (Main$1.gameSetVal.gameMusic == 1)
                Laya.SoundManager.playSound(GameControl.instance._music.diu, 1);
            diuPokerBox.getChildByName('poker1').alpha = 0;
            diuPokerBox.getChildByName('poker2').alpha = 0;
            diuPokerBox.x = this.owner._diuPokerSeatXY.x;
            diuPokerBox.y = this.owner._diuPokerSeatXY.y;
        }


        /**
         * 显示庄的公用方法
         * @param isShow 是否显示
         */
        showBanker(isShow) {
            let banker = this.owner.getChildByName("banker");
            banker.visible = isShow;
        }


        /**
         * 显示玩家的分牌容器(返回结果用的)
         * @param {*} isShow 是否显示
         * @param {*} data 显示的值
         */
        showPlayerSubResult(isShow, data) {
            if (this.owner.isMe) {
                // console.log(data)
                let subBox = this.owner.getChildByName("show_me_sub_poker");
                subBox.visible = isShow;
                if (isShow) {
                    let sub1_children = subBox.getChildByName('sub1')._children;
                    let sub2_children = subBox.getChildByName('sub2')._children;
                    sub1_children.forEach((item, index) => {
                        if (item.name === 'pokerBox') {
                            item.loadImage('res/img/poker/' + data.sub1.data[index] + '.png');
                        } else if (item.name === 'pointBox') {
                            item.getChildByName('pointText').text = data.sub1.point;
                        }
                    });
                    sub2_children.forEach((item, index) => {
                        if (item.name === 'pokerBox') {
                            item.loadImage('res/img/poker/' + data.sub2.data[index] + '.png');
                        } else if (item.name === 'pointBox') {
                            item.getChildByName('pointText').text = data.sub2.point;
                        }
                    });
                }
            } else {
                let subBox = this.owner.getChildByName("sub_poker_box");
                subBox.visible = isShow;
                if (!isShow) {
                    let subBox_me = this.owner.getChildByName("show_me_sub_poker");
                    subBox_me.visible = isShow;
                }
                if (isShow) {
                    let sub1_children = subBox.getChildByName('sub1')._children;
                    let sub2_children = subBox.getChildByName('sub2')._children;
                    sub1_children.forEach((item, index) => {
                        if (item.name === 'pokerBox') {
                            item.loadImage('res/img/poker/' + data.sub1.data[index] + '.png');
                        } else if (item.name === 'pointBox') {
                            item.getChildByName('pointText').text = data.sub1.point;
                        }
                    });
                    sub2_children.forEach((item, index) => {
                        if (item.name === 'pokerBox') {
                            item.loadImage('res/img/poker/' + data.sub2.data[index] + '.png');
                        } else if (item.name === 'pointBox') {
                            item.getChildByName('pointText').text = data.sub2.point;
                        }
                    });
                }
            }
        }

        /**
         * 玩家秀牌
         * @param {*} isShow 是否显示
         * @param {*} data 秀牌的数据
         */
        showPlayerXiuView(isShow, data) {
            let xiuPokerView = this.owner.getChildByName("xiuPokerBox");
            xiuPokerView.visible = isShow;
            if (isShow) {
                let xiuPoker1 = xiuPokerView.getChildByName("xiuPoker1");
                let xiuPoker2 = xiuPokerView.getChildByName("xiuPoker2");
                xiuPoker1.loadImage('res/img/poker/-1.png');
                xiuPoker2.loadImage('res/img/poker/-1.png');
                data.forEach((pokerName, index) => {
                    if (index == 0) {
                        Laya.Tween.to(xiuPoker1, { scaleX: 0 }, GameControl.instance._speed.xiuFan, null, Laya.Handler.create(this, this.xiuPokerFanEnd, [xiuPoker1, pokerName]));
                    } else {
                        Laya.Tween.to(xiuPoker2, { scaleX: 0 }, GameControl.instance._speed.xiuFan, null, Laya.Handler.create(this, this.xiuPokerFanEnd, [xiuPoker2, pokerName]));
                    }
                });
            }
        }
        xiuPokerFanEnd(xiuPokerObj, pokerName) {
            xiuPokerObj.loadImage('res/img/poker/' + pokerName + '.png', Laya.Handler.create(this, this.loadXiuPokerEnd, [xiuPokerObj]));
        }
        loadXiuPokerEnd(xiuPokerObj) {
            xiuPokerObj.getChildByName("showSign").visible = true;
            Laya.Tween.to(xiuPokerObj, { scaleX: 0.7 }, GameControl.instance._speed.xiuFan);
        }

        /**
         * 显示玩家赢的分数
         * @param {*} isShow 是否显示
         * @param {*} data 分数数据
         */
        showPlayerLastWinScore(isShow, data) {
            let winScoreBox = this.owner.getChildByName("winScore");
            winScoreBox.visible = isShow;
            if (isShow) {
                let winScoreText = winScoreBox.getChildByName("value");
                winScoreText.text = '';
                winScoreText.text = data;
            }
        }

        /**
         * 玩家座位上添加帧动画(gif动画)
         * @param {*} isShow 是否显示
         * @param {*} aniType 显示类型
         * @param {*} autoClose 是否自动关闭
         */
        playerSeatAddGif(isShow = true, aniType = Main$1.animations.qiao, autoClose = false) {
            let animationBox = this.owner.getChildByName("gifBox");
            // console.log('playerGIF'+aniType)
            animationBox.visible = isShow;
            let thisAni = animationBox.getChildByName('playerGIF' + aniType);
            if (thisAni) {
                thisAni.removeSelf();
            }
            if (this.aniTimeID) {
                clearTimeout(this.aniTimeID);
            }
            if (isShow) {
                Laya.loader.load("res/atlas/images/GIF/" + aniType + ".atlas", Laya.Handler.create(this, onMyLoaded));
                function onMyLoaded() {
                    let ani = new Laya.Animation();
                    ani.name = 'playerGIF' + aniType;
                    ani.pos(this.owner.pivotX, this.owner.pivotY);
                    ani.loadAnimation("animation/" + aniType + ".ani");
                    animationBox.addChild(ani);
                    //播放Animation动画
                    ani.play();
                    if (autoClose) {
                        this.aniTimeID = setTimeout(() => {
                            animationBox._children = [];
                            animationBox.visible = false;
                            clearTimeout(this.aniTimeID);
                        }, 2000);
                    }
                }
            }
        }

        /**
         * 显示其他玩家的赢的动画
         * @param {*} isShow 是否显示
         */
        playerSeatAddRotationGif(isShow = true) {
            let animationBox = this.owner.getChildByName("gifBox");
            let win = animationBox.getChildByName("WIN");
            let win_img = animationBox.getChildByName("WIN_IMG");
            animationBox.visible = isShow;
            win.visible = isShow;
            win_img.visible=isShow;
            win.rotation = 0;
            if (isShow) {
                Laya.timer.loop(1, this, this.winRotation, [win]);
            } else {
                Laya.timer.clear(this, this.winRotation);
            }
        }
        winRotation(OBJ) {
            OBJ.rotation += 4;
        }
    }

    class commonSet extends Laya.Script {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
        }

        onDisable() {
        }
        onStart(){
            // console.log('设置参数commonSet.js',this.owner)
            CommonSet$1.setLayoutValue(this.owner);//设置适配参数
        }
    }

    class SetHeight extends Laya.Script {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
            this.owner.width=parseInt((this.owner.width/(1242/Laya.stage.width)).toFixed(0));//设置座位适配width
            this.owner.height=parseInt((this.owner.height/(2208/Laya.stage.height)).toFixed(0));//设置座位适配height
        }

        onDisable() {
            
        }
    }

    class login extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this.flag=true;
        }

        onEnable() {
        }

        onStart() {
            this.startLoadPage();
        }

        /**
         * 等待加载图标创建完毕后再加载页面
         */
        startLoadPage() {
            let phone = document.getElementById('phone');
            let pwd = document.getElementById('pwd');
            if (phone && pwd) {
                setTimeout(() => {
                    this.showHideNode(true);
                }, Main$1._speed.page);
                this.textInput = phone;
                this.passwordInput = pwd;
                this.setValue();
            } else {
                this.textInput = this.createInputElement();
                this.passwordInput = this.createInputElement();
                this.textInput.id = 'phone';
                this.passwordInput.id = 'pwd';
                this.textInput.placeholder = '请您输入账号';
                this.passwordInput.placeholder = '请您输入密码';
                this.passwordInput.type = "password";
                Laya.Utils.fitDOMElementInArea(this.textInput, this.owner.phone, 0, 0, this.owner.phone.width, this.owner.phone.height);
                Laya.Utils.fitDOMElementInArea(this.passwordInput, this.owner.pwd, 0, 0, this.owner.pwd, this.owner.pwd.height);
                this.setValue();
                let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (userInfo) {
                    if (userInfo.user && userInfo.pwd && !this.owner.loginState)
                        this.login();
                }
            }
        }

        setValue() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo) {
                this.textInput.value = userInfo.user ? userInfo.user : '';
                this.passwordInput.value = userInfo.pwd ? userInfo.pwd : '';
            }
        }

        createInputElement() {
            let input = Laya.Browser.createElement("input");
            input.style.zIndex = Laya.Render.canvas.zIndex + 1;
            input.autocomplete = 'off';
            Laya.Browser.document.body.appendChild(input);
            return input;
        }

        /**
        * 显示或隐藏input 节点
        * @param {*} show 
        */
        showHideNode(show) {
            if (this.textInput && this.passwordInput) {
                this.textInput.style.display = show ? 'block' : 'none';
                this.passwordInput.style.display = show ? 'block' : 'none';
                if (!show) {
                    this.textInput.disabled = 'disabled';
                    this.passwordInput.disabled = 'disabled';
                } else {
                    this.textInput.removeAttribute("disabled");
                    this.passwordInput.removeAttribute("disabled");
                }
            }
        }

        login() {
            // this.owner.ceshi.text='开始请求！';
            if(this.flag){
                this.flag=false;
                Main$1.showLoading(true);
                let user = this.textInput.value;
                let pwd = this.passwordInput.value;
                if (user == '') {
                    this.flag=true;
                    Main$1.showDialog('账号不能为空!', 1, [this.textInput, this.passwordInput]);
                    Main$1.showLoading(false);
                    return false;
                } else if (pwd == '') {
                    this.flag=true;
                    Main$1.showDialog('密码不能为空!', 1, [this.textInput, this.passwordInput]);
                    Main$1.showLoading(false);
                    return false;
                }
                let jsonObj = {
                    pws: pwd
                };
                jsonObj = escape(JSON.stringify(jsonObj));
                let data = {
                    acc: user,
                    ip: '192.168.0.112',
                    type: 'accpws',//accpws账号密码  phone手机 wechat微信 weibo微博
                    json: jsonObj,
                    devid: 1234
                };
                HTTP.$request({
                    that: this,
                    url: '/M.Acc/Login',
                    data: data,
                    success(res) {
                        
                        // this.owner.ceshi.text='请求成功！';
                        //    console.log(res.data)
                        if (res.data.ret.type == 0) {
                            let data = {
                                user: user,
                                pwd: pwd,
                                userId: res.data.userId,
                                key: res.data.key,
                                inRoomPws: res.data.inRoomPws
                            };
                            this.changeMainUserInfo(data);
                            this.dealWithLoginedView(data);
                        } else {
                            this.flag=true;
                            Main$1.showLoading(false);
                            Main$1.showDialog(res.data.ret.msg, 1, [this.textInput, this.passwordInput]);
                        }
                    },
                    fail() {
                        this.flag=true;
                        Main$1.showLoading(false);
                        this.showHideNode(false);
                        Main$1.showDialog('网络异常!', 1, [this.textInput, this.passwordInput]);
                    }
                });
            }
        }

        /**
         * 登录后将公用的个人信息更新
         */
        changeMainUserInfo(data) {
            localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
            Main$1.userInfo = data;
        }
        /**
         * 处理登录结果(1.主界面 2.游戏界面)
         */
        dealWithLoginedView(data) {
            let pageData = {
                roomPws: data.inRoomPws,
                page: Main$1.pages.page3
            };
            Laya.Scene.open('tabPage.scene', true, pageData, Laya.Handler.create(this, (res) => {
                Main$1.showLoading(false);
                this.showHideNode(false);
                clearTimeout(this.loadTimeID);
                this.flag=true;
            }),Laya.Handler.create(this,()=>{
                this.loadTimeID=setTimeout(()=>{
                    Main$1.showLoading(false);
                    Main$1.$LOG('加载超时！');
                    clearTimeout(this.loadTimeID);
                },10000);
            }));
        }

        /**
         * 注册
         */
        register() {
            Main$1.$openScene('register.scene', false, { page: Main$1.sign.register }, (res) => {
                res.x = Laya.stage.width;
                this.showHideNode(false);
                Laya.Tween.to(res, { x: 0 }, Main$1._speed.page, null, Laya.Handler.create(this, () => {
                    this.owner.removeSelf();
                }));
            });
        }

        /**
         * 修改密码
         */
        changePwd() {
            Main$1.$openScene('register.scene', false, { page: Main$1.sign.changePwd }, (res) => {
                res.x = Laya.stage.width;
                this.showHideNode(false);
                Laya.Tween.to(res, { x: 0 }, Main$1._speed.page, null, Laya.Handler.create(this, () => {
                    this.owner.removeSelf();
                }));
            });
        }

        onDisable() {
        }

        onLoaded() {

        }
    }

    // import MyCenter from '../../common/MyCenter'

    /**
     * 该脚本继承登录页面的场景，为了方便获取UI组件等...
     */
    class Login extends Laya.Scene {
        constructor() {
            super();
        }
        onAwake() {
            this._LoginJS = this.getComponent(login);
            this.login_btn.on(Laya.Event.CLICK, this, this.login);
            this.register_btn.on(Laya.Event.CLICK, this, this.register);
            this.change_btn.on(Laya.Event.CLICK, this, this.change);
            Main$1.createLoading();
            Main$1.getStatusHeight();
            setTimeout(()=>{
                this.ceshi.text=Main$1.phoneNews.statusHeight+';'+Main$1.phoneNews.deviceNews;
            },500);
        }
        onOpened(options) {
            this.opendNumber = 0;
            this.loginState = options ? options : null;
            if (!this.loginState)
                Main$1.beforeLoadScene();
        }
        login() {
            this._LoginJS.login();
        }
        register() {
            this._LoginJS.register();
        }
        change() {
            this._LoginJS.changePwd();
        }
    }

    class setSceneWH extends Laya.Script {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
            this.owner.width = Laya.stage.width;
            this.owner.height = Laya.stage.height;
        }

        onDisable() {
        }
    }

    /**
     * 该脚本继承登录页面的场景，为了方便获取UI组件等...
     */
    class RoomEndUI extends Laya.Scene{
        constructor(){
            super();
        }
        onAwake(){
          
        }
        onOpened(options){
            Main$1.$LOG('房间结束界面所收到的值:',options);
            this._openedData=options;
            this.visible=options.show?options.show:false;
        }
    }

    class roomEnd extends Laya.Script {
        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
            
        }
        onStart(){
            Main$1.$LOG('房间结束脚本：',this.owner._openedData);
            if(this.owner._openedData.show){
                this.owner.zOrder=10;
                this.setPageData(this.owner._openedData.data);
                this.setPageListData(this.owner._openedData.data);
                this.closeSoket();
                this.registerEvent();
            }
        }

        onDisable() {
        }

        /**
         * 设置页面数据
         * @param {*} data 数据
         */
        setPageData(data){
            this.owner.end_userName.text=data.nick+'的牌局'+'['+data.userId+']';
            this.owner.end_timeValue.text = Main$1.secondToDate(data.roomTime);//this.owner.end_headImg.
            Main$1.$LoadImage(this.owner.end_headImg,data.head);
            this.owner.end_headName.text=data.nick;
            this.owner.end_headID.text=data.userId;
            this.owner.end_score.text=data.self_sf;
            this.owner.end_value1.text=data.self_shoushu;
            this.owner.end_value2.text=data.all_shoushu;
            this.owner.end_value3.text=data.all_dairu;
        }

        setPageListData(data){
            let list=this.owner.end_list;
            list.visible=true;
            list.array=data.participant;
            list.vScrollBarSkin = "";
            list.renderHandler = new Laya.Handler(this, this.pageListOnRender);
        }

        pageListOnRender(cell){
            let name=cell.getChildByName("c1");
            let dairu=cell.getChildByName("c2");
            let score=cell.getChildByName("c3");
            name.text=cell.dataSource.nick;
            dairu.text=cell.dataSource.dairu;
            score.text=cell.dataSource.sf;
        }

        registerEvent(){
            
            this.owner.end_close.on(Laya.Event.CLICK,this,this.onClickClose);
        }

        closeSoket(){
            GameControl.instance.onClose();
        }

        onClickClose(){
            Main$1.$openScene('tabPage.scene', true, {page:this.owner._openedData.page});
        }
    }

    class paijuhuiguUI extends Laya.Scene {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this._debug=false;
        }

        onEnable() {
            Main$1.$LOG('牌局回顾场景：',this);
            this.diaLogMask.on(Laya.Event.CLICK,this,this.back);
        }

        back(){
            Laya.Tween.to(this.paijuhuiguBg,{right:-this.paijuhuiguBg.width},150,null,Laya.Handler.create(this,()=>{
                this.removeSelf();
            }));
        }

        onDisable() {
        }

        onOpened(data){
            Main$1.$LOG('打开牌局回顾场景接受所传的参数:',data);
            this.openData=data;
            this.setUI();
        }
        setUI() {
            console.log(this.p_listBox.top);
            let nodeArr=[this.p_hd,this.p_listBox];
            Main$1.setNodeTop(nodeArr);
        }
    }

    class zhanji extends Laya.Script {

        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onEnable() {
        }
        onStart() {
            Main$1.$LOG('组件信息：', this);
            this.setPersonListRowNum();
        }

        onDisable() {
        }

        setPersonListRowNum() {
            let paijuhuiguBg = this.owner.getChildByName("paijuhuiguBg");
            // let ListView = paijuhuiguBg.getChildByName("ListView");
            // let ListViewHeight = ListView.height;
            // this.list = ListView.getChildByName("paiJuList");
            // this.list.repeatY = parseInt(ListViewHeight / 220);
            paijuhuiguBg.right = -paijuhuiguBg.width;
            this.owner.x = 0;
            this.owner.zOrder = 10;
            this.owner.diaLogMask.visible = true;
            Laya.Tween.to(paijuhuiguBg, { right: 0 }, 150, null, Laya.Handler.create(this, this.showEnd));
        }

        // 显示菜单完成
        showEnd() {
            HTTP.$request({
                that: this,
                url: '/M.Games.CX.Ext/Log/GetPokerLog',
                data: {
                    uid: this.owner.openData.userId,
                    roomid: this.owner.openData.roomId,
                    page: 1
                },
                success(res) {
                    if (res.data.ret.type == 0) {
                        this.setPageData(res.data);
                    } else {
                        console.log(res.data.ret.msg);//=========================后加弹框=======================
                    }
                }
            });
            this.owner.preBtn.on(Laya.Event.CLICK, this, this.clickTurn, [1]);
            this.owner.nextBtn.on(Laya.Event.CLICK, this, this.clickTurn, [2]);
        }

        clickTurn(type) {
            if (type == 2) {
                this.owner.preText.text = parseInt(this.owner.preText.text) + 1;
                if (this._LIST.length <= 30) {
                    this.owner.preText.text = this.owner.preText.text > this._LIST.length ? this._LIST.length : this.owner.preText.text;
                } else {
                    this.owner.preText.text = this.owner.preText.text > 30 ? 30 : this.owner.preText.text;
                }
            } else {
                this.owner.preText.text -= 1;
                this.owner.preText.text = this.owner.preText.text < 1 ? 1 : this.owner.preText.text;
                if(this._LIST.length==0){
                    this.owner.preText.text=0;
                }
            }
            this.setList(this.owner.preText.text - 1);
        }

        setPageData(data) {
            Main$1.$LOG('获取牌局回顾数据：', data);
            this.owner.allSSValue.text = data.maxCount;
            this.owner.nextText.text = data.maxCount <= 30 ? data.maxCount : 30;
            this.owner.preText.text = data.maxCount <= 30 ? data.maxCount : 30;
            this._LIST = data.pokerLog;
            this.setList(this._LIST.length - 1);
        }

        setList(index) {
            let list=this.owner.paiJuList;
            list.visible = true;
            list.vScrollBarSkin = "";//运用滚动
            list.array = this._LIST[index];
            list.renderHandler = new Laya.Handler(this, this.listOnRender);
        }

        listOnRender(cell, index) {
            // console.log(cell)
            let personNews = cell.getChildByName("personNews");
            let name = personNews.getChildByName("name");
            let head = personNews.getChildByName("head");
            let zt = personNews.getChildByName("zt");
            let zhuang = personNews.getChildByName("zhuang");
            name.text = cell.dataSource.name;
            Main$1.$LoadImage(head, cell.dataSource.head, Main$1.defaultImg.one);
            zhuang.visible = cell.dataSource.zhuang;
            if (cell.dataSource.opt==2) {
                zt.loadImage('res/img/Status_1.png');
            } else if(cell.dataSource.opt==1){
                zt.loadImage('res/img/Status_0.png');
            }else if(cell.dataSource.opt==0){
                zt.loadImage('');
            }
            let dataView = cell.getChildByName("dataView");
            let mangScore = dataView.getChildByName("mangScore");
            let xiaZhu = dataView.getChildByName("xiaZhu");
            let getScore = dataView.getChildByName("getScore");
            xiaZhu.text = cell.dataSource.xiazhu;
            mangScore.visible = cell.dataSource.mang > 0 ? true : false;
            mangScore.text = cell.dataSource.mang > 0 ? cell.dataSource.mang : 0;
            if (cell.dataSource.sfscore > 0) {
                getScore.text = '+' + cell.dataSource.sfscore;
            } else if (cell.dataSource.sfscore < 0) {
                getScore.text = cell.dataSource.sfscore;
            } else {
                getScore.text = cell.dataSource.sfscore;
            }
            if (getScore.text.indexOf('-') != -1) {
                getScore.color = '#51A97A';
            } else if (getScore.text.indexOf('+') != -1) {
                getScore.color = '#FF0000';
            } else {
                getScore.color = '#916014';
            }

            let userId = cell.dataSource.userId;
            let nosanhuaBox = cell.getChildByName("noSHPokerBox");
            let sanhuaBox = cell.getChildByName("SHPokerBox");
            let leftPoker = nosanhuaBox.getChildByName("leftPoker");
            let rightPoker = nosanhuaBox.getChildByName("rightPoker");
            let sanhua_leftPoker = sanhuaBox.getChildByName("leftPoker");
            let sanhua_rightPoker = sanhuaBox.getChildByName("rightPoker");
            let isSanHua = null;
            let point1Text = '';
            let point2Text = '';
            let left_pointText = leftPoker.getChildByName("pointText");
            let right_pointText = rightPoker.getChildByName('pointText');
            if (cell.dataSource.pokers.length >= 3) {
                isSanHua = CountPoint$1.sanHuaPoker(cell.dataSource.pokers[0].poker, cell.dataSource.pokers[1].poker, cell.dataSource.pokers[2].poker);
                if (cell.dataSource.opt==2 && !isSanHua) {
                    point1Text = CountPoint$1.countPoint(cell.dataSource.pokers[0].poker, cell.dataSource.pokers[1].poker);
                    point2Text = CountPoint$1.countPoint(cell.dataSource.pokers[2].poker, cell.dataSource.pokers[3].poker);
                    left_pointText.text = point1Text;
                    right_pointText.text = point2Text;
                } else if (cell.dataSource.opt!=2) {
                    left_pointText.text = '';
                    right_pointText.text = '';
                }
            }

            cell.dataSource.pokers.forEach((item, index) => {
                if (cell.dataSource.pokers.length == 2) {
                    nosanhuaBox.visible = true;
                    sanhuaBox.visible = false;
                    let pokerName = 'poker' + (index + 1);
                    let poker = leftPoker.getChildByName(pokerName);
                    let poker34 = rightPoker.getChildByName('poker' + (index + 3));
                    let showPokerSign = poker.getChildByName("showPokerSign");
                    poker.loadImage('res/img/poker/' + item.poker + '.png');
                    poker34.loadImage('');
                    showPokerSign.visible = item.isShow;
                    left_pointText.text = '';
                    right_pointText.text = '';
                    let diPaiSign = poker34.getChildByName("sign");
                    diPaiSign.visible = false;
                } else {
                    nosanhuaBox.visible = !isSanHua ? true : false;
                    sanhuaBox.visible = isSanHua ? true : false;
                    if (!isSanHua) {
                        let pokerName = 'poker' + (index + 1);
                        let poker = index <= 1 ? leftPoker.getChildByName(pokerName) : rightPoker.getChildByName(pokerName);
                        let showPokerSign = index <= 1 ? poker.getChildByName("showPokerSign") : null;
                        let diPaiSign = poker.getChildByName("sign");
                        poker.loadImage('res/img/poker/' + item.poker + '.png');
                        if (showPokerSign)
                            showPokerSign.visible = cell.dataSource.opt==2 ? false : item.isShow;
                        diPaiSign.visible = cell.dataSource.opt==2 ? item.isdipoker : false;
                        let poker4 = rightPoker.getChildByName('poker4');
                        if (cell.dataSource.pokers.length == 3)
                            poker4.loadImage('');
                    } else {
                        let pokerName = 'poker' + (index + 1);
                        let poker = index <= 2 ? sanhua_leftPoker.getChildByName(pokerName) : sanhua_rightPoker.getChildByName(pokerName);
                        poker.loadImage('res/img/poker/' + item.poker + '.png');
                    }
                }
            });
        }
    }

    class paijutishiUI extends Laya.Scene {

        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this._debug = false;
        }

        $LOG(...data) {
            if (this._debug)
                console.log(...data);
        }

        onEnable() {
            this.$LOG('实时战绩厂场景：', this);
            this.diaLogMask.on(Laya.Event.CLICK, this, this.back);
        }

        back() {
            Laya.Tween.to(this.paijutishiBg, { x: -Laya.stage.width }, 150, null, Laya.Handler.create(this, () => {
                this.removeSelf();
            }));
        }

        onDisable() {
        }

        onOpened(data) {
            this.openData = data;
            if (!data.show) {
                this.x = -Laya.stage.width;
            }
        }
    }

    class zhanji$1 extends Laya.Script {

        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onEnable() {
        }
        onStart() {
            if (this.owner.openData.show)
                this.setPersonListRowNum();
            Main$1.$LOG('组件信息：', this);
        }

        onDisable() {
        }

        setPersonListRowNum() {
            let paijutishiBg = this.owner.getChildByName("paijutishiBg");
            paijutishiBg.x = -Laya.stage.width;
            this.owner.diaLogMask.visible=true;
            Laya.Tween.to(paijutishiBg, { x: 0 }, 150);
        }
    }

    class register extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        setPageData(options){
            this._pageType=options.page;
            if(options.page==Main$1.sign.register){
                this.owner.title_1.visible=true;
                this.owner.title_2.visible=false;
                this.owner.register_btn.visible=true;
                this.owner.change_btn.visible=false;
            }else if(options.page==Main$1.sign.changePwd){
                this.owner.title_1.visible=false;
                this.owner.title_2.visible=true;
                this.owner.register_btn.visible=false;
                this.owner.change_btn.visible=true;
            }
        }

        onEnable() {
        }
        onStart() {
            setTimeout(() => {
                this.showHideNode(true);
            }, Main$1._speed.page);
        }
        createInputElement() {
            let input = Laya.Browser.createElement("input");
            input.style.zIndex = Laya.Render.canvas.zIndex + 1;
            input.autocomplete='off';
            Laya.Browser.document.body.appendChild(input);
            return input;
        }
        comfirmRegisterOrChange() {
            let that=this;
            let user = this.userInput.value;
            let pwd = this.pwdInput.value;
            let code = this.codeInput.value;
            if (user == "") {
                Main$1.showDialog('手机号不能为空！!',1,[this.codeInput],null);
                return
            } else if (pwd == "") {
                Main$1.showDialog('密码不能为空!',1,[this.codeInput]);
                return
            } else if (code == "") {
                Main$1.showDialog('验证码不能为空!',1,[this.codeInput]);
                return
            }
            let data = {
                name: user,
                pws: pwd,
                code: code
            };
            if(this._pageType==3){
                data = {
                    name: user,
                    now: pwd,
                    code: code
                };
            }
            let url = this._pageType==2?"/M.Acc/Register":"/M.Acc/ModifyPws";
            HTTP.$request({
                that: this,
                url: url,
                data: data,
                success(res) {
                    // console.log(res)
                    if (res.data.ret.type == 0) {
                        let data = {
                            user: user,
                            pwd: pwd,
                        };
                        localStorage.setItem('userInfo', JSON.stringify(data)); //转化为JSON字符串)
                        if(this._pageType==2){
                            Main$1.showDialog('注册成功,返回登录',1,[this.codeInput],()=>{
                                that.back();
                            },null,null,false);
                        }else{
                            Main$1.showDialog('修改成功',1,[this.codeInput]);
                        }
                    } else {
                        Main$1.showDialog(res.data.ret.msg,1,[this.codeInput]);
                    }
                },
                fail(){
                    Main$1.showDialog('网络异常!',1,[this.codeInput]);
                }
            });
        }

        createNode() {
            this.userInput = this.createInputElement();
            this.pwdInput = this.createInputElement();
            this.codeInput = this.createInputElement();
            this.userInput.id = 'register_user';
            this.pwdInput.id = 'register_pwd';
            this.codeInput.id = 'register_code';
            this.userInput.placeholder = '请输入手机号';
            this.pwdInput.placeholder = '6-12个字符';
            this.codeInput.placeholder = '请输入验证码';
            this.pwdInput.type = "password";
            Laya.Utils.fitDOMElementInArea(this.userInput, this.owner.user_input_box, 0, 0, this.owner.user_input_box.width, this.owner.user_input_box.height);
            Laya.Utils.fitDOMElementInArea(this.pwdInput, this.owner.pwd_input_box, 0, 0, this.owner.pwd_input_box.width, this.owner.pwd_input_box.height);
            Laya.Utils.fitDOMElementInArea(this.codeInput, this.owner.code_input_box, 0, 0, this.owner.code_input_box.width, this.owner.code_input_box.height);
            this.showHideNode(false);
        }

        /**
         * 显示或隐藏input 节点
         * @param {*} show 
         */
        showHideNode(show) {
            if (this.userInput && this.pwdInput && this.codeInput) {
                this.userInput.style.display = show ? 'block' : 'none';
                this.pwdInput.style.display = show ? 'block' : 'none';
                this.codeInput.style.display = show ? 'block' : 'none';
                if(!show){
                    this.userInput.disabled='disabled';
                    this.pwdInput.disabled='disabled';
                    this.codeInput.disabled='disabled';
                }else{
                    this.userInput.removeAttribute("disabled");
                    this.pwdInput.removeAttribute("disabled");
                    this.codeInput.removeAttribute("disabled");
                }
            }
        }

        back() {
            Laya.Scene.open('login.scene', false, Main$1.sign.signOut, Laya.Handler.create(this, (res) => {
                this.showHideNode(false);
                Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main$1._speed.page, null, Laya.Handler.create(this, () => {
                    this.owner.removeSelf();
                }));
            }));
        }

        onDisable() {
        }

        onLoaded() {

        }
    }

    /**
     * 该脚本继承注册页面的场景，为了方便获取UI组件等...
     */
    class register$1 extends Laya.Scene {
        constructor() {
            super();
        }
        onAwake() {
            this._RegisterJS = this.getComponent(register);
            this.back_btn.on(Laya.Event.CLICK, this, this.back);
            this.register_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
            this.change_btn.on(Laya.Event.CLICK, this, this.comfirmRegisterOrChange);
        }
        onOpened(options) {
            // Main.$LOG('注册或修改密码界面所收到的值:',options);
            // if (options.show) {
            //     this.zOrder = 4;
            //     this._RegisterJS.createNode();
            //     this._RegisterJS.setPageData(options);
            // } else {
            //     this.zOrder = -1;
            // }
            this.zOrder = 4;
            this._RegisterJS.createNode();
            this._RegisterJS.setPageData(options);
        }
        /**
         * 返回登录界面
         */
        back() {
            this._RegisterJS.back();
        }

        /**
         * 确认注册/确认修改
         */
        comfirmRegisterOrChange() {
            this._RegisterJS.comfirmRegisterOrChange();
        }
    }

    class shishizhanjiUI extends Laya.Scene {

        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        onEnable() {
            Main$1.$LOG('实时战绩厂场景：', this);
            this.diaLogMask.on(Laya.Event.CLICK, this, this.back);
        }

        back() {
            Laya.Tween.to(this.shishizhanjiBg, { x: -Laya.stage.width }, 150, null, Laya.Handler.create(this, () => {
                this.removeSelf();
            }));
        }

        onDisable() {
        }

        onOpened(data) {
            Main$1.$LOG('打开实时战绩场景接受所传的参数:', data);
            this.openData = data;
            this.setUI();
        }

        setUI() {
            console.log(this.s_hd.top);
            let nodeArr=[this.s_hd,this.s_bg1,this.s_bg3];
            Main$1.setNodeTop(nodeArr);
        }
    }

    class zhanji$2 extends Laya.Script {

        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onEnable() {
        }
        onStart() {
            Main$1.$LOG('组件信息：', this);
            this.setPersonListRowNum();
        }

        onDisable() {
        }

        setPersonListRowNum() {
            let shishizhanjiBg = this.owner.getChildByName("shishizhanjiBg");
            this.owner.x = 0;
            this.owner.zOrder = 10;
            this.owner.diaLogMask.visible = true;
            shishizhanjiBg.x = -Laya.stage.width;
            Laya.Tween.to(shishizhanjiBg, { x: 0 }, 150, null, Laya.Handler.create(this, this.showEnd));
        }

        // 显示菜单完成
        showEnd() {
            HTTP.$request({
                that: this,
                url: '/M.Games.CX.Ext/Record/RealTimeRecord',
                data: {
                    uid: Main$1.userInfo.userId,
                    roomid: this.owner.openData.roomId
                },
                success(res) {
                    if (res.data.ret.type == 0) {
                        this.setPageData1(res.data.data);
                    } else {
                        console.log(res.data.ret.msg);//=========================后加弹框=======================
                    }
                }
            });
        }

        setPageData1(data) {
            Main$1.$LOG('获取实时战绩的表格1数据：', data);
            if (this.TimeID) {
                clearInterval(this.TimeID);
            }
            this.TimeID = setInterval(() => {
                data.end_time--;
                this.owner.roomLastTime.text = Main$1.secondToDate(data.end_time);
                if (data.end_time == 0) {
                    clearInterval(this.TimeID);
                }
            }, 1000);
            this.owner.allDaiRuValue.text = data.all_dairu;
            this.owner.allGetScore.text = data.all_sf;
            setTimeout(() => {
                this.owner.weiGuanTitle.width = this.owner.weiGuanTitle.getChildAt(0).textWidth;
            });
            this.owner.weiGuanTitle.text = '（' + data.onlooker.length + '）';
            this.setList1(data.dairu);
            this.setList2(data.onlooker);
        }

        setList1(data) {
            let list1 = this.owner.zhanjiList;
            list1.visible = true;
            list1.vScrollBarSkin = "";//运用滚动
            list1.array = data;
            list1.renderHandler = new Laya.Handler(this, this.list1OnRender);
        }

        list1OnRender(cell, index) {
            let name = cell.getChildByName("name");
            let dairu = cell.getChildByName("dairu");
            let score = cell.getChildByName("score");
            name.text = cell.dataSource.nick;
            dairu.text = cell.dataSource.dairu;
            score.text = cell.dataSource.sf;
            if (parseInt(score.text) === 0) {
                score.color = '#935F13';
            } else if (score.text.indexOf('+') != -1) {
                score.color = '#c53233';
            } else if (score.text.indexOf('-') != -1) {
                score.color = '#599E73';
            }
        }

        setList2(data) {
            let list2 = this.owner.PersonList;
            list2.visible = true;
            list2.vScrollBarSkin = "";//运用滚动
            list2.array = data;
            list2.renderHandler = new Laya.Handler(this, this.list2OnRender);
        }

        list2OnRender(cell, index) {
            let name = cell.getChildByName("name");
            let head = cell.getChildByName("headImg");
            Main$1.$LoadImage(head, cell.dataSource.head, Main$1.defaultImg.one, 'skin');
            name.text = cell.dataSource.nick;
        }
    }

    class shopMall extends Laya.Script {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
        }

        onDisable() {
        }
        back() {
            Laya.Scene.open('tabPage.scene', false, {page:Main$1.pages.page5}, Laya.Handler.create(this, (res) => {
                Laya.Tween.to(this.owner, { x: Laya.stage.width }, Main$1._speed.page, null, Laya.Handler.create(this, () => {
                    this.owner.removeSelf();
                }));
            }));
        }
    }

    /**
     * 该脚本继承注册页面的场景，为了方便获取UI组件等...
     */
    class shopMall$1 extends Laya.Scene{
        constructor(){
            super();
        }
        onAwake(){
            this._ShopMallJS=this.getComponent(shopMall);
            this.shop_back_btn.on(Laya.Event.CLICK,this,this.back);
        }
        onOpened(options){
            // Main.$LOG('商城界面所收到的值:',options);
            // this._RegisterJS.createNode();
            // this._RegisterJS.setPageData(options);
        }
        /**
         * 返回登录界面
         */
        back(){
            this._ShopMallJS.back();
        }

        /**
         * 确认注册/确认修改
         */
        comfirmRegisterOrChange(){
            this._RegisterJS.comfirmRegisterOrChange();
        }
    }

    class Me extends Laya.Script {

        constructor() { 
            super(); 
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }
        
        onEnable() {
            Main$1.$LOG('Me脚本：',this);
            Me.instance=this;
           
        }

        openThisPage(){
            if(this.owner.visible){
                this.UI=this.owner.scene;
                this.registerEvent();
                this.requestPageData();
            }
        }

        onDisable() {
           
        }

        registerEvent(){
            this.UI.signOut_btn.on(Laya.Event.CLICK,this,this.openLoginView);
            this.UI.recharge_btn.on(Laya.Event.CLICK,this,this.openShopView);
        }
        openLoginView(){
            Main$1.showDialog('是否退出重新登录?',2,null,comfirmEvent);
            function comfirmEvent(res){
                Main$1.allowGameHallSetInterval=false;
                Laya.Scene.open('login.scene',true,Main$1.sign.signOut);
            }
        }

        /**
         * 打开商城界面
         */
        openShopView(){
            Laya.Scene.open('shoppingMall.scene', false, Main$1.sign.shop, Laya.Handler.create(this, (res) => {
                res.x = Laya.stage.width;
                Laya.Tween.to(res, { x: 0 }, Main$1._speed.page, null, Laya.Handler.create(this, () => {
                    this.owner.removeSelf();
                }));
            }));
        }

        /**
         * 获取页面数据
         */
        requestPageData(){
            let data={
                uid:Main$1.userInfo.userId
            };
            HTTP.$request({
                that: this,
                url: '/M.User/GetInfo',
                data: data,
                success(res) {
                    if (res.data.ret.type == 0) {
                        this.setPageData(res.data);
                    } else {
                        Main$1.showDialog(res.data.ret.msg,1);
                    }
                },
                fail(){
                    this.showHideNode(false);
                    Main$1.showDialog('网络异常!',1);
                }
            });
        }

        setPageData(data){
            Main$1.$LoadImage(this.UI.userHeadImg,data.head,Main$1.defaultImg.one);
            this.UI.userNameValue.text=data.nick;
            this.UI.userIDValue.text=data.userId;
            this.UI.userScoreValue.text=data.score;
            this.UI.me_sex0.visible=data.sex==0?true:false;
            this.UI.me_sex1.visible=data.sex==1?true:false;
        }
    }

    class Notice extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this._page = {
                page1: 'systemNotice',
                page2: 'myNews'
            };


            // this._navType={//游戏大厅页面类型  全部， 小 ，中， 大
            //     all:1,
            //     small:2,
            //     center:3,
            //     big:4
            // }
            // this._selectNavType=1;//选中的类型
        }

        onEnable() {
            Main$1.$LOG('Notice脚本：', this);
            Notice.instance=this;
        }
        openThisPage() {
            if (this.owner.visible) {
                this.UI = this.owner.scene;
                this.openSelectView(this._page.page1);
                this.registerEvent();
                this.openSystemList();
            }
        }

        onDisable() {
        }
        registerEvent() {
            this.UI.systemNotice_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page1]);
            this.UI.myNews_box.on(Laya.Event.CLICK, this, this.openSelectView, [this._page.page2]);
        }
        reloadSelectZt() {
            this.UI.systemNotice.visible = false;
            this.UI.myNews.visible = false;
        }
        openSelectView(page) {
            this.reloadSelectZt();
            this.UI[page].visible = true;
        }

        openSystemList() {
            this.systemList=this.UI.sysytem_list;
            this.systemList.vScrollBarSkin = "";//运用滚动
            this.systemList.array = [
                {
                    imgUrl: 'res/img/Notice/notice1.png'
                },
                {
                    imgUrl: 'res/img/Notice/notice2.png'
                }
            ];
            this.systemList.renderHandler = new Laya.Handler(this, this.systemListOnRender);
        }

        systemListOnRender(cell,index){
            let systemContent=cell.getChildByName("sysytem_content");
            systemContent.skin=cell.dataSource.imgUrl;
        }
    }

    // import TabPagesUI from '../TabPages/TabPagesUI'
    class GameHall extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
            this._navType = {//游戏大厅页面类型  全部， 小 ，中， 大
                all: 1,
                small: 2,
                center: 3,
                big: 4
            };
            this._selectNavType = 1;//选中的类型
        }

        onEnable() {
            Main$1.$LOG('Hall游戏大厅脚本：', this);
            GameHall.instance = this;
        }
        onStart() {
            Main$1.$LOG('onStart', this.UI.pageData);
            // this.openGameView();
        }

        openThisPage() {
            if (this.owner.visible) {
                this.UI = this.owner.scene;
                this.registerEvent();
                this.selectThisTab(this.UI.hall_nav_bg._children[1], 1);//默认选择第一项
                if (Main$1.allowRequesList)
                    Laya.timer.loop(60000, this, this.requestPageData, [false]);
            }
        }



        /**
         * 注册点击事件
         */
        registerEvent() {
            this.UI.hall_nav_bg._children.forEach((item, index) => {
                if (index > 0) {
                    item.on(Laya.Event.CLICK, this, this.selectThisTab, [item, index]);
                }
            });
        }
        /**
         * 重置选中状态
         */
        reloadNavSelectZT() {
            this.UI.hall_nav_bg._children.forEach((item, index) => {
                if (index > 0) {
                    item.getChildByName("btn").visible = false;
                }
            });
        }
        /**
         * 选中当前
         * @param {*} itemObj 选中对象
         */
        selectThisTab(itemObj, pageNum) {
            this.reloadNavSelectZT();
            itemObj.getChildByName("btn").visible = true;
            this._selectNavType = pageNum;
            this.requestPageData(true);
        }

        /**
         * 设置全页面的数据
         */
        setPage1Data(data) {
            let page1List = this.UI.gameHall_page1_list;
            page1List.vScrollBarSkin = "";
            page1List.visible = true;
            page1List.array = data;
            page1List.renderHandler = new Laya.Handler(this, this.page1ListOnRender);
            page1List.mouseHandler = new Laya.Handler(this, this.rowOnClick);
        }
        page1ListOnRender(cell, index) {
            let contentBg = cell.getChildByName("content_bg");
            let roomId = contentBg.getChildByName("roomID").getChildByName("value");
            let pi = contentBg.getChildByName("num1").getChildByName("value");
            let online = contentBg.getChildByName("online").getChildByName("value");
            let time = contentBg.getChildByName("time").getChildByName("value");
            let roomLastTime = contentBg.getChildByName("lastTime").getChildByName("value");
            let state_0 = contentBg.getChildByName("state").getChildByName("state_0");
            let state_1 = contentBg.getChildByName("state").getChildByName("state_1");
            let state_2 = contentBg.getChildByName("state").getChildByName("state_2");
            let state_dairu = contentBg.getChildByName("yidairuState");
            roomId.text = cell.dataSource.roomPws;
            pi.text = cell.dataSource.dizhu;
            online.text = cell.dataSource.participate + '/' + cell.dataSource.number;
            if (cell.dataSource.participate == 0) {
                online.color = '#d59b2a';
            } else if (cell.dataSource.participate > 0 && cell.dataSource.participate < cell.dataSource.number) {
                online.color = '#66ce38';
            } else if (cell.dataSource.participate == cell.dataSource.number) {
                online.color = '#FF0000';
            }
            time.text = cell.dataSource.roomTime + '分钟';
            state_0.visible = cell.dataSource.participate == 0 && !cell.dataSource.gameStatus ? true : false;
            state_1.visible = cell.dataSource.participate > 0 && !cell.dataSource.gameStatus ? true : false;
            state_2.visible = cell.dataSource.gameStatus ? true : false;
            state_dairu.visible = cell.dataSource.dairu ? cell.dataSource.dairu : false;
            let roomEndTime = (cell.dataSource.time - Main$1.getTimeChuo()) < 0 ? 0 : cell.dataSource.time - Main$1.getTimeChuo();
            roomLastTime.text = Main$1.secondToDate(roomEndTime);
        }

        rowOnClick(Event, index) {
            Main$1.$LOG('游戏大厅点击列表0:', Event);
            if (Event.type == 'click') {
                Main$1.$LOG('游戏大厅点击列表:', Event.target, Event.target.dataSource);
                let data = {
                    roomPws: Event.target.dataSource.roomPws,
                    page: Main$1.pages.page3
                };
                Main$1.showLoading(true);
                Main$1.$openScene('cheXuanGame_8.scene', true, data, () => {
                    Main$1.showLoading(false);
                });
            }
        }

        /**
         * 获取页面数据
         * @param isShowLoading 是否显示加载图标
         */
        requestPageData(isShowLoading) {
            if (!Main$1.allowRequesList)
                Laya.timer.clear(this, this.requestPageData, [false]);
            else {
                if (isShowLoading)
                    Main$1.showLoading(true);
                let data = {
                    uid: Main$1.userInfo.userId
                };
                HTTP.$request({
                    that: this,
                    url: '/M.Games.CX/GetRoomList',
                    data: data,
                    success(res) {
                        Main$1.$LOG('获取大厅列表数据：', res);
                        if (isShowLoading)
                            Main$1.showLoading(false);
                        if (res.data.ret.type == 0) {
                            this.dealWithResData(res.data.rooms);
                            this.openGameView();
                        } else {
                            Main$1.showDialog(res.data.ret.msg, 1);
                        }
                    },
                    fail() {
                        if (isShowLoading)
                            Main$1.showLoading(false);
                        Main$1.showDialog('网络异常!', 1);
                    }
                });
            }
        }

        /**
      * 是否打开游戏界面
      */
        openGameView() {
            let data = this.UI.pageData;
            if (data.roomPws && data.roomPws > 0) {
                Main$1.showLoading(true);
                let pageData = {
                    roomPws: data.roomPws,
                    page: Main$1.pages.page3
                };
                Main$1.$openScene('cheXuanGame_8.scene', true, pageData, () => {
                    Main$1.showLoading(false);
                });
            }
        }

        /**
         * 处理请求回来的数据
         * @param {*} data 返回的数据
         */
        dealWithResData(data) {
            let listData = data;
            // console.log(listData.filter(item=>item.dairu).concat(listData.filter(item=>!item.dairu)))
            let getYESdairudata = listData.filter(item => item.dairu);
            let getNOdairudata = listData.filter(item => !item.dairu);
            let getYESdairudata_pi = getYESdairudata.sort(this.compare('dizhu'));
            let getNOdairudata_pi = getNOdairudata.sort(this.compare('dizhu'));
            let getYESdairudata_pi_youkongwei = getYESdairudata_pi.filter(item => item.participate > 0 && item.participate < item.number);
            let getYESdairudata_pi_yiman = getYESdairudata_pi.filter(item => item.participate == item.number);
            let getYESdairudata_pi_kongfangjian = getYESdairudata_pi.filter(item => item.participate == 0);
            let getYESdairudata_pi_lastData = (getYESdairudata_pi_youkongwei.concat(getYESdairudata_pi_yiman)).concat(getYESdairudata_pi_kongfangjian);
            let getNOdairudata_pi_youkongwei = getNOdairudata_pi.filter(item => item.participate > 0 && item.participate < item.number);
            let getNOdairudata_pi_yiman = getNOdairudata_pi.filter(item => item.participate == item.number);
            let getNOdairudata_pi_kongfangjian = getNOdairudata_pi.filter(item => item.participate == 0);
            let getNOdairudata_pi_lastData = (getNOdairudata_pi_youkongwei.concat(getNOdairudata_pi_yiman)).concat(getNOdairudata_pi_kongfangjian);
            listData = getYESdairudata_pi_lastData.concat(getNOdairudata_pi_lastData);
            // console.log(getYESdairudata_pi_lastData.concat(getNOdairudata_pi_lastData))
            if (this._selectNavType == this._navType.all) { //全部
                listData = listData;
                this.setPage1Data(listData);
            } else if (this._selectNavType == this._navType.small) {//小
                listData = listData.filter(item => item.dizhu == 1 || item.dizhu == 5);
                this.setPage1Data(listData);
            } else if (this._selectNavType == this._navType.center) {//中
                listData = listData.filter(item => item.dizhu == 10 || item.dizhu == 20);
                this.setPage1Data(listData);
            } else if (this._selectNavType == this._navType.big) {//大s
                listData = listData.filter(item => item.dizhu == 50 || item.dizhu == 100);
                this.setPage1Data(listData);
            }
        }

        compare(property, desc = true) {
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                if (desc == true) {
                    // 升序排列
                    return value1 - value2;
                } else {
                    // 降序排列
                    return value2 - value1;
                }
            }
        }
    }

    class Data extends Laya.Script {
        constructor() {
            super();
            // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
        }

        onEnable() {
            Main$1.$LOG('Data牌局数据脚本：', this);
            Data.instance = this;
        }

        openThisPage() {
            if (this.owner.visible) {
                this.UI = this.owner.scene;
                // // this.requestPageData();
                this.requestPageData();
            }
        }
        /**
         * 设置全页面的数据
         */
        setPageListData(data) {
            let pageList = this.UI.paiju_data_list;
            pageList.visible=true;
            pageList.vScrollBarSkin = "";
            pageList.array = data;
            pageList.renderHandler = new Laya.Handler(this, this.pageListOnRender);
        }
        pageListOnRender(cell, index) {
            // console.log(cell, index)
            let timeIcon = cell.getChildByName("timeIcon");
            let timeBox = cell.getChildByName("timeBox");
            let month = timeBox.getChildByName("month");
            let day = timeBox.getChildByName("day");
            timeIcon.visible = cell.dataSource.showTime;
            timeBox.visible = cell.dataSource.showTime;
            month.text = cell.dataSource.month;
            day.text = cell.dataSource.day;
            let listBg = cell.getChildByName("list_bg");
            let headNode = listBg.getChildByName("headBox").getChildByName("head");
            let name = listBg.getChildByName("top_title").getChildByName("name");
            let time = listBg.getChildByName("top_title").getChildByName("time");
            let roomID = listBg.getChildByName("roomID").getChildByName("value");
            let pi = listBg.getChildByName("pi").getChildByName("value");
            let dairu = listBg.getChildByName("dairu").getChildByName("value");
            let winScore = listBg.getChildByName("winScore").getChildByName("value");
            Main$1.$LoadImage(headNode, cell.dataSource.head, Main$1.defaultImg.one);
            name.text = cell.dataSource.roomName;
            time.text = cell.dataSource.roomTime;
            roomID.text = cell.dataSource.roomPws;
            pi.text = cell.dataSource.pi;
            dairu.text = cell.dataSource.dairu;
            winScore.text = cell.dataSource.sf;
            if (winScore.text.indexOf('+') != -1) {
                winScore.color = '#FF0000';
            } else if (winScore.text.indexOf('-') != -1) {
                winScore.color = '#8FD900';
            } else {
                winScore.color = '#98999D';
            }
        }

        /**
        * 获取页面数据
        * @param 
        */
        requestPageData() {
            Main$1.showLoading(true);
            let data = {
                uid: Main$1.userInfo.userId
            };
            HTTP.$request({
                that: this,
                url: '/M.Games.CX/GetPlayerRoomData',
                data: data,
                success(res) {
                    // console.log(res)
                    Main$1.showLoading(false);
                    if (res.data.ret.type == 0) {
                        this.dealWithResData(res.data);
                    } else {
                        Main$1.showDialog(res.data.ret.msg, 1);
                    }
                },
                fail() {
                    Main$1.showLoading(false);
                    Main$1.showDialog('网络异常!', 1);
                }
            });
        }

        dealWithResData(data) {
            let listData = data.rooms;
            listData.forEach((item, index) => {
                let time = Main$1.getFormatTime(item.time * 1000);
                // if (index < 3) {
                //     time = {
                //         timeStr: '2019-11-14',
                //         month: 11,
                //         day: 13,
                //         hour: 12,
                //         minutes: 13
                //     }
                // } else {
                //     time = time;
                // }
                item.month = time.month + '月';
                item.day = time.day + '日';
                item.roomTime = time.hour + ':' + time.minutes;
                item.timeStr = time.timeStr;
                item.showTime = true;
                if (index > 0 && (time.timeStr == listData[index - 1].timeStr)) {
                    item.showTime = false;
                }
            });
            this.setPageBaseData(data);
            this.setPageListData(listData);
        }

        /**
         * 设置页面基本数据
         */
        setPageBaseData(data) {
            let totalSs=data.totalSs;
            let totalSs_fenmu=totalSs==0?1:totalSs;
            this.UI.data_winRate.text = parseInt((data.winSs/totalSs_fenmu)*100)+'%';
            this.UI.data_fanpaiRate.text = parseInt((data.fpSs/totalSs_fenmu)*100)+'%';
            this.UI.data_fanpaiwinRate.text =  parseInt((data.fpWinSs/totalSs_fenmu)*100)+'%';
            this.UI.data_changshu.text = data.totalJs;
            this.UI.data_shoushu.text =data.totalSs;
            this.UI.data_winNum.text = data.winSs;
            this.UI.data_pingju.text = data.tieSs;
            this.UI.data_fail.text = data.totalSs-data.winSs-data.tieSs;
        }
    }

    class TabPagesUI extends Laya.Scene {
        constructor() {
            super();
        }
        onOpened(options) {
            Main$1.$LOG('tab页面所收到的值：', options);
            this.pageData = options;
            this.allowSetInterval = true;
            let page = !options.page ? Main$1.pages.page3 : options.page;
            this.openView(page);
        }
        onAwake() {
            Main$1.$LOG('TabPagesUI:', this);
            this.registerEvent();
        }
        /**
         * 注册事件
         */
        registerEvent() {
            this.tab_notice.on(Laya.Event.CLICK, this, this.openView, [Main$1.pages.page1]);
            this.tab_paiju.on(Laya.Event.CLICK, this, this.openView, [Main$1.pages.page2]);
            this.tab_hall.on(Laya.Event.CLICK, this, this.openView, [Main$1.pages.page3, 1]);
            this.tab_data.on(Laya.Event.CLICK, this, this.openView, [Main$1.pages.page4]);
            this.tab_me.on(Laya.Event.CLICK, this, this.openView, [Main$1.pages.page5]);
        }
        /**
         * 切换页面时候先关闭所有页面
         */
        closeAllpages() {
            let allPages = this.pages._children;
            allPages.forEach(item => {
                item.visible = false;
            });
        }
        /**
         * 打开对应的页面
         * @param {*} page 页面对象
         */
        openView(page, type) {
            Main$1.allowRequesList = false;
            this.closeAllpages();
            this[page].visible = true;
            this.reloadNavSelect();
            this.setTabSelect(page);
            if (page === Main$1.pages.page5) {
                Me.instance.openThisPage();
            } else if (page === Main$1.pages.page1) {
                Notice.instance.openThisPage();
            } else if (page === Main$1.pages.page3) {
                Main$1.allowRequesList = true;
                Main$1.allowHideLoad = type == 1 ? true : false;
                GameHall.instance.openThisPage();
            } else if (page === Main$1.pages.page4) {
                Data.instance.openThisPage();
            }
        }

        /**
         * 重置下面导航栏的文字样式
         */
        reloadNavSelect() {
            this.notice.visible = true;
            this.notice_selected.visible = false;
            this.paiju.visible = true;
            this.paiju_selected.visible = false;
            this.data.visible = true;
            this.data_selected.visible = false;
            this.me.visible = true;
            this.me_selected.visible = false;
        }
        /**
         * 设置下面导航栏的选项
         * @param {*} type 类型
         */
        setTabSelect(type) {
            switch (type) {
                case Main$1.pages.page1:
                    this.notice.visible = false;
                    this.notice_selected.visible = true;
                    break;
                case Main$1.pages.page2:
                    this.paiju.visible = false;
                    this.paiju_selected.visible = true;
                    break;
                case Main$1.pages.page4:
                    this.data.visible = false;
                    this.data_selected.visible = true;
                    break;
                case Main$1.pages.page5:
                    this.me.visible = false;
                    this.me_selected.visible = true;
                    break;
            }
        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("game/GameCenter/GameUI.js",GameUI);
    		reg("game/GameCenter/seat.js",seat);
    		reg("game/common/commonSet.js",commonSet);
    		reg("game/Fuction/MySlider.js",MySlider);
    		reg("game/common/SetHeight.js",SetHeight);
    		reg("game/GameCenter/GameControl.js",GameControl);
    		reg("game/pages/login/LoginUI.js",Login);
    		reg("game/common/setSceneWH.js",setSceneWH);
    		reg("game/pages/login/Login.js",login);
    		reg("game/pages/roomEnd/roomEndUI.js",RoomEndUI);
    		reg("game/pages/roomEnd/roomEnd.js",roomEnd);
    		reg("game/pages/paijuhuigu/paijuhuiguUI.js",paijuhuiguUI);
    		reg("game/pages/paijuhuigu/paiJuGet.js",zhanji);
    		reg("game/pages/paijutishi/paijutishiUI.js",paijutishiUI);
    		reg("game/pages/paijutishi/tishi.js",zhanji$1);
    		reg("game/pages/register/registerUI.js",register$1);
    		reg("game/pages/register/register.js",register);
    		reg("game/pages/shishizhanji/shishizhanjiUI.js",shishizhanjiUI);
    		reg("game/pages/shishizhanji/ZhanJiGet.js",zhanji$2);
    		reg("game/pages/shopMall/shopMallUI.js",shopMall$1);
    		reg("game/pages/shopMall/shopMall.js",shopMall);
    		reg("game/pages/TabPages/TabPagesUI.js",TabPagesUI);
    		reg("game/pages/Me/Me.js",Me);
    		reg("game/pages/Notice/Notice.js",Notice);
    		reg("game/pages/GameHall/GameHall.js",GameHall);
    		reg("game/pages/Data/Data.js",Data);
        }
    }
    GameConfig.width = 1242;
    GameConfig.height = 2208;
    GameConfig.scaleMode ="fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "login.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main$2 {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError = true;

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
    	}
    }
    //激活启动类
    new Main$2();

}());
