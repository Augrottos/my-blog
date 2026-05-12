"""
初始化管理员账号 — 只需要运行一次
用法:
  docker compose exec backend python init_admin.py
"""
import os
import sys
import asyncio
import bcrypt
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(__file__))
from database import database, users

load_dotenv()

ADMIN_USERNAME = "小BAN砖"
ADMIN_EMAIL    = "admin@blog.com"
ADMIN_PASSWORD = os.getenv("ADMIN_SECRET_KEY", "ChangeMe123!")


async def main():
    await database.connect()

    existing = await database.fetch_one(
        users.select().where(users.c.role == "admin")
    )
    if existing:
        print(f"管理员已存在: {existing['username']} ({existing['email']})")
        await database.disconnect()
        return

    hashed = bcrypt.hashpw(
        ADMIN_PASSWORD.encode("utf-8")[:72], bcrypt.gensalt()
    ).decode("utf-8")

    await database.execute(
        users.insert().values(
            username=ADMIN_USERNAME,
            email=ADMIN_EMAIL,
            hashed_password=hashed,
            role="admin",
            is_verified=1,
            verify_token=None,
            verify_token_expire=None,
        )
    )

    print(f"管理员已创建: {ADMIN_USERNAME} ({ADMIN_EMAIL})")
    print("使用 .env 中的 ADMIN_SECRET_KEY 通过 /api/admin/login 登录")
    await database.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
