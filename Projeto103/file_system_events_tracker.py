import sys
import time
import random
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from_dir = "c:/Users/caioc/Downloads"

class FileEventHandler(FileSystemEventHandler):

    def on_created(self, event):
        print(f"Olá, {event.src_path} foi criado!")

    def on_modified(self, event):
        print(f"Olá, {event.src_path} foi modificado!")

    def on_moved(self, event):
        print(f"Opa! Alguém moveu {event.src_path}!")

    def on_deleted(self, event):
        print(f"Opa! Alguém excluiu {event.src_path}!")


# Inicialize logging event handler
event_handler = FileEventHandler()

# Inicialize Observer
observer = Observer()

# Agende observer
observer.schedule(event_handler, from_dir , recursive=True)

# Inicie observer
observer.start()

try:
    while True:
        time.sleep(2) 
        print("executando...")
except KeyboardInterrupt:
    print("interrompido!")
    observer.stop()