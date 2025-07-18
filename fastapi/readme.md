
# FastAPI側の環境設定（git clone した後の最初の処理）
## MacOS
cd refresh_token_sample/fastapi
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

## Linux / WSL
cd refresh_token_sample/fastapi
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

## Windows(文字化けする)
cd refresh_token_sample\fastapi
python -m venv venv
venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
pip install -r requirements.txt

# インストール内容
pip install fastapi uvicorn python-multipart PyJWT
pip freeze > requirements.txt

# FastAPI起動
cd /fastapi
source venv/bin/activate
uvicorn main:app --reload

# 動作確認
curl --ipv4 -X 'POST' 'http://localhost:8000/token' -H 'accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' -d 'username=sample_user@example.com&password=sample_password'
curl --ipv4 -X POST http://localhost:8000/token -H "Content-Type: application/x-www-form-urlencoded" -d "username=sample_user@example.com" -d "password=sample_password"
curl --ipv4 -X POST http://localhost:8000/token -H "Content-Type: application/x-www-form-urlencoded" -d "username=sample_user@example.com&password=sample_password"


