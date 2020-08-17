#!/usr/bin/env bash

COMMAND=$1

if [[ $COMMAND == "enable" ]]; then
  echo "Configuração de proxy npm local"
  echo "Para desabilitar: ./scripts/registry.sh disable"
  npm set registry http://ubuntu.gui:4873
fi

if [[ $COMMAND == "disable" ]]; then
  npm config delete registry
  CURRENT_NPM_REGISTRY=`npm config get registry`

  echo "Revertendo registros"
  echo " > NPM: $CURRENT_NPM_REGISTRY"
fi