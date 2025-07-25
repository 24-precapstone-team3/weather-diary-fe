# <img width="64" height="64" alt="logo192" src="https://github.com/user-attachments/assets/b5b0adee-edb7-4afe-a0a8-9156ca5e285b" /> 心の天気 - 感情記録プラットフォーム

**心の天気**は、LLMベースの感情分析および心理相談機能を導入した日記型Webアプリケーションです。  
ユーザーが日々の感情を記録し、心理的なサポートを得られるよう支援するものであり、カレンダー・ハッシュタグ・日記検索機能を通じて、記録した日記を便利に管理することができます。  

**AI**によって分析された感情とハッシュタグをもとに、ユーザーは自身の感情状態をより深く認識し、適切に表現できるようになります。

---

## 🧭 プロジェクト概要

- **期間：** 2024.09 ～ 2024.12  
- **タイプ：** Team Project (4 members) / Web Frontend  
- **担当：** UI / UX実装、Firebase Authによるログイン機能実装、Contextベースの状態管理によるバックエンドAPI連携ロジック実装、フロントエンドのデプロイ

---

## 🛠 技術スタック

| 区分 | 技術スタック |
|------|-------------------------------|
| Frontend | HTML5, CSS3, JavaScript, React |
| Backend | Node.js, Firebase Auth, OpenAI API, OpenWeather API |
| Database | MySQL |
| Infra & Deployment | AWS EC2 (Ubuntu), Firebase Hosting |
| Collaboration & Versioning | GitHub, Figma, Notion |

---

## 🎯 主な機能

### 📱 電話番号による簡単ログイン  
メールアドレスやパスワードの入力なしに、電話番号認証のみで簡単にサインアップおよびログインが同時に行えるため、スムーズで手間のかからないユーザー体験を提供します。

<p align="center">
  <img src="https://github.com/user-attachments/assets/c1c2bc39-7c35-467b-8af8-23ff1dff9cd1" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/c96802cc-7ddb-439b-a159-298e47a14cec" width="49%"/>
</p>
<br>

### 📝 感情中心の日記作成と分析  
ユーザーは自身の感情を自由に日記として記録することができ、画像のアップロードも可能です。作成された日記内容はOpenAI APIにより感情分析され、自動的にハッシュタグが生成されるとともに、該当する感情に応じた心理的フィードバックや相談を受けることが可能です。

<p align="center">
  <img src="https://github.com/user-attachments/assets/d90c7343-9aaa-4775-a5bc-777c370e4d71" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/df4d123d-9513-41cf-9544-fe5612c172d0" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/aef5cc97-16f6-418c-a00e-7028525fc0fc "width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/08828171-2ca2-4cd3-9601-7f39840727a1" width="49%"/>
</p>
<br>

### ☁️ 天気情報の自動連携  
OpenWeather APIより取得した天気情報は、画面右上にウィジェットとして表示されます。日記作成画面では、記録時点の天気が一緒に表示されるため、ユーザーが感情状態と天気との関係性を意識しながら、より没入感のある記録を行うことができます。

<p align="center">
  <img src="https://github.com/user-attachments/assets/e75e0de4-4f71-4a8d-9814-dc361a5b26cd" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/b3730101-adcd-4ea5-a765-ea2c68a5e637" width="49%"/>
</p>
<br>

### 📅 カレンダーを使った日記管理  
カレンダーを通じて、日別の感情状態および記録された日記を直感的に確認でき、任意の日付をクリックすることで、その日の内容を閲覧・編集・削除することが可能です。

<p align="center">
  <img src="https://github.com/user-attachments/assets/b9ebf3c1-72e4-4c1a-804a-eaaf6ee78b40" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/867d7903-07cf-4185-aa8a-29e796e3b693" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/47caa74a-eb90-4330-bffa-34a7bd96532f" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/25a9a740-bfa2-44fc-982a-3ca9e303654e" width="49%"/>
</p>
<br>

### 💬 心理相談機能（任意）  
記録された日記の感情タイプに応じて、AIによる心理相談を受けることができ、ユーザーに合ったアドバイスやフィードバックが提供されます。

<p align="center">
  <img src="https://github.com/user-attachments/assets/a2dcb279-43f9-4dee-826e-485e4af0a2bd" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/0845d274-fd33-4b79-9243-9eefb3545954" width="49%"/>
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/96960966-3ab1-430a-a6e0-3c22406dec1c" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/d7323ee8-7071-490d-919e-f0a6da38165a" width="49%"/>
</p>
<br>

### 📎 ハッシュタグによる検索と視覚化  
生成されたハッシュタグを基に、トピック別に日記を素早く分類・検索でき、検索結果はカレンダー上にハイライト表示され、視覚的に確認することができます。

<p align="center">
  <img src="https://github.com/user-attachments/assets/9ec0a333-00ae-4cf5-9d6e-9f721a2359db" width="49%"/>
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/922116db-535a-45b1-9a25-4663767cd421" width="49%"/>
</p>

---

## 📎 その他の情報
本ドキュメントでは、主要機能・構成・技術的な要点を中心に紹介しております。  
開発背景、課題解決の過程、学びの内容などについては、[ポートフォリオサイト](https://mesel7.dev/projects/seremeety)にてご覧いただけます。
