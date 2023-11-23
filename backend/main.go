package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	readHeaderTimeoutSeconds = 3
	readBufferSize           = 1024
	writeBufferSize          = 1024
)

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		log.Println(string(p))

		if writeErr := conn.WriteMessage(messageType, p); writeErr != nil {
			log.Println(writeErr)
			return
		}
	}
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Host)

	upgrader := websocket.Upgrader{
		ReadBufferSize:  readBufferSize,
		WriteBufferSize: writeBufferSize,

		CheckOrigin: func(r *http.Request) bool { return true },
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Simple Server")
		if err != nil {
			log.Printf("Error writing response: %v", err)
			return
		}
	})

	http.HandleFunc("/ws", serveWs)
}

func main() {
	setupRoutes()

	server := &http.Server{
		Addr:              ":8080",
		ReadHeaderTimeout: readHeaderTimeoutSeconds * time.Second,
	}

	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
