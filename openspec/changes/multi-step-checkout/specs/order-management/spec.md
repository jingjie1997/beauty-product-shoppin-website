## ADDED Requirements

### Requirement: 訂單建立
系統 SHALL 提供 API 讓已登入用戶建立訂單，並儲存商品快照資料。

#### Scenario: 成功建立訂單
- **WHEN** 已登入用戶送出 `POST /api/v1/orders/` 並附上有效的購物車商品、收件資料及付款方式
- **THEN** 系統 SHALL 建立訂單記錄（含 OrderItem 快照），回傳 HTTP 201 與訂單 id 及狀態

#### Scenario: 未登入用戶嘗試建立訂單
- **WHEN** 未提供有效 JWT token 的請求送出 `POST /api/v1/orders/`
- **THEN** 系統 SHALL 回傳 HTTP 401

#### Scenario: 建立訂單時購物車為空
- **WHEN** 請求中商品列表為空陣列
- **THEN** 系統 SHALL 回傳 HTTP 400 並包含錯誤訊息

### Requirement: 訂單確認頁顯示
系統 SHALL 在步驟四顯示完整訂單摘要，並在用戶確認後呼叫建立訂單 API。

#### Scenario: 顯示訂單摘要
- **WHEN** 用戶進入結帳步驟四
- **THEN** 系統 SHALL 顯示商品清單、收件資料、付款方式及訂單總金額的摘要，供用戶最終確認

#### Scenario: 確認送出訂單
- **WHEN** 用戶點擊「確認送出」
- **THEN** 系統 SHALL 呼叫 `POST /api/v1/orders/` 建立訂單，成功後顯示訂單編號並清空購物車

#### Scenario: 訂單建立失敗
- **WHEN** API 回傳錯誤
- **THEN** 系統 SHALL 顯示錯誤訊息，用戶可重試，不清空購物車

### Requirement: 訂單查詢
系統 SHALL 提供 API 讓已登入用戶查詢自己的訂單。

#### Scenario: 查詢訂單列表
- **WHEN** 已登入用戶送出 `GET /api/v1/orders/`
- **THEN** 系統 SHALL 回傳該用戶的所有訂單列表（含訂單 id、狀態、總金額、建立時間）

#### Scenario: 查詢單筆訂單詳情
- **WHEN** 已登入用戶送出 `GET /api/v1/orders/{id}/`
- **THEN** 系統 SHALL 回傳該訂單的完整資料，包含 OrderItem 清單

#### Scenario: 查詢他人訂單
- **WHEN** 用戶嘗試查詢不屬於自己的訂單
- **THEN** 系統 SHALL 回傳 HTTP 404
