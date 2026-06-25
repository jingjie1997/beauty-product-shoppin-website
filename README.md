# 美妝購物網站

一個以美妝產品為主題的電商購物網站，涵蓋商品瀏覽、購物車、多步驟結帳、會員管理等完整電商流程。

## 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | React 18、React Router v6、Tailwind CSS、Axios |
| 後端 | Python 3.11、Django 5、Django REST Framework |
| 認證 | JWT（djangorestframework-simplejwt） |
| 跨域 | django-cors-headers |
| 資料庫 | SQLite（開發）→ PostgreSQL（正式） |

## 專案結構

```
.
├── backend/                  # Django 後端
│   ├── beauty_shop/          # 主專案設定
│   │   ├── settings.py
│   │   └── urls.py
│   ├── orders/               # 訂單模組
│   │   ├── models.py         # Order、OrderItem
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── products/             # 商品模組
│   │   └── models.py         # Product
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                 # React 前端
    └── src/
        ├── api/
        │   └── orders.js     # 訂單 API 呼叫
        ├── components/
        │   └── checkout/
        │       ├── CheckoutPage.js     # 結帳容器（步驟狀態管理）
        │       ├── StepIndicator.js    # 步驟進度列
        │       ├── CartReview.js       # 步驟一：確認購物車
        │       ├── ShippingForm.js     # 步驟二：收件資料
        │       ├── PaymentMethod.js    # 步驟三：付款方式
        │       └── OrderConfirmation.js # 步驟四：訂單確認
        ├── contexts/
        │   ├── AuthContext.js  # JWT 登入狀態
        │   └── CartContext.js  # 購物車狀態
        └── pages/
            ├── CartPage.js
            └── LoginPage.js
```

## 快速開始

### 環境需求

- Python 3.11+
- Node.js 18+

### 後端

> 注意：後端相關指令都需要先進入 `backend/` 資料夾執行。

```bash
cd backend

# 建立虛擬環境（建議）
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# 安裝套件
pip install -r requirements.txt

# 初始化資料庫
python manage.py migrate

# 建立管理員帳號
python manage.py createsuperuser

# 啟動開發伺服器（預設 http://localhost:8000）
python manage.py runserver
```

### 前端

> 注意：前端相關指令都需要先進入 `frontend/` 資料夾執行。

```bash
cd frontend

# 安裝套件
npm install

# 啟動開發伺服器（預設 http://localhost:3000）
npm start
```

## API 文件

基礎路徑：`http://localhost:8000/api/v1`

### 認證

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/token/` | 取得 JWT（傳入 `username`、`password`） |
| POST | `/token/refresh/` | 更新 access token |

回傳的 `access` token 需放入請求 Header：
```
Authorization: Bearer <access_token>
```

### 訂單

| 方法 | 路徑 | 說明 | 需登入 |
|------|------|------|--------|
| GET | `/orders/` | 取得當前用戶的訂單列表 | ✓ |
| POST | `/orders/` | 建立新訂單 | ✓ |
| GET | `/orders/{id}/` | 取得單筆訂單詳情 | ✓ |

#### POST `/orders/` 請求範例

```json
{
  "recipient_name": "王小明",
  "recipient_phone": "0912345678",
  "shipping_address": "台北市信義區松仁路100號",
  "payment_method": "cod",
  "total_amount": "1480.00",
  "items": [
    {
      "product_id": 1,
      "product_name": "水潤保濕精華",
      "unit_price": "580.00",
      "quantity": 2
    },
    {
      "product_id": 2,
      "product_name": "玫瑰漾色唇膏",
      "unit_price": "320.00",
      "quantity": 1
    }
  ]
}
```

付款方式可選值：`cod`（貨到付款）、`simulated_online`（模擬線上付款）

## 功能模組

### 已完成

- **多步驟結帳流程**：確認購物車 → 收件資料 → 付款方式 → 訂單確認
- **訂單 API**：建立訂單、查詢訂單列表、查詢單筆訂單
- **表單驗證**：必填欄位、台灣手機格式（09xxxxxxxx）
- **JWT 認證**：未登入時自動導向登入頁並保留結帳意圖
- **Admin 後台**：訂單管理（含 OrderItem 快照）

### 規劃中

- 商品列表與詳細頁（分類、搜尋、篩選）
- 庫存管理
- 第三方金流整合（ECPay、Line Pay）
- 商品評論（限購買者）
- 多收件地址管理
- 訂單取消與退款流程

## 開發規範

- API 路由遵循 RESTful 風格，統一前綴 `/api/v1/`
- 前端元件命名：PascalCase
- 檔案命名：kebab-case
- OrderItem 在建立時快照 `product_name` 與 `unit_price`，防止商品資料異動影響歷史訂單

## Admin 後台

啟動後端後，前往 `http://localhost:8000/admin/` 使用 `createsuperuser` 建立的帳號登入，可管理訂單、商品等資料。
