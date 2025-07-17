
# FastAPI側の環境設定
cd /fastapi
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# インストール内容
pip install fastapi uvicorn jwt python-multipart PyJWT
pip freeze > requirements.txt

# FastAPI起動
cd /fastapi
source venv/bin/activate
uvicorn main:app --reload

