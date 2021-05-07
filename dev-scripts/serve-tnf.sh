#!/usr/bin/env bash

set -e

JSRV_LOGFILE="./dev-scripts/json-server.log"
JSRV_PORT="8080"
SRV_LOGFILE="./dev-scripts/serve.log"
SRV_PORT="8081"
WORKING_DIR="djv_truncheons-and-flagons"


# check to make sure we're in the right directory
[[ $(basename $(pwd)) != $WORKING_DIR ]] && echo please run me from $WORKING_DIR && exit 1

# init stuff
echo "Clearing the json-server log file: $JSRV_LOGFILE"     && echo "" > $JSRV_LOGFILE
echo "Clearing the serve log file: $SRV_LOGFILE"            && echo "" > $SRV_LOGFILE
mkdir -p api
./dev-scripts/init-database.sh

serve -n -l $SRV_PORT > $SRV_LOGFILE 2>&1 & 
echo "Started 'serve' on port $SRV_PORT -- see $SRV_LOGFILE for more details"
json-server -p $JSRV_PORT --watch api/db.json > $JSRV_LOGFILE 2>&1 & 
echo "Started 'json-server' on port $JSRV_PORT -- see $JSRV_LOGFILE for more details"

echo -e "\nPress ctrl+c to exit!" && wait
