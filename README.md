# Inventory App

## Contents

1. [Summary](#summary)
1. [Getting started](#getting-started)
   1. [Requirements](#requirements)
   1. [Installation](#installation)
   1. [Running locally](#running-locally)
   1. [NPM scripts cheatsheet](#npm-scripts-cheatsheet)

## Summary

This is a mobile app which connects to Quick Base and enables customers to manage their inventory needs.

The app is created with Expo and written in React Native, which allows for a consistent user experience on both iOS and Android devices.

## Getting started

### Requirements

- node - version used `v16.13.2`
- npm - version used `8.1.2`
- Expo CLI and Expo GO - https://docs.expo.dev/get-started/installation/
- Xcode - to run the app on iOS simulator.
- Android Studio - to run the app on Android emulator.

### Installation

1. Clone the repo and open it in your terminal.
1. Run `npm install` to install all dependencies
1. Install Expo GO app on your device

### Running locally

`expo start` will start the Metro bundler and reveal several options to proceed:

- Pressing `i` opens the app on iOS simulator
- Pressing `a` opens the app on Android

- You can also scan the QR provided in the terminal with the Expo GO app on your device to launch the app automatically

## NPM Scripts Cheatsheet

- `npm run start` - same as `expo start`
- `npm run ios` - runs the app on iOS
- `npm run android` - runs the app on Android
- `npm test` - runs the tests
