from boto.s3.connection import S3Connection
from boto.s3.key import Key
import tempfile

from django.conf import settings

class S3API(object):
    bucket = None

    def connect(
        self
    ):
    
        conn = S3Connection(
            settings.AWS_ACCESS_KEY_ID,
            settings.AWS_SECRET_ACCESS_KEY,        
        )
        self.bucket = conn.get_bucket(settings.S3_BUCKET)

    def upload(
        self,
        file_name=None,
        file_instance=None
    ):
        k = Key(self.bucket)
        k.key = file_name
        k.set_contents_from_string(file_instance.read())
        return k.key

    def download(
        self,
        file_path=None,
        destination=None
    ):
        f = open(destination, 'w')
        f.close()
        k = Key(self.bucket)
        k.key = file_path
        k.get_contents_to_filename(destination)
        return 
