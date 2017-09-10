from celery.task import Task
from services.service import load_data

class RequestImportDataTask(Task):    
    
    def run(self, track_id=None):
        from services.models import RequestDataTrack
        from django.conf import settings
        from s3_api import S3API
        import os
        track = RequestDataTrack.objects.get(pk = track_id)
        s3_conn = S3API()
        s3_conn.connect()
        destination = os.path.join(settings.BASE_DIR, 'media', track.upload_path)
        print destination
        file_name = s3_conn.download(track.upload_path, destination)
        _file_instance = open(destination)
        load_data(
            file_instance=_file_instance
        )
        _file_instance.close()
        os.remove(destination)
        return True