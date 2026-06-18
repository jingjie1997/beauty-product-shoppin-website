# 美妝購物網站 — 專案說明

## 專案概述
一個以美妝產品為主題的電商購物網站，涵蓋商品瀏覽、購物車、結帳、會員管理等完整電商流程。

## 技術棧

### 前端
- **框架**：React（函式元件 + Hooks）
- **樣式**：Tailwind CSS
- **語言**：JavaScript（不使用 TypeScript）
- **狀態管理**：待定（Context API 或 Zustand）
- **HTTP 客戶端**：Axios

### 後端
- **語言**：Python
- **框架**：Django + Django REST Framework（DRF）
- **架構**：MTV（Model-Template-View），前後端分離
- **認證**：JWT（djangorestframework-simplejwt）
- **資料庫**：SQLite（開發）→ PostgreSQL（正式）
- **跨域**：django-cors-headers

## 架構說明
前後端完全分離：
- 後端只提供 REST API（JSON），不使用 Django Templates（除 admin）
- 前端 React 透過 API 取資料，自行處理路由（React Router）

## 模組規劃

### 商品模組
- 商品列表（分頁）
- 商品分類：底妝、唇彩、眼妝、護膚
- 商品詳細頁
- 搜尋與篩選（分類、價格區間、品牌）
- 商品變體（色號、規格）

### 購物車模組
- 加入購物車
- 數量調整、刪除
- 小計與總計計算
- 持久化購物車（登入後同步）

### 訂單模組
- 結帳流程
- 訂單建立
- 訂單查詢與狀態追蹤

### 會員模組
- 註冊、登入（JWT）
- 個人資料編輯
- 收貨地址管理

### 評論模組（規劃中）
- 商品評分與評論
- 只有購買過的用戶才能評論

## 開發規範
- API 路由遵循 RESTful 風格（`/api/v1/...`）
- 元件命名：PascalCase
- 檔案命名：kebab-case
- Commit 訊息：使用中文描述或 Conventional Commits
