from fastapi import Depends, HTTPException, Request


def get_token(request: Request):
    token = request.cookies.get("booking_access_token")
    if not token:
        raise HTTPException(status_code=401)
    return token


def get_current_user(token: str = Depends(get_token)):
    return "user"