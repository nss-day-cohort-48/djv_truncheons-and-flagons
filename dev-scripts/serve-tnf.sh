#!/usr/bin/env bash

pid_of() {
    RESULT=$(ps | grep -v 'grep' | grep "$1" | cut -d ' ' -f 2)
    [[ -n RESULT ]] && echo "$RESULT"
}

set -e

SRV_PORT="8080"
JSRV_PORT="8081"
WORKING_DIR="djv_truncheons-and-flagons"

JSRV_LOGFILE="./dev-scripts/json-server.log"
SRV_LOGFILE="./dev-scripts/serve.log"

# init stuff
echo "Clearing the json-server log file: $JSRV_LOGFILE"     && echo "" > $JSRV_LOGFILE
echo "Clearing the serve log file: $SRV_LOGFILE"            && echo "" > $SRV_LOGFILE
mkdir -p api && ./dev-scripts/init-database.sh

# clear out stuck processes that might interfere with serving
SERVE8081=$(pid_of "serve.*-l 8081")
[[ -n $SERVE8081 ]] && pkill $SERVE8081

# serve it up and alert user of ports
serve -n -l $SRV_PORT src > $SRV_LOGFILE 2>&1 & 
echo "Started 'serve' on port $SRV_PORT -- see $SRV_LOGFILE for more details"
json-server -p $JSRV_PORT --watch api/db.json > $JSRV_LOGFILE 2>&1 & 
echo "Started 'json-server' on port $JSRV_PORT -- see $JSRV_LOGFILE for more details"

echo -e "\nPress ctrl+c to exit!" && wait
