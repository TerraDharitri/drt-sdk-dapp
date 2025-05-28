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

echo "cd drt-sdk-dapp..."
cd drt-sdk-dapp
git checkout development

echo "Installing dependencies for drt-dapp..."
yarn install

echo "Building drt-sdk-dapp..."
yarn build

echo "Publishing drt-sdk-dapp..."
cd dist
yalc publish
cd ../..


# Consume drt-dapp in drttemplate-dapp
git clone https://github.com/TerraDharitri/drt-sdktemplate-dapp.git

echo "cd drt-template-dapp..."
cd drt-template-dapp

echo "Installing dependencies drttemplate-dapp..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-dapp

echo "Building drttemplate-dapp..."
yarn build:devnet


# Consume drt-dapp in drttemplate-dapp-nextjs
git clone https://github.com/TerraDharitri/drt-sdktemplate-dapp-nextjs.git

echo "cd drttemplate-dapp-nextjs..."
cd drt-template-dapp-nextjs

echo "Installing dependencies drttemplate-dapp-nextjs..."
yarn install

echo "Linking drt-sdk-dapp..."
yalc add @terradharitri/sdk-sdk-dapp

echo "Building drt-template-dapp-nextjs..."
yarn build-devnet

echo "Script executed successfully!"
