#!/bin/sh


echo "Installing yarn packages..."
echo "Please wait untill completion.."

yarn install

if [ $? -eq 0 ]; then
  echo "Yarn install completed successfully."
else
  echo "Yarn install failed."
  exit 1
fi


echo "Starting the frontend..."
exec yarn dev
