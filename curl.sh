#!/bin/bash
# url="${1:-https://httpbin.org/status/200}"
url="${1:-https://www.ratemycafeteria.org}"
code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
echo "$code"
