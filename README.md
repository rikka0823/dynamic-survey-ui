# dynamic-survey-ui

`dynamic-survey-ui` 是一個基於 Angular 的前端應用程式，與 `dynamic-survey-api` 後端 API 結合的**動態問卷系統**，提供用戶友好的介面來創建、管理和填寫動態問卷系統，並支持靈活的問卷設計、即時回饋、統計分析等功能。可適用於市場研究、用戶滿意度調查等多種場景。

後端 API，詳見於 [`dynamic-survey-api`](https://github.com/rikka0823/dynamic-survey-api/tree/main)。

前後端整合，詳見於 [`dynamic-survey`](https://github.com/rikka0823/dynamic-survey)。

## Project Structure

專案架構（Figma），請參考 [`動態問卷系統`](https://www.figma.com/design/7jcsPZxB0Q26WYPpvk3tzr/%E5%8B%95%E6%85%8B%E5%95%8F%E5%8D%B7%E7%B3%BB%E7%B5%B1-Template_For_Class-)。

## Key Features

- **問卷管理**：創建、更新和刪除問卷，支持基於多種條件（如名稱、日期等）進行問卷模糊查詢。
- **問卷填寫**：用戶可以填寫問卷並即時提交答案，系統會即時處理並回饋結果。
- **數據與統計**：查詢問卷資料、回饋資料及統計數據，並支持圖表化展示。
- **帳戶管理**：提供管理者登入後，執行問卷的新增、刪除和更新操作。

## Tech Stack

此專案使用以下技術：

- **Angular 18.2.9**：前端應用開發框架。
- **HTML、CSS/SCSS、JavaScript/TypeScript**：版面設計、功能撰寫，並以 HttpClient 串接後端 API。
- **Angular Material**：使用官方 UI 元素，便於構建表單、按鈕等元件。
- **Bootstrap 5**：用於響應式設計，讓介面適用各種設備。
- **Chart.js**：用於統計數據的圖表化展示。
- **Nginx**：作為靜態網頁資源的存放伺服器，並以反向代理（Reverse Proxy）的技術，將前端 Angular 應用程式的請求路由轉向後端的 Spring Boot 服務。

## Page Previews

畫面預覽，詳見於 [`dynamic-survey-ui.pdf`](https://drive.google.com/file/d/1mtj04k94K5IXrfcq_4AQXobYON9VEPkq/view?usp=sharing)。

## API Endpoints

此應用通過與後端的 RESTful API 進行交互，以下是主要的 API 端點：

### 問卷相關 API

- `POST /quiz/create`  
  創建新問卷。前端將發送包含問卷基本資料的請求。

- `POST /quiz/update`  
  更新已存在的問卷。前端發送請求以更新問卷資料。

- `POST /quiz/delete`  
  刪除問卷。用戶可選擇要刪除的問卷。

- `POST /quiz/search`  
  搜尋問卷，根據名稱、開始與結束日期等條件過濾問卷列表。

- `POST /quiz/fillin`  
  用戶填寫問卷並提交答案，並即時返回問卷回饋。

- `GET /quiz/getQuizData`  
  獲取所有問卷資料，並在前端展示問卷列表。

- `GET /quiz/getQuizDataById`  
  根據問卷 ID 獲取指定問卷資料，用於展示單個問卷的詳細信息。

- `GET /quiz/feedback`  
  根據問卷 ID 獲取問卷的回饋資料，並展示給用戶。

- `GET /quiz/statistics`  
  獲取問卷統計數據，並在前端顯示統計圖表。

### 帳戶相關 API

- `POST /account/register`  
  註冊新帳戶，並保存用戶資料。

- `POST /account/login`  
  用戶登入，根據帳號密碼進行身份驗證。

## Backend Application

後端應用負責提供用戶問卷與資料庫相關操作功能，並通過 RESTful API 與前端進行串接。

後端專案請參考 [`dynamic-survey-api`](https://github.com/rikka0823/dynamic-survey-api/tree/main)。

## Fullstack Application

採用 Docker Compose 的三層式架構（three tier architecture），前端（ui）、後端（api）、資料庫（db）個別容器化及整合的技術，簡化部署流程。

前後端整合專案請參考 [`dynamic-survey`](https://github.com/rikka0823/dynamic-survey)。
