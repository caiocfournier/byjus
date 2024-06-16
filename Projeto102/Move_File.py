import os 
import shutil

from_dir = "C:/Users/caioc/Downloads"
to_dir = "C:/Users/caioc/Documents/projetos/byjus/SEGREGAÇÃO AUTOMÁTICA DE ARQUIVOS"

list_of_files = os.listdir(from_dir)
#print(list_of_files)

list_of_extensions = [".txt", ".doc", ".docx" ".pdf"]
# Loop for-in para percorrer a lista de arquivos
for file in list_of_files:
    file_name, file_extension = os.path.splitext(file)
    
    if file_extension != "" and file_extension in list_of_extensions:
        path1 = from_dir+"/" + file
        path2 = to_dir + "/" + "Arquivos_Documentos"
        path3 = to_dir + "/" + "Arquivos_Documentos" + "/" + file

        if os.path.exists(path2):
            print("Movendo " + file_name + ".......")
            shutil.move(path1, path3)
        else: 
            os.makedirs(path2)
            print("Movendo " + file_name + "......")
            shutil.move(path1, path3)   
    