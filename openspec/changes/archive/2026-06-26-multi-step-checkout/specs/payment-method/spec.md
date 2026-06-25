## ADDED Requirements

### Requirement: 付款方式選擇
系統 SHALL 提供至少兩種付款方式供用戶選擇：「貨到付款」與「模擬線上付款」。

#### Scenario: 顯示付款方式選項
- **WHEN** 用戶進入結帳步驟三
- **THEN** 系統 SHALL 以 radio button 顯示可用的付款方式，預設選取「貨到付款」

#### Scenario: 選擇付款方式後繼續
- **WHEN** 用戶選擇任一付款方式並點擊「下一步」
- **THEN** 系統 SHALL 儲存付款方式至 CheckoutPage state 並進入步驟四（訂單確認）

#### Scenario: 未選擇付款方式
- **WHEN** 用戶未選擇付款方式（無預設選取的情況下）點擊「下一步」
- **THEN** 系統 SHALL 顯示「請選擇付款方式」提示，不允許進入下一步驟

### Requirement: 模擬線上付款說明
系統 SHALL 在「模擬線上付款」選項旁顯示說明文字，告知用戶此為測試用途。

#### Scenario: 顯示模擬付款說明
- **WHEN** 用戶看到「模擬線上付款」選項
- **THEN** 系統 SHALL 顯示說明文字：「（測試用）選擇後將直接視為付款成功」
