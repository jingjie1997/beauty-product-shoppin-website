## ADDED Requirements

### Requirement: 收件人資料表單
系統 SHALL 提供表單讓用戶填寫收件人資料，包含姓名、電話、完整地址。

#### Scenario: 顯示收件資料表單
- **WHEN** 用戶進入結帳步驟二
- **THEN** 系統 SHALL 顯示包含「收件人姓名」、「聯絡電話」、「收件地址」三個欄位的表單

#### Scenario: 表單驗證 — 所有欄位必填
- **WHEN** 用戶未填寫任何必填欄位並點擊「下一步」
- **THEN** 系統 SHALL 在各空白欄位下方顯示錯誤提示，且不允許進入下一步驟

#### Scenario: 電話格式驗證
- **WHEN** 用戶輸入格式不正確的電話號碼（非台灣手機格式 09xxxxxxxx）
- **THEN** 系統 SHALL 顯示「請輸入有效的手機號碼」錯誤訊息

#### Scenario: 成功通過驗證
- **WHEN** 所有欄位填寫正確且用戶點擊「下一步」
- **THEN** 系統 SHALL 儲存收件資料至 CheckoutPage state 並進入步驟三（付款方式）

#### Scenario: 返回上一步時資料保留
- **WHEN** 用戶從步驟三返回步驟二
- **THEN** 系統 SHALL 顯示先前已填寫的收件資料，不需重新填寫
