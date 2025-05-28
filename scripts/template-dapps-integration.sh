#!/bin/sh

# Exit with nonzero exit code if anything fails
set -e

# Install prerequisites
echo "Installing yarn..."
npm install --global yarn

echo "Installing yalc..."
npm install --global yalc

# Prepare drt-sdk-dapp for publishing
echo "Cloning drt-sdk-dapp..."
git clone https://github.com/TerraDharitri/drt-sdk-dapp.git

echo "cd drt-sdk-dapp..."
cd drt-sdk-dapp

# Only try to checkout if the branch exists
if git show-ref --quiet refs/heads/development; then
  git checkout development
else
  echo "Branch 'development' not found. Skipping checkout."
fi

echo "Installing dependencies for drt-sdk-dapp..."
yarn install

echo "Building drt-sdk-dapp..."
yarn build

echo "Publishing drt-sdk-dapp..."
cd dist
yalc publish
cd ../..

# Consume drt-sdk-dapp in drt-tempelate-dapp
echo "Cloning drt-tempelate-dapp..."
git clone https://github.com/TerraDharitri/drt-tempelate-dapp.git

echo "cd drt-tempelate-dapp..."
cd drt-tempelate-dapp

echo "Installing dependencies for drt-tempelate-dapp..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-tempelate-dapp..."
yarn build:devnet
cd ..

# Consume drt-sdk-dapp in drt-tempelate-dapp-nextjs
echo "Cloning drt-tempelate-dapp-nextjs..."
git clone https://github.com/TerraDharitri/drt-tempelate-dapp-nextjs.git

echo "cd drt-tempelate-dapp-nextjs..."
cd drt-tempelate-dapp-nextjs

echo "Installing dependencies for drt-tempelate-dapp-nextjs..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-tempelate-dapp-nextjs..."
yarn build-devnet

echo "Script executed successfully!"
