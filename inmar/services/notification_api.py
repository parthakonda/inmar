class Notifier(object):
    """ Base notifier to broadcast Messages/Process/Notification type messages to clients asyncly """
    sender = None
    receiver = None
    message_hdr = None
    message_dtl = None

    def __init__(self, *args, **kwargs):
        pass

    def _validate(self,*args, **kwargs):
        def wrapper(self):
            assert(self.sender is not None), "From should not be empty"
            assert(self.receiver is not None), "To should not be empty"
            assert(self.message_hdr is not None), "Subject should not be empty"
            assert(self.message_dtl is not None), "Body should not be empty"
        return wrapper
    
    def get_or_create(self, data):
        """ Will Create Broadcast Object with the specified data """
        try:
            Obj = Broadcast.objects.get(process_id = data['process_id'])
        except Broadcast.DoesNotExist:
            Obj, created = Broadcast.objects.get_or_create(**data)
            return Obj
        return Obj

    def getNotificationCount(self, user):
        """ Return Notification Count of each type of specific user """
        objs = Broadcast.objects.filter(receiver = user,message_status='UNREAD')
        return {
            'PROCESS': len(objs.filter(broadcast_type = '1')),
            'MESSAGES': len(objs.filter(broadcast_type = '2')),
            'NOTIFICATIONS': len(objs.filter(broadcast_type = '3')) 
        }

    def getAllNotifications(self, user):
        output = []
        objs = Broadcast.objects.filter(receiver = user).exclude(message_status='DELETED').values()
        objs = objs.order_by('-message_dttm')
        for obj in objs:
            temp = {}
            for k, v in obj.items():
                if isinstance(v, datetime):
                    temp.update({k:str(v)})
                else:
                    temp.update({k:v})
            output.append(temp)
        return output
    
    def getProcessNotifications(self, user):
        output = []
        objs = Broadcast.objects.filter(receiver = user, broadcast_type = '1').exclude(message_status='DELETED').values()
        objs = objs.order_by('-message_dttm')
        for obj in objs:
            temp = {}
            for k, v in obj.items():
                if isinstance(v, datetime):
                    temp.update({k:str(v)})
                else:
                    temp.update({k:v})
            output.append(temp)
        return output


    def getMessageNotifications(self, user):
        output = []
        objs = Broadcast.objects.filter(receiver = user, broadcast_type = '2').exclude(message_status='DELETED').values()
        objs = objs.order_by('message_dttm')
        objs = objs.reverse()
        for obj in objs:
            temp = {}
            for k, v in obj.items():
                if isinstance(v, datetime):
                    temp.update({k:str(v)})
                else:
                    temp.update({k:v})
            output.append(temp)
        return output


    def getSentProcessNotifications(self, user):
        objs = Broadcast.objects.filter(sender = user, broadcast_type = '1').values()
        return objs

    def getSentMessageNotifications(self, user):
        objs = Broadcast.objects.filter(sender = user, broadcast_type = '2').values()
        return objs

    def getAllSentNotifications(self, user):
        objs = Broadcast.objects.filter(sender = user).values()
        return objs

    def setReadStatus(self, pk):
        assert(pk is not None and pk != ""), "Please specify the pk"
        try:
            obj = Broadcast.objects.get(pk = pk)
        except Broadcast.ObjectDoesNotExist:
            return "Broadcast track does not exists with the specified pk '%s'"%(str(pk))

    def setUnReadStatus(self, pk):
        try:
            obj = Broadcast.objects.get(pk = pk)
            obj.message_status = "READ"
            obj.save()
        except Broadcast.ObjectDoesNotExist:
            return "Broadcast track does not exists with the specified pk '%s'"%(str(pk))

    def setDeleteStatus(self, pk):
        try:
            obj = Broadcast.objects.get(pk = pk)
            obj.message_status = "DELETE"
            obj.save()
        except Broadcast.ObjectDoesNotExist:
            return "Broadcast track does not exists with the specified pk '%s'"%(str(pk))

    def From(self, sender):
        # rdb.set_trace()
        
        assert(sender != ""), "Sender should not be empty"
        self.sender = sender
        return self

    def To(self, receiver):
        # rdb.set_trace()

        assert(receiver != ""), "Receiver should not be empty"
        self.receiver = receiver
        return self

    def Subject(self, subject):
        # rdb.set_trace()

        assert(subject != ""), "Subject should not be empty"
        self.message_hdr = subject
        return self

    def Body(self, body):
        # rdb.set_trace()

        assert(body != ""), "Body should not be empty"
        self.message_dtl = body
        return self

    def Data(self, context):
        # rdb.set_trace()
        self.message_data = context
        return self
    
    def notify(self, **data):
        return self
    
    @property
    def as_dict(self):
        return {
            'sender':self.sender,
            'receiver':self.receiver,
            'message_hdr':self.message_hdr,
            'message_dtl':self.message_dtl,
            'message_data':getattr(self, 'message_data', ''),
            'process_id':self.process_id,
            'request_id':self.request_id,
            'message_dttm':datetime.now()
        }

class ProcessNotifier(Notifier):
    """ Process Related Notification Mechanism """

    def __init__(self, process_id, request_id):
        """ Will instantiate a Notifier object with process_id, request_id """
        assert(process_id is not None), "process_id should not be None"
        assert(request_id is not None), "request_id should not be None"
        self.process_id = process_id
        self.request_id = request_id

    def _validate(self):
        def wrapper(self):
            assert(self.sender is not None), "From should not be empty"
            assert(self.receiver is not None), "To should not be empty"
            assert(self.message_hdr is not None), "Subject should not be empty"
            assert(self.message_dtl is not None), "Body should not be empty"
        return wrapper

    def sendNoty(self, Obj):
        import json
        import requests
        try:
            dttm = Obj.success_at.__str__()
        except:
            dttm = datetime.now().__str__()
        payload =  {
            'user': Obj.receiver, 
            'count':10, 
            'data':json.dumps({
                "title":Obj.message_hdr,
                "subject":Obj.message_dtl,
                "status":Obj.exec_status,
                "process_id":Obj.process_id,
                "request_id":Obj.request_id,
                "message_status":Obj.message_status,
                "audit_dttm":dttm,
                "audit_user":Obj.sender,
                "body":Obj.message_data,
                "broadcast_id":Obj.broadcast_id
            })
        }
        status = Obj.message_status.lower() 
        sendnoty = requests.post(settings.TORNADO_URL + "/process/"+status+"/", data = payload)
        return self

    def Success(self):
        print self.as_dict
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "SUCCESS"
        Obj.success_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)
        return self
    
    def Error(self):
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "ERROR"
        Obj.error_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)        
        return self

    def Failure(self):
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "FAILURE"
        Obj.error_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)        
        return self

    def Warning(self):
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "WARNING"
        Obj.warning_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)        
        return self
    
    def Terminated(self):
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "TERMINATED"
        Obj.terminated_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)        
        return self

    def Running(self):
        print "IN RUNNING"
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "RUNNING"
        Obj.running_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)        
        return self
    
    def Queued(self):
        print "IN QUEUED"
        Obj = self.get_or_create(self.as_dict)
        Obj.exec_status = "QUEUED"
        Obj.queued_at = datetime.now()
        Obj.save()
        self.sendNoty(Obj)
        return self
