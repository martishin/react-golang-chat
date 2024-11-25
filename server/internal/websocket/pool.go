package websocket

import (
	"log"
)

const (
	UserConnectionType = 2
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
	History    []Message
	Stopped    chan struct{}
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
		History:    make([]Message, 0),
		Stopped:    make(chan struct{}),
	}
}

func (pool *Pool) handleRegister(client *Client) {
	pool.Clients[client] = true
	log.Println("New client connected: ", client)
	for _, message := range pool.History {
		if err := client.Conn.WriteJSON(message); err != nil {
			log.Println(err)
		}
	}
	joinMessage := Message{Type: UserConnectionType, Body: "New user joined"}
	pool.History = append(pool.History, joinMessage)
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(joinMessage); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) handleUnregister(client *Client) {
	delete(pool.Clients, client)
	log.Println("Client disconnected: ", client)
	disconnectMessage := Message{Type: UserConnectionType, Body: "User disconnected"}
	pool.History = append(pool.History, disconnectMessage)
	for client := range pool.Clients {
		if err := client.Conn.WriteJSON(disconnectMessage); err != nil {
			log.Println(err)
		}
	}
}

func (pool *Pool) handleBroadcast(message Message) {
	log.Println("Sending message to all clients in Pool:", message)
	pool.History = append(pool.History, message)
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
		case <-pool.Stopped:
			return
		}
	}
}

func (pool *Pool) Stop() {
	close(pool.Stopped)
}
