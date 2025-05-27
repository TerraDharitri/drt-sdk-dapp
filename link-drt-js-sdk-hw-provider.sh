#!/bin/bash

echo 'Make sure you are using Node v16^ and have node_modules installed'
# Uncomment if using nvm
# nvm use 16

# Uncomment if you want to install node_modules as well
# echo 'Installing node_modules in drtwallet-dapp'
# rm -rf node_modules
# rm -rf yarn.lock
# yar

cd ../drt-js-sdk-hw-provider

# Uncomment if you want to install node_modules as well
# echo 'Installing node_modules in drt-dapp'
# rm -rf node_modules
# rm -rf yarn.lock
# yarn

echo 'Linking drt-js-sdk-hw-provider'
npm run compile
yalc publish

echo 'Linking drt-dapp'
cd ../drt-dapp
yalc add @terradharitri/sdk-hw-provider
