package websocket

import (
	"log"
)

type Connection interface {
	WriteJSON(v interface{}) error
	ReadMessage() (messageType int, p []byte, err error)
	Close() error
}

type Client struct {
	ID   string
	Conn Connection
	Pool *Pool
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		err := c.Conn.Close()
		if err != nil {
			log.Println(err)
			return
		}
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
		log.Printf("Message Received: %+v\n", message)
	}
}
