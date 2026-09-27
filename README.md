<div align="center">

  <!-- Header Banner / Logo -->
  <br />
  <h1 align="center">❤️ CardioCare ML</h1>
  <p align="center">
    <b>Sistem Deteksi Dini Risiko Kardiovaskular Berbasis Machine Learning & Arsitektur Microservice</b>
    <br />
    <i>Dibuat untuk Mendukung Pencapaian Target PBB <b>SDGs 3: Good Health and Well-Being (Target 3.4)</b></i>
  </p>

  <!-- Badges Section -->
  <p align="center">
    <a href="https://github.com/">
      <img src="https://img.shields.io/badge/Python-3.11%20%7C%203.12-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Version" />
    </a>
    <a href="https://laravel.com/">
      <img src="https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 10" />
    </a>
    <a href="https://fastapi.tiangolo.com/">
      <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    </a>
    <a href="https://vercel.com/">
      <img src="https://img.shields.io/badge/Vercel-Serverless-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
    </a>
    <a href="https://scikit-learn.org/">
      <img src="https://img.shields.io/badge/scikit--learn-1.4+-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" alt="Scikit-Learn" />
    </a>
  </p>

  <p align="center">
    <a href="#-demo-aplikasi--arsitektur">Demo App</a> •
    <a href="#-latar-belakang--urgensi-sdgs-34">Latar Belakang</a> •
    <a href="#-dataset--fitur-klinis">Dataset</a> •
    <a href="#-evaluasi--perbandingan-6-model">Evaluasi Model</a> •
    <a href="#-panduan-instalasi--lokal">Cara Install</a>
  </p>

</div>

---

## 📌 Ringkasan Eksekutif

**CardioCare ML** adalah platform web interaktif skrining dini risiko penyakit jantung kardiovaskular. Project ini dikembangkan dengan membandingkan **6 algoritma Machine Learning Klasifikasi** pada **918 data pasien multi-center Kaggle**, serta mengintegrasikannya ke dalam arsitektur web modern yang memisahkan **Laravel 10 (Presentation & Gateway)** dan **FastAPI Python (ML Microservice di Serverless Cloud Vercel)**.

---

## 🎯 Latar Belakang & Urgensi SDGs 3.4

Penyakit kardiovaskular merupakan **penyebab kematian nomor 1 di dunia** dengan estimasi 17,9 juta jiwa meninggal setiap tahunnya (WHO). Sebagian besar kasus keterlambatan penanganan disebabkan oleh fenomena *silent ischemia* (penderita tidak menyadari gejala awal) dan terbatasnya akses pemeriksaan klinis laboratorium yang komprehensif.

Project AI ini dibangun sebagai kontribusi nyata terhadap pencapaian target PBB:
* **SDGs 3: Good Health and Well-Being**
* **Target 3.4:** *Mengurangi sepertiga dari angka kematian dini akibat penyakit tidak menular (PTM) melalui pencegahan, deteksi dini, dan penanganan kesehatan.*

---

## 🏗️ Arsitektur Sistem Dual-Stack

Aplikasi memisahkan layer antarmuka pengguna (*User Interface*) dan engine komputasi Machine Learning secara terisolasi dan mandiri:

```text
┌────────────────────────────────┐         JSON Request (Payload Pasien)         ┌────────────────────────────────┐
│   Laravel 10 Web Application   │ ───────────────────────────────────────────> │  FastAPI Python Microservice   │
│   (Shared Hosting / VPS)       │                                              │  (Vercel Serverless / Cloud)   │
│                                │ <─────────────────────────────────────────── │                                │
│  - Web Interface / UI Form     │          JSON Response (Prediction)          │  - Pipeline Preprocessing      │
│  - Request Validation & Auth   │                                              │  - StandardScaler & One-Hot    │
│  - Logging & CSRF Protection   │                                              │  - Heart Disease .pkl Model    │
└────────────────────────────────┘                                              └────────────────────────────────┘

```

---

## 📊 Dataset & Fitur Klinis

* **Sumber Data:** *Heart Failure Prediction Dataset* (Kaggle Multi-Center: Cleveland, Hungarian, Switzerland, Long Beach VA, Statlog).
* **Ukuran Sampel:** 918 baris data pasien dengan 12 atribut utama.
* **Data Wrangling:** Imputasi anomali medis `Cholesterol = 0 mg/dl` menggunakan nilai **Median (237 mg/dl)**.

| Nama Fitur | Tipe Data Asli | Deskripsi Medis & Rentang Fisiologis |
| --- | --- | --- |
| `Age` | Numerik (Int) | Usia pasien (28 - 77 tahun) |
| `Sex` | Kategorikal | Jenis Kelamin (`M`: Pria, `F`: Perempuan) |
| `ChestPainType` | Kategorikal | Tipe Nyeri Dada (`ASY`: Asymptomatic, `NAP`: Non-Anginal, `ATA`: Atypical Angina, `TA`: Typical Angina) |
| `RestingBP` | Numerik (Int) | Tekanan darah saat istirahat (mm Hg) |
| `Cholesterol` | Numerik (Int) | Kadar kolesterol serum (mg/dl) *(Auto-imputed zero to median)* |
| `FastingBS` | Biner (0/1) | Gula darah puasa > 120 mg/dl (`1` = Ya, `0` = Tidak) |
| `RestingECG` | Kategorikal | Hasil elektrokardiogram istirahat (`Normal`, `ST`, `LVH`) |
| `MaxHR` | Numerik (Int) | Detak jantung maksimum yang dicapai (60 - 202 bpm) |
| `ExerciseAngina` | Kategorikal | Nyeri dada akibat olahraga (`Y`: Ya, `N`: Tidak) |
| `Oldpeak` | Numerik (Float) | Depresi ST yang diinduksi oleh latihan relatif terhadap istirahat (0.0 - 6.0 mm) |
| `ST_Slope` | Kategorikal | Kemiringan segmen ST puncak (`Up`: Menaik, `Flat`: Datar, `Down`: Menurun) |
| **`HeartDisease`** | **Target Label** | **Diagnosa Akhir (`0` = Normal/Sehat, `1` = Berisiko Jantung)** |

---

## 📈 Evaluasi & Perbandingan 6 Model Machine Learning

Model dievaluasi menggunakan **Holdout Testing Data 20% (184 pasien)** yang terstratifikasi.

> **💡 Mengapa Recall (Sensitivitas) Adalah Gold Standard?**
> Dalam medis klinis, **False Negative** (pasien sakit jantung yang salah terdiagnosa sehat) berakibat fatal. Oleh karena itu, metrik **Recall** diutamakan untuk memastikan sebanyak mungkin pasien berisiko terdeteksi oleh sistem.

| Rank | Algoritma Machine Learning | Accuracy | Precision | Recall (Krusial) | F1-Score | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 🥇 | **Random Forest Classifier** | **88.59%** | **87.27%** | **92.31%** | **89.72%** | **Model Terpilih** |
| 🥈 | **Logistic Regression** | 85.87% | 85.19% | 89.42% | 87.25% | Benchmark |
| 🥉 | **Support Vector Machine (SVM)** | 85.87% | 84.55% | 90.38% | 87.37% | Benchmark |
| 4 | **Gaussian Naive Bayes** | 84.78% | 84.26% | 88.46% | 86.31% | Benchmark |
| 5 | **K-Nearest Neighbors (KNN)** | 83.15% | 82.57% | 87.50% | 84.96% | Benchmark |
| 6 | **Decision Tree (CART)** | 79.89% | 81.37% | 82.69% | 82.02% | Benchmark |

```text
Confusion Matrix - Random Forest (184 Data Uji):
┌──────────────────────────┬──────────────────────────┐
│ True Negative (TN): 67   │ False Positive (FP): 14  │ (Pasien Sehat)
├──────────────────────────┼──────────────────────────┤
│ False Negative (FN): 8   │ True Positive (TP): 96   │ (Pasien Sakit - RECALL 92.31%)
└──────────────────────────┴──────────────────────────┘

```

---

## 🚀 Panduan Instalasi & Pengujian Lokal

### 1. Engine Machine Learning & FastAPI (Python)

```bash
# Clone repositori ini
git clone [https://github.com/USERNAME/cardiocare-ai.git](https://github.com/USERNAME/cardiocare-ai.git)
cd cardiocare-ai

# Buat virtual environment
python -m venv venv
source venv/bin/activate  # Di Windows: .\venv\Scripts\activate

# Install dependensi
pip install -r requirements.txt

# Jalankan server FastAPI lokal
uvicorn api.index:app --reload --port 8000

```

API lokal akan berjalan di `http://127.0.0.1:8000`.

### 2. Aplikasi Web Laravel 10 (PHP)

```bash
# Masuk ke folder Laravel
cd laravel-app

# Install dependensi PHP
composer install

# Salin file environment & generate key
cp .env.example .env
php artisan key:generate

# Atur URL Vercel/FastAPI API di .env
# VERCEL_AI_API_URL="[http://127.0.0.1:8000/predict](http://127.0.0.1:800/predict)"

# Jalankan server Laravel
php artisan serve

```

Akses antarmuka web di `http://127.0.0.1:8000`.

---

## 🔒 Pemeliharaan & Mitigasi Drift Model

Model Machine Learning di lingkungan produksi tidak bersifat statis, melainkan dipantau dengan mekanisme:

1. **Logging Input Anonim:** Merekam distribusi parameter pasien harian untuk mendeteksi *Data Drift*.
2. **Scheduled Retraining:** Pelatihan ulang terintegrasi setiap 6-12 bulan dengan penambahan sampel medis terbaru.
3. **Threshold Alert:** Peringatan otomatis jika nilai Recall evaluasi turun di bawah 90%.

---

## 👨‍💻 Pengembang Project

* **Nama:** Student Ilmu Komputer
* **Spesialisasi:** Machine Learning Researcher & Full-Stack Web Engineer
* **Tujuan Project:** Tugas Akhir / Portofolio Akademik AI & Web Integration

---
