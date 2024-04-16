#!/usr/bin/env bash

# Function to start the server
start_server() {
    # Check if a server is already running on port 8081
    if lsof -i:8081 >/dev/null; then
        echo "Server already running on port 8081"
        exit 1
    fi

    # Start Python HTTP server in the background, redirecting all output to /dev/null
    cd public
    nohup python3 -m http.server 8081 &>/dev/null &
    echo "Server started on port 8081"
}

# Function to stop the server
stop_server() {
    # Find the process using port 8081 and kill it
    local pid=$(lsof -ti:8081)
    if [ -z "$pid" ]; then
        echo "No server running on port 8081"
        exit 1
    fi

    kill $pid
    echo "Server stopped"
}

# Main script execution starts here
case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac

