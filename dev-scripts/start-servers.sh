#!/usr/bin/env bash

# ============================================> VARS
## CUSTOMIZE THESE FOR json-server
JSRV_LOGFILE="./dev-scripts/json-server.log"
JSRV_PORT="8081"
JSRV_DBFILE="./api/database.json"

## CUSTOMIZE THESE FOR serve
SRV_LOGFILE="./dev-scripts/serve.log"
SRV_PORT="8080"
SRV_SRCDIR="./src"

# ============================================> FUNC
pid_of() {
    RESULT=$(ps | grep -v 'grep' | grep "$1" | cut -d ' ' -f 2)
}

# ============================================> EXEC
## no errors aloud!!1!
set -e

# init stuff
echo "Clearing the json-server log file: $JSRV_LOGFILE"     && echo "" > $JSRV_LOGFILE
echo "Clearing the serve log file: $SRV_LOGFILE"            && echo "" > $SRV_LOGFILE

# clear out stuck processes that might interfere with serving
SERVE8081=$(pid_of "serve.*-l 8081")
[[ -n $SERVE8081 ]] && pkill $SERVE8081

# serve it up and alert user of ports
serve -n -l $SRV_PORT $SRV_SRCDIR > $SRV_LOGFILE 2>&1 & 
echo "Started 'serve' on port $SRV_PORT -- see $SRV_LOGFILE for more details"
json-server -p $JSRV_PORT --watch $JSRV_DBFILE > $JSRV_LOGFILE 2>&1 & 
echo "Started 'json-server' on port $JSRV_PORT -- see $JSRV_LOGFILE for more details"

echo -e "\nPress ctrl+c to exit!" && wait
