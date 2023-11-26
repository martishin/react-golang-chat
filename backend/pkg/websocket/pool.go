package websocket

import (
	"log"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) handleRegister(client *Client) {
	pool.Clients[client] = true
	log.Println("New client connected: ", client)
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."}); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) handleUnregister(client *Client) {
	delete(pool.Clients, client)
	log.Println("Client disconnected: ", client)
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected"}); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) handleBroadcast(message Message) {
	log.Println("Sending message to all clients in Pool:", message)
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(message); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.handleRegister(client)
		case client := <-pool.Unregister:
			pool.handleUnregister(client)
		case message := <-pool.Broadcast:
			pool.handleBroadcast(message)
		}
	}
}
