import type { TopicNote } from "@/data/notes";

export const notesNetworking: TopicNote = {
  topic: "networking",
  title: "Networking — techniques (beginner)",
  blurb:
    "A network is people posting letters through layers of wrapping. Memorise OSI layers, TCP versus UDP, and well-known ports. On every “which layer?” question, name the address type: port, IP, MAC, or bits.",
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
      ],
    },
  ],
};
