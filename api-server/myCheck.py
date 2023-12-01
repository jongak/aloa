import subprocess
import schedule
import time
from datetime import datetime
from dotenv import load_dotenv
import os
import boto3
from botocore.client import Config

load_dotenv()


def handle_upload():
    try:
        # '로컬의 해당파일경로'+ 파일명 + 확장자
        with open('log.txt', 'r', encoding='utf-8') as data:
            s3 = boto3.resource(
                's3',
                aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
                config=Config(signature_version='s3v4')
            )
            s3.Bucket("aloa-bucket").put_object(
                Key='log.txt', Body=data.read().encode('utf-8'), ContentType='txt'
            )
    except Exception as e:
        # Handle the exception (print, log, etc.)
        print(f"An error occurred during upload: {e}")


def job():
    try:
        #우분투
        terminal_command = 'netstat -anp | grep -E ":80 |:443 " | grep ESTABLISHED | wc -l'

        #윈도우
        # terminal_command = 'netstat -an | findstr ":80 :443" | findstr /C:"ESTABLISHED" /C:"TCP" /C:"127.0.0.1" | find /c /v ""'

        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open('log.txt', 'a', encoding='utf-8') as f:  # 'a'는 파일을 텍스트 모드로 열기 위함
            result = subprocess.check_output(terminal_command, shell=True, text=True)
            log_entry = f"{current_time}: {result}"
            f.write(log_entry)
        handle_upload()
    except Exception as e:
        # 예외 처리 (출력, 로깅 등)
        print(f"작업 중 오류가 발생했습니다: {e}")

# schedule.every(10).seconds.do(job)
schedule.every(10).minutes.do(job)



current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
with open('log.txt', 'a', encoding='utf-8') as f:  # 'a'는 파일을 텍스트 모드로 열기 위함
    log_entry = f"{current_time}: {'start'}\n"
    f.write(log_entry)
job()

while True:
    schedule.run_pending()
    time.sleep(1)