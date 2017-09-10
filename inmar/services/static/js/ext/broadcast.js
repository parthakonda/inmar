//Notification Service API
//Author: Partha
//Help: You can see the docs for more info...

angular.module('BroadcastBox', [])
.factory('Broadcast', function(Notify) {

    var sock;
    return {
        'connect':function(url){
          try{
              sock  = new SockJS(url);
              if(localStorage.getItem('async_first_time') ===  null || localStorage.getItem('async_first_time') === undefined ||
                 localStorage.getItem('async_first_time') ===  "null" || localStorage.getItem('async_first_time') === "undefined"){
                localStorage.setItem('async_first_time', true);
            }
            if(localStorage.getItem('async_connnected') ===  null || localStorage.getItem('async_connnected') === undefined ||
               localStorage.getItem('async_connnected') ===  "null" || localStorage.getItem('async_connnected') === "undefined"){
                localStorage.setItem('async_connnected', true);            
            }
          } catch(err){
            console.log(err);
          }
           
        },
        'onopen': function(func){
            try{
                sock.onopen = func;
                
            } catch(err){
                localStorage.setItem('async_connnected', undefined);
                localStorage.setItem('async_first_time', undefined);                
            }
        },
        'onmessage': function(func){
            sock.onmessage = func;
        },
        'onclose': function(func){
            sock.onclose = func;
        },
        'send': function(message){
            sock.send(message);
        },
        'close': function(){
            sock.close();
        }
    };
})
.directive('broadcastbox', function($templateRequest, $compile, $http) {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = true;

    //Rending HTML
    directive.link = function(scope, element, attrs){
        scope.plugin = attrs.id;
        $templateRequest("/static/partials/broadcast.html").then(function(html){
            element.append(html).show();
            $compile(element.contents())(scope);
       });
    }

    //Controller
    directive.controller =  function($scope, $attrs, Broadcast, Notify){
        $scope.hidenotifier = true;
        $scope.action = "";
        $scope.gotpagebottom = false;
        $scope.records = 6;
        $scope.current_length = 6;
        $scope.start_records = 0;
        $scope.message_gotpagebottom = false;
        $scope.msg_records = 8;
        $scope.msg_current_length = 8;
        $scope.msg_start_records = 0;

        $scope.BOX = {
            'PROCESSES':[
                
            ],
            'MESSAGES':[
                
            ],
            'NOTIFICATIONS':[
                
            ]
        };
        Broadcast.connect($attrs.url);
        Broadcast.onopen(function(){
            Broadcast.send($attrs.username);
            if(localStorage.getItem('async_connnected') == "true" && localStorage.getItem('async_first_time') == "true"){
                Notify.success("Listening to Broadcast...");
                localStorage.setItem('async_connnected', false);
                localStorage.setItem('async_first_time', false);                
            }            
        });
        $scope.startHeart = function(user){
            Broadcast.send(user)
        };

        Broadcast.onmessage(function(e){
            console.log("Incoming Message");
            console.log(e);
            if(e.data.node == "PROCESS"){
                $scope.action = e.data.action;
                var array = $scope.BOX.PROCESSES;
                var obj1 = array.filter(function (obj) {
                    return obj.broadcast_id == e.data.data.broadcast_id;
                })[0];
                var _index = $scope.BOX.PROCESSES.indexOf(obj1)
                if( _index != -1)
                {   
                    if($scope.BOX.PROCESSES[_index].status != e.data.data.status){
                        $scope.BOX.PROCESSES.splice(_index, 1);
                        $scope.addProcess(e.data.data, undefined, true);
                        // debugger;
                    }
                    $scope.BOX.PROCESSES[_index].action = $scope.action;
                    if($scope.action == 'DELETED'){
                        $scope.BOX.PROCESSES.splice(_index, 1);
                    }
                }
                else if(obj1 == undefined){
                    $scope.addProcess(e.data.data, undefined, true);
                }
                //$scope.getInitialData();
            
            }
            if(e.data.node == "MESSAGE"){
                $scope.message_status = e.data.data.message_status;
                var array = $scope.BOX.MESSAGES;
                var obj1 = array.filter(function (obj) {
                    return obj.broadcast_id == e.data.data.broadcast_id;
                })[0];
                var _index = $scope.BOX.MESSAGES.indexOf(obj1)
                if( _index != -1)
                {   
                    $scope.BOX.MESSAGES[_index].message_status = $scope.message_status;
                    if($scope.message_status == 'DELETED'){
                        $scope.BOX.MESSAGES.splice(_index, 1);
                    }
                }
                else if(obj1 == undefined){
                    $scope.addMessage(e.data.data,undefined,true);
                }
                $scope.initialMessageData();
            }
        });
        Broadcast.onclose(function(e){
            localStorage.setItem('async_connnected', null);
            localStorage.setItem('async_first_time', null);  

        });

        $scope.addMessage = function(message,no_noty,add_at_top){
            message['newly_added'] = true;
            try {
                var array = $scope.BOX.MESSAGES;
                var obj1 = array.filter(function (obj) {
                    return obj.broadcast_id == message.broadcast_id;
                })[0];
                var _index = $scope.BOX.MESSAGES.indexOf(obj1)
                if( _index != -1)
                {   
                    console.log('Repitative MESSAGES');
                }
                else{
                    try{
                        if (add_at_top == true)
                            $scope.BOX.MESSAGES.unshift(message);
                        else
                            $scope.BOX.MESSAGES.push(message);
                    } catch(err){
                        console.log(err);
                        console.log("here");
                    }
                }
            }catch(err){

            }

            setTimeout(function(){
                var idx= $scope.BOX.MESSAGES.indexOf(message);
                if(idx != -1)  delete $scope.BOX.MESSAGES[idx]['newly_added'];
            }, 3000);

            if(no_noty === undefined){

                Notify.success(message.subject);
            }    
        };

        $scope.addProcess = function(process, no_noty, add_at_top){
            process['newly_added'] = true;
           
            try{
                if (add_at_top == true)
                    $scope.BOX.PROCESSES.unshift(process);
                else
                    $scope.BOX.PROCESSES.push(process);
            } catch(err){
                console.log(err);
                console.log("here");
            }
            try{
                setTimeout(function(){                
                    $scope.$apply();
                }, 3000); 
            } catch(err){   

            }

            setTimeout(function(){
                var idx= $scope.BOX.PROCESSES.indexOf(process);
                if(idx != -1)  delete $scope.BOX.PROCESSES[idx]['newly_added'];
            }, 3000);
            if(no_noty === undefined){
                if(process['status'] == "SUCCESS" || process['status'] == "RUNNING" || process['status'] == "QUEUED")
                    Notify.success(process.title+" "+process.status);
                if(process['status'] == 'ERROR')
                    Notify.error(process.title+" "+process.status); 
                if(process['status'] == 'WARNING')
                    Notify.warning(process.title+" "+process.status);                      
            }
        };

        $scope.deleteProcess = function(process){
            $http({
                method:'post',
                url:'/api/notifications/',
                data:{
                    obj:process,
                    method : 'DELETED'
                },
                header: {
                    'X-CSRFToken' : '',
                    'Content-Type': 'application/json',
                }
            }).then(function (data) {

            });
        };

        $scope.getUpdatedCount = function(){
            $http({
                method:'get',
                url:'/api/notifications/',
                params: {
                    'start_records':0,
                    'end_records':0,
                },

            }).then(function (data) {
                $scope.total_count = data.data.count.MESSAGES + data.data.count.NOTIFICATIONS + data.data.count.PROCESS;
            });
        };

        $scope.initialMessageData = function(){
            if($scope.message_gotpagebottom == true){
                if(($scope.msg_current_length - $scope.msg_records) >=8){
                    $scope.msg_start_records=$scope.msg_records;
                    $scope.msg_records += 8;
                }
                else{
                    $scope.msg_start_records=$scope.msg_records;
                    $scope.msg_records = $scope.msg_current_length;
                }    
            }
            // console.log($scope.msg_start_records,$scope.msg_current_length);
            $http({
                method:'get',
                url:'/api/message_notifications/',
                params: {
                    'start_records':$scope.msg_start_records,
                    'end_records':$scope.msg_records,
                },

            }).then(function (data) {
                $scope.total_count = data.data.count.MESSAGES + data.data.count.NOTIFICATIONS + data.data.count.PROCESS;
                $scope.msg_current_length=data.data.message_records_count;
                for(var iter = 0; iter < data.data.data.length; iter++)
                {
                    var message = data.data.data[iter]
                    $scope.addMessage({
                        'title':message.message_hdr || '',
                        'subject':message.message_dtl || '',
                        'body':message.message_hdr || '',
                        'status':message.exec_status || '',
                        'message_status':message.message_status || '',
                        'broadcast_id':message.broadcast_id || '',
                        'audit_user':message.sender || '',
                        'audit_dttm':message.message_dttm || '',
                    }, true)
                }
                $scope.message_gotpagebottom = false;
                document.getElementById('message_body').addEventListener("scroll", $scope.onscroll, true)

            });    
        };
    }
    return directive;
});
