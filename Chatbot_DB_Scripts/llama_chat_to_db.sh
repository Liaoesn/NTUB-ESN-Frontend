#!/bin/bash

# 設置MySQL連接資訊
MYSQL_HOST=211.75.1.204
MYSQL_PORT=50001
MYSQL_USER=10956015
MYSQL_PASSWORD="7Fc8.2m?z4@1OP+'d/R~"
MYSQL_DATABASE=autobiography

# 捕獲輸出
output=$(./chat.sh zh-models/7B/ggml-mode-f16.gguf '在這輸入文字')

# 將輸出分段存儲到變量中
studyplan=$(echo "$output" | grep -oP '(?<=studyplan: ).*')
opportunity=$(echo "$output" | grep -oP '(?<=opportunity: ).*')
self_expectation=$(echo "$output" | grep -oP '(?<=self-expectation: ).*')
work=$(echo "$output" | grep -oP '(?<=work: ).*')
learning=$(echo "$output" | grep -oP '(?<=learning: ).*')
family=$(echo "$output" | grep -oP '(?<=family: ).*')
education=$(echo "$output" | grep -oP '(?<=education: ).*')
studyexperience=$(echo "$output" | grep -oP '(?<=studyexperience: ).*')

# 插入到MySQL數據庫
mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD -e "
USE $MYSQL_DATABASE;
INSERT INTO output_table (section, content) VALUES 
('studyplan', '$studyplan'),
('opportunity', '$opportunity'),
('self-expectation', '$self_expectation'),
('work', '$work'),
('learning', '$learning'),
('family', '$family'),
('education', '$education'),
('studyexperience', '$studyexperience');
"


