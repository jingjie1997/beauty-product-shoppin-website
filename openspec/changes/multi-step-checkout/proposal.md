## Why

購物網站需要完整的結帳流程，讓用戶能夠從購物車順利完成訂單。採用多步驟設計，將複雜的結帳流程拆分為清晰的四個階段，降低用戶認知負擔並提高完成率。

## What Changes

- 新增多步驟結帳頁面（4 個步驟：確認購物車 → 收件資料 → 付款方式 → 訂單確認）
- 新增收件資料表單（姓名、電話、地址）
- 新增付款方式選擇（初期支援：貨到付款、模擬線上付款）
- 新增訂單建立 API（`POST /api/v1/orders/`）
- 新增訂單查詢 API（`GET /api/v1/orders/` 及 `GET /api/v1/orders/{id}/`）
- 新增前端步驟進度指示器（Step Indicator 元件）

## Capabilities

### New Capabilities

- `checkout-flow`: 多步驟結帳流程 UI，管理步驟狀態與資料傳遞
- `shipping-info`: 收件人資料的收集與驗證
- `payment-method`: 付款方式選擇介面
- `order-management`: 訂單建立、儲存與查詢

### Modified Capabilities

（無，此為全新功能）

## Non-goals

- 不整合真實第三方金流（ECPay、Line Pay）— 留待後續迭代
- 不實作庫存扣除機制
- 不支援多筆收件地址管理
- 不實作訂單取消功能

## Impact

- **前端**：新增 `CheckoutPage` 及子元件（`CartReview`、`ShippingForm`、`PaymentMethod`、`OrderConfirmation`）
- **後端**：新增 `orders` Django app，包含 `Order`、`OrderItem` models 及對應 API views
- **資料庫**：新增 `orders_order`、`orders_orderitem` 資料表
- **依賴**：無新增外部套件需求
