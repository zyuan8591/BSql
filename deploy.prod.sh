tar zcvf bsql_acc.tar.gz ./dist

# 將打包的檔案同步到遠程服務器
rsync -avz -e "ssh -i BSql.app.pem" bsql_acc.tar.gz ubuntu@ec2-54-253-141-193.ap-southeast-2.compute.amazonaws.com:~/projects

# 在遠程服務器上創建目標目錄
ssh -i "BSql.app.pem" ubuntu@ec2-54-253-141-193.ap-southeast-2.compute.amazonaws.com 'mkdir -p ~/projects/acc'

# 在遠程服務器上解壓縮檔案到目標目錄
ssh -i "BSql.app.pem" ubuntu@ec2-54-253-141-193.ap-southeast-2.compute.amazonaws.com 'tar zxvf ~/projects/bsql_acc.tar.gz -C ~/projects/acc'

# 刪除遠程服務器上的壓縮檔案
ssh -i "BSql.app.pem" ubuntu@ec2-54-253-141-193.ap-southeast-2.compute.amazonaws.com 'rm -rf ~/projects/bsql_acc.tar.gz'

