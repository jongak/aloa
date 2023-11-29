import subprocess
import schedule
import time
from datetime import datetime

def job():
    #우분투
    terminal_command = 'netstat -anp | grep -E ":80 |:443 " | grep ESTABLISHED | wc -l'

    #윈도우
    # terminal_command = 'netstat -an | findstr ":80 :443" | findstr /C:"ESTABLISHED" /C:"TCP" /C:"127.0.0.1" | find /c /v ""'

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('log.txt', 'a', encoding='utf-8') as f:  # 'a'는 파일을 텍스트 모드로 열기 위함
        result = subprocess.check_output(terminal_command, shell=True, text=True)
        log_entry = f"{current_time}: {result}"
        f.write(log_entry)

schedule.every(10).seconds.do(job)
#schedule.every(10).minutes.do(job)


while True:
    schedule.run_pending()
    time.sleep(1)