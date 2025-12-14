```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /spa
    server-->>browser: HTML, CSS, JS

    browser->>server: GET /data.json
    server-->>browser: Notes JSON

    Note right of browser: JavaScript renders notes

```