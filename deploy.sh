#!/bin/bash
echo deploying to ....
echo ssh ?
echo 45.79.200.191
IPADDR=45.79.200.191

ssh bootladdergiggles "rm -rf /opt/deploys/htmldsl"
scp -r frontend/dist root@$IPADDR:/opt/deploys/htmldsl
echo done
