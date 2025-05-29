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

echo "Checking out main branch..."
git checkout main

echo "Installing dependencies for drt-sdk-dapp..."
yarn install

echo "Building drt-sdk-dapp..."
yarn build

echo "Publishing drt-sdk-dapp..."
cd dist
yalc publish
cd ../..

# Consume drt-sdk-dapp in drt-template-dapp
echo "Cloning drt-sdk-template-dapp..."
git clone https://github.com/TerraDharitri/drt-sdk-template-dapp.git

echo "cd drt-template-dapp..."
cd drt-sdk-template-dapp

echo "Installing dependencies for drt-template-dapp..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-template-dapp..."
yarn build:devnet

cd ..

# Consume drt-sdk-dapp in drt-template-dapp-nextjs
echo "Cloning drt-sdk-template-dapp-nextjs..."
git clone https://github.com/TerraDharitri/drt-sdk-template-dapp-nextjs.git

echo "cd drt-template-dapp-nextjs..."
cd drt-sdk-template-dapp-nextjs

echo "Installing dependencies for drt-template-dapp-nextjs..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-template-dapp-nextjs..."
yarn build-devnet

echo "Script executed successfully!"
