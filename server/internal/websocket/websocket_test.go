package websocket_test

import (
	"encoding/base64"
	"net/http"
	"net/http/httptest"
	"react-go-chat/internal/websocket"
	"testing"
)

func TestUpgrade(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		conn, _ := websocket.Upgrade(w, r)
		if conn == nil {
			t.Errorf("Upgrade() conn = %v, want non-nil", conn)
		}
	}))
	defer server.Close()

	client := &http.Client{}
	req, _ := http.NewRequest(http.MethodGet, server.URL, nil)
	req.Header.Add("Connection", "upgrade")
	req.Header.Add("Upgrade", "websocket")
	req.Header.Add("Sec-Websocket-Version", "13")
	req.Header.Add("Sec-WebSocket-Key", base64.StdEncoding.EncodeToString([]byte("random1234567890")))

	_, err := client.Do(req)
	if err != nil {
		t.Fatalf("Client.Do() error = %v, want nil", err)
	}
}
