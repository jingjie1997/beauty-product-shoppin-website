## Context

目前專案尚在初始階段，無既有結帳流程。前後端完全分離：React 前端透過 REST API 與 Django 後端溝通，JWT 處理身份驗證。結帳是整個電商流程的核心，設計決策會影響後續訂單、付款等模組的擴充方式。

## Goals / Non-Goals

**Goals:**
- 實作 4 步驟結帳 UI（購物車確認 → 收件資料 → 付款方式 → 訂單確認）
- 定義 Order / OrderItem 資料模型
- 提供訂單建立與查詢 REST API
- 前端步驟間資料以 React state 傳遞，不依賴後端暫存

**Non-Goals:**
- 真實金流整合
- 庫存管理
- 多地址管理

## Decisions

### 1. 步驟資料管理：React state（不用 Context 或全域 store）

**選擇**：用單一父元件 `CheckoutPage` 持有所有步驟資料，以 props 傳入子步驟元件。

**理由**：結帳流程是線性的單一頁面流程，資料不需要在其他頁面共享。用 Context 或 Zustand 過度設計；未來如需擴充，重構成本低。

**捨棄方案**：Zustand / React Context — 適合跨頁面或多元件共享狀態，此處不必要。

---

### 2. 後端訂單建立：單一 API 呼叫（不分步驟儲存）

**選擇**：只在最後一步「確認訂單」時，一次性呼叫 `POST /api/v1/orders/`，傳入完整訂單資料。

**理由**：簡化後端邏輯，無需處理草稿訂單或逐步驗證 API。前端已在本地完成各步驟驗證。

**捨棄方案**：每步驟儲存到後端 — 增加 API 複雜度，但可支援跨裝置恢復，初期不需要此功能。

---

### 3. 購物車資料來源：前端 state（不從後端重新拉取）

**選擇**：進入結帳頁時，購物車資料從前端既有 state 帶入，不再呼叫 API。

**理由**：簡化流程，避免多餘 API 請求。訂單確認時後端會驗證商品價格與庫存。

---

### 4. Order 資料模型

```
Order
  - id (UUID)
  - user (FK → User)
  - status: pending / paid / shipped / completed / cancelled
  - recipient_name (str)
  - recipient_phone (str)
  - shipping_address (str)
  - payment_method: cod / simulated_online
  - total_amount (Decimal)
  - created_at (DateTime)

OrderItem
  - order (FK → Order)
  - product (FK → Product)
  - product_name (str, 快照)
  - unit_price (Decimal, 快照)
  - quantity (int)
```

**重要**：`product_name` 與 `unit_price` 在建立時快照，防止商品資料改變後影響歷史訂單。

---

### 5. API 設計

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/api/v1/orders/` | 建立訂單（需登入） |
| GET  | `/api/v1/orders/` | 取得當前用戶的訂單列表 |
| GET  | `/api/v1/orders/{id}/` | 取得單筆訂單詳情 |

## Risks / Trade-offs

- **競態條件（Race Condition）**：用戶結帳時商品可能已下架或改價。→ 後端建立訂單時驗證商品狀態，若異常回傳 400 錯誤，前端顯示提示。
- **未登入結帳**：目前設計要求登入才能結帳。→ 進入結帳頁時檢查 JWT，未登入導向登入頁並保留結帳意圖（redirect 參數）。
- **瀏覽器重新整理**：重整後步驟資料遺失。→ 初期接受此限制；未來可用 sessionStorage 暫存。

## Open Questions

- 付款模擬的確認機制：「模擬線上付款」按下後直接改狀態為 `paid`，還是需要額外確認步驟？
- 訂單編號格式：UUID 直接暴露，或需要自訂格式（如 `ORD-20260619-0001`）？
