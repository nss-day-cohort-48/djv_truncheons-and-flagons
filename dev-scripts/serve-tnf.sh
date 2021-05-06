#!/usr/bin/env bash

JSRV_LOGFILE=./dev-scripts/json-server.log
SRV_LOGFILE=./dev-scripts/serve.log
WORKING_DIR=djv_truncheons-and-flagons

# check to make sure we're in the right directory
[[ $(basename $(pwd)) != $WORKING_DIR ]] && echo please run me from $WORKING_DIR && exit 1

# init stuff
echo "Clearing the json-server log file: $JSRV_LOGFILE"     && echo "" > $JSRV_LOGFILE
echo "Clearing the serve log file: $SRV_LOGFILE"            && echo "" > $SRV_LOGFILE
mkdir -p api
./dev-scripts/init-database.sh

serve -n -l 8081 > $SRV_LOGFILE 2>&1 & 
echo "Started 'serve' on port 8081 -- see $SRV_LOGFILE for more details"
json-server -p 8080 api/db.json > $JSRV_LOGFILE 2>&1 & 
echo "Started 'json-server' on port 8088 -- see $JSRV_LOGFILE for more details"

echo -e "\nPress ctrl+c to exit!" && wait