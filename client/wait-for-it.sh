#!/bin/sh
# wait-for-it.sh: Wait for a host/port to become available.

set -e

# The host to wait for is the first argument
host="$1"
# The rest of the arguments are the command to run
shift
cmd="$@"

# Loop until we can make a TCP connection to the host on port 5000
until nc -z "$host" 5000; do
  >&2 echo "Backend is unavailable - sleeping"
  sleep 1
done

# Once the connection is successful, execute the main command
>&2 echo "Backend is up - executing command"
exec $cmd

