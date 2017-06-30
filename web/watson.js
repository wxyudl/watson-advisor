;(function(){
    const SHORTCUTS = [
        '#csa#',
        '#dsc#',
        '#slack#',
        '#verse#',
        '#webex#',
        '#dsgb#'
    ];
    const SHORTCUTS_MAPS = {
        '#csa#': 'https://csa.dst.ibm.com/sales/console/',
        '#dsc#': 'dsc@us.ibm.com',
        '#slack#': 'https://ibm-dbg.slack.com/',
        '#verse#': 'https://mail.notes.na.collabserv.com/livemail',
        '#webex#': 'https://ibm.webex.com',
        '#dsgb#': 'http://mtev2.w3-969.ibm.com/dsgb/'
    }
    'use stract';
    function Watson(ws){
        var _this = this;
        this.cameraStream = null;
        this.msgId = 1;
        ws.onmessage = function(msg){
            var data = JSON.parse(msg.data);
            if(data.msg){
                _this.appendMsg(decodeURIComponent(data.msg), 1, _this.msgId - 1, 'left');

                // 拍照倒计时，存取照片
                if(data.msg === 1){
                    query('#webcam')[0].click();
                    _this.closeCamera();
                }
                
                // 打开摄像头
                if(data.msg === 'Taking picture'){
                    _this.openCamera();
                }
            }
        }
    }
    function Events(watson){}
    function SetUpWebSocket(){
		this.URL = 'ws://localhost:3000/';
	}

    Events.prototype = {
        init: function(){
            this.postMsg();
            this.postTranslate();
        },
        postMsg: function(){
            query('#input')[0].addEventListener('keypress', function(e){
                if(e.ctrlKey && e.keyCode === 13){
                    watson.sendMsg();
                }
            })
        },
        postTranslate: function(){
            query('#main')[0].addEventListener('click', function(e){
                var msg = e.target.parentNode.children[0].textContent;
                if(e.target.className === 'toolbar translate'){
                    watson.pureSendMsg('#TRANSLATE#' + msg);
                }else if(e.target.className === 'toolbar speak'){
                    watson.pureSendMsg('#SPEECH#' + msg);
                }else{

                }
            }, false);
        }
    };
    
    Watson.prototype = {
        acceptMsg: function(msgId){
            this.appendMsg('...', 0, msgId, 'left');
        },
        sendMsg: function(){
            var left = document.querySelectorAll('.left');
            var lastQ = left[left.length - 1];
            var msg = query('#input textarea')[0].value;

            if(lastQ && lastQ.innerHTML.match(/do you like my answer/ig)){
                msg = '#TONE#' + msg;
            }
            
            this.appendMsg(msg, 1, this.msgId, 'right');
            query('#input textarea')[0].value = '';

            if(msg.toLowerCase() === 'shortcuts'){
                var scMsg = SHORTCUTS.join('<br />');
                this.appendMsg(scMsg, 1, this.msgId, 'left');
                this.msgId++;
                return false;
            }else if(SHORTCUTS_MAPS[msg.toLowerCase()]){
                var url = SHORTCUTS_MAPS[msg.toLowerCase()];
                if(SHORTCUTS_MAPS[msg.toLowerCase()] === 'dsc@us.ibm.com'){
                    url = 'mailto:' + SHORTCUTS_MAPS[msg.toLowerCase()];
                }else{
                    setTimeout(function(){
                        window.open(SHORTCUTS_MAPS[msg.toLowerCase()], 'open');
                    }, 1000);
                }
                this.appendMsg('Opening: <a target="_blank" href="'+ url +'">' + SHORTCUTS_MAPS[msg.toLowerCase()] + '</a>', 1, this.msgId, 'left');
                this.msgId++;
                return false;
            }

            ws.send(msg);
            this.acceptMsg(this.msgId);
            this.msgId++;
        },
        pureSendMsg: function(msg){
            ws.send(msg);
        },
        appendMsg: function(msg, status, msgId, position){
            var main = document.getElementById('main');
            // status: 0 - pending, 1 - done
            if(query('.'+ position +'[data-id="'+ msgId +'"][data-status="0"]').length){
                query('.'+ position +'[data-id="'+ msgId +'"]')[0].innerHTML = msg;
                query('.'+ position +'[data-id="'+ msgId +'"]')[0].dataset.status = 1;
            }else{
                var mNode = document.createElement('p');
                mNode.className = 'message';
                mNode.innerHTML = '<span class="'+ position +'" data-status="'+ status +'" data-id="'+ msgId +'">' + msg + '</span><span class="toolbar translate"></span><span class="toolbar speech"></span>';
                query('#conversation #main')[0].appendChild(mNode);
            }
            main.scrollTop = main.scrollHeight;

            return mNode;
        },
        openCamera: function(){
            var _this = this;
            var canvas = query('#canvas');  
            var context = canvas[0].getContext('2d');

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if(navigator.getUserMedia) {
                navigator.getUserMedia({ audio: true, video: { width: 300, height: 300 }},
                    function(stream) {
                        _this.cameraStream = stream;
                        var video = document.querySelector('video');
                        video.style.display = '';
                        video.srcObject = stream;
                        video.onloadedmetadata = function(e) {
                            video.play();

                            video.onclick = function () {
                                _this.msgId++;
                                // 拍照
                                _this.drawVideoAtCanvas(video, context);
                                var base64 = query('#canvas')[0].toDataURL('image/jpg');
                                // 发送至对话面板
                                _this.appendMsg('<img width="100" src="'+ base64 +'" />', 1, _this.msgId, 'right');

                                fetch('./saveImage.php', {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    body: "base64=" + base64
                                }).then(function(res){
                                    if(res.ok){
                                        console.info('done...')
                                    }
                                }).catch(function(){

                                });
                            };
                        };
                    },
                    function(err) {
                        console.log("The following error occurred: " + err.name);
                    }
                );
            } else {
                console.log("getUserMedia not supported");
            }
        },
        closeCamera: function(){
            this.cameraStream.getTracks()[1].stop();
            query('#webcam')[0].style.display = 'none';
        },
        drawVideoAtCanvas: function (video, context) {  
            context.drawImage(video, 0, 0, 300, 300);
        },
        loopDot: function(){
            setInterval(function(){

            }, 100);
        }
    }

    SetUpWebSocket.prototype = {
		init: function(){
			var _this = this;
			ws = new WebSocket(this.URL);
			
			ws.onopen = function(){
				console.log('Connected');
			};
			
			ws.onclose = function(){
				//_this.init(); // 重新连接WS
			}

            // ws.onmessage = function(msg){
            //     watson.appendMsg(msg.data, 1, watson.msgId, 'left');
			// }

			return ws;
		}
	};

    function query(str){
        return document.querySelectorAll(str);
    }

    var webScoket  = new SetUpWebSocket();
    var watson = new Watson(webScoket.init());
    var events = new Events(watson);
    events.init();
})()