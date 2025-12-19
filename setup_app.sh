#!/bin/bash
set -e

APP_DIR="app"

# Ako folder postoji, izbriši ga (sveže kreiranje)
if [ -d "$APP_DIR" ]; then
  rm -rf "$APP_DIR"
fi

echo "=== Kreiranje Ionic/React aplikacije ==="

# Kreiraj folder i inicijalizuj npm
mkdir "$APP_DIR"
cd "$APP_DIR"
npm init -y

# Dodaj minimalne scripts sekcije u package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
pkg.scripts = {
  start: 'react-scripts start',
  build: 'react-scripts build'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Instaliraj react i react-scripts
npm install react react-dom react-scripts

# Kreiraj minimalni index.js i index.html
mkdir -p src
cat > src/index.js << 'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
const App = () => <h1>Moja Ionic/React App</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
EOF

mkdir -p public
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Moja App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOF

echo "Setup gotov. App folder spreman za build."
