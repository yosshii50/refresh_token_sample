from fastapi import FastAPI, HTTPException, status, Form, Depends, Header
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Optional

app = FastAPI()

origins = [
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://localhost",
    "http://localhost:3000",
#    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジンを指定
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["*"],  # 許可するHTTPヘッダー
)

# シークレットキー（本番環境では安全に管理してください）
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 3
REFRESH_TOKEN_EXPIRE_DAYS = 7

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    access_token_expires: datetime
    refresh_token_expires: datetime
class RefreshTokenRequest(BaseModel):
    refresh_token: str

# ダミーユーザーデータ
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "password": "secret"
    }
}

def authenticate_user(fake_db, username: str, password: str):
    if username in fake_db and fake_db[username]["password"] == password:
        return fake_db[username]
    return None

def get_user(fake_db, username: str):
    if username in fake_db:
        return fake_db[username]
    return None

def create_access_token2(user_id:str):
    expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({
        'user_id': user_id,
        'exp': expires,
    }, SECRET_KEY, algorithm=ALGORITHM), expires

def create_refresh_token2(user_id:str):
    expires = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    return jwt.encode({
        "sub": user_id,
        "exp": expires,
    }, SECRET_KEY, algorithm=ALGORITHM), expires

@app.post("/token", response_model=Token)
async def create_token(username: str = Form(...), password: str = Form(...)):
    now = datetime.now()
    formatted_now = now.strftime("%Y-%m-%d_%H-%M-%S")
    print(f"Request create_token() at: {formatted_now}")
    user = authenticate_user(fake_users_db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    #access_token = create_access_token2(user_id=user["username"])
    #refresh_token = create_refresh_token2(user_id=user["username"])
    access_token, access_token_expires = create_access_token2(user_id=user["username"])
    refresh_token, refresh_token_expires = create_refresh_token2(user_id=user["username"])
    #return {"access_token": str(access_token) , "refresh_token": refresh_token, "token_type": "bearer"}
    return {
        "access_token": str(access_token),
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "access_token_expires": access_token_expires,
        "refresh_token_expires": refresh_token_expires
    }

@app.post("/refresh")
async def refresh_token(refresh_token: str = Form(...)):
    now = datetime.now()
    formatted_now = now.strftime("%Y-%m-%d_%H-%M-%S")
    print(f"Request refresh_token() at: {formatted_now}")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        user = get_user(fake_users_db, username)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        print(user["username"])
        #access_token = create_access_token2(user_id=username)
        access_token, access_token_expires = create_access_token2(user_id=username)
        print(access_token)
        #return {"access_token": access_token, "token_type": "bearer"}
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "access_token_expires": access_token_expires
        }
    except jwt.ExpiredSignatureError:
        print("ERR:Refresh token has expired")
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    except jwt.DecodeError as e:
        print("ERR:Malformed refresh token")
        raise HTTPException(status_code=401, detail="Malformed refresh token")
    except Exception as e:
        print(f"ERR:An unexpected error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/userinfo")
async def get_user_info(authorization: Optional[str] = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("user_id")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"username": username}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Expired token")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Decode error")

