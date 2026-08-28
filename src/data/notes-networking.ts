import type { TopicNote } from "@/data/notes";

export const notesNetworking: TopicNote = {
  topic: "networking",
  title: "Networking — techniques (beginner)",
  blurb:
    "A network is people posting letters through layers of wrapping. Memorise OSI layers, TCP versus UDP, and well-known ports. On every “which layer?” question, name the address type: port, IP, MAC, or bits. A firewall is a policy on those addresses; NAT rewrites private IPs so many hosts share one public number.",
  blocks: [
    {
      heading: "OSI seven layers",
      body: "The OSI model is seven wrappers around a message. The sender walks 7 → 1 adding a header at each floor; the receiver walks 1 → 7 peeling them. Think of posting a letter: you write the letter (application), choose language/format (presentation), agree a conversation (session), pick registered post or a postcard (transport), write the street address (network), put it in a van-local envelope (data link), and send voltages or light (physical).\n\nPDU names: bits, frame, packet, TCP segment / UDP datagram, then data. TCP/IP’s four layers squash OSI 5–7 into “Application” and 1–2 into “Link”.",
      howTo: [
        "Map the clue: URL/HTTP → 7; encoding/encryption-format → 6; dialogue/RPC → 5; port → 4; IP/router/TTL → 3; MAC/switch/CRC → 2; cable/hub/bits → 1.",
        "Write the wrappers going down: HTTP → TCP ports → IP addresses → Ethernet MACs → bits.",
        "Each hop rewrites only the L2 envelope. Destination IP stays (until NAT).",
        "If the paper says ISO/OSI, use seven names. If it says TCP/IP, do not invent Presentation.",
      ],
      bullets: [
        "7 Application — HTTP FTP SMTP DNS SSH. 6 Presentation — format, compression, encryption.",
        "5 Session — dialogue. 4 Transport — TCP/UDP, ports. 3 Network — IP, routers.",
        "2 Data Link — Ethernet, MAC, switches, frames. 1 Physical — cables, hubs, bits.",
      ],
      examples: [
        {
          title: "Which layer? Five clues",
          prompt:
            "(i) next-hop IP (ii) add dest MAC and CRC (iii) browser HTTP (iv) UTF-8 and compress (v) deliver to port 443.",
          steps: [
            {
              do: "(i) Network (ii) Data Link (iii) Application (iv) Presentation (v) Transport.",
              why: "IP/routing, MAC/frame, user protocol, syntax, ports. Address types: IP / MAC / URL / encoding / port.",
            },
            {
              do: "HTTPS is still Application data plus a Presentation/TLS story. “Port 443” alone is Transport.",
              why: "The stem’s noun picks the layer. Port versus HTTP method are different floors.",
            },
            {
              do: "A switch speaks frames (L2). A hub speaks bits (L1). A router speaks packets (L3).",
              why: "Device class is a layer hint.",
            },
          ],
          result:
            "(i) Network (ii) Data Link (iii) Application (iv) Presentation (v) Transport.",
        },
        {
          title: "Headers going down the stack",
          prompt:
            "HTTP GET to 203.0.113.10 port 80 over Ethernet. What address does each layer name?",
          steps: [
            {
              do: "L7: GET text (Host name is data). L4: dest port 80, ephemeral source port. L3: dest IP 203.0.113.10. L2: dest MAC of the gateway on this LAN, not the server’s MAC. L1: bits.",
              why: "The server is not on your Ethernet. The van-local envelope is for the next hop. The street address (IP) stays on the letter.",
            },
            {
              do: "At the next router the frame is stripped and a new L2 header is built. TTL drops by 1. L7–L4 stay.",
              why: "Only the local envelope changes each hop, like swapping trucks.",
            },
            {
              do: "DNS already turned the name into an IP before this send.",
              why: "The GET itself does not carry a binary IP — that is the IP header’s job.",
            },
          ],
          result:
            "HTTP data → TCP (ports) → IP (IPs) → Ethernet (MACs + CRC) → bits. Each hop rewrites L2; dest IP survives until NAT or the host.",
        },
        {
          title: "PDU vocabulary",
          prompt:
            "Fill: bits, frame, packet, segment, datagram. Which two words both describe a UDP L4 unit? Which device speaks frames but not packets?",
          steps: [
            {
              do: "L1 bits, L2 frame, L3 packet (also called IP datagram), L4 TCP segment / UDP datagram, L5–7 data.",
              why: "“IP datagram” is L3 and must not be confused with UDP’s L4 datagram. If they say segment, they mean TCP.",
            },
            {
              do: "UDP L4 unit = datagram. A switch forwards frames by MAC; it does not inspect IP. A hub is even lower: bits.",
              why: "A switch is a smart post-sorter for local envelopes. A hub is a loudspeaker.",
            },
            {
              do: "TCP/IP Application = OSI 5+6+7. TCP/IP Internet = OSI 3. TCP/IP Link = OSI 1+2.",
              why: "HTTP is Application in both models. Read the stem for which stack they want.",
            },
          ],
          result:
            "UDP L4 = datagram. A switch forwards frames, not IP packets. TCP/IP Application collapses OSI 5–7.",
        },
        {
          title: "Device to layer in one line",
          prompt:
            "Hub, switch, router, HTTP browser, TLS record, TCP port. Name the OSI floor for each.",
          steps: [
            {
              do: "Hub = 1 Physical (bits to every port). Switch = 2 Data Link (MAC). Router = 3 Network (IP).",
              why: "Each box speaks one address type: bits, MAC, or IP.",
            },
            {
              do: "HTTP browser = 7 Application. TLS as a format/lock on the bytes = 6 Presentation (exam mapping). TCP port = 4 Transport.",
              why: "The user protocol, the encoding/lock, and the port are three different wrappers.",
            },
            {
              do: "If the paper uses TCP/IP not OSI: HTTP+TLS sit in Application, TCP in Transport, IP in Internet, Ethernet in Link.",
              why: "Do not invent a Presentation layer when the stem said TCP/IP.",
            },
          ],
          result:
            "Hub 1, switch 2, router 3, HTTP 7, TLS/format 6, TCP port 4. Address type picks the floor.",
        },
        {
          title: "Same hop, five wrappers",
          prompt:
            "You send https://example.com from a laptop. List the five names the packet carries, bottom to top, on the first hop to the home gateway.",
          steps: [
            {
              do: "L1 bits on Wi-Fi or Ethernet. L2 dest MAC = gateway. L3 dest IP = example.com’s address. L4 dest port 443. L7 HTTP inside TLS.",
              why: "The van envelope is local (MAC). The street address is the server IP. The apartment number is 443.",
            },
            {
              do: "Source port is ephemeral (e.g. 49152). Source IP is the laptop’s private address until NAT.",
              why: "Return traffic needs a ticket back to this browser tab.",
            },
            {
              do: "At the gateway NAT may rewrite the source IP/port. Dest IP and dest port 443 stay (until a proxy).",
              why: "Only the local or edge envelope changes. The server still sees port 443.",
            },
          ],
          result:
            "Bits → gateway MAC → server IP → TCP/443 → HTTP/TLS. First-hop dest MAC is the gateway, not the server.",
        },
      ],
    },
    {
      heading: "TCP versus UDP",
      body: "TCP is registered post: you set up a connection (handshake), every byte is numbered, losses are resent, order is kept. Use it for web pages, mail, SSH. Header at least 20 bytes. UDP is a postcard: send and hope. No handshake, no retry, no order. Tiny 8-byte header. Use it for DNS queries, DHCP, live voice — late packets are junk.\n\nBoth are layer 4 and both use port numbers. Reliability is not encryption. Flow control protects the receiver (window). Congestion control protects the shared road (cwnd). UDP has neither unless the app adds them.",
      howTo: [
        "Need every byte, in order → TCP. Need speed / broadcast / live media → UDP.",
        "seq/ack/window/flags in a dump → TCP, not UDP, not IP.",
        "“Faster?” → UDP has less overhead; a lost UDP packet stays lost.",
        "Zone transfer and HTTP/3 are named exceptions (DNS AXFR is TCP; HTTP/3 is QUIC on UDP).",
      ],
      bullets: [
        "TCP: connection, handshake, reliable, ordered, flow+congestion, segment, 20 B header.",
        "UDP: no connection, no retry, datagram, 8 B header, DNS/DHCP/VoIP.",
        "Both: ports. Reliability ≠ encryption. Flow = receiver; congestion = network.",
      ],
      examples: [
        {
          title: "Pick TCP or UDP",
          prompt:
            "(i) DNS query (ii) HTTP/1.1 page (iii) DHCP discover (iv) SSH (v) live voice.",
          steps: [
            {
              do: "UDP, TCP, UDP, TCP, UDP.",
              why: "Small Q/R and broadcast → UDP. Complete ordered bytes → TCP. Late voice packets are useless so UDP plus a jitter buffer, not TCP retries.",
            },
            {
              do: "Tick UDP for DNS unless the stem says zone transfer (AXFR is TCP) or truncated retry.",
              why: "The default query is UDP/53. Exceptions are named.",
            },
            {
              do: "Grade-A keys still want HTTP on TCP unless they name HTTP/3.",
              why: "HTTP/3/QUIC rides UDP, but the unmarked stem is TCP/80 or TCP/443.",
            },
          ],
          result:
            "UDP, TCP, UDP, TCP, UDP. DNS/DHCP/voice = UDP; web/SSH = TCP.",
        },
        {
          title: "Read a TCP dump line",
          prompt:
            "src=49152 dst=80 seq=1000 ack=5000 flags=PSH,ACK window=64240. Protocol? Who is the server? What is seq?",
          steps: [
            {
              do: "seq, ack, flags, window exist only in TCP. Dest port 80 → HTTP server. Client owns ephemeral 49152. Direction client → server.",
              why: "Well-known port 80 is the bound service. The random high port is the client’s temporary ticket.",
            },
            {
              do: "seq=1000 is the first byte number of this payload in the client’s stream, not “packet 1000”.",
              why: "TCP counts bytes, like numbering every letter in a book, not every envelope.",
            },
            {
              do: "ack=5000 means “I have server bytes through 4999, next expected 5000”. Window is flow control: how much more the client can take.",
              why: "Flow control protects one host’s buffer. Congestion control (cwnd) is a different knob.",
            },
          ],
          result:
            "TCP client→server HTTP. seq is a byte number. Server is the port-80 side. UDP has none of these fields.",
        },
        {
          title: "Flow control versus congestion control",
          prompt:
            "Receiver advertises window=0. Routers drop packets and sender cwnd halves. Which is which? Does UDP have either?",
          steps: [
            {
              do: "window=0 is flow control (receiver full). cwnd halving is congestion control (shared path is busy).",
              why: "One protects a desk’s in-tray. The other protects the highway. TCP sends at most min(rwnd, cwnd).",
            },
            {
              do: "UDP has neither built in. A careless UDP sender can flood a link.",
              why: "Postcard has no “stop, my mailbox is full” card unless the application invents one.",
            },
            {
              do: "Slow start is congestion control, not flow control. Do not mix the words.",
              why: "Favourite wrong option: “flow control = slow start”.",
            },
          ],
          result:
            "window=0 → flow (receiver). cwnd halving → congestion (network). UDP has neither built in.",
        },
        {
          title: "Header size and what is missing in UDP",
          prompt:
            "TCP header ≥ 20 bytes, UDP 8 bytes. Which TCP fields are absent in UDP? Why can a 40-byte DNS query still prefer UDP?",
          steps: [
            {
              do: "UDP has source port, dest port, length, checksum — 8 bytes. No seq, no ack, no flags, no window.",
              why: "A postcard does not number pages or book a conversation.",
            },
            {
              do: "TCP’s extra 20+ bytes plus a handshake are worth it when every byte must arrive in order (HTTP, SSH).",
              why: "Reliability is a feature you pay for. DNS queries are tiny and can retry at the app.",
            },
            {
              do: "A lost UDP DNS packet is not resent by the network stack. The resolver times out and asks again.",
              why: "‘UDP is faster’ means less overhead, not ‘it magically arrives’.",
            },
          ],
          result:
            "UDP: 4 fields, 8 bytes, no seq/ack/window. Tiny DNS stays UDP; bulk reliable bytes stay TCP.",
        },
        {
          title: "Connection words: handshake versus a datagram",
          prompt:
            "Stem says ‘connection-oriented, ordered, retransmission’. Other stem says ‘one request, one reply, no setup’. Protocols and an example each?",
          steps: [
            {
              do: "First stem is TCP: three-way handshake, byte stream, retries. Example HTTP/1.1 or SSH.",
              why: "Registered post: agree, number every byte, resend losses.",
            },
            {
              do: "Second stem is UDP: no handshake. Example DNS query or DHCP discover.",
              why: "Postcard: send and hope. The app may add its own retry.",
            },
            {
              do: "Both still write port numbers. ‘Connection’ does not mean ‘encrypted’. TLS can ride on TCP (or QUIC on UDP).",
              why: "Reliability and encryption are different jobs.",
            },
          ],
          result:
            "Connection/order/retry → TCP (HTTP, SSH). No setup, one Q/R → UDP (DNS, DHCP). Ports on both.",
        },
      ],
    },
    {
      heading: "IP, TTL, and longest prefix",
      body: "IP is the network-layer letter: source IP, destination IP, TTL (hop budget), payload. It does not handshake and does not resend. IPv4 is 32 bits (dotted), IPv6 128 bits. Private RFC1918 ranges (10/8, 172.16/12, 192.168/16) need NAT to talk to the public web.\n\nA router looks up the destination with longest prefix match, decrements TTL, and wraps a new L2 header. TTL=0 dies and ICMP Time Exceeded comes back — that is traceroute. ARP asks “who has this local IP?” and gets a MAC. DNS asks “what IP is this name?”. Routing asks “which next hop for this IP?”. Three different lookups.",
      howTo: [
        "Classify the address: private / public / loopback 127/8 / link-local 169.254 / multicast 224/4.",
        "Longest matching prefix wins, even if another route is “bigger”.",
        "Off-subnet → default gateway, then ARP for the gateway’s MAC. Packet dest IP stays the server.",
        "Ping is ICMP (L3 signalling), not TCP, not an application protocol in OSI terms.",
      ],
      bullets: [
        "IPv4 32-bit, IPv6 128-bit. Best-effort packet. TTL per hop.",
        "Private: 10/8, 172.16/12, 192.168/16. Longest-prefix routing.",
        "ARP: IPv4→MAC on-link. ICMP: ping and errors, still L3.",
      ],
      examples: [
        {
          title: "Which addresses need NAT?",
          prompt:
            "Classify 192.168.5.9, 8.8.8.8, 127.0.0.1, 169.254.1.1, 172.31.255.1, 224.0.0.1.",
          steps: [
            {
              do: "192.168.5.9 and 172.31.255.1 are private → NAT to go public. 8.8.8.8 is public. 127.0.0.1 never leaves the host. 169.254.1.1 is link-local (DHCP failed). 224.0.0.1 is multicast.",
              why: "Private is “house numbering”. Public is “street numbering”. Loopback is talking to yourself. Link-local is a hallway-only name.",
            },
            {
              do: "A public router must not accept 192.168.x as a source on the Internet.",
              why: "Those ranges are reserved so every home can reuse them behind NAT.",
            },
            {
              do: "You do not HTTP to a multicast address as a unicast web dest.",
              why: "Wrong class of address for a website.",
            },
          ],
          result:
            "NAT needed: 192.168.5.9, 172.31.255.1. Public: 8.8.8.8. Loopback: 127.0.0.1. Link-local: 169.254.1.1. Multicast: 224.0.0.1.",
        },
        {
          title: "Longest prefix match",
          prompt:
            "Table: 0.0.0.0/0 → A, 10.0.0.0/8 → B, 10.1.0.0/16 → C, 10.1.2.0/24 → D. Where do 10.1.2.5, 10.2.0.1, 8.8.8.8 go?",
          steps: [
            {
              do: "10.1.2.5 matches /8, /16, /24, /0 → longest /24 → D.",
              why: "The most specific street wins, like “12 Baker Street” beating “Baker Street” beating “London”.",
            },
            {
              do: "10.2.0.1 is in /8 not /16 → B. 8.8.8.8 only matches default → A.",
              why: "10.1.0.0/16 does not cover 10.2. Default is the leftover bin.",
            },
            {
              do: "A switch would not do this: it has no IP table. A router would.",
              why: "Longest prefix is the IP forwarding rule — layer 3.",
            },
          ],
          result: "10.1.2.5 → D (/24). 10.2.0.1 → B (/8). 8.8.8.8 → A (default).",
        },
        {
          title: "DNS then route then ARP",
          prompt:
            "Host 192.168.1.10/24, gateway 192.168.1.1, wants https://example.com. Order the lookups.",
          steps: [
            {
              do: "DNS: name → 203.0.113.10. Route: dest not on 192.168.1.0/24 → next hop 192.168.1.1. ARP: 192.168.1.1 → gateway MAC.",
              why: "Three questions: what IP is the name, which neighbour do I hand the packet to, what MAC is that neighbour using today?",
            },
            {
              do: "Frame dest MAC is the gateway. Packet dest IP is still the server.",
              why: "ARP never rewrites IPs. Routing never changes the DNS name.",
            },
            {
              do: "If dest were 192.168.1.20 (same subnet), skip the gateway and ARP for 192.168.1.20 directly.",
              why: "On-link means “they share this hallway”.",
            },
          ],
          result:
            "DNS (name→IP), then route (IP→next-hop IP), then ARP (next-hop IP→MAC). Packet dest IP stays the server.",
        },
        {
          title: "TTL expires: traceroute’s trick",
          prompt:
            "A packet is sent with TTL=1, then TTL=2, toward 8.8.8.8. What comes back, from whom, and at which layer is ICMP?",
          steps: [
            {
              do: "First hop (home gateway) decrements TTL 1→0, drops the packet, sends ICMP Time Exceeded to you. That names hop 1.",
              why: "TTL is a hop budget, not a timer in seconds. Traceroute repeats with a bigger budget to list the path.",
            },
            {
              do: "TTL=2 dies at the next router. Eventually a hop delivers to 8.8.8.8 (or you see ICMP Echo Reply if it was ping).",
              why: "Each probe is a new packet. Routers on the path are not ‘remembering traceroute’.",
            },
            {
              do: "ICMP is network-layer signalling (L3), not an application like HTTP. Ping is ICMP, not TCP.",
              why: "Favourite trap: ‘ping is layer 7’.",
            },
          ],
          result:
            "TTL=1 → ICMP Time Exceeded from hop 1. ICMP is L3. Traceroute maps the path by growing TTL.",
        },
        {
          title: "ARP is not DNS and not routing",
          prompt:
            "Host wants 192.168.1.20 on its own /24. Empty ARP cache. Which lookup happens? Which two lookups do not?",
          steps: [
            {
              do: "Dest is on-link, so no default gateway and no DNS (you already have the IP). ARP broadcast: who has 192.168.1.20? Reply is that host’s MAC.",
              why: "ARP answers ‘what local envelope for this neighbour IP?’",
            },
            {
              do: "DNS would run if you had a name, not an IP. Routing/longest-prefix would run if the dest were off-subnet.",
              why: "Three different questions. Do not mix the tables.",
            },
            {
              do: "The IP packet’s dest IP stays 192.168.1.20. Only the Ethernet dest MAC is filled from ARP.",
              why: "ARP never rewrites IPs. NAT is the box that rewrites IPs.",
            },
          ],
          result:
            "On-link: ARP only. Not DNS, not the default route. Dest IP unchanged; dest MAC from ARP.",
        },
      ],
    },
    {
      heading: "Hub, switch, router, gateway, firewall",
      body: "A hub is a loudspeaker: every bit out every port, one collision domain, layer 1. A switch is a smart sorter: learns MACs, sends a frame only to the right port, each port its own collision domain, still one broadcast domain unless you VLAN. A router is layer 3: strips L2, looks up IP, new L2 header, splits broadcasts.\n\nGateway in exam English often means a protocol translator (mail gateway, L7). People also call the default router “the gateway”. If options distinguish them: gateway = dissimilar protocols, router = IP hops. A firewall filters by policy (packet / stateful / application). It is not a substitute for TLS.",
      howTo: [
        "Who rewrites what: hub copies bits; switch uses MAC, same IP; router uses IP, new frame, TTL−1.",
        "Collisions: hub shares one; switch splits per port; broadcasts die at the router.",
        "Stem “dissimilar protocols” → gateway. Stem “decrements TTL” → router.",
        "Firewall 5-tuple: protocol, src IP/port, dest IP/port. Stateful remembers TCP established.",
      ],
      bullets: [
        "Hub L1: bits to all, one collision domain.",
        "Switch L2: MAC table, per-port collision domain, one broadcast domain.",
        "Router L3: IP lookup, splits broadcasts. Gateway: protocol conversion (or “default gateway” = your router).",
      ],
      examples: [
        {
          title: "Which box rewrites which header?",
          prompt:
            "A frame with an IP packet goes through a hub, then a switch, then a router.",
          steps: [
            {
              do: "Hub: bits, no MAC, no IP. Switch: dest MAC → port, IP untouched. Router: dest IP → next hop, TTL−1, new Ethernet header (new MACs).",
              why: "Think loudspeaker, then local sorter, then city post office that puts a new van envelope on.",
            },
            {
              do: "End-to-end MACs change at every router hop. IPs (without NAT) do not. A switch hop changes neither.",
              why: "The letter’s street address stays; the van label changes.",
            },
            {
              do: "Filtering ≠ rewriting. A transparent firewall may look and still forward the same IPs.",
              why: "Policy is not the same as NAT.",
            },
          ],
          result:
            "Hub = bits. Switch = MAC, frame preserved. Router = IP, new frame, TTL−1.",
        },
        {
          title: "Default gateway versus mail gateway",
          prompt:
            "Host default gateway 192.168.1.1. A mail gateway translates SMTP to an internal API. Layers? Device class?",
          steps: [
            {
              do: "192.168.1.1 is the default route’s next hop — a router (L3). Config screens still call the field “Default Gateway”.",
              why: "That box forwards IP when the dest is off-subnet.",
            },
            {
              do: "Mail/payment gateway that changes protocol is Application-layer (L7) conversion — a true gateway in the exam contrast.",
              why: "If both words appear: dissimilar protocols → gateway; IP hops / TTL → router.",
            },
            {
              do: "A firewall may sit on the same appliance. Name the function the stem asked for.",
              why: "One box, several jobs. Tick the job.",
            },
          ],
          result:
            "Default gateway 192.168.1.1 = L3 router. Mail gateway = L7 converter.",
        },
        {
          title: "Allow HTTPS out",
          prompt:
            "Internal 10.0.0.0/8 to any public HTTPS server. Why is UDP/443 a different allow? Stateful vs stateless?",
          steps: [
            {
              do: "Allow TCP 10.0.0.0/8:* → *:443 outbound. Stateful firewall then allows established replies without a second guess.",
              why: "Replies come back src 443 → the client’s high port. State tracks that conversation.",
            },
            {
              do: "UDP dest 443 is QUIC/HTTP3 or any UDP tunnel — a separate decision. Last rule deny-all.",
              why: "Opening UDP/443 is not “the same HTTPS”. Without deny-all, an allow on a default-allow box does nothing useful.",
            },
            {
              do: "This is L3/L4. It cannot stop malware HTTPS to a bad server on 443 — that needs L7 inspect.",
              why: "A port allow is not antivirus.",
            },
          ],
          result:
            "Allow TCP 10/8 → *:443 out plus stateful established back. UDP/443 is separate. Last rule deny-all.",
        },
        {
          title: "Collision domain versus broadcast domain",
          prompt:
            "Five PCs on one hub. Then those PCs each on a switch port. Then a router between two switches. Who shares collisions? Who shares broadcasts?",
          steps: [
            {
              do: "Hub: one collision domain (all five share the shout) and one broadcast domain.",
              why: "A hub is a loudspeaker. Everyone hears bits and broadcasts.",
            },
            {
              do: "Switch: five collision domains (one per port) but still one broadcast domain (ARP ff:ff:ff:ff:ff:ff is flooded).",
              why: "A switch splits collisions, not broadcasts, unless you VLAN.",
            },
            {
              do: "Router: two broadcast domains. A broadcast on LAN A does not cross to LAN B. Each LAN keeps its own ARP world.",
              why: "Broadcasts die at L3. That is a reason we subnet.",
            },
          ],
          result:
            "Hub: 1 collision + 1 broadcast. Switch: per-port collisions, 1 broadcast. Router: splits broadcasts.",
        },
        {
          title: "Firewall is policy, router is forwarding",
          prompt:
            "A box has an IP table and also drops TCP/23. Is it a router, a firewall, or both? What does ‘stateful’ add?",
          steps: [
            {
              do: "Forwarding by dest IP (TTL−1, new MAC) is the router job. Dropping Telnet 23 is a firewall job. Home gateways do both.",
              why: "One appliance, two functions. Tick the function the stem asked.",
            },
            {
              do: "Stateless: each packet is judged alone (5-tuple). Stateful: after an inside TCP handshake, replies are allowed as ‘established’ without a second guess.",
              why: "State remembers the conversation, like a receptionist who already signed you in.",
            },
            {
              do: "A filter is not NAT. NAT rewrites addresses. A transparent firewall may leave IPs unchanged.",
              why: "Policy ≠ rewrite. Need both sentences when the stem mixes them.",
            },
          ],
          result:
            "IP hop = router. Port drop = firewall. Stateful allows established replies. NAT is a third job.",
        },
      ],
    },
    {
      heading: "Ethernet CSMA/CD and Token Ring",
      body: "Classic shared Ethernet uses CSMA/CD: listen before talking, if two talk at once abort, send a jam, wait a random growing time (binary exponential backoff), retry. Minimum 64-byte frame so you are still talking when the collision echo returns. Switched full-duplex Ethernet has no shared shout — CSMA/CD sleeps.\n\nToken Ring (802.5) passes a token; only the holder may send. No collisions by design, fair under load, mostly historical. If the stem says collision/jam/backoff → Ethernet. If it says token/deterministic → Token Ring.",
      howTo: [
        "Walk CSMA/CD: sense idle → send → detect → jam → backoff → retry. 64-byte min ↔ max cable length.",
        "Hub: collisions. Full-duplex switch port: no CD. Autoneg to a hub brings CD back.",
        "Broadcast MAC ff:ff:ff:ff:ff:ff is flooded in the VLAN; routers do not pass it to another subnet.",
        "EtherType 0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6.",
      ],
      bullets: [
        "CSMA/CD: listen, send, detect, jam, exponential backoff.",
        "Hubs collide; full-duplex switch ports do not.",
        "Token Ring: token holder transmits, no CD, deterministic. MAC 48-bit, broadcast all-FFs.",
      ],
      examples: [
        {
          title: "One collision on a hub",
          prompt:
            "Stations A and B share a hub. Both sense idle and send. Five steps until a retry. Why 64-byte minimum?",
          steps: [
            {
              do: "Both listen, hear silence, transmit. Hub mixes the voltages. Each hears a mess, aborts, jams, then waits k slot times with k random in 0..2^r−1.",
              why: "Carrier sense + multiple access + collision detection. Jam so late listeners also drop the fragment. Backoff spreads retries so they do not collide forever.",
            },
            {
              do: "A must still be transmitting when B’s colliding bits arrive, else A would think it succeeded. That is the 64-byte minimum + max length pair.",
              why: "If you finish the shout before the echo, you cannot hear the crash.",
            },
            {
              do: "Switched full-duplex skips this dance. Two sends at once are queued in the switch, not jammed.",
              why: "There is no shared coaxial tap. Each cable is a private lane.",
            },
          ],
          result:
            "Listen → both send → detect → jam → exponential backoff. 64-byte min so CD can work. Switched full-duplex skips it.",
        },
        {
          title: "Token Ring versus hub Ethernet under load",
          prompt:
            "Ten stations always have a frame ready. Contrast utilisation. Who transmits when?",
          steps: [
            {
              do: "Token Ring: token rotates; each sends in turn. Fair, no CD, latency bounded.",
              why: "One talking-stick. Two data frames are not legally on the ring at once.",
            },
            {
              do: "Hub Ethernet: collisions explode, backoff windows grow, useful utilisation can collapse.",
              why: "Many stations sensing “idle” will crash together. Classic “non-deterministic under load”.",
            },
            {
              do: "A modern switch gives each station a private wire — Ethernet then beat Token Ring on speed and price. Syllabus still wants both algorithms.",
              why: "Exam: collision/backoff → Ethernet CSMA/CD. Token/deterministic → 802.5.",
            },
          ],
          result:
            "Token Ring stays fair and collision-free under load. Hub Ethernet collides and backs off. Switched Ethernet also avoids collisions.",
        },
        {
          title: "Broadcast Ethernet frame",
          prompt:
            "Dest ff:ff:ff:ff:ff:ff, src 00:11:22:33:44:55, EtherType 0x0806 (ARP). Who receives it on a switched LAN?",
          steps: [
            {
              do: "Every NIC in the VLAN accepts it. The switch floods all ports except ingress and learns the source MAC on the ingress port.",
              why: "All-FFs is “everyone in this hall”. A router will not forward it to another subnet.",
            },
            {
              do: "The PDU is a frame (Data Link). ARP’s job (IP↔MAC) sits on the L2/L3 boundary, but the header you were shown is L2.",
              why: "Answer the layer of the bytes they printed.",
            },
            {
              do: "A hub would also deliver it to everyone, but would not learn a MAC table.",
              why: "Learning is the switch’s extra.",
            },
          ],
          result:
            "Broadcast frame, flooded in the VLAN. Data Link. EtherType 0x0806 = ARP. Routers do not pass it between subnets.",
        },
        {
          title: "Binary exponential backoff after two collisions",
          prompt:
            "A and B collide, r=1. They collide again, r=2. What is the backoff window in slot times? Why random?",
          steps: [
            {
              do: "After the first collision r=1, pick k in 0..1 (2¹−1). After the second, r=2, pick k in 0..3 (2²−1) slot times.",
              why: "The window doubles so two stubborn stations are less likely to pick the same k again.",
            },
            {
              do: "Random matters: if both always waited 1 slot they would collide forever.",
              why: "Backoff without randomness is just a scheduled crash.",
            },
            {
              do: "Give up after a cap (classic 16 tries). Switched full-duplex never runs this loop.",
              why: "CSMA/CD is the shared-medium algorithm, not modern full-duplex Ethernet’s daily life.",
            },
          ],
          result:
            "r=1 → k in 0..1. r=2 → k in 0..3. Window 2^r−1. Random so retries spread.",
        },
        {
          title: "Why CSMA/CD sleeps on a full-duplex switch port",
          prompt:
            "Laptop — switch, both ends full-duplex, no hub. Two frames at once, opposite directions. Collision? Jam?",
          steps: [
            {
              do: "No shared coaxial tap. Send and receive use separate lanes (or the switch queues). There is nothing to ‘hear as a mess’.",
              why: "Collision detection needs a shared shout. Full-duplex removed the shout.",
            },
            {
              do: "The switch may buffer. That is queuing, not a CD jam. No exponential backoff on the wire.",
              why: "Do not draw jam/backoff on a modern switched exam topology unless they put a hub back in.",
            },
            {
              do: "If autoneg falls back to a hub or half-duplex, CSMA/CD returns. The algorithm follows the medium.",
              why: "Device class (hub vs switch) picks the story.",
            },
          ],
          result:
            "Full-duplex switch port: no CD, no jam. Buffering ≠ collision. Hub/half-duplex brings CD back.",
        },
      ],
    },
    {
      heading: "Application protocols and ports",
      body: "Memorise port, transport, and one-line job. DNS 53 UDP (queries) / TCP (zone transfers). SMTP 25 (server mail). POP3 110 (download, often delete). IMAP 143 (folders stay on the server). FTP 21 control (20 data). HTTP 80. HTTPS 443. SSH 22. Telnet 23. DHCP 67/68 UDP.\n\nIMAP keeps mail on the server for two phones. POP typically pulls it down. SFTP is not FTP — it is SSH file transfer on 22. HTTPS is HTTP inside TLS, same language, locked envelope, port 443.",
      howTo: [
        "Verb in the stem: send between MTAs → SMTP 25; folders on server → IMAP 143; download-and-delete → POP 110; resolve a name → DNS 53; encrypted page → HTTPS 443.",
        "TLS twins: POP3S 995, IMAPS 993, SMTPS 465. SSH 22 ≠ Telnet 23.",
        "FTP active data is inbound to the client (NAT-hostile). Passive is client-outbound. SFTP: one TCP/22.",
        "HTTPS-direct uses dest 443. A non-intercepting observer sees IPs/ports, not the HTTP path.",
      ],
      bullets: [
        "DNS 53. SMTP 25. POP 110. IMAP 143. FTP 21/20. HTTP 80. HTTPS 443. SSH 22.",
        "IMAP keeps folders on the server; POP typically downloads.",
        "FTP ≠ SFTP. HTTPS = HTTP + TLS on 443.",
      ],
      examples: [
        {
          title: "Fill the port table",
          prompt:
            "(i) encrypted web (ii) name query (iii) mail between MTAs (iv) folders on server (v) download-and-delete (vi) FTP control.",
          steps: [
            {
              do: "443 HTTPS, 53 DNS, 25 SMTP, 143 IMAP, 110 POP3, 21 FTP control.",
              why: "Encrypted web is still HTTP data, just in TLS on 443. IMAP vs POP is the highest-yield mail pair.",
            },
            {
              do: "SFTP would be 22 — a different protocol, not “FTP on 22”. FTPS is FTP + TLS and still two channels.",
              why: "The exam loves that distinction.",
            },
            {
              do: "DNS queries UDP/53; AXFR and truncated retries use TCP/53.",
              why: "Same port, different transport when the answer is bulk or too big.",
            },
          ],
          result:
            "443 HTTPS, 53 DNS, 25 SMTP, 143 IMAP, 110 POP3, 21 FTP. Remember TLS twins 995/993/465 and SSH 22.",
        },
        {
          title: "Send mail, then read it on IMAPS",
          prompt:
            "Phone submits mail, servers relay, another device reads folders. Ports in order?",
          steps: [
            {
              do: "Phone → submission 587 or 465 (auth). Sending MTA DNS/53 for MX, then SMTP/25 to the recipient MX. Store. Recipient client IMAPS/993.",
              why: "Clients rarely speak to the dest MX on 25 (blocked, needs auth). Server-to-server is 25. Reading shared folders is IMAP, not POP.",
            },
            {
              do: "POP3S/995 with delete-on-download would hide the mail from the second device.",
              why: "That is why corporates prefer IMAP.",
            },
            {
              do: "No POP/IMAP runs during the SMTP hop — the message is just sitting in the store.",
              why: "Sending and reading are different protocols.",
            },
          ],
          result:
            "Submit 587/465 → DNS 53 MX → SMTP 25 → store → IMAPS 993. POP would download (and maybe delete).",
        },
        {
          title: "Active FTP dies on NAT; SFTP does not",
          prompt:
            "FTP control 21. Active: server connects back to the client for data. Passive: client connects out to a server port. Which fails through home NAT? What does SFTP do?",
          steps: [
            {
              do: "Active data is inbound to the client — NAT and client firewalls drop it. Passive is outbound — usually allowed.",
              why: "Home NAT only has mappings for conversations the inside started, unless you port-forward.",
            },
            {
              do: "SFTP uses one SSH TCP/22. No second channel, no FTP ALG. It is not FTP.",
              why: "One hose through the firewall. That is the operational replacement.",
            },
            {
              do: "FTPS still has two channels and is painful with TLS (the ALG cannot rewrite hidden PORT/PASV).",
              why: "Encrypting FTP commands blinds the helper that used to fix NAT.",
            },
          ],
          result:
            "Active FTP data dies on NAT. Passive is client-outbound. SFTP on 22 avoids a second channel. FTP 21/20 ≠ SFTP 22.",
        },
        {
          title: "Well-known versus ephemeral ports",
          prompt:
            "Client 192.168.1.10:51732 talks to 93.184.216.34:443. Which side is the server? Who chose 51732? After close, can another app reuse 443?",
          steps: [
            {
              do: "443 is well-known HTTPS — the bound service, the server. 51732 is ephemeral — the client’s temporary source port.",
              why: "Well-known ports (0–1023, plus familiar 1433/3306/…) name the application. High ports are tickets for one conversation.",
            },
            {
              do: "The OS picked 51732 from a pool so two browser tabs do not share the same 5-tuple.",
              why: "A connection is protocol + two IPs + two ports. The extra number multiplexes clients.",
            },
            {
              do: "Port 443 on the server stays bound. Many clients share dest 443 with different source ports. After a client close, 51732 goes back to the pool (after TIME-WAIT on TCP).",
              why: "The service port does not move just because one client left.",
            },
          ],
          result:
            "Server = :443. Client chose ephemeral 51732. 443 stays the service; the high port is per-connection.",
        },
        {
          title: "DNS 53, mail 25/143/110, remote 22/23 — pick four",
          prompt:
            "(i) SSH (ii) Telnet (iii) IMAP folders (iv) SMTP between servers. Why is 22 encrypted and 23 not, by syllabus default?",
          steps: [
            {
              do: "22 SSH, 23 Telnet, 143 IMAP, 25 SMTP.",
              why: "Remote shell pair and mail pair are high-yield. Do not swap IMAP 143 with POP 110.",
            },
            {
              do: "SSH encrypts the session (and can carry SFTP on the same 22). Telnet 23 is cleartext — passwords on the wire.",
              why: "That is why Telnet is a museum piece and a finding in audits.",
            },
            {
              do: "SMTP 25 is server-to-server. User submission is often 587/465. Same family, different door.",
              why: "Read ‘between MTAs’ versus ‘phone sends mail’.",
            },
          ],
          result:
            "SSH 22, Telnet 23, IMAP 143, SMTP 25. SSH is encrypted; Telnet is not. SFTP is 22, not FTP 21.",
        },
      ],
    },
    {
      heading: "TCP three-way handshake",
      body: "TCP setup is three segments: SYN (I want to talk, my start number is x) → SYN-ACK (I agree, my start is y, I heard x+1) → ACK (I heard y+1). Then ESTABLISHED. Each SYN eats one sequence number even with no payload. Think “knock, knock-back, thanks”.\n\nClose is four segments (each direction hangs up with FIN). RST aborts. SYN flood: many SYNs, no third ACK, backlog fills. UDP has no handshake — one datagram each way for a tiny DNS query.",
      howTo: [
        "Write flags, seq, ack. ack of a SYN is peer_seq+1. First data uses the next byte numbers.",
        "Client: SYN-SENT → ESTABLISHED. Server: LISTEN → SYN-RECEIVED → ESTABLISHED.",
        "SYN flood fills SYN-RECEIVED. Defence: SYN cookies, rate limits.",
        "UDP DNS: two datagrams, no SYN. TCP DNS only for truncation, zone transfer, DoT.",
      ],
      bullets: [
        "SYN (seq=x) → SYN-ACK (seq=y, ack=x+1) → ACK (seq=x+1, ack=y+1).",
        "SYN consumes one sequence number. Close: FIN/ACK × 2. RST aborts.",
        "SYN flood = many SYNs, no third ACK. UDP: no handshake.",
      ],
      examples: [
        {
          title: "Handshake with numbers",
          prompt:
            "Client ISN=1000, server ISN=5000. Three segments. Then client sends 100 bytes. seq/ack of that data? Server’s next ack?",
          steps: [
            {
              do: "SYN seq=1000. SYN-ACK seq=5000 ack=1001. ACK seq=1001 ack=5001.",
              why: "Each SYN counts as one imaginary byte. ack = the number you next expect.",
            },
            {
              do: "First data: seq=1001, length 100 (bytes 1001..1100), ack=5001. Server ACK ack=1101.",
              why: "Byte counting, not packet counting. If you wrote ack=1001 after the data you forgot the 100 bytes.",
            },
            {
              do: "Textbook draws the third ACK alone. Real stacks may piggy-back it on the first data.",
              why: "Same numbers either way.",
            },
          ],
          result:
            "SYN 1000; SYN-ACK 5000/1001; ACK 1001/5001. Data seq=1001 ack=5001. Next server ack=1101.",
        },
        {
          title: "SYN flood",
          prompt:
            "Attacker sends millions of SYNs to port 80 with spoofed sources, never the third ACK. What fills up? Two defences?",
          steps: [
            {
              do: "Each SYN holds a small control block in SYN-RECEIVED. Spoofed sources never complete. Backlog full → real clients dropped (DoS).",
              why: "The missing piece is the third ACK. The handshake is half-open on purpose.",
            },
            {
              do: "SYN cookies encode state in the ISN and allocate a real block only when the matching ACK arrives. Also rate-limit SYNs.",
              why: "Do not store a chair for a guest who will never sit down.",
            },
            {
              do: "This is Transport-layer DoS. UDP has no SYN flood; it has amplification floods instead.",
              why: "Different protocol, different abuse.",
            },
          ],
          result:
            "SYN-RECEIVED backlog exhausts. Defences: SYN cookies, rate limits. The missing piece is the third ACK.",
        },
        {
          title: "Why UDP DNS has no handshake",
          prompt:
            "40-byte DNS query, 80-byte answer. Contrast opening TCP. When does DNS still use TCP?",
          steps: [
            {
              do: "UDP: one datagram each way, one RTT, no SYN, no TIME-WAIT.",
              why: "A postcard does not book a conversation. Fine for a tiny lookup.",
            },
            {
              do: "TCP would add SYNs and later FINs before/after the same tiny Q/R — wasteful, so queries default to UDP.",
              why: "TCP’s extra trips buy reliability and large messages you do not need for 40 bytes.",
            },
            {
              do: "DNS uses TCP for truncated answers (TC bit), zone transfers, and DNS-over-TLS 853.",
              why: "Bulk or “please send the rest” — then the registered-post path is worth it.",
            },
          ],
          result:
            "UDP DNS = two datagrams, no handshake. TCP for truncation, AXFR, DoT — not for a normal tiny query.",
        },
        {
          title: "Four-way close versus RST",
          prompt:
            "Each side still has data it might send. Why can close take four segments? When is RST the right word?",
          steps: [
            {
              do: "TCP is two one-way streams. FIN says ‘I will send no more’. The peer may still send. So: FIN, ACK of that FIN, later FIN the other way, ACK. Four segments.",
              why: "Hanging up one phone while the other person is still talking. Each direction closes itself.",
            },
            {
              do: "If the peer’s FIN is piggy-backed with its ACK you may see three packets; the exam still wants the four-step idea.",
              why: "Same flags, maybe combined.",
            },
            {
              do: "RST aborts: no orderly FIN, discard state. Used on a closed port or a smashed session. Not a graceful close.",
              why: "Reset is ‘slam the door’, not ‘goodbye’.",
            },
          ],
          result:
            "Close: FIN/ACK each way (four segments). RST aborts. Handshake is three; close is four.",
        },
        {
          title: "ISN is not ‘packet 1’",
          prompt:
            "Client ISN=4000, no payload on SYN. After the handshake, client sends 3 bytes ‘GET’. Sequence numbers of SYN, third ACK, and the data?",
          steps: [
            {
              do: "SYN seq=4000 (consumes 1). Third ACK seq=4001. Data seq=4001, bytes 4001..4003.",
              why: "SYN ate the imaginary byte 4000. First real payload starts at ISN+1.",
            },
            {
              do: "Server ack after those 3 bytes is 4004 (next expected).",
              why: "TCP counts bytes, not packets. Three letters move the number by 3.",
            },
            {
              do: "Do not write ‘seq=1 for the first packet’. ISNs are random (or cookie-encoded) on purpose.",
              why: "Predictable ISNs were an old attack. Exams still use small numbers for traces.",
            },
          ],
          result:
            "SYN 4000; ACK seq=4001; data seq=4001 length 3; next ack=4004. Byte counts, not packet counts.",
        },
      ],
    },
    {
      heading: "NAT: sharing one public IP",
      body: "NAT rewrites addresses at the edge. Home PAT/NAPT: many private hosts share one public IPv4, distinguished by ports — like a building’s front desk that rewrites apartment numbers into one street address plus a ticket. Outbound creates a mapping; replies use it. Unsolicited inbound dies unless you port-forward (DNAT).\n\nNAT saves IPv4 and hides internal numbers. It does not encrypt, and it is not a full firewall. PAT is L3 (IPs) plus L4 (ports). Checksums must be updated.",
      howTo: [
        "Draw inside 5-tuple, WAN 5-tuple, table row. Dest IP of the server usually stays. Source IP (and maybe port) change on the way out.",
        "No mapping ⇒ drop inbound SYN. DNAT 80→inside:80 makes a server reachable.",
        "NAT ≠ TLS ≠ firewall. Malware inside can still phone home (outbound PAT works).",
        "Switches/hubs cannot PAT. IPv4 header checksum and TCP/UDP checksums must refresh.",
      ],
      bullets: [
        "PAT: many private IPs → one public IP, distinguished by ports.",
        "Outbound creates a mapping; unsolicited inbound is dropped. Port-forward = DNAT.",
        "Not encryption, not a complete firewall. Conserves IPv4, breaks end-to-end (active FTP).",
      ],
      examples: [
        {
          title: "PAT table for one HTTPS flow",
          prompt:
            "Inside 10.0.0.8:51000 → 93.184.216.34:443. NAT public 198.51.100.2. WAN packet after SNAT?",
          steps: [
            {
              do: "WAN: src 198.51.100.2:40000 (example port) dst 93.184.216.34:443. Table maps 10.0.0.8:51000 ↔ that WAN port.",
              why: "Private source is not globally routable. Dest stays the server. Ports multiplex many insides onto one public IP.",
            },
            {
              do: "Server replies to 198.51.100.2:40000. NAT reverse-maps dest to 10.0.0.8:51000.",
              why: "The server only knows the public ticket, like posting back to the front desk.",
            },
            {
              do: "A second inside host with the same 51000 gets a different WAN port.",
              why: "That is how many-to-one is possible.",
            },
          ],
          result:
            "WAN src 198.51.100.2:40000 dst 93.184.216.34:443. Reply is reverse-mapped to the private host.",
        },
        {
          title: "Inbound without a mapping dies",
          prompt:
            "External SYN to 198.51.100.2:80, web server is 10.0.0.8:80 behind PAT, no port-forward. Then with DNAT?",
          steps: [
            {
              do: "No table row for this new conversation. NAT cannot pick which inside host. Drop.",
              why: "PAT mappings are born from outbound (or from an explicit rule). A house PC is not a web server by accident.",
            },
            {
              do: "DNAT: wan:80 → 10.0.0.8:80. Rewrites destination inbound; replies still SNAT on the way out.",
              why: "Port-forward is “send ticket 80 to apartment 8”. Opposite field to SNAT.",
            },
            {
              do: "A load balancer is DNAT (or an L7 proxy) onto a pool.",
              why: "Same idea, several insides.",
            },
          ],
          result:
            "Without a mapping, inbound SYN dies. DNAT 80→10.0.0.8:80 makes the server reachable. PAT alone is outbound-only.",
        },
        {
          title: "NAT is not encryption",
          prompt:
            "A candidate says “we have NAT so traffic is confidential and we can skip TLS and the firewall”. List what is still wrong.",
          steps: [
            {
              do: "NAT rewrites addresses; HTTP on 80 is still clear on the WAN. Confidentiality is TLS.",
              why: "The front desk changes the envelope, not the letter.",
            },
            {
              do: "Malware inside can still phone home — outbound PAT helps it. UPnP/port-forwards reopen inbound.",
              why: "Hiding numbers is not a policy engine and not antivirus.",
            },
            {
              do: "PAT = L3+L4. IPv4 and TCP checksums must be updated. A pure L2 switch cannot NAT.",
              why: "Ports live at transport. Changing IPs/ports without fixing checksums kills the connection.",
            },
          ],
          result:
            "NAT hides addresses and conserves IPv4. It does not encrypt, does not stop outbound malware, and is not a complete firewall. Still use TLS and a real filter.",
        },
        {
          title: "Two inside hosts, one public IP",
          prompt:
            "10.0.0.8:51000 and 10.0.0.9:51000 both fetch the same HTTPS site. Public 198.51.100.2. How does NAT tell the replies apart?",
          steps: [
            {
              do: "Both cannot keep WAN source 198.51.100.2:51000 toward the same dest. NAT remaps at least one to a free WAN port (e.g. 40000 and 40001).",
              why: "The 5-tuple on the WAN must be unique. Ports are the multiplex tickets.",
            },
            {
              do: "Reply to :40000 reverse-maps to .8:51000. Reply to :40001 reverse-maps to .9:51000.",
              why: "The table row is the whole trick. The server never sees 10.0.0.0/8.",
            },
            {
              do: "If the two insides talk to different dest IPs, some NATs could keep 51000 on both — still unique 5-tuples. Exam default: show two WAN ports.",
              why: "Uniqueness is on the full tuple, but drawing two ports is the safe story.",
            },
          ],
          result:
            "PAT assigns distinct WAN ports. Replies demux by dest port on the public IP. Same inside port is fine.",
        },
        {
          title: "NAT layer: why a switch cannot PAT",
          prompt:
            "PAT rewrites IPv4 source and a TCP port. Which layers? Why must checksums change? Why will an L2-only switch fail this?",
          steps: [
            {
              do: "IPv4 header is L3; TCP/UDP ports are L4. PAT is L3+L4. Ethernet MACs are rewritten by the router hop anyway, not as the NAT idea.",
              why: "Apartment number (port) plus street address (IP) both change at the front desk.",
            },
            {
              do: "IPv4 header checksum covers the IP header. TCP/UDP checksums cover a pseudo-header that includes IPs and the ports. Both must be recomputed.",
              why: "Stale checksums make the next hop drop the packet as corrupt.",
            },
            {
              do: "A pure L2 switch has no IP table and no port rewrite. It only matches MACs. NAT lives on a router/firewall edge.",
              why: "Wrong box, wrong layer.",
            },
          ],
          result:
            "PAT = L3 IPs + L4 ports. Refresh IPv4 and TCP/UDP checksums. A switch cannot NAT.",
        },
      ],
    },
    {
      heading: "Firewall rules and NAT together",
      body: "A firewall is a bouncer with a list: allow or drop using protocol, IPs, and ports (the 5-tuple). Default deny means ‘if no line matches, drop’. Stateful inspection remembers TCP that already shook hands, so replies do not need a matching inbound allow for every high port.\n\nNAT is a different job on the same edge box: rewrite private IPs (and ports) to a public IP. Order to remember: the inside host starts a flow → firewall must allow it out → NAT creates a mapping → replies come back to the public IP/port → NAT reverse-maps → firewall sees established state and lets them in. Unsolicited inbound still dies unless you port-forward and allow that dest port. A firewall is not TLS. NAT is not a full firewall.",
      howTo: [
        "Write the 5-tuple: proto, src IP, src port, dest IP, dest port. Last rule deny-all.",
        "Stateful: allow outbound new, then allow established/related back. Do not open every high port inbound.",
        "NAT mapping is born from outbound (or from DNAT). No mapping + no DNAT ⇒ drop inbound SYN.",
        "Port-forward (DNAT) still needs an allow to that WAN port. Rewrite without allow still drops.",
      ],
      bullets: [
        "Firewall: policy on 5-tuple, default deny, stateful established.",
        "NAT: rewrite addresses/ports. Outbound mapping; inbound needs DNAT.",
        "Both can sit on one box. NAT ≠ encryption ≠ ‘the firewall is done’.",
      ],
      examples: [
        {
          title: "Default deny and one HTTPS allow",
          prompt:
            "Inside 10.0.0.0/8 may browse HTTPS. Write three rules (out, established back, deny). Why not allow inbound :443 to the LAN?",
          steps: [
            {
              do: "1) allow TCP 10.0.0.0/8:* → 0.0.0.0/0:443 new outbound. 2) allow established,related. 3) deny all.",
              why: "Browsers start inside. Replies use dest = the client’s high port, which state already knows.",
            },
            {
              do: "An inbound allow to LAN:443 would make every PC a public web server. That is the opposite of ‘browse out’.",
              why: "Direction and who starts the conversation matter.",
            },
            {
              do: "UDP/443 is not covered. Add a separate line only if you mean HTTP/3.",
              why: "Protocol is part of the 5-tuple. TCP ≠ UDP.",
            },
            {
              do: "Without deny-all on a default-allow box, the allow line teaches nothing.",
              why: "Policy is the last matching action, plus the default.",
            },
          ],
          result:
            "Allow TCP 10/8 → *:443 out, allow established back, deny-all. Do not publish LAN:443.",
        },
        {
          title: "Stateful vs stateless on the return path",
          prompt:
            "Client 10.0.0.8:51999 → 93.184.216.34:443. Stateless firewall has only the outbound allow. Does the SYN-ACK from :443 survive? How does stateful fix it?",
          steps: [
            {
              do: "Return packet is src 93.184.216.34:443 dest 10.0.0.8:51999. It does not match ‘dest port 443 outbound’. Stateless drops it unless you also allowed inbound from :443 to high ports.",
              why: "Each packet is a stranger. Opening all high ports inbound is a wide hole.",
            },
            {
              do: "Stateful: the outbound SYN created a flow record. The SYN-ACK matches that record (established) and is allowed. High ports stay closed to random SYNs.",
              why: "The receptionist remembers who went out.",
            },
            {
              do: "A forged inbound SYN to 10.0.0.8:51999 still dies — no matching state, and deny-all.",
              why: "State is not ‘any packet to a high port’.",
            },
            {
              do: "UDP is harder to track (no SYN). Timeouts and ‘related’ (FTP ALG) are extra stories; exams still want TCP established.",
              why: "TCP flags make state easy. UDP is guesswork plus timers.",
            },
          ],
          result:
            "Stateless drops the SYN-ACK unless you punch high ports. Stateful allows established replies only.",
        },
        {
          title: "Port-forward needs DNAT and an allow",
          prompt:
            "Public 198.51.100.2:80 should reach inside web 10.0.0.8:80. NAT table plus firewall. What if you DNAT but default-deny with no allow?",
          steps: [
            {
              do: "DNAT: wan dest 198.51.100.2:80 → 10.0.0.8:80. That rewrite picks the apartment. SNAT on the way out still hides 10.0.0.8.",
              why: "Forward is ‘ticket 80 to apartment 8’. Without it, PAT has no inbound row.",
            },
            {
              do: "Firewall must allow TCP any → 198.51.100.2:80 (or to 10.0.0.8:80, depending when filter runs). Then established back to the client.",
              why: "NAT without allow is a rewrite into a closed door.",
            },
            {
              do: "DNAT but deny-all and no allow: packet is dropped. Allow but no DNAT: NAT still cannot choose a host, drop.",
              why: "Need both jobs. Filter and rewrite are not substitutes.",
            },
            {
              do: "This still is not TLS. HTTP/80 is clear on the WAN unless you terminate TLS on 443.",
              why: "Publishing a port is reachability, not confidentiality.",
            },
          ],
          result:
            "DNAT 80→10.0.0.8:80 plus an allow on TCP/80. Either piece alone still drops. Not encryption.",
        },
        {
          title: "Outbound malware and why NAT is not the bouncer",
          prompt:
            "PC 10.0.0.8 is infected and connects TCP to 203.0.113.50:445. PAT is on. Default firewall allows inside outbound any. What happens? Which control would stop it?",
          steps: [
            {
              do: "PAT happily maps the outbound flow. The malware phones home. NAT hid 10.0.0.8 but helped the flow leave.",
              why: "NAT is a translator, not a policy that understands ‘this is malware’.",
            },
            {
              do: "A firewall egress policy (allow 80/443, deny 445 SMB out) would drop it. So would DNS/IP intel at L7.",
              why: "The bouncer’s list is the firewall. Tighten outbound, do not ‘trust NAT’.",
            },
            {
              do: "Inbound default deny still holds — attackers cannot SYN in. That does not stop the inside traitor.",
              why: "CIA: inbound filter helps C of servers; egress filter helps C of data leaving.",
            },
            {
              do: "Exam line: NAT conserves IPv4 and hides numbers. A firewall enforces allow/deny. Use both, plus TLS.",
              why: "Three tools, three jobs.",
            },
          ],
          result:
            "PAT lets the malware out. Egress firewall (deny 445) would stop that flow. NAT is not the bouncer.",
        },
        {
          title: "Order of operations on a home gateway",
          prompt:
            "Laptop 10.0.0.8:51000 → 1.1.1.1:443. Name firewall then NAT on the way out, and the reverse on the way back.",
          steps: [
            {
              do: "Out: firewall checks ‘may 10.0.0.8 start TCP to 1.1.1.1:443?’ If yes, NAT SNAT source to the public IP:port and stores a row.",
              why: "Policy on the real inside 5-tuple, then rewrite for the WAN.",
            },
            {
              do: "WAN packet: src public:40000 dst 1.1.1.1:443. Return: dst public:40000.",
              why: "The server only knows the public ticket.",
            },
            {
              do: "In: NAT reverse-maps dest to 10.0.0.8:51000. Stateful firewall sees established and allows. Laptop receives the SYN-ACK.",
              why: "Undo the rewrite, then the flow record matches. Unsolicited inbound would fail both steps.",
            },
            {
              do: "Vendors may filter pre-NAT or post-NAT. For the exam, say: allow the conversation, map the addresses, established back.",
              why: "Do not invent vendor-specific zone names unless given.",
            },
          ],
          result:
            "Out: firewall allow, then SNAT. In: reverse NAT, then established allow. No mapping ⇒ inbound drop.",
        },
      ],
    },
  ],
};
