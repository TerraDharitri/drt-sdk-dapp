#!/bin/sh

# Exit with nonzero exit code if anything fails
set -e

# Install prerequisites
echo "Installing yarn..."
npm install --global yarn
echo "Installing yalc..."
npm install -global yalc


# Prepare drt-dapp for publishing
git clone https://github.com/TerraDharitri/drt-sdk-dapp.git

echo "cd drt-dapp..."
cd drt-dapp
git checkout development

echo "Installing dependencies for drt-dapp..."
yarn install

echo "Building drt-dapp..."
yarn build

echo "Publishing drt-dapp..."
cd dist
yalc publish
cd ../..


# Consume drt-dapp in drt-template-dapp
git clone https://github.com/TerraDharitri/drt-sdk-template-dapp.git

echo "cd drt-template-dapp..."
cd drt-template-dapp

echo "Installing dependencies drt-template-dapp..."
yarn install

echo "Linking drt-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-template-dapp..."
yarn build:devnet


# Consume drt-dapp in drt-template-dapp-nextjs
git clone https://github.com/TerraDharitri/drt-sdk-template-dapp-nextjs.git

echo "cd drt-template-dapp-nextjs..."
cd drt-template-dapp-nextjs

echo "Installing dependencies drt-template-dapp-nextjs..."
yarn install

echo "Linking drt-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drt-template-dapp-nextjs..."
yarn build-devnet

echo "Script executed successfully!"
