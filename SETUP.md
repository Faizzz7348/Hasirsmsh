# Instruksi Setup dan Troubleshooting

## Error yang Terjadi
- Exit code 127: Command 'npm' not found
- TypeScript errors: Module dependencies tidak ditemukan

## Penyebab
Dependencies belum terinstall karena npm tidak tersedia di environment.

## Solusi

### 1. Install Node.js dan npm (jika belum ada)

**Untuk Ubuntu/Debian:**
```bash
# Update package list
sudo apt update

# Install Node.js dan npm
sudo apt install nodejs npm -y

# Verifikasi instalasi
node --version
npm --version
```

**Atau gunakan nvm (Node Version Manager) - Direkomendasikan:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verifikasi
node --version
npm --version
```

### 2. Install Dependencies Project

Setelah npm tersedia, jalankan:
```bash
cd /workspaces/Hasirsmsh
npm install
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

## Alternatif: Gunakan Package Manager Lain

### Menggunakan yarn:
```bash
# Install yarn
npm install -g yarn

# Install dependencies
yarn install

# Run dev server
yarn dev
```

### Menggunakan pnpm:
```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

## Troubleshooting Lainnya

### Jika masih ada error setelah npm install:
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Jika port 3000 sudah digunakan:
```bash
# Gunakan port lain
npm run dev -- -p 3001
```

## File-file yang Sudah Dibuat

✅ Project structure lengkap
✅ Sidebar component dengan shadcn/ui
✅ 6 tema (Default, Graphite, Twitter, Cosmic)
✅ Theme switcher
✅ Responsive design
✅ TypeScript configuration
✅ Tailwind CSS setup

Semua siap, tinggal install dependencies!
