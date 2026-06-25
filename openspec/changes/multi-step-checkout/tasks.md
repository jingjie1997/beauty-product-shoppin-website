## 1. 後端 — Django App 建立與資料模型

- [x] 1.1 建立 `orders` Django app（`python manage.py startapp orders`）
- [x] 1.2 定義 `Order` model（id、user、status、recipient_name、recipient_phone、shipping_address、payment_method、total_amount、created_at）
- [x] 1.3 定義 `OrderItem` model（order、product、product_name 快照、unit_price 快照、quantity）
- [x] 1.4 執行 migrations（`makemigrations orders` + `migrate`）
- [x] 1.5 在 Django Admin 註冊 Order 與 OrderItem

## 2. 後端 — REST API

- [x] 2.1 建立 `OrderSerializer`（含巢狀 `OrderItemSerializer`）
- [x] 2.2 實作 `POST /api/v1/orders/`（建立訂單，需 JWT 驗證，驗證購物車非空）
- [x] 2.3 實作 `GET /api/v1/orders/`（只回傳當前用戶的訂單列表）
- [x] 2.4 實作 `GET /api/v1/orders/{id}/`（單筆訂單，非本人回傳 404）
- [x] 2.5 設定 URL routing（加入 `orders/` 到主 `urls.py`）

## 3. 前端 — 基礎元件

- [x] 3.1 建立 `StepIndicator` 元件（顯示 4 個步驟、標示目前步驟）
- [x] 3.2 建立 `CheckoutPage` 容器元件（管理步驟狀態與所有步驟資料的 state）
- [x] 3.3 設定 React Router 路由（`/checkout` 指向 `CheckoutPage`）
- [x] 3.4 在購物車頁面加入「前往結帳」按鈕，未登入時導向登入頁

## 4. 前端 — 步驟一：確認購物車

- [x] 4.1 建立 `CartReview` 元件（列出商品、數量、小計、總計）
- [x] 4.2 加入購物車為空的導向邏輯

## 5. 前端 — 步驟二：收件資料

- [x] 5.1 建立 `ShippingForm` 元件（姓名、電話、地址欄位）
- [x] 5.2 實作表單驗證（必填、電話格式 09xxxxxxxx）
- [x] 5.3 顯示欄位錯誤訊息

## 6. 前端 — 步驟三：付款方式

- [x] 6.1 建立 `PaymentMethod` 元件（貨到付款、模擬線上付款 radio buttons）
- [x] 6.2 預設選取「貨到付款」
- [x] 6.3 顯示模擬付款說明文字

## 7. 前端 — 步驟四：訂單確認與送出

- [x] 7.1 建立 `OrderConfirmation` 元件（顯示商品清單、收件資料、付款方式、總金額摘要）
- [x] 7.2 實作「確認送出」呼叫 `POST /api/v1/orders/`（攜帶 JWT）
- [x] 7.3 訂單建立成功後顯示訂單編號並清空購物車 state
- [x] 7.4 訂單建立失敗時顯示錯誤訊息（不清空購物車）
