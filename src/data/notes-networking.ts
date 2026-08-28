import type { TopicNote } from "@/data/notes";

export const notesNetworking: TopicNote = {
  topic: "networking",
  title: "Networking Concepts",
  blurb:
    "OSI layers and PDUs, TCP versus UDP, IP, LAN media access (Ethernet CSMA/CD, Token Ring), forwarding devices, application ports, the TCP three-way handshake, and NAT. Layer-mapping MCQs are free marks if the stack is memorised with an example protocol at each layer.",
  blocks: [
    {
      heading: "OSI seven layers, PDUs, and example protocols",
      body: `The ISO/OSI model is seven layers of encapsulation. A sender walks 7→1 adding a header (and sometimes a trailer) at each layer; a receiver walks 1→7 stripping them. The exam wants the layer name, the protocol data unit (PDU), one example protocol or device, and a one-line job description.

Layer 7 Application is the user-facing protocol: HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, SSH, Telnet. PDU is data (or ‘APDU’ in some texts). Layer 6 Presentation agrees syntax and encoding: ASCII/UTF-8, JPEG, MPEG, encryption and compression. TLS is often placed here or as a 5/6/7 sandwich; tick Presentation if the question says ‘encryption/format’, Application if it names HTTPS. Layer 5 Session sets up, manages and tears down dialogues: RPC, NetBIOS, PPTP, SIP session. Checkpointing and full-duplex/half-duplex session control live here.

Layer 4 Transport gives process-to-process delivery with port numbers: TCP (segment) and UDP (datagram). Reliability, ordering, flow control and congestion control are TCP’s extras. Layer 3 Network gives host-to-host delivery across hops: IPv4/IPv6 packets, ICMP, IPSec, routers. Logical addressing (IP) and path selection live here. Layer 2 Data Link gives hop-to-hop frames on one link: Ethernet, PPP, Wi-Fi (802.11), switches, MAC addresses, CRC trailer. Layer 1 Physical moves bits: voltage, fibre light, connectors, repeaters, hubs, CSMA signalling.

Mnemonics: ‘All People Seem To Need Data Processing’ (7→1) or ‘Please Do Not Throw Sausage Pizza Away’ (1→7). Encapsulation: HTTP data is wrapped in a TCP segment, then an IP packet, then an Ethernet frame, then bits. The exam ‘which layer?’ question is almost always answered by naming the PDU or the address type (port / IP / MAC / bits).

Do not confuse OSI with TCP/IP’s four layers (Application, Transport, Internet, Link). HTTP is Application in both. IP is Internet in TCP/IP and Network in OSI. Ethernet is Link / Data Link. When the paper says ISO/OSI, use seven names.`,
      bullets: [
        "7 Application data — HTTP FTP SMTP DNS POP IMAP SSH.",
        "6 Presentation data — encoding, compression, encryption (TLS/JPEG/ASCII).",
        "5 Session data — RPC, NetBIOS, dialogue control.",
        "4 Transport segment/datagram — TCP, UDP, ports.",
        "3 Network packet — IP, ICMP, routers.",
        "2 Data Link frame — Ethernet, PPP, MAC, switches.",
        "1 Physical bits — cables, hubs, repeaters.",
      ],
      examples: [
        {
          title: "Which layer? Five one-line scenarios",
          prompt:
            "Name the OSI layer: (i) deciding the next-hop IP of a packet, (ii) adding a MAC destination and CRC, (iii) a browser speaking HTTP, (iv) converting UTF-8 to a wire encoding and compressing, (v) delivering bytes to port 443 on the local host.",
          language: "python",
          code: `# (i) Network (L3)        — routing, IP
# (ii) Data Link (L2)     — framing, MAC, CRC
# (iii) Application (L7)  — HTTP
# (iv) Presentation (L6)  — syntax, compression
# (v) Transport (L4)      — ports, TCP`,
          steps: [
            "Next-hop IP is a routing decision. Routers and IP live at Network. The packet’s destination IP is inspected, the routing table is looked up, TTL is decremented.",
            "MAC destination plus CRC trailer is framing on one physical hop. Switches and Ethernet NICs do this at Data Link. The IP packet is the payload of the frame.",
            "HTTP is an Application protocol. The browser does not think in segments; it thinks in requests. HTTPS is still Application plus a Presentation/TLS story.",
            "Character encoding and compression are Presentation. If the question had said ‘SSL handshake records’, many keys still accept Presentation; if it said ‘port 443’ that is Transport.",
            "Port 443 is a transport-layer address. TCP delivers the byte stream to the process bound to that port. IP does not know ports; Ethernet does not know ports.",
          ],
          result:
            "(i) Network (ii) Data Link (iii) Application (iv) Presentation (v) Transport. Address types: IP / MAC / URL-or-method / encoding / port.",
        },
        {
          title: "Map a packet’s headers as it goes down the stack",
          prompt:
            "A client sends an HTTP GET to 203.0.113.10 port 80, over Ethernet. List the headers added at layers 7→1 and what address each one names.",
          language: "java",
          code: `// L7 HTTP:  GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\n...
// L4 TCP:   src port 49152, dst port 80, seq, ack, flags, window, checksum
// L3 IP:    src 192.0.2.5, dst 203.0.113.10, TTL 64, protocol=TCP, header checksum
// L2 Eth:   src MAC of NIC, dst MAC of default gateway, EtherType=0x0800 (IPv4), CRC
// L1 bits:  preamble, voltages on the wire`,
          steps: [
            "Application writes the GET text (and headers like Host). No binary address here — the URL and Host name are application data. DNS already resolved the name to 203.0.113.10 before this send.",
            "Transport prepends a TCP header: ephemeral source port (say 49152), destination port 80, sequence number, window. PDU is now a segment. This is the first binary address (the port).",
            "Network prepends an IPv4 header: source 192.0.2.5, destination 203.0.113.10, TTL, protocol=6 (TCP). PDU is a packet. The destination IP stays constant across hops (except NAT, later).",
            "Data Link prepends an Ethernet header for this hop only: destination MAC is the gateway’s MAC on the LAN, not the server’s MAC (the server is not on this L2). EtherType 0x0800 says ‘IPv4 inside’. Trailer CRC. PDU is a frame.",
            "Physical encodes the frame as bits with a preamble. At the next router the frame is stripped, the packet is re-encapsulated in a new L2 header for the next hop, TTL drops by 1. L7–L4 headers are unchanged by a pure router.",
          ],
          result:
            "Down the stack: HTTP data → TCP (ports) → IP (IPs) → Ethernet (MACs + CRC) → bits. Each hop rewrites only the L2 header; L3 destination IP survives until NAT or the host.",
        },
        {
          title: "PDU vocabulary drill",
          prompt:
            "Fill the PDU name: bits, frame, packet, segment, datagram, data. Which two words both describe a UDP L4 unit? Which device speaks in frames but not packets?",
          language: "cpp",
          code: `// L1 bits
// L2 frame
// L3 packet (IP datagram is also used for L3)
// L4 TCP segment ; UDP datagram
// L5-7 data
// A switch (L2) forwards frames by MAC; it does not inspect IP packets
// A hub (L1) forwards bits, not even frames intelligently`,
          steps: [
            "Physical: bits (or symbols). No header in the OSI sense, just encoding.",
            "Data Link: frame. Ethernet frame = dest MAC, src MAC, EtherType, payload, FCS/CRC.",
            "Network: packet. IPv4 packet = IP header + payload. ‘IP datagram’ is a synonym at L3 and must not be confused with UDP’s L4 datagram.",
            "Transport: TCP segment, UDP datagram. Both sit on IP. If the question says ‘segment’ they mean TCP; ‘datagram’ without IP usually means UDP.",
            "A switch is the device that speaks frames: MAC learning, MAC forwarding. It does not need an IP (a management IP is optional). A hub is even lower: bits to every port, collisions included.",
          ],
          result:
            "L1 bits, L2 frame, L3 packet, L4 TCP segment / UDP datagram, L5–7 data. UDP L4 unit = datagram. A switch forwards frames, not IP packets.",
        },
        {
          title: "TCP/IP four-layer mapping onto OSI",
          prompt:
            "Place HTTP, TCP, IP, ICMP, Ethernet, and a hub into the 4-layer TCP/IP model and state the OSI equivalent.",
          language: "python",
          code: `# TCP/IP          OSI                 examples
# Application     5+6+7               HTTP, DNS, SMTP, TLS, FTP
# Transport       4                   TCP, UDP
# Internet        3                   IP, ICMP, IGMP, IPSec
# Link            1+2                 Ethernet, Wi-Fi, PPP, hub, switch`,
          steps: [
            "HTTP is TCP/IP Application = OSI Application (and it rides TLS which many drawings put in the same bucket). DNS is also Application even though it often uses UDP.",
            "TCP is Transport in both models. Port numbers appear only here.",
            "IP and ICMP are Internet in TCP/IP = OSI Network. Ping is ICMP, not an Application protocol in the OSI sense (the ping program is an application, the messages are Network).",
            "Ethernet plus the hub sit in Link = OSI Data Link + Physical. The hub is Physical; the Ethernet MAC is Data Link; TCP/IP lumps them.",
            "If the paper says ISO/OSI, do not answer with ‘Internet layer’. If it says TCP/IP, do not invent a Presentation layer. Read the stem.",
          ],
          result:
            "HTTP→Application/L7, TCP→Transport/L4, IP and ICMP→Internet/L3, Ethernet→Link/L2, hub→Link/L1. TCP/IP Application collapses OSI 5–7.",
        },
      ],
    },
    {
      heading: "TCP versus UDP",
      body: `TCP (Transmission Control Protocol) is connection-oriented, reliable, and ordered. It runs a three-way handshake to create a connection, numbers every byte, acknowledges received data, retransmits losses, enforces flow control (receiver window) and congestion control (cwnd: slow start, congestion avoidance). The PDU is a segment. Overhead is a 20-byte minimum header (ports, seq, ack, flags SYN/ACK/FIN/RST/PSH/URG, window, checksum). Use TCP when you need a file, a web page, mail, or a shell — HTTP, HTTPS, SMTP, IMAP, POP, FTP, SSH.

UDP (User Datagram Protocol) is connectionless and unreliable. No handshake, no retransmission, no ordering, no congestion control (applications may add their own). The PDU is a datagram. Header is 8 bytes: source port, dest port, length, checksum. Use UDP when you want low latency or one-shot request/reply: DNS queries, DHCP, VoIP, video streaming, SNMP, NTP, QUIC’s outer datagram (QUIC rebuilds reliability on top).

Both are L4 and both use port numbers. A socket is (local IP, local port, remote IP, remote port, protocol). TCP demultiplexes by the full 4-tuple; UDP by the 2-tuple (local IP, local port) plus the datagram. Port 0 is reserved; well-known ports are 0–1023; registered 1024–49151; ephemeral 49152–65535 (the ranges are the IANA picture the exam expects).

Exam contrasts: ‘which is faster?’ — UDP has less overhead, not magical speed; a lost UDP packet stays lost. ‘which is reliable?’ — TCP. ‘video live stream’ — UDP. ‘bank transfer’ — TCP. TCP’s reliability is not encryption; TLS sits above TCP (or inside QUIC/UDP). Sequence numbers are byte counts, not packet counts.

Flow control protects the receiver (window). Congestion control protects the network (slow start). Mixing the two words is a common wrong option. UDP has neither, unless the application invents them.`,
      bullets: [
        "TCP: connection, SYN handshake, reliable, ordered, flow+congestion, 20 B header, segment.",
        "UDP: no connection, no retry, 8 B header, datagram, DNS/DHCP/VoIP.",
        "Both: ports. Reliability ≠ encryption.",
        "Flow control = receiver. Congestion control = network. TCP only.",
      ],
      examples: [
        {
          title: "Pick TCP or UDP for five applications",
          prompt:
            "Choose the usual transport: (i) DNS query, (ii) HTTP/1.1 page load, (iii) DHCP discover, (iv) SSH login, (v) live voice call. One-line why.",
          language: "python",
          code: `# (i) UDP 53   small request/reply, retry at the app if needed
# (ii) TCP 80  page must arrive complete and ordered
# (iii) UDP 67/68  broadcast, no server socket yet
# (iv) TCP 22  reliable byte stream, login cannot lose bytes
# (v) UDP      late packets are useless; drop and continue`,
          steps: [
            "DNS query is a small Q/R. UDP/53 is the default; if the reply is truncated the resolver retries with TCP. Tick UDP unless the stem says ‘zone transfer’ (AXFR is TCP).",
            "HTTP/1.1 runs on TCP/80 (HTTPS TCP/443). A missing byte corrupts HTML. HTTP/3 uses QUIC over UDP, but Grade-A keys still want TCP unless they name HTTP/3.",
            "DHCP must work before the host has an IP. It broadcasts UDP. TCP cannot bind a connection without addresses in the usual way.",
            "SSH is an interactive byte stream with integrity needs. TCP/22. Losing a keystroke is unacceptable.",
            "Live voice: a packet that arrives after its playout point is junk. UDP plus an application jitter buffer. TCP’s retries would increase delay.",
          ],
          result:
            "UDP, TCP, UDP, TCP, UDP. DNS/DHCP/voice = UDP; web/SSH = TCP. Zone transfer and HTTP/3 are the named exceptions.",
        },
        {
          title: "Header fields you must recognise",
          prompt:
            "A dump shows src=49152 dst=80 seq=1000 ack=5000 flags=PSH,ACK window=64240. Which protocol? What does seq=1000 mean? Who is the server?",
          language: "java",
          code: `// TCP header (min 20 bytes):
// src port 49152 (ephemeral)  dst port 80 (HTTP server)
// seq 1000  ack 5000  flags PSH ACK  window 64240
// UDP would have no seq, ack, flags, or window — only ports, length, checksum`,
          steps: [
            "seq, ack, flags, window exist only in TCP. This is a TCP segment, not UDP and not an IP packet (IP has TTL, not a window).",
            "Destination port 80 is HTTP. The server is the side that bound 80; the client owns the ephemeral 49152. Direction of this segment is client → server.",
            "seq=1000 means the first byte of this segment’s payload is TCP byte 1000 of the client’s stream (the ISN was something else, plus bytes already sent).",
            "ack=5000 means the client has received server bytes up to 4999 and next expects 5000. ACK is valid because the ACK flag is set.",
            "PSH asks the receiver to deliver buffered data to the application promptly (typical for interactive or request-end). Window 64240 is flow control: the client advertises how many more bytes it can accept.",
          ],
          result:
            "TCP client→server HTTP. seq is a byte number, not a packet count. Server is the port-80 side. UDP has none of these fields.",
        },
        {
          title: "Reliability is not a property of IP",
          prompt:
            "A student says ‘I use IP so my file transfer is reliable’. Correct the statement in five steps, placing TCP, UDP, IP and Ethernet in the reliability story.",
          language: "cpp",
          code: `// Ethernet CRC: detect (not correct) a bad FRAME on one hop; drop it
// IP: best-effort PACKET; may drop, duplicate, reorder; TTL kills loops
// UDP: best-effort DATAGRAM; app may add retry (DNS does)
// TCP: retry, order, checksum end-to-end; this is what makes FTP/HTTP complete`,
          steps: [
            "Ethernet’s CRC detects a corrupted frame on a single hop and the NIC drops it. That is not end-to-end reliability and not retransmission of the file.",
            "IP is best-effort: routers drop packets when congested, paths can reorder, fragments can be lost. IP has a header checksum (IPv4) covering the header only, not the file.",
            "UDP adds ports and an optional checksum and still will not retry. A file sent with raw UDP can arrive with holes.",
            "TCP is the layer that retransmits until the byte stream is complete (or the connection dies). FTP/HTTP/SMTP sit on TCP for that reason.",
            "So ‘I use IP’ is true of every Internet send, including unreliable ones. Reliability was chosen when the application opened a TCP socket, not when it ‘used IP’.",
          ],
          result:
            "IP is best-effort. Ethernet CRC is hop-local detection. End-to-end file reliability is TCP (or an application protocol on UDP). ‘Using IP’ does not imply reliability.",
        },
        {
          title: "Flow control versus congestion control",
          prompt:
            "The receiver advertises window=0. Meanwhile routers are dropping packets and the sender’s cwnd halves. Which mechanism is which? Does UDP have either?",
          language: "python",
          code: `# flow control: receiver window (rwnd) in the TCP header
#   window=0 -> sender must stop (except window probes)
# congestion control: sender's cwnd, AIMD, slow start, Reno/CUBIC
#   drop / ECN -> cwnd /= 2
# sending rate = min(rwnd, cwnd)
# UDP: neither, unless the application implements them`,
          steps: [
            "Window=0 is flow control. The receiver’s buffer is full. The sender pauses so as not to overwrite unread data. This protects one host, not the Internet.",
            "cwnd halving is congestion control. A loss (or ECN mark) is taken as a congestion signal. This protects the shared path.",
            "TCP sends at most min(rwnd, cwnd) unacked bytes. Either knob can be the limiter.",
            "UDP has no rwnd and no cwnd. A careless UDP sender can saturate a link; that is why some exams mention RTP/RTCP or QUIC as ‘UDP plus extra control’.",
            "Wrong option to avoid: ‘flow control = slow start’. Slow start is a congestion-control phase. Flow control is the advertised window.",
          ],
          result:
            "window=0 → flow control (receiver). cwnd halving → congestion control (network). UDP has neither built in. TCP rate = min(rwnd, cwnd).",
        },
      ],
    },
    {
      heading: "IP: datagrams, addressing, forwarding",
      body: `IP (Internet Protocol) is the Network-layer workhorse. IPv4 addresses are 32 bits, usually dotted-quad (192.0.2.1). IPv6 addresses are 128 bits, hex-colon. An IP packet (datagram) carries a source IP, a destination IP, a TTL/Hop Limit, a protocol number (6=TCP, 17=UDP, 1=ICMP), and a payload. IPv4 has a header checksum; IPv6 does not (it delegates to L4). IP does not handshake and does not retransmit.

Forwarding: each router looks up the destination in its routing table (longest prefix match), decrements TTL, and emits the packet on the chosen interface with a new L2 header. If TTL hits 0 the packet dies and an ICMP Time Exceeded is sent — that is traceroute. Packets of one TCP connection may take different paths (load balancing) and may arrive out of order; TCP repairs order, IP does not.

Addressing the exam cares about: public vs private (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), loopback 127.0.0.0/8, link-local 169.254.0.0/16, multicast 224.0.0.0/4. CIDR /24 means 256 addresses (254 hosts typically). Default gateway is the L3 next hop for off-subnet destinations. ARP maps IPv4→MAC on the local link; ICMPv6 neighbour discovery does it for v6.

Fragmentation: if a packet is larger than the outgoing MTU, IPv4 routers may fragment (unless DF is set); IPv6 only the source fragments. Reassembly is at the destination. Don’t-Fragment plus ICMP Packet Too Big is path-MTU discovery.

ICMP is Network-layer signalling: echo request/reply (ping), dest unreachable, time exceeded. It is not TCP, not UDP, not an application. Ping ‘failing’ can be a firewall drop of ICMP, not proof that HTTP is down.`,
      bullets: [
        "IPv4 32-bit, IPv6 128-bit. Best-effort datagram. TTL per hop.",
        "Private: 10/8, 172.16/12, 192.168/16. Longest-prefix routing.",
        "ARP: IPv4→MAC on-link. ICMP: ping and errors, still L3.",
        "Fragmentation at routers (v4) or source (v6). Reassembly at dest.",
      ],
      examples: [
        {
          title: "Is 192.168.5.9 routable on the public Internet?",
          prompt:
            "Classify 192.168.5.9, 8.8.8.8, 127.0.0.1, 169.254.1.1, 172.31.255.1, 224.0.0.1. Which need NAT to talk to the public web?",
          language: "python",
          code: `# 192.168.5.9   RFC1918 private  192.168.0.0/16   NAT to go public
# 8.8.8.8       public (Google DNS)
# 127.0.0.1     loopback, never leaves the host
# 169.254.1.1   link-local (APIPA), not routed
# 172.31.255.1  RFC1918 private  172.16.0.0/12    NAT to go public
# 224.0.0.1     multicast all-hosts, not a unicast web dest`,
          steps: [
            "192.168.5.9 sits in 192.168.0.0/16. Private. A public router must not accept it as a source on the Internet. NAT at the edge rewrites it.",
            "8.8.8.8 is public unicast. Global DNS anycast. No NAT required for it to be a destination.",
            "127.0.0.1 loops inside the host. Packets to it never hit a NIC. ‘Server down’ vs ‘bound only to loopback’ is a favourite ops trap.",
            "169.254.1.1 is APIPA/link-local, used when DHCP fails. Not routed across a router. 172.31.255.1 is inside 172.16.0.0/12, private, NAT needed.",
            "224.0.0.1 is multicast. A web client does not HTTP to it. Private addresses that need NAT: 192.168.5.9 and 172.31.255.1.",
          ],
          result:
            "Private (NAT to go public): 192.168.5.9, 172.31.255.1. Public: 8.8.8.8. Loopback: 127.0.0.1. Link-local: 169.254.1.1. Multicast: 224.0.0.1.",
        },
        {
          title: "TTL and traceroute",
          prompt:
            "A traceroute to 203.0.113.10 shows three hops. Explain what the sender set TTL to on probes 1, 2, 3 and which ICMP message comes back.",
          language: "java",
          code: `// probe 1: UDP or ICMP with TTL=1 -> first router decrements to 0
//          returns ICMP Time Exceeded, src = that router's interface
// probe 2: TTL=2 -> second router Time Exceeded
// probe 3: TTL=3 -> packet reaches dest, dest returns port-unreachable
//          (UDP traceroute) or echo-reply (ICMP traceroute)`,
          steps: [
            "The sender deliberately sets a tiny TTL so that a router on the path is forced to drop the probe.",
            "TTL=1 dies at hop 1. That router sends ICMP Time Exceeded to the sender, revealing hop 1’s IP. TTL=2 dies at hop 2, and so on.",
            "When TTL is large enough to reach the destination, the dest does not send Time Exceeded. UDP traceroute typically gets ICMP Port Unreachable (it sent to an unused high port). ICMP traceroute gets Echo Reply.",
            "A star * in the output means that hop did not answer ICMP (filtered) but later hops did. That is not necessarily a down router.",
            "TTL is an IP field, Network layer. Traceroute is not a Transport protocol; it is a tool that abuses TTL. TCP/UDP/ICMP may ride inside the probe.",
          ],
          result:
            "Probes use TTL=1,2,3. Intermediate hops reply ICMP Time Exceeded. The destination replies Echo Reply or Port Unreachable. TTL is IP, not TCP.",
        },
        {
          title: "Longest prefix match",
          prompt:
            "Routing table: 0.0.0.0/0 → gw A, 10.0.0.0/8 → B, 10.1.0.0/16 → C, 10.1.2.0/24 → D. Where is 10.1.2.5 sent? Where is 10.2.0.1 sent? Where is 8.8.8.8 sent?",
          language: "cpp",
          code: `// 10.1.2.5  matches /8, /16, /24, /0  -> longest is /24 -> D
// 10.2.0.1  matches /8 and /0         -> /8 -> B
// 8.8.8.8   matches only /0           -> A
// more-specific prefix always wins, even if the metric is larger
// (unless an admin filter / AD says otherwise; Grade-A wants LPM)`,
          steps: [
            "10.1.2.5 is in 10.1.2.0/24, also in 10.1.0.0/16, 10.0.0.0/8 and the default. Longest prefix is /24, next hop D.",
            "10.2.0.1 is not in 10.1.0.0/16. It is in 10.0.0.0/8. Next hop B. The /16 does not ‘cover’ 10.2.",
            "8.8.8.8 matches none of the 10.x routes, so default 0.0.0.0/0 via A.",
            "Longest prefix match is the IP forwarding rule. It is why you can advertise a /32 host route that overrides a /24.",
            "A switch would not do this: it has no IP table. A gateway/router would. That is the device-layer distinction of the next section.",
          ],
          result:
            "10.1.2.5 → D (/24). 10.2.0.1 → B (/8). 8.8.8.8 → A (default). Longest matching prefix wins.",
        },
        {
          title: "ARP versus DNS versus routing — three different lookups",
          prompt:
            "Host 192.168.1.10/24, gateway 192.168.1.1, wants https://example.com. Order the lookups: DNS, routing decision, ARP. What question does each answer?",
          language: "python",
          code: `# 1 DNS   name -> 203.0.113.10   (application / L7, usually UDP/53)
# 2 route dest 203.0.113.10 not on 192.168.1.0/24 -> next hop = 192.168.1.1
# 3 ARP   192.168.1.1 -> gateway MAC   (on-link L3-to-L2)
# then frame to gateway MAC, packet dest IP still 203.0.113.10`,
          steps: [
            "DNS answers ‘what is the IP of example.com?’ It does not tell you the MAC or the next hop. Without DNS you cannot even fill the IP destination (unless you already had the IP).",
            "The routing table answers ‘is that IP on my subnet? if not, which next-hop IP do I use?’ Here the dest is off-link, so the next hop is the default gateway 192.168.1.1.",
            "ARP answers ‘what MAC is currently using 192.168.1.1 on this LAN?’ The Ethernet destination is that MAC, not the server’s MAC.",
            "The IP packet’s destination field is still the server 203.0.113.10. ARP never changes IP headers. Routing never changes the DNS name.",
            "If the destination had been 192.168.1.20 (same subnet), step 2 would say ‘on-link’ and step 3 would ARP for 192.168.1.20 directly, skipping the gateway.",
          ],
          result:
            "Order: DNS (name→IP), then route (IP→next-hop IP), then ARP (next-hop IP→MAC). Packet dest IP stays the server; frame dest MAC is the gateway.",
        },
      ],
    },
    {
      heading: "Hubs, switches, routers, gateways, firewalls",
      body: `A hub is a Physical-layer multiport repeater. Every bit in comes out every other port. One collision domain for the whole hub. No MAC table, no IP. Half-duplex. Largely historical, but the exam still asks.

A switch is a Data-Link device. It learns source MACs per port, forwards frames only to the port that owns the dest MAC, floods unknown unicast and all broadcast. Each port is its own collision domain (full duplex with no collisions on modern switched Ethernet). All ports remain one broadcast domain (unless you VLAN). A layer-3 switch can route between VLANs, at which point it is also acting as a router.

A router is a Network-layer device. It strips the incoming L2 header, looks up the dest IP, decrements TTL, wraps a new L2 header for the next link. It splits broadcast domains. It needs IP addresses on its interfaces. It is the box that connects your LAN to another network.

A gateway, in exam English, is a device that joins two networks that may not even share a protocol stack — a protocol translator, often at Application layer (mail gateway, payment gateway). Many texts also call the default router ‘the gateway’. If the options distinguish ‘router vs gateway’, pick gateway for protocol conversion and router for IP forwarding.

A firewall filters traffic by policy. A packet filter uses L3/L4 fields (IP, port, protocol). A stateful firewall tracks TCP connections. An application/next-gen firewall inspects HTTP/DNS (L7). It can be a dedicated box, a router ACL, or host software. Placement: at the edge, between zones (DMZ), on the host. A firewall is not a substitute for TLS, and TLS is not a firewall.`,
      bullets: [
        "Hub L1: bits to all, one collision domain.",
        "Switch L2: MAC table, per-port collision domain, one broadcast domain.",
        "Router L3: IP lookup, splits broadcasts, new L2 header per hop.",
        "Gateway: protocol conversion (or ‘default gateway’ = your router).",
        "Firewall: policy filter, packet / stateful / application.",
      ],
      examples: [
        {
          title: "Collision domains versus broadcast domains",
          prompt:
            "Four PCs plugged into a hub, that hub into a switch port, that switch into a router. Count collision domains and broadcast domains for the four PCs plus the router LAN interface.",
          language: "java",
          code: `// hub: all 4 PCs + the uplink share ONE collision domain
// switch: the hub's uplink is one collision domain; each other switch
//         port (the router) is another collision domain
// router: LAN interface is its own collision domain (the switch port)
// broadcasts: hub+switch = one broadcast domain until the router
// router LAN is a different L3 network / broadcast domain`,
          steps: [
            "A hub never splits collisions: the four PCs and the cable to the switch are one collision domain. If two PCs talk at once, they jam.",
            "The switch port that faces the hub is part of that same collision domain (it is attached to a hub). Each remaining switch port is a separate collision domain. The router’s LAN port is one of those.",
            "So collision domains ≈ 2 in the minimal reading (hub blob + router port), or more if the switch has other unused ports we ignore. The exam’s intended count for ‘4 PCs on a hub, hub on a switch, switch on a router’ is: 1 collision domain for the hub side, 1 for the router side, total 2 collision domains in that LAN-plus-uplink picture. If all four PCs were on the switch directly, it would be 5 collision domains (4 PCs + router).",
            "Broadcasts from a PC flood the hub and the switch, and die at the router. One broadcast domain for the four PCs and the switch. The router’s other interface is another broadcast domain.",
            "Replace the hub with a switch and you get one collision domain per PC. That is why ‘switch instead of hub’ is the textbook upgrade.",
          ],
          result:
            "Hub side = one shared collision domain; router’s switch port = another. One broadcast domain on the LAN, split by the router. Switches cut collisions; routers cut broadcasts.",
        },
        {
          title: "Which box rewrites which header?",
          prompt:
            "A frame carrying an IP packet goes through a hub, then a switch, then a router. Who copies bits blindly, who looks at MAC, who looks at IP and builds a new frame?",
          language: "python",
          code: `# hub    : repeat bits on all ports. no MAC, no IP. collisions possible
# switch : dest MAC -> port. same IP packet untouched. may rewrite VLAN tag
# router : dest IP -> next hop. TTL--. NEW ethernet header (new MACs)`,
          steps: [
            "Hub: Physical. It does not parse MAC or IP. If the incoming voltage is a collision, every port sees the collision.",
            "Switch: Data Link. It reads dest MAC, looks up the CAM/MAC table, emits the same frame (same MACs, same IP) on the matching port. Unknown dest MAC is flooded.",
            "Router: Network. It drops the incoming Ethernet header, inspects dest IP, decrements TTL, looks up the route, encapsulates in a new Ethernet header whose dest MAC is the next hop.",
            "Therefore end-to-end MACs change every hop at a router, IPs (without NAT) do not. A switch hop changes neither MAC nor IP.",
            "A transparent firewall in the path may look at all of the above and still forward without changing IPs (unless it is also NATing). Filtering ≠ rewriting.",
          ],
          result:
            "Hub = bits. Switch = MAC, frame preserved. Router = IP, new frame, TTL−1. MACs change at routers; IPs stay until NAT.",
        },
        {
          title: "Default gateway versus application gateway",
          prompt:
            "A host’s ‘default gateway’ is 192.168.1.1. A mail gateway translates SMTP to an internal mail API. Which OSI layers? Which device class?",
          language: "cpp",
          code: `// default gateway = router IP for off-subnet traffic (L3)
// mail / payment / protocol gateway = application-layer translator (L7)
// exam: if both options exist, 'gateway' = protocol conversion
//       'router' = IP forwarding
// many MCQs still call 192.168.1.1 'the gateway'`,
          steps: [
            "192.168.1.1 in the host’s routing table is the default route’s next hop. That box is a router (L3). People call it ‘the gateway’ in IPv4 configuration (the field name is Default Gateway).",
            "A mail gateway accepts SMTP on one side and speaks a different protocol on the other. That is an Application-layer gateway (ALG), a true protocol converter.",
            "If the question lists both router and gateway and the stem says ‘connects two dissimilar networks / protocols’, tick gateway.",
            "If the stem says ‘forwards IP packets between two subnets / decrements TTL’, tick router.",
            "A firewall may sit on the same appliance as the router/gateway. Then the box is ‘a filtering gateway’. Still name the function the stem asked for.",
          ],
          result:
            "Default gateway 192.168.1.1 = L3 router. Mail/protocol gateway = L7 converter. Use ‘gateway’ for dissimilar protocols, ‘router’ for IP hops.",
        },
        {
          title: "Packet-filter firewall rule: allow HTTPS out",
          prompt:
            "Write a 5-tuple rule that allows internal 10.0.0.0/8 to reach any public HTTPS server, and explain why a matching UDP/443 rule is a different decision. Stateful versus stateless?",
          language: "java",
          code: `// allow tcp 10.0.0.0/8  any   any  443   outbound
// then allow established inbound (stateful) OR
//    explicit tcp any 443  10.0.0.0/8  any  ack (ugly, stateless)
// UDP/443 would be QUIC/HTTP3, not classic HTTPS-on-TCP
// deny all is the implicit last rule`,
          steps: [
            "The 5-tuple is protocol, src IP, src port, dest IP, dest port. Here: TCP, 10.0.0.0/8, any ephemeral, any dest IP, dest 443, direction out.",
            "Replies come back src 443 → the client’s ephemeral port. A stateful firewall matches them as ‘established’ without an extra rule. A stateless packet filter must allow incoming TCP/443 traffic with ACK set — a cruder approximation.",
            "UDP dest 443 is not the same protocol. Opening it admits QUIC or any UDP tunnel on 443. Tick it only if the stem asked for HTTP/3.",
            "A deny-all last rule drops everything else (SMTP, SSH, random scans). Without it an ‘allow HTTPS’ rule on a default-allow box does nothing useful.",
            "This is L3/L4 filtering. It cannot stop a malware HTTPS session to a C2 server on 443 — that needs L7 / TLS inspection / threat intel, i.e. a different firewall class.",
          ],
          result:
            "Allow TCP 10.0.0.0/8:* → *:443 out, plus stateful established back. UDP/443 is a separate allow. Stateless boxes fake established with ACK bits. Last rule deny-all.",
        },
      ],
    },
    {
      heading: "Ethernet CSMA/CD and Token Ring",
      body: `Ethernet (IEEE 802.3) is the dominant LAN. Classic shared-medium Ethernet used CSMA/CD: Carrier Sense (listen before talk), Multiple Access (many stations, one coax or hub), Collision Detection (if two talk at once, abort, send a jam, binary exponential backoff, retry). Minimum frame size (64 bytes) and maximum cable length existed so a sender would still be transmitting when the collision came back — otherwise CD would fail.

Switched, full-duplex Ethernet (what you actually have now) has no collisions on a point-to-point link: each port is a collision domain of one. CSMA/CD is then idle. The exam still wants the algorithm, the jam signal, backoff, and the reason hubs collide while switches do not.

MAC addresses are 48-bit burned-in identifiers on the NIC, written as six octets. Frames: dest MAC, src MAC, EtherType (or 802.3 length), payload, FCS. Broadcast MAC ff:ff:ff:ff:ff:ff. A switch floods broadcasts. VLANs (802.1Q) tag frames to split broadcast domains without extra routers (until they need to talk, then a L3 device routes).

Token Ring (IEEE 802.5, IBM) is a token-passing ring. A special token frame circulates; only the holder may transmit a data frame, then releases the token. No collisions by design. Deterministic worst-case wait (useful in old industrial talk). Physical star with a MAU is possible (logical ring). Largely obsolete, still in the SEBI syllabus next to Ethernet.

Compare: Ethernet is probabilistic under load on a hub (collisions explode); Token Ring degrades linearly. Ethernet won on cost and speed (10M → 100M → 1G → 10G) and on switching, which removed the collision problem. If a question says ‘collision’ think Ethernet/hub; if it says ‘token’ think 802.5.`,
      bullets: [
        "CSMA/CD: listen, send, detect collision, jam, exponential backoff.",
        "Hubs collide; full-duplex switch ports do not.",
        "Token Ring 802.5: token holder transmits, no CD, deterministic.",
        "MAC 48-bit, frame + FCS, broadcast all-FFs. VLAN splits broadcasts.",
      ],
      examples: [
        {
          title: "CSMA/CD walk-through of one collision",
          prompt:
            "Stations A and B share a hub. Both sense idle and start sending. Describe the five steps until A’s retry succeeds. Why a 64-byte minimum frame?",
          language: "python",
          code: `# 1 carrier sense: both see idle
# 2 both transmit
# 3 collision detection: voltage anomaly / jabber
# 4 jam signal so everyone else notices, then stop
# 5 binary exponential backoff: wait k * slot, k random in 0..2^r - 1
#    r = retry count (capped, e.g. at 10), then retry from step 1
# min frame 64 B so transmission lasts at least one round-trip of the wire`,
          steps: [
            "Carrier sense: A and B listen, hear silence, conclude the medium is free. Multiple access means they are allowed to try.",
            "They transmit at (almost) the same time. The hub repeats both signals onto the shared electrical domain. The voltages collide.",
            "Collision detection: each sender hears a garbled signal unlike its own. Both abort. A jam (32 bits of pattern) is sent so that even stations that have not yet noticed will discard the fragment.",
            "Backoff: attempt r=1, pick k in {0,1}, wait k slot times. If they collide again, r=2, k in {0,1,2,3}, and so on. This is binary exponential backoff. After 16 failures the frame is dropped.",
            "Minimum 64-byte frame: A must still be transmitting when B’s colliding bits travel to A, otherwise A would have finished, declared success, and missed the collision. Max cable length and min frame size are a pair.",
          ],
          result:
            "Listen → both send → detect → jam → exponential backoff → retry. 64-byte minimum exists so CD can work on the longest legal segment. Switched full-duplex skips this whole dance.",
        },
        {
          title: "Token Ring versus Ethernet under heavy load",
          prompt:
            "Ten stations each always have a frame ready. Contrast utilisation on a CSMA/CD hub Ethernet versus a Token Ring. Who transmits when?",
          language: "java",
          code: `// Token Ring: token circulates. Station i holds it, sends one frame
// (or a token-holding timer), releases token. Next station. Fair, no CD.
// Ethernet hub: many collisions, backoff windows grow, utilisation falls.
// Switched Ethernet: each station has its own collision domain, full duplex,
// collisions ~ 0, utilisation high — this is why Token Ring lost the market.`,
          steps: [
            "Token Ring: a single token is the right to send. With ten eager stations the token rotates; each sends in turn. Throughput stays high; latency is bounded by (n × frame time).",
            "Hub Ethernet: many stations sensing idle will collide repeatedly. Backoff intervals grow. Useful utilisation can collapse — the classic ‘Ethernet is non-deterministic under load’ exam line.",
            "There is still no collision on Token Ring because two data frames are never legally on the ring at once (early token release variants still avoid CD).",
            "A modern Ethernet switch gives each station a private wire. CSMA/CD becomes irrelevant; Ethernet then beats Token Ring on speed and price. Syllabus still wants both algorithms.",
            "If the stem says ‘deterministic access / token’ pick Token Ring. If it says ‘collision / backoff / jam’ pick Ethernet CSMA/CD.",
          ],
          result:
            "Token Ring stays fair and collision-free under load. Hub Ethernet collides and backs off. Switched Ethernet also avoids collisions, which is how Ethernet displaced Token Ring.",
        },
        {
          title: "Read an Ethernet frame header",
          prompt:
            "Bytes: dest ff:ff:ff:ff:ff:ff, src 00:11:22:33:44:55, EtherType 0x0806, then an ARP request. Who receives it on a switched LAN? Which layer is this?",
          language: "cpp",
          code: `// dest all-FFs = broadcast MAC
// switch floods broadcasts out every port in the VLAN except ingress
// EtherType 0x0806 = ARP, 0x0800 = IPv4, 0x86DD = IPv6
// ARP is usually drawn at L2/L3 boundary; the FRAME is Data Link`,
          steps: [
            "The destination MAC is the broadcast address. Every NIC on the LAN (the VLAN) will accept the frame. A switch floods it; a router will not forward it to another subnet.",
            "Source MAC 00:11:22:33:44:55 is the sender’s NIC. The switch learns that MAC on the ingress port (MAC table update).",
            "EtherType 0x0806 identifies ARP in the payload. 0x0800 would have been IPv4, 0x86DD IPv6. This field is how L2 demultiplexes L3.",
            "The PDU is a frame, Data Link layer. ARP’s job (IP↔MAC) sits at the L2/L3 boundary, but the question asked about the Ethernet header, which is L2.",
            "A hub would also deliver it to everyone, including the sender’s other ears, and would not learn a MAC table. The learning is the switch’s extra.",
          ],
          result:
            "Broadcast frame, flooded by the switch to all ports in the VLAN. Data Link. EtherType 0x0806 = ARP. Routers do not pass it between subnets.",
        },
        {
          title: "Why full-duplex switched Ethernet disables CSMA/CD",
          prompt:
            "PC A — switch — PC B, both links 1 Gbit full duplex. A and B send at the same time. Is there a collision? Which CSMA/CD steps still run?",
          language: "python",
          code: `# each cable is two independent directions (or paired lanes)
# switch has a buffer: A-to-B frame stored and forwarded to B
# B-to-A frame stored and forwarded to A
# no shared medium, no collision, no jam, no backoff
# autonegotiation: if a hub (half duplex) is detected, CD comes back`,
          steps: [
            "Full duplex means A can send and receive on its link at once. The switch can do the same on B’s link. There is no shared coaxial tap.",
            "Both sending at once is fine: the switch queues each frame on the opposite port. Overload causes buffer drops (or pause frames), not CD jams.",
            "Carrier sense is unused because the medium is not multiple-access in the old sense. Collision detection has nothing to detect. Backoff never runs.",
            "Plug the same PCs into a hub (or force half duplex) and CSMA/CD returns. The algorithm is a property of the shared medium, not of ‘being Ethernet’ in the marketing sense.",
            "Exam sentence: ‘in a switched full-duplex LAN the collision domain is a single port and CSMA/CD is effectively disabled.’ Tick that, not ‘Ethernet never had collisions’.",
          ],
          result:
            "No collision. The switch buffers both frames. CSMA/CD is idle on full-duplex point-to-point links; it still matters on hubs and half-duplex links.",
        },
      ],
    },
    {
      heading: "Application protocols and well-known ports",
      body: `Memorise the port, the transport, and the one-line job. DNS 53/UDP (queries) and 53/TCP (zone transfers, truncated replies). SMTP 25/TCP (MTA-to-MTA mail transfer); submission 587/TCP; SMTPS 465/TCP. POP3 110/TCP (download and usually delete from the mailbox); POP3S 995. IMAP 143/TCP (folders stay on the server); IMAPS 993. FTP 21/TCP control, 20/TCP active data; PASV uses a dynamic data port. HTTP 80/TCP. HTTPS 443/TCP (HTTP over TLS). SSH 22, Telnet 23, DHCP 67 server / 68 client UDP, SNMP 161/UDP, NTP 123/UDP.

SMTP pushes mail between servers and from a submission client. POP pulls mail down and is weak at multi-device. IMAP is the multi-device folder protocol. The exam loves ‘which protocol leaves mail on the server?’ → IMAP.

FTP is two channels (control and data) and is firewall-hostile; SFTP is not FTP, it is SSH file transfer on port 22. TFTP 69/UDP is the LAN bootstrap toy. HTTP is stateless request/reply; cookies and TLS sit on top. HTTPS is HTTP over a TLS session, same HTTP semantics, different port and encryption.

DNS maps names to addresses (and more: MX, CNAME, TXT). A stub resolver queries a recursive resolver; that resolver walks from the root if needed. Poisoning and cache issues belong to the security paper; here you need port 53 and UDP-vs-TCP.

When two protocols could fit, the stem’s verb decides: ‘send mail between MTAs’ SMTP, ‘read mail from two phones without deleting’ IMAP, ‘old client that downloads and removes’ POP, ‘resolve www.sebi.gov.in’ DNS, ‘fetch a page encrypted’ HTTPS.`,
      bullets: [
        "DNS 53 UDP/TCP. SMTP 25. POP 110. IMAP 143. FTP 21/20. HTTP 80. HTTPS 443.",
        "Secure variants: POP3S 995, IMAPS 993, SMTPS 465, SSH 22 (not Telnet 23).",
        "IMAP keeps folders on the server; POP typically downloads.",
        "FTP ≠ SFTP. HTTPS = HTTP + TLS on 443.",
      ],
      examples: [
        {
          title: "Port table: fill the blanks",
          prompt:
            "Name protocol and port: (i) encrypted web, (ii) name resolution query, (iii) mail between two MTAs, (iv) mail folders on the server, (v) download-and-delete mailbox, (vi) file transfer control channel.",
          language: "python",
          code: `# (i) HTTPS 443/TCP
# (ii) DNS 53/UDP (TCP if needed)
# (iii) SMTP 25/TCP
# (iv) IMAP 143/TCP  (993 if TLS)
# (v) POP3 110/TCP   (995 if TLS)
# (vi) FTP 21/TCP    (SFTP would be 22, different protocol)`,
          steps: [
            "Encrypted web is HTTPS on 443/TCP. HTTP 80 is the cleartext twin. The application data is still HTTP.",
            "Name resolution queries go to 53/UDP. Zone transfer (AXFR) uses 53/TCP. A truncated UDP answer also retries TCP.",
            "MTA-to-MTA is SMTP/25. A mail client submitting to its ISP often uses 587 (submission) instead of 25, because ISPs block outbound 25 to fight bots.",
            "Folders on the server = IMAP/143. Download-and-delete = POP3/110. That pair is the highest-yield mail distinction.",
            "FTP control is 21. Data is 20 in active mode. SFTP is not FTP-over-TLS (that is FTPS); SFTP is the SSH subsystem on 22.",
          ],
          result:
            "443 HTTPS, 53 DNS, 25 SMTP, 143 IMAP, 110 POP3, 21 FTP control. Remember the TLS twins 995/993/465 and SSH 22.",
        },
        {
          title: "A day in the life of sending an email",
          prompt:
            "User on IMAPS composes mail in a phone, sends it, recipient reads it on another IMAPS client. Which protocols and ports fire, in order?",
          language: "java",
          code: `// 1 client --587/TCP or 465--> submission SMTP (with STARTTLS or SMTPS)
// 2 sending MTA --25/TCP--> recipient MX (DNS MX lookup on 53 first)
// 3 recipient MTA stores mailbox
// 4 recipient client --993/TCP IMAPS--> fetches the message
// POP3 would have been 995 and might delete off the server`,
          steps: [
            "The phone does not usually speak to the destination MX on port 25 (blocked, and needs auth). It submits to its provider on 587 or 465, authenticated.",
            "The sending MTA asks DNS (53) for the recipient domain’s MX record, then SMTP/25 to that MX. This is server-to-server.",
            "The message sits in the recipient’s mailbox store. No POP/IMAP yet.",
            "The recipient’s second device opens IMAPS/993, lists the inbox, fetches the body. The first device still sees the same folder — that is IMAP.",
            "If the recipient had used POP3S/995 with ‘delete on download’, the phone would not see the mail later. That is why corporate questions prefer IMAP.",
          ],
          result:
            "Submit SMTP 587/465 → DNS 53 for MX → SMTP 25 MTA-to-MTA → store → IMAPS 993 to read. POP3 would download (and maybe delete) instead of sharing folders.",
        },
        {
          title: "HTTP versus HTTPS versus the port a proxy sees",
          prompt:
            "A GET https://sebi.gov.in/ is issued. Which port leaves the client? What can a corporate HTTP proxy still see without TLS interception? What would port 80 have exposed?",
          language: "cpp",
          code: `// client TCP dest port 443, SNI (in TLS ClientHello, now often encrypted)
// HTTP method, path, headers, cookies are inside TLS - proxy sees IPs and SNI maybe
// port 80: GET /path, Host, cookies, body all in clear on the LAN`,
          steps: [
            "The client opens TCP to the server (or proxy) on 443. There is no port 80 in the HTTPS-direct path.",
            "TLS then encrypts the HTTP request. A non-intercepting proxy or path observer sees IPs, ports, maybe SNI, and traffic sizes — not the URL path or cookie.",
            "On port 80 the GET line, Host header, cookies and body travel in cleartext. Anyone on the hub / mirrored switch / coffee-shop Wi-Fi can read them.",
            "A TLS-intercepting (break-and-inspect) proxy installs a corporate CA on the client, terminates TLS, and can read HTTP. That is a firewall/security topic; the port is still 443 on both legs, with a different cert.",
            "‘HTTPS is Application’ remains true: HTTP methods sit in L7, TLS wraps them (Presentation), TCP 443 is Transport.",
          ],
          result:
            "Client uses 443. Without interception the proxy does not see the HTTP path. Port 80 would have exposed the whole request. HTTPS = HTTP + TLS, not a different application language.",
        },
        {
          title: "FTP active versus passive, and why firewalls hate it",
          prompt:
            "FTP control is on 21. In active mode the server connects back to the client’s port 20-story (client port given in PORT). In passive, the client connects to a server-chosen data port. Which direction fails through a typical NAT firewall, and what is SFTP’s answer?",
          language: "python",
          code: `# active: server-to-client data connection (PORT). inbound to client - NAT fails
# passive: client-to-server data (PASV). outbound, NAT-friendly
# SFTP: one SSH TCP/22 multiplexed channel, no second TCP, firewall-friendly
# FTPS: FTP + TLS, still two channels, still painful`,
          steps: [
            "Control channel: client → server :21. Commands USER, PASV, RETR live here. This channel is easy to allow.",
            "Active data: the server initiates a connection to the client (source port 20 historically). Home NAT and client firewalls drop unsolicited inbound. Active mode breaks.",
            "Passive data: the server returns a port in PASV; the client originates the data TCP. Outbound is usually allowed. Passive is the NAT-friendly FTP.",
            "A stateful FTP ALG can rewrite PORT/PASV addresses, which is fragile with TLS (FTPS hides the commands).",
            "SFTP (SSH file transfer) uses a single TCP/22. No second port, no ALG. That is the operational replacement, and it is not ‘FTP on 22’.",
          ],
          result:
            "Active FTP data is inbound to the client and dies on NAT. Passive is client-outbound. SFTP on 22 avoids a second channel entirely. FTP 21/20 ≠ SFTP 22.",
        },
      ],
    },
    {
      heading: "TCP three-way handshake and connection teardown",
      body: `A TCP connection is a 4-tuple plus two sequence spaces. Creation is the three-way handshake. (1) Client sends SYN with its Initial Sequence Number ISN_c = x, ACK flag off (or ACK=0). State SYN-SENT. (2) Server replies SYN-ACK, ISN_s = y, acknowledgement number x+1. State SYN-RECEIVED. (3) Client sends ACK, acknowledgement y+1, sequence x+1. Both sides ESTABLISHED. Each SYN consumes one sequence number even with no payload.

The handshake negotiates MSS, window scaling, SACK permitted, and timestamps in TCP options. It also proves both sides can send and receive. A half-open connection is one that finished only one direction (classic SYN flood: many SYNs, no third ACK, backlog of SYN-RECEIVED). SYN cookies are a defence.

Teardown is a four-way exchange because each direction closes independently: FIN, ACK of that FIN, FIN the other way, ACK. TIME-WAIT (2MSL) sits on the side that closed first so stray duplicates die. RST aborts immediately (error or abort). A simultaneous close (both send FIN) is legal.

Exam dry-run: write flags, seq, ack at each of the three steps. Remember ack = peer_seq + 1 for the SYN (because SYN counts as one). Data after ESTABLISHED uses the next byte numbers. Do not put payload on the SYN in the textbook trace (TCP Fast Open exists but is not the syllabus default).

Related: UDP has no handshake — a datagram is just sent. QUIC on UDP has its own crypto handshake. The three-way handshake is TCP-specific and is a Transport-layer ritual, not Network and not Data Link.`,
      bullets: [
        "SYN (seq=x) → SYN-ACK (seq=y, ack=x+1) → ACK (seq=x+1, ack=y+1).",
        "SYN consumes one sequence number. Then ESTABLISHED.",
        "Close: FIN/ACK, FIN/ACK (four segments). RST aborts.",
        "SYN flood = many SYNs, no third ACK. UDP: no handshake.",
      ],
      examples: [
        {
          title: "Handshake SYN / SYN-ACK / ACK with numbers",
          prompt:
            "Client ISN=1000, server ISN=5000. Write flags, seq, ack of the three segments. After the handshake, the client sends 100 bytes of data. What seq and ack does that segment use?",
          language: "python",
          code: `# 1 client -> server  SYN     seq=1000         ack=-        flags=SYN
# 2 server -> client  SYN-ACK seq=5000         ack=1001     flags=SYN,ACK
# 3 client -> server  ACK     seq=1001         ack=5001     flags=ACK
# 4 client -> server  data    seq=1001 len=100 ack=5001     flags=PSH,ACK
#    server's next ACK will be ack=1101`,
          steps: [
            "Step 1: client SYN, seq=1000. No ACK required. Client state SYN-SENT. The ISN is 1000, chosen (in real stacks, randomly) to avoid old-connection collisions.",
            "Step 2: server SYN-ACK, seq=5000 (its own ISN), ack=1001 (client ISN + 1 because SYN ate one number). Server state SYN-RECEIVED.",
            "Step 3: client ACK, seq=1001, ack=5001 (server ISN + 1). Both ESTABLISHED. This ACK may piggy-back on the first data, but the textbook draws it alone.",
            "First 100-byte data: seq=1001 (next client byte), ack=5001 (still waiting for server byte 5001, which is the server’s first data byte). Length 100 covers bytes 1001..1100.",
            "Server’s ACK of that data: ack=1101. If you wrote ack=1001 after the data you forgot that 100 bytes had been consumed. Byte counting, not segment counting.",
          ],
          result:
            "SYN seq=1000; SYN-ACK seq=5000 ack=1001; ACK seq=1001 ack=5001. First data seq=1001 ack=5001, 100 bytes. Next server ack=1101.",
        },
        {
          title: "What each side’s state machine does",
          prompt:
            "Name the TCP states on client and server through the handshake and a normal client-led close.",
          language: "java",
          code: `// client: CLOSED -> SYN-SENT -> ESTABLISHED
//         -> FIN-WAIT-1 -> FIN-WAIT-2 -> TIME-WAIT -> CLOSED
// server: CLOSED -> LISTEN -> SYN-RECEIVED -> ESTABLISHED
//         -> CLOSE-WAIT -> LAST-ACK -> CLOSED
// simultaneous close uses CLOSING; abort uses RST from almost anywhere`,
          steps: [
            "Server is LISTEN (passive open). Client is CLOSED then sends SYN and enters SYN-SENT (active open).",
            "Server receives SYN, replies SYN-ACK, enters SYN-RECEIVED. Client receives SYN-ACK, sends ACK, enters ESTABLISHED. Server receives that ACK, enters ESTABLISHED.",
            "Client close: sends FIN, FIN-WAIT-1. Server ACKs the FIN, CLOSE-WAIT, and tells the application. Client gets the ACK, FIN-WAIT-2 (half-closed: it can still receive).",
            "Server application closes, server sends FIN, LAST-ACK. Client ACKs, TIME-WAIT (2MSL). Server gets the ACK, CLOSED. Client’s TIME-WAIT expires, CLOSED.",
            "TIME-WAIT belongs to the side that sent the last ACK of the close (usually the active closer). It stops old duplicates from confusing a new connection with the same 4-tuple.",
          ],
          result:
            "Client SYN-SENT → ESTABLISHED → FIN-WAIT-1/2 → TIME-WAIT. Server LISTEN → SYN-RECEIVED → ESTABLISHED → CLOSE-WAIT → LAST-ACK. TIME-WAIT is 2MSL on the closer.",
        },
        {
          title: "SYN flood as a half-open attack",
          prompt:
            "Attacker sends 10 million SYNs to port 80 with spoofed sources, never the third ACK. What state fills up, and name two defences.",
          language: "cpp",
          code: `// each SYN allocates a TCB in SYN-RECEIVED (backlog)
// third ACK never comes (spoofed source will not complete)
// backlog full -> legitimate SYNs dropped -> DoS
// defences: SYN cookies (encode state in the ISN, no TCB until ACK)
//           backlog increase, SYN rate limit, anycast/load balancer, RST orphans`,
          steps: [
            "A legitimate handshake holds a small control block while waiting for the third ACK. The attack multiplies that wait with no intention of completing.",
            "The server’s SYN-RECEIVED backlog (or analogue) fills. New SYNs, including real clients, are dropped. Availability dies; confidentiality and integrity of existing connections may be untouched.",
            "Spoofed source IPs mean the SYN-ACKs go into the void, so the third ACK never returns. The server cannot ‘just reply RST’ to a real host that never sent SYN.",
            "SYN cookies: the server encodes the handshake state into a carefully computed ISN, allocates a TCB only when a matching third ACK arrives. Backlog stays empty.",
            "This is a Transport-layer DoS. A firewall can rate-limit SYNs (network security), but the protocol-level fix is cookies / proxies. UDP has no SYN flood; it has its own amplification floods instead.",
          ],
          result:
            "SYN-RECEIVED backlog exhausts → DoS. Defences: SYN cookies, rate limits, offload. The missing piece is the third ACK of the three-way handshake.",
        },
        {
          title: "Why UDP DNS has no three-way handshake",
          prompt:
            "A stub resolver sends one 40-byte DNS query and gets one 80-byte answer. Contrast with opening TCP for the same query. When does DNS still use TCP?",
          language: "python",
          code: `# UDP: one datagram each way.  no SYN, no connection, no TIME-WAIT
# TCP: SYN, SYN-ACK, ACK, query, reply, FIN...  extra RTTs and state
# DNS TCP: zone transfer, or TC-bit (truncated) UDP answer, or DNS-over-TLS 853`,
          steps: [
            "UDP: the query is a datagram to 53; the answer is a datagram back. Two packets, one RTT. No ISN, no ESTABLISHED, no teardown.",
            "TCP: three packets before the query even starts, then the query, then the answer, then FINs. For a 40-byte lookup that is wasteful, which is why queries default to UDP.",
            "The cost TCP pays buys reliability and large messages. A 4 KB DNS answer may not fit a 512-byte classic UDP DNS payload (EDNS0 raised this); the TC bit says ‘retry TCP’.",
            "AXFR/IXFR zone transfers are TCP by design (bulk, must be complete). DNS-over-TLS uses 853/TCP. Those are the ‘DNS on TCP’ ticks.",
            "The handshake is therefore a TCP feature, not a ‘Network’ or ‘DNS’ feature. IP and UDP will happily carry a one-shot message without it.",
          ],
          result:
            "UDP DNS = two datagrams, no handshake. TCP would add SYNs and FINs. DNS uses TCP for truncation, zone transfers, and DoT — not for a normal tiny query.",
        },
      ],
    },
    {
      heading: "NAT: hiding and multiplexing private addresses",
      body: `Network Address Translation rewrites IP addresses (and usually ports) at a boundary. The common home/office form is NAPT / PAT / ‘NAT overload’: many private RFC1918 hosts share one public IPv4. Outbound packet: source 192.168.1.10:49152 becomes 203.0.113.5:40000, and the NAT box remembers the mapping. Inbound reply to 203.0.113.5:40000 is rewritten back to 192.168.1.10:49152 and forwarded inside.

NAT conserves IPv4, hides internal topology (a weak security side-effect, not a firewall), and breaks end-to-end addressing. Inbound unsolicited connections fail unless you port-forward (DNAT) or the host uses a hole-punch / relay. ALGs rewrite embedded addresses in FTP/SIP — fragile. IPv6 was supposed to make NAT unnecessary; in practice NAT66/NPTv6 exist but the exam’s NAT is IPv4 PAT.

Static NAT 1:1 maps one private to one public. Dynamic NAT maps onto a pool, still 1:1 while the binding lasts. PAT is many-to-one using ports. SNAT = rewrite source (outbound). DNAT = rewrite destination (port forwarding / load balancer). Hairpin NAT is when two internals talk via the public mapping.

Exam: ‘which device?’ — the edge router/firewall. ‘which layer?’ — Network (addresses) plus Transport (ports) for PAT. ‘does NAT encrypt?’ — no. ‘does NAT replace a firewall?’ — no, though they share a box. ‘why did FTP active mode die?’ — the server cannot open a connection to a private client IP; PAT plus no port-forward blocks it.`,
      bullets: [
        "PAT/NAPT: many private IPs → one public IP, distinguished by ports.",
        "Outbound SNAT creates a mapping; inbound uses it. Unsolicited inbound is dropped.",
        "Conserves IPv4, hides topology, breaks end-to-end (FTP, IPSec, peer-to-peer).",
        "Not encryption, not a complete firewall. Port-forward = DNAT.",
      ],
      examples: [
        {
          title: "PAT table for one HTTPS flow",
          prompt:
            "Inside host 10.0.0.8:51000 talks to 93.184.216.34:443. Public address of the NAT is 198.51.100.2. Fill the NAT table row and the packet’s IP/ports on the WAN after SNAT.",
          language: "java",
          code: `// inside 5-tuple:  tcp  10.0.0.8:51000  ->  93.184.216.34:443
// WAN packet:      tcp  198.51.100.2:40000 ->  93.184.216.34:443
// table: proto tcp  10.0.0.8 51000  198.51.100.2 40000  93.184.216.34 443
// reply WAN: 93.184.216.34:443 -> 198.51.100.2:40000
// reply LAN: 93.184.216.34:443 -> 10.0.0.8:51000`,
          steps: [
            "The host sends with its private source. That packet is not globally routable, so the NAT must rewrite the source IP before the packet hits the Internet.",
            "Source port may also change (to avoid colliding with another host’s 51000). Suppose it becomes 40000. Dest IP and dest port stay 93.184.216.34:443 — the server is still the destination.",
            "The NAT installs a mapping (10.0.0.8, 51000) ↔ (198.51.100.2, 40000) for this remote 5-tuple, with a timeout.",
            "The server replies to 198.51.100.2:40000, the only address it knows. The NAT reverse-rewrites dest to 10.0.0.8:51000 and forwards on the LAN.",
            "A second inside host 10.0.0.9:51000 gets a different WAN port, say 40001. Ports are the multiplexer that make many-to-one possible.",
          ],
          result:
            "WAN packet src 198.51.100.2:40000 dst 93.184.216.34:443. Table maps 10.0.0.8:51000 to that WAN port. Reply is reverse-mapped to the private host.",
        },
        {
          title: "Unsolicited inbound is dropped — why servers need DNAT",
          prompt:
            "An external client tries to open TCP to 198.51.100.2:80, but the web server is 10.0.0.8:80 behind PAT. Without a port-forward, what happens? With DNAT?",
          language: "python",
          code: `# no mapping for dest 198.51.100.2:80 from this new 4-tuple
# NAT has no inside host to send to -> drop (or RST)
# DNAT rule: wan :80 -> 10.0.0.8:80
# then the inbound SYN creates/uses a mapping, replies SNAT back out`,
          steps: [
            "PAT mappings are created by outbound traffic (or by an explicit rule). A fresh inbound SYN has no row. The NAT cannot choose which of 200 inside hosts should get it.",
            "The SYN is dropped. From the Internet the public IP does not ‘have port 80 open’. That is why a house PC is not a web server by accident — a security accident-avoider, not a real firewall policy engine.",
            "A DNAT / port-forward rule says: dest 198.51.100.2:80 → 10.0.0.8:80. The NAT rewrites the destination (not the source) and forwards inside.",
            "The server’s replies still need SNAT on the way out so they appear from 198.51.100.2. Both directions are rewritten, opposite fields.",
            "A load-balancer is DNAT (or a proxy at L7) onto a pool. Same idea, several insides.",
          ],
          result:
            "Without a mapping, inbound SYN dies. DNAT port-forward 80→10.0.0.8:80 makes the server reachable. PAT alone is outbound-only.",
        },
        {
          title: "NAT is not encryption and not a full firewall",
          prompt:
            "A candidate writes ‘we have NAT so our traffic is confidential and attackers cannot reach us, so we skip TLS and skip the firewall’. List five things that are still wrong.",
          language: "cpp",
          code: `// 1 NAT does not encrypt; a WAN sniffer sees payload of HTTP on 80
// 2 malware inside can still phone home (outbound PAT works)
// 3 port-forwards and UPnP punch holes
// 4 NAT is not application filtering, no AV, no IDS
// 5 IPv6 or a leaked VPN can bypass the 'hidden' topology`,
          steps: [
            "Confidentiality is TLS/IPsec, not NAT. NAT rewrites addresses; the HTTP body is still clear on port 80 across the ISP.",
            "Availability to inbound scanners is reduced, but compromised insides can still make outbound connections (C2, exfiltration). PAT helps those connections.",
            "UPnP IGD and manual port-forwards reopen inbound. A single mapped camera is a worldwide target.",
            "A firewall adds policy (who can talk to whom, which ports, application inspect). NAT adds a mapping table. Combine them; do not substitute.",
            "Integrity of payloads is a MAC/signature job (security notes). NAT does not detect a modified packet except insofar as TCP checksums cover the pseudo-header and must be updated — that is bookkeeping, not cryptography.",
          ],
          result:
            "NAT hides addresses and conserves IPv4. It does not encrypt, does not stop outbound malware, and is not a complete firewall. Still use TLS and a real policy filter.",
        },
        {
          title: "Which layer is PAT, and what checksums must change?",
          prompt:
            "PAT rewrites IP addresses and TCP/UDP ports. Which OSI layers are involved? Why must IPv4 and TCP checksums be recomputed?",
          language: "java",
          code: `// L3: source (or dest) IP rewritten
// L4: source (or dest) port rewritten
// IPv4 header checksum covers the IP header -> must refresh
// TCP/UDP checksum covers a pseudo-header including IPs and the L4 ports
//    -> must refresh (incremental checksum is the usual implementation)
// Ethernet CRC recomputed anyway because the frame is new on the egress NIC`,
          steps: [
            "Rewriting IPs is Network layer. Rewriting ports is Transport. PAT is therefore an L3+L4 function, which is why it sits on routers/firewalls, not on L2 switches.",
            "IPv4’s header checksum is a 16-bit one-complement of the header. Change the source IP, the checksum is wrong unless updated. IPv6 has no header checksum; L4 still does.",
            "TCP and UDP checksums include a pseudo-header with src/dst IP and the port fields. Both changed, so both checksums change. A box that rewrote IPs and forgot TCP checksums would kill every connection.",
            "The Ethernet CRC is hop-local and is computed by the egress interface on the new frame. No ‘NAT CRC’ field exists.",
            "Exam pick: ‘NAT device = router/firewall, layers 3 and 4’. A hub or a pure L2 switch cannot PAT.",
          ],
          result:
            "PAT = Network + Transport. IPv4 header checksum and TCP/UDP checksums must be updated. Switches/hubs cannot do this. Ethernet CRC is just a new frame on the way out.",
        },
      ],
    },
  ],
};
