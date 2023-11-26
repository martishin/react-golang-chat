package websocket_test

import (
	"react-go-chat/pkg/websocket"
	"reflect"
	"sync"
	"testing"
)

type MockConn struct{}

func (MockConn) WriteJSON(interface{}) error {
	return nil
}

func (MockConn) ReadMessage() (messageType int, p []byte, err error) {
	return 0, nil, nil
}

func (MockConn) Close() error {
	return nil
}

func TestNewPool(t *testing.T) {
	pool := websocket.NewPool()
	if pool.Register == nil || pool.Unregister == nil || pool.Clients == nil ||
		pool.Broadcast == nil || pool.History == nil {
		t.Errorf("NewPool() = %v, want non-nil fields", pool)
	}
}

func TestPool_handleRegister(t *testing.T) {
	pool := websocket.NewPool()
	client := &websocket.Client{Conn: MockConn{}}

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer pool.Stop()
		pool.Register <- client
	}()

	pool.Start()

	if _, ok := pool.Clients[client]; !ok {
		t.Errorf("Client was not registered")
	}

	if len(pool.History) != 1 || pool.History[0].Type != websocket.UserConnectionType ||
		pool.History[0].Body != "New user joined" {
		t.Errorf("Registration message was not added to history")
	}
}

func TestPool_handleUnregister(t *testing.T) {
	pool := websocket.NewPool()
	client := &websocket.Client{}
	pool.Clients[client] = true

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer pool.Stop()
		pool.Unregister <- client
	}()

	pool.Start()

	if _, ok := pool.Clients[client]; ok {
		t.Errorf("Client was not unregistered")
	}

	if len(pool.History) != 1 || pool.History[0].Type != websocket.UserConnectionType ||
		pool.History[0].Body != "User disconnected" {
		t.Errorf("Unregistration message was not added to history")
	}
}

func TestPool_handleBroadcast(t *testing.T) {
	pool := websocket.NewPool()
	message := websocket.Message{Type: 1, Body: "Test message"}

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer pool.Stop()
		pool.Broadcast <- message
	}()

	pool.Start()

	if len(pool.History) != 1 || !reflect.DeepEqual(pool.History[0], message) {
		t.Errorf("Message was not added to history")
	}
}
