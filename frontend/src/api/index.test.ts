describe("WebSocket API", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockWebSocket: any
  let originalWebSocket: typeof WebSocket

  beforeEach(() => {
    originalWebSocket = global.WebSocket
    mockWebSocket = {
      send: jest.fn(),
      addEventListener: jest.fn((event, callback) => {
        if (event === "open") {
          callback()
        }
      }),
      close: jest.fn(),
      CONNECTING: WebSocket.CONNECTING,
      OPEN: WebSocket.OPEN,
      CLOSING: WebSocket.CLOSING,
      CLOSED: WebSocket.CLOSED,
      readyState: WebSocket.OPEN,
    }
    global.WebSocket = jest
      .fn()
      .mockImplementation(() => mockWebSocket) as unknown as typeof WebSocket
  })

  afterEach(() => {
    global.WebSocket = originalWebSocket
    jest.clearAllMocks()
  })

  test("connect should open a WebSocket connection", () => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { connect } = require("./index")
      connect(() => {})
      expect(global.WebSocket).toHaveBeenCalledWith("ws://localhost:8080/ws")
    })
  })

  test("sendMsg should send a message over the WebSocket connection", () => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { connect, sendMsg } = require("./index")
      connect(() => {})
      sendMsg("Test message")
      expect(mockWebSocket.send).toHaveBeenCalledWith("Test message")
    })
  })
})
