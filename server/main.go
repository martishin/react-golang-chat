package main

import (
	"log"
	"net/http"
	"react-go-chat/internal/websocket"
	"time"
)

const (
	readHeaderTimeoutSeconds = 3
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	log.Println("WebSocket endpoint hit")
	ws, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Printf("WebSocket upgrade error: %+v\n", err)
		http.Error(w, "Could not upgrade to WebSocket", http.StatusInternalServerError)
		return
	}

	client := &websocket.Client{
		Conn: ws,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	log.Println("Realtime Chat App v0.01")
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
